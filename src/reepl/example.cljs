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

(def default-settings
  {:vim false
   :parinfer true})

(defn get-settings []
  (let [val js/localStorage.reeplSettings]
    (if-not val
      default-settings
      (try
        (js->clj (js/JSON.parse val))
        (catch js/Error _
          default-settings)))))

(defn save-settings [settings]
  (let [str (js/JSON.stringify (clj->js settings))]
    (aset js/localStorage "reeplSettings" str)))

(defonce
  settings (r/atom (get-settings)))

(def pi-count (atom 0))

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
     :js-cm-opts {:mode (if (:parinfer @settings)
                          "clojure-parinfer"
                          "clojure")
                  :keyMap (if (:vim @settings) "vim" "default")
                  :showCursorWhenSelecting true}
     :on-cm-init #(when (:parinfer @settings)
                    (parinfer/parinferize! % (swap! pi-count inc)
                                           :indent-mode (.getValue %)))]
    [view :bottom
     [:label
      (:label styles)
      [:input {
               :type "checkbox"
               :checked (:vim @settings)
               :on-change #(swap! settings update :vim not)
               }]
      "Vim"]
     [:label
      (:label styles)
      [:input {:checked (:parinfer @settings)
               :type "checkbox"
               :on-change #(swap! settings update :parinfer not)
               }]
      "Parinfer"]
     ]]])

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

;; :((( why doesn't parinfer support reloading??
(defonce -initing
  (parinfer/start-editor-sync!))
