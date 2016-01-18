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

            [replumb.core :as replumb]
            [replumb.repl]
            [replumb.ast :as ast]
            [replumb.doc-maps :as docs]
            [cljs.repl :as repl]
            [parinfer-codemirror.editor :as parinfer]
            [parinfer.codemirror.mode.clojure.clojure-parinfer]

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

(defn run-repl [text cb]
  (replumb/read-eval-call
   replumb-opts
   #(cb
     (replumb/success? %)
     (replumb/unwrap-result %))
   (if-not (= -1 (.indexOf text "\n"))
     ;; For multiline inputs, wrap in a `do` in case.
     (str "(do " text ")")
     text)))

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

;; TODO fuzzy-match if there are no normal matches
(defn process-apropos
  "Tab completion. Copied w/ extensive modifications from replumb."
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

(defn process-doc
  "Get the documentation for a symbol. Copied & modified from replumb."
  [sym]
  (when sym
    (with-out-str
      (cond
        (docs/special-doc-map sym) (repl/print-doc (docs/special-doc sym))
        (docs/repl-special-doc-map sym) (repl/print-doc (docs/repl-special-doc sym))
        (ast/namespace @replumb.repl/st sym)
        (repl/print-doc
         (select-keys
          (ast/namespace @replumb.repl/st sym)
          [:name :doc]))
        :else (repl/print-doc
               (replumb.repl/get-var
                nil
                (replumb.repl/empty-analyzer-env) sym))))))
