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
            )
  (:import goog.net.XhrIo))

;; Used to make the repl reload-tolerant
(defonce repl-state
  (r/atom reepl/initial-state))

(def styles
  {:main {:justify-content :center
          :align-items :center
          :align-self :stretch
          :margin-top 100
          :margin-bottom 100
          :flex 1}
   :box {:width 700
         :border-radius 5
         :background-color "white"
         :flex 1}
   :bottom {:flex-direction :row
            :align-items :center
            :color "#ddd"}
   :label {:margin "10px 5px"
           :display :flex
           :flex-direction :row
           :align-items :center
           :font-size ".8em"
           :cursor :pointer
           }
   :checkbox {:margin-right 5}
   :link {:color "#aaa"
          :text-decoration :none
          :margin "0 20px"}
   })

(def view (partial helpers/view styles))

(defn maybe-fn-docs [fn]
  (let [doc (replumb/doc-from-sym fn)]
    (when (:forms doc)
      (with-out-str
        (replumb/print-doc doc)))))

(def default-settings
  {:vim false
   :warning-as-error true
   :parinfer true})

(defn get-settings []
  (let [val js/localStorage.reeplSettings]
    (if-not val
      default-settings
      (try
        (merge default-settings
               (js->clj (js/JSON.parse val) :keywordize-keys true))
        (catch js/Error _
          default-settings)))))

(defn save-settings [settings]
  (let [str (js/JSON.stringify (clj->js settings))]
    (aset js/localStorage "reeplSettings" str)))

(defonce
  settings (r/atom (get-settings)))

(add-watch settings :settings #(save-settings %4))

(def pi-count (atom 0))

(def my-st (jsc/empty-state))

(defn jsc-run [source cb]
  (jsc/eval-str my-st
                source
                'stuff
                {:eval jsc/js-eval
                 :ns 'cljs.user
                 :context :statement
                 :def-emits-var true
                 }
                (fn [result]
                  (if (contains? result :error)
                    (cb false (:error result))
                    (cb true (:value result))))))

(defn main-view []
  [view :main
   [view :box
    [reepl/repl
     :execute #(replumb/run-repl %1 {:warning-as-error (:warning-as-error @settings)} %2)
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
    ]
   [view :bottom
    [:label
     {:style (:label styles)}
     [:input {
              :type "checkbox"
              :checked (:vim @settings)
              :style (:checkbox styles)
              :on-change #(swap! settings update :vim not)
              }]
     "Vim"]
    [:label
     {:style (:label styles)}
     [:input {:checked (:parinfer @settings)
              :type "checkbox"
              :style (:checkbox styles)
              :on-change #(swap! settings update :parinfer not)
              }]
     "Parinfer"]
    [:label
     {:style (:label styles)}
     [:input {:checked (:warning-as-error @settings)
              :type "checkbox"
              :style (:checkbox styles)
              :on-change #(swap! settings update :warning-as-error not)
              }]
     "Warning as error"]
    [:a
     {:href "https://github.com/jaredly/reepl"
      :target :_blank
      :style (:link styles)}
     "Github"]
    ]])

(defn main []
  (js/console.log "reload!")
  (r/render [main-view] (js/document.getElementById "container")))

(devtools/install!)

(swap! jsc/*loaded* conj
       'reepl.core
       'reepl.show-value
       'reepl.show-value
       'clojure.string
       'cljs.reader
       'cljs.tools.reader)

;; (replumb/run-repl "(require '[quil.core :as q])" identity)
(replumb/run-repl "(require '[clojure.string :as str])" identity)
(replumb/run-repl "(require '[reepl.core :as reepl])" identity)
(replumb/run-repl "(require '[reepl.show-value])" identity)
(replumb/run-repl "(require '[cljs.reader])" identity)
(replumb/run-repl "(require '[cljs.tools.reader])" identity)

(main)

;; :((( why doesn't parinfer support reloading??
(defonce -initing
  (parinfer/start-editor-sync!))
