(ns reepl.example
  (:require [cljs.js :as jsc]
            [cljs.analyzer :as ana]
            [reepl.core :as reepl]
            [reepl.helpers :as helpers]
            [devtools.core :as devtools]
            [cljs.pprint :as pprint]
            [reagent.core :as r]
            [quil.core :as q :include-macros true]

            [replumb.core :as replumb]
            [replumb.repl]
            [replumb.ast :as ast]
            [replumb.doc-maps :as docs]
            [cljs.repl :as repl]

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

(defn main-view [run-repl complete-word get-docs]
  [view :main
   [view :box
    [reepl/repl run-repl complete-word get-docs]]])

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
          fetch-file!)
         ;; TODO figure out file loading
         {:warning-as-error true ;:verbose true
          :no-pr-str-on-value true
          }))

(defn run-repl [text cb]
  (replumb/read-eval-call replumb-opts
                          #(cb
                            (replumb/success? %)
                            (replumb/unwrap-result %))
                          text))

(defn compare-completion [starts-with a b]
  (let [a-starts (not (nil? (.match a starts-with)))
        b-starts (not (nil? (.match b starts-with)))]
    (cond
      (and a-starts b-starts) (compare a b)
      a-starts -1
      b-starts 1
      :default (compare a b))))

(defn compare-ns [ns1 ns2]
  (cond
    (= ns1 'cljs.core) -1
    (= ns2 'cljs.core) 1
    :default (compare ns1 ns2)))

;; TODO auto-replace quil.core/ w/ q/ for example
;; TODO fuzzy-match if there are no normal matches
(defn process-apropos
  [text]
  (let [matches? #(and
                   (= -1 (.indexOf (str %) "t_cljs$core"))
                   (< -1 (.indexOf (str %) text)))
        starts-with (str "/" text)
        current-ns (str (replumb.repl/current-ns))
        replace-name (fn [sym]
                       (if (or
                            (= (namespace sym) "cljs.core")
                            (= (namespace sym) current-ns))
                         (name sym)
                         (str sym)))
        defs (->> (ast/known-namespaces @replumb.repl/st)
                  (sort-by identity compare-ns)
                  (mapcat (fn [ns]
                            (let [ns-name (str ns)]
                              (map #(symbol ns-name (str %))
                                   (filter matches?
                                           (keys (ast/ns-publics @replumb.repl/st ns)))))))
                  ;; [qualified symbol, show text, replace text]
                  (map #(-> [% (str %) (replace-name %)]))
                  (sort-by second (partial compare-completion starts-with)))]
    (vec (take 50 defs))))

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

;; (swap! jsc/*loaded* conj 'quil.core)

(defn complete-word [text]
  (when (>= (count text) 1)
    (process-apropos text)))

(defn main []
  (js/console.log "reload!")

  (r/render [main-view run-repl complete-word process-doc]
            (js/document.getElementById "container")))

(main)
