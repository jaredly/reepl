(ns reepl.example
  (:require [cljs.js :as jsc]
            ;; [cljs.analyzer :as ana]
            [reepl.core :as reepl]
            [reepl.helpers :as helpers]
            [reagent.core :as r]

            [reepl.replumb :as replumb]
            [reepl.show-function :as show-function]
            [reepl.show-devtools :as show-devtools]

            [parinfer-codemirror.editor :as parinfer]
            [parinfer.codemirror.mode.clojure.clojure-parinfer]
            [devtools.core :as devtools]

            ;; Libs I want to be available to the repl
            [cljs.tools.reader]
            [quil.core :as q :include-macros true])
  (:import goog.net.XhrIo))

;; Used to make the repl reload-tolerant
(defonce repl-state
  (r/atom reepl/initial-state))

(def styles
  {:main {:justify-content :center
          :align-items :center
          :align-self :stretch
          :flex 1}
   :box {:width 700
         :margin-top 100
         :margin-bottom 100
         :border-radius 5
         :background-color "white"
         :flex 1}})

(def view (partial helpers/view styles))

(defn maybe-fn-docs [fn]
  (let [doc (replumb/doc-from-sym fn)]
    (when (:forms doc)
      (with-out-str
        (replumb/print-doc doc)))))

(defn main-view []
  [view :main
   [view :box
    [reepl/repl
     :execute replumb/run-repl
     :complete-word replumb/process-apropos
     :get-docs replumb/process-doc
     :state repl-state
     ;; TODO change name
     :show-value-opts
     {:showers [show-devtools/show-devtools
                (partial show-function/show-fn-with-docs maybe-fn-docs)]}
     :js-cm-opts {:mode "clojure"
                  :keyMap "vim"
                  :showCursorWhenSelecting true}
     :on-cm-init #(parinfer/parinferize! % :repl-infer :indent-mode)]]])

(defn main []
  (js/console.log "reload!")
  (r/render [main-view] (js/document.getElementById "container")))

(devtools/install!)

(swap! jsc/*loaded* conj
       'quil.core
       'reepl.core
       'reepl.show-value
       'reepl.show-value
       'clojure.string
       'cljs.reader
       'cljs.tools.reader)

(replumb/run-repl "(require '[quil.core :as q])" identity)
(replumb/run-repl "(require '[clojure.string :as str])" identity)
(replumb/run-repl "(require '[reepl.core :as reepl])" identity)
(replumb/run-repl "(require '[reepl.show-value])" identity)
(replumb/run-repl "(require '[cljs.reader])" identity)
(replumb/run-repl "(require '[cljs.tools.reader])" identity)

(main)

(defonce -initing
  (parinfer/start-editor-sync!))
