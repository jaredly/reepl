(ns reepl.example
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
            [reepl.parinferize :as parinferize]
            [parinfer.codemirror.mode.clojure.clojure-parinfer]

            [quil.middleware :as m])
  (:import goog.net.XhrIo))

(def styles
  {
   :main {:justify-content :center
          :align-items :center
          :align-self :stretch
          :flex 1
          }
   :box {:width 700
         :margin-top 100
         :margin-bottom 100
         :border-radius 5
         :background-color "white"
         :flex 1
         }
   :title {
           :text-align :center
           :color :white
           :font-size "2em"
           :padding 10
           }
   })

(def view (partial helpers/view styles))
(def text (partial helpers/text styles))
(def button (partial helpers/button styles))

;; Used to make the repl reload-tolerant
(defonce state
  (r/atom reepl/initial-state))

(defn main-view [run-repl complete-word get-docs]
  [view :main
   [view :box
    [reepl/repl
     :execute run-repl
     :complete-word complete-word
     :get-docs get-docs
     :state state
     :js-cm-opts {:mode "clojure-parinfer"
                  :keyMap "vim"
                  :showCursorWhenSelecting true
                  }
     :on-cm-init #(parinferize/parinferize! % :repl-infer :indent-mode)
     ]]])

(defn debug [& val]
  (let [val (if (= 1 (count val))
              (first val)
              val)]
    (js/console.log val)))

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
          #_(fn [& a]
            nil)
          fetch-file!
          )
         ;; TODO figure out file loading
         {:warning-as-error true ;:verbose true
          :no-pr-str-on-value true
          }))

(defn run-repl [text cb]
  (replumb/read-eval-call replumb-opts
                          #(cb
                            (replumb/success? %)
                            (replumb/unwrap-result %))
                          (if-not (= -1 (.indexOf text "\n"))
                            (str "(do " text ")")
                            text)
                          ))

(defn compare-completion [text a b]
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

(defn compare-ns [current ns1 ns2]
  (cond
    (= ns1 current) -1
    (= ns2 current) 1
    (= ns1 'cljs.core) -1
    (= ns2 'cljs.core) 1
    :default (compare ns1 ns2)))

(defn get-from-js-ns [ns]
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

;; TODO fuzzy-match if there are no normal matches
(defn process-apropos
  [text]
  (let [[only-ns text] (if-not (= -1 (.indexOf text "/"))
                         (.split text "/")
                         [nil text])
        matches? #(and
                   ;; TODO find out what these t_cljs$core things are... seem to be nil
                   (= -1 (.indexOf (str %) "t_cljs$core"))
                   (< -1 (.indexOf (str %) text)))
        current-ns (replumb.repl/current-ns)
        starts-with (str "/" text)
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
                  (mapcat (fn [[name ns]]
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
                                           publics)))))))
                  ;; [qualified symbol, show text, replace text]
                  (map #(-> [% (str %) (replace-name %) (name %)]))
                  (sort-by #(get % 3) (partial compare-completion text)))]
    (vec (concat
          (take 50 defs)
          (map
           #(-> [% (str %) (str %)])
           (filter matches? names))))))

(defn process-doc
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

(devtools/install!)

(swap! jsc/*loaded* conj 'quil.core)
(swap! jsc/*loaded* conj 'reepl.core)
(swap! jsc/*loaded* conj 'reepl.show-value)
(swap! jsc/*loaded* conj 'reepl.show-value)
(swap! jsc/*loaded* conj 'clojure.string)
(swap! jsc/*loaded* conj 'cljs.reader)
(swap! jsc/*loaded* conj 'cljs.tools.reader)

(defn complete-word [text]
  (when (>= (count text) 1)
    (process-apropos text)))

(defn main []
  (js/console.log "reload!")

  (r/render [main-view run-repl complete-word process-doc]
            (js/document.getElementById "container")))

(run-repl "(require '[quil.core :as q])" identity)
(run-repl "(require '[clojure.string :as str])" identity)
(run-repl "(require '[reepl.core :as reepl])" identity)
(run-repl "(require '[reepl.show-value])" identity)
(run-repl "(require '[cljs.reader])" identity)
(run-repl "(require '[cljs.tools.reader])" identity)

(main)
(defonce -initing
  (parinferize/start-editor-sync!))
