(ns reepl.example
  (:require [cljs.js :as jsc]
            [cljs.analyzer :as ana]
            [reepl.core :as reepl]
            [reepl.helpers :as helpers]
            [devtools.core :as devtools]
            [cljs.pprint :as pprint]
            [replumb.core :as replumb]
            [reagent.core :as r]
            [quil.core :as q :include-macros true]
            [replumb.ast :as ast]
            [quil.middleware :as m]))

(defn debug [& val]
  (let [val (if (= 1 (count val))
              (first val)
              val)]
    (js/console.log val)))

(def replumb-opts
  (merge (replumb/browser-options
          ["/src/reepl" "/target/out"]
          (fn [& args]
            (debug "replumb load noop" args))
          #_io/fetch-file!)
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

;; TODO sort by position of matching
;; TODO auto-remove qualifiers that aren't necessary
;; TODO auto-replace quil.core/ w/ q/ for example
;; TODO show docs in autocomplete?
(defn process-apropos
  [text]
  (let [matches? #(< -1 (.indexOf (str %) text))
        defs (->> (ast/known-namespaces @replumb.repl/st)
                  (mapcat (fn [ns]
                            (let [ns-name (str ns)]
                              (map #(symbol ns-name (str %))
                                   (filter matches?
                                           (keys (ast/ns-publics @replumb.repl/st ns)))))))
                  sort)]
    (vec defs)))

(defn complete-word [text]
  (when (>= (count text) 2)
    (process-apropos text)))

(devtools/install!)

(swap! jsc/*loaded* conj 'quil.core)

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

(defn main-view [run-repl complete-word]
  [view :main
   [view :box
    [text :title "Rejjj"]
    [reepl/repl run-repl complete-word]]])

(r/render [main-view run-repl complete-word]
          (js/document.getElementById "container"))

(defn main []
  (js/console.log "reload!")

  (r/render [main-view run-repl complete-word]
            (js/document.getElementById "container"))
  )
