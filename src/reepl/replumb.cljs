(ns reepl.replumb
  (:require [cljs.js :as jsc]
            [cljs.analyzer :as ana]
            [reepl.core :as reepl]
            [reepl.helpers :as helpers]
            [devtools.core :as devtools]
            [cljs.pprint :as pprint]
            [reagent.core :as r]
            [quil.core :as q :include-macros true]
            [cljs.tools.reader]
            [clojure.string :as str]

            [replumb.core :as replumb]
            [replumb.repl]
            [replumb.ast :as ast]
            [replumb.doc-maps :as docs]
            [cljs.repl :as repl]
            [parinfer-codemirror.editor :as parinfer]
            [parinfer.codemirror.mode.clojure.clojure-parinfer]

            [cljs.tools.reader.reader-types :refer [string-push-back-reader]]
            [cljs.tools.reader]

            [quil.middleware :as m])
  (:import goog.net.XhrIo))

(defn fetch-file!
  "Very simple implementation of XMLHttpRequests that given a file path
  calls src-cb with the string fetched of nil in case of error.
  See doc at https://developers.google.com/closure/library/docs/xhrio"
  [file-url src-cb]
  (try
    (.send XhrIo file-url
           (fn [e]
             (if (.isSuccess (.-target e))
               (src-cb (.. e -target getResponseText))
               (src-cb nil))))
    (catch :default e
      (src-cb nil))))

(def replumb-opts
  (merge (replumb/browser-options
          ["/main.out" "/main.out"]
          ;; TODO figure out file loading
          #_(fn [& a] nil)
          fetch-file!)
         {:warning-as-error true
          ;; :verbose true
          :no-pr-str-on-value true}))

(defn fix-ns-do [text]
  (let [rr (string-push-back-reader text)
        form (cljs.tools.reader/read rr)
        is-ns (and (sequential? form)
                   (= 'ns (first form)))
        ;; TODO this is a bit dependent on tools.reader internals...
        s-pos (.-s-pos (.-rdr rr))]
    (js/console.log is-ns form s-pos)
    (if-not is-ns
      text
      (str
       (.slice text 0 s-pos)
       "(do "
       (.slice text s-pos)
       ")"
       ))))

(defn run-repl* [text opts cb]
  (replumb/read-eval-call
   opts
   #(cb
     (replumb/success? %)
     (replumb/unwrap-result %))
   (fix-ns-do text)
   ;; this breaks `ns' declarations... :(
   #_(if-not (= -1 (.indexOf text "\n"))
     ;; For multiline inputs, wrap in a `do` in case.
     (str "(do " text ")")
     text)))

(defn run-repl
  ([text cb] (run-repl* text replumb-opts cb))
  ([text opts cb] (run-repl* text (merge replumb-opts opts) cb)))

(defn compare-completion
  "The comparison algo for completions

  1. if one is exactly the text, then it goes first
  2. if one *starts* with the text, then it goes first
  3. otherwise leave in current order"
  [text a b]
  (cond
    (and (= text a)
         (= text b)) 0
    (= text a) -1
    (= text b) 1
    :else
    (let [a-starts (= 0 (.indexOf a text))
          b-starts (= 0 (.indexOf b text))]
      (cond
        (and a-starts b-starts) 0
        a-starts -1
        b-starts 1
        :default 0))))

(defn compare-ns
  "Sorting algo for namespaces

  The current ns comes first, then cljs.core, then anything else
  alphabetically"
  [current ns1 ns2]
  (cond
    (= ns1 current) -1
    (= ns2 current) 1
    (= ns1 'cljs.core) -1
    (= ns2 'cljs.core) 1
    :default (compare ns1 ns2)))

(defn get-from-js-ns
  "Use js introspection to get a list of interns in a namespaces

  This is pretty dependent on cljs runtime internals, so it may break in the
  future (although I think it's fairly unlikely). It takes advantage of the fact
  that the ns `something.other.thing' is available as an object on
  `window.something.other.thing', and Object.keys gets all the variables in that
  namespace."
  [ns]

  (let [parts (map munge (.split (str ns) "."))]
    (map demunge (js/Object.keys (reduce aget js/window parts)))))

(defn dedup-requires
  "Takes a map of {require-name ns-name} and dedups multiple keys that have the
  same ns-name value."
  [requires]
  (first
   (reduce (fn [[result seen] [k v]]
            (if (seen v)
              [result seen]
              [(assoc result k v) (conj seen v)])) [{} #{}] requires)))

(defn get-matching-ns-interns [[name ns] matches? only-ns]
  (let [ns-name (str ns)
        publics (keys (ast/ns-publics @replumb.repl/st ns))
        publics (if (empty? publics)
                  (get-from-js-ns ns)
                  publics)]
    (if-not (or (nil? only-ns)
                (= only-ns ns-name))
      []
      (sort (map #(symbol name (str %))
                 (filter matches?
                         publics))))))

(defn js-attrs [obj]
  (if-not obj
    []
    (let [constructor (.-constructor obj)
        proto (js/Object.getPrototypeOf obj)]
    (concat (js/Object.keys obj)
            (when-not (= proto obj)
              (js-attrs proto))))))

(defn js-completion
  [text]
  (let [parts (vec (.split text "."))
        completing (or (last parts) "")
        prefix #(str "js/" (str/join "." (conj (vec (butlast parts)) %)))
        possibles (js-attrs (reduce aget js/window (butlast parts)))]
    (->> possibles
         (filter #(not (= -1 (.indexOf % completing))))
         (sort (partial compare-completion text))
         (map #(-> [nil (prefix %) (prefix %)])))))

;; TODO fuzzy-match if there are no normal matches
(defn cljs-completion
  "Tab completion. Copied w/ extensive modifications from replumb.repl/process-apropos."
  [text]
  (let [[only-ns text] (if-not (= -1 (.indexOf text "/"))
                         (.split text "/")
                         [nil text])
        matches? #(and
                   ;; TODO find out what these t_cljs$core things are... seem to be nil
                   (= -1 (.indexOf (str %) "t_cljs$core"))
                   (< -1 (.indexOf (str %) text)))
        current-ns (replumb.repl/current-ns)
        replace-name (fn [sym]
                       (if (or
                            (= (namespace sym) "cljs.core")
                            (= (namespace sym) (str current-ns)))
                         (name sym)
                         (str sym)))
        requires (:requires
                  (ast/namespace @replumb.repl/st current-ns))
        only-ns (when only-ns
                  (or (str (get requires (symbol only-ns)))
                      only-ns))
        requires (concat
                  [[nil current-ns]
                   [nil 'cljs.core]]
                  (dedup-requires (vec requires)))
        names (set (apply concat requires))
        defs (->> requires
                  (sort-by second (partial compare-ns current-ns))
                  (mapcat #(get-matching-ns-interns % matches? only-ns))
                  ;; [qualified symbol, show text, replace text]
                  (map #(-> [% (str %) (replace-name %) (name %)]))
                  (sort-by #(get % 3) (partial compare-completion text)))]
    (vec (concat
          ;; TODO make this configurable
          (take 75 defs)
          (map
           #(-> [% (str %) (str %)])
           (filter matches? names))))))

(defn process-apropos [text]
  (if (= 0 (.indexOf text "js/"))
    (js-completion (.slice text 3))
    (cljs-completion text)
    ))

(defn get-forms [m]
  (cond
    (:forms m) (:forms m)
    (:arglists m) (let [arglists (:arglists m)]
                    (if (or (:macro m)
                            (:repl-special-function m))
                      arglists
                      (if (= 'quote (first arglists))
                        (second arglists)
                        arglists)))))

;; Copied & modified from cljs.repl/print-doc
(defn get-doc [m]
  (merge {:name (str (when-let [ns (:ns m)] (str ns "/")) (:name m))
          :type (cond
                  (:protocol m) :protocol
                  (:special-form m) :special-form
                  (:macro m) :macro
                  (:repl-special-function m) :repl-special-function
                  :else :normal)
          :forms (get-forms m)
          :doc (:doc m)}
         (if (:special-form m)
           {:please-see (if (contains? m :url)
                          (when (:url m)
                            (str "http://clojure.org/" (:url m)))
                          (str "http://clojure.org/special_forms#" (:name m)))}
           (when (:protocol m)
             {:protocol-methods (:methods m)}))))

(defn doc-from-sym [sym]
  (cond
    (docs/special-doc-map sym) (get-doc (docs/special-doc sym))
    (docs/repl-special-doc-map sym) (get-doc (docs/repl-special-doc sym))
    (ast/namespace
     @replumb.repl/st sym) (get-doc
                            (select-keys
                             (ast/namespace @replumb.repl/st sym)
                             [:name :doc]))
    :else (get-doc
           (replumb.repl/get-var
            nil
            (replumb.repl/empty-analyzer-env) sym))))

(def type-name
  {:protocol "Protocol"
   :special-form "Special Form"
   :macro "Macro"
   :repl-special-function "REPL Special Function"})

;; Copied & modified from cljs.repl/print-doc
(defn print-doc [doc]
  (println (:name doc))
  (if-not (= :normal (:type doc))
    (println (type-name (:type doc))))
  (when (:forms doc)
    (prn (:forms doc)))
  (when (:please-see doc)
    (println (str "\n  Please see " (:please-see doc))))
  (when (:doc doc)
    (println (:doc doc)))
  (when (:methods doc)
    (doseq [[name {:keys [doc arglists]}] (:methods doc)]
      (println)
      (println " " name)
      (println " " arglists)
      (when doc
        (println " " doc)))))

(defn process-doc
  "Get the documentation for a symbol. Copied & modified from replumb."
  [sym]
  (when sym
    (with-out-str
      (print-doc (doc-from-sym sym)))))
