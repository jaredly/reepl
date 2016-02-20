(ns reepl.repl-items
  (:require [re-frame.core :refer [dispatch
                                   dispatch-sync
                                   subscribe]]
            [clojure.string :as str]
            [cljs.reader]
            [cljs.tools.reader]

            [reagent.core :as r]
            [reepl.show-value :refer [show-value]]
            [reepl.code-mirror :as code-mirror]

            [reepl.helpers :as helpers]
            )
  (:require-macros
   [reagent.ratom :refer [reaction]]))

(def styles
  {:repl-items {:flex 1
                :overflow :auto
                :flex-basis 0
                :flex-shrink 1}
   :repl-item {:flex-direction :row
               :padding "3px 5px"}

   :intro-message {:padding "10px 20px"
                   :line-height 1.5
                   :border-bottom "1px solid #aaa"
                   :flex-direction :row
                   :margin-bottom 10}

   :input-item {}
   :output-item {}
   :error-item {:color :red
                :padding "5px 10px"}
   :underlying-error {:margin-left 10}
   :caret {:color "#aaf"
           :font-weight "bold"
           :margin-right 5
           :margin-left 5
           :font-size 11
           :padding-top 2
           :flex-direction :row
           }
   :input-caret {:color "#55f"
                 :margin-right 10}
   :input-text {:flex 1
                :cursor :pointer
                :word-wrap :break-word}
   :output-caret {}
   :output-value {:flex 1
                  :word-wrap :break-word}
   })

(def view (partial helpers/view styles))
(def text (partial helpers/text styles))
(def button (partial helpers/button styles))

(defmulti repl-item (fn [item opts] (:type item)))

(defmethod repl-item :input
  [{:keys [num text]} opts]
  [view {:style [:repl-item :input-item]}
   [view {:style [:caret :input-caret]} "[" num "]>"]
   [view {:style :input-text
          :on-click (partial (:set-text opts) text)}
    [code-mirror/colored-text text]]])

(defmethod repl-item :log
  [{:keys [value]} opts]
  [view {:style [:repl-item :log-item]}
   [show-value value nil opts]])

(defmethod repl-item :error
  [{:keys [value]} opts]
  (let [message (.-message value)
        underlying (.-cause value)]
    [view {:style [:repl-item :output-item :error-item]}
     message
     (when underlying
       ;; TODO also show stack?
       [text :underlying-error (.-message underlying)])
     ]))

(defmethod repl-item :output
  [{:keys [value]} opts]
  [view {:style [:repl-item :output-item]}
   [view {:style [:caret :output-caret]} "<"]
   [view :output-value [show-value value nil opts]]])

(def intro-message
  [text :intro-message
   [text {:style {:font-weight :bold
                  :font-size "1.2em"}}
    "Reepl: "]
   "the cljs Read-eval-print-loop that really understands you.
  Type "
   [text :intro-code ":cljs/clear"]
   " to clear the history"])

(defn repl-items [_]
  (r/create-class
   {:component-did-update
    (fn [this]
      (let [el (r/dom-node this)]
        (set! (.-scrollTop el) (.-scrollHeight el))))
    :reagent-render
    (fn [items opts]
      (into
       [view :repl-items
        intro-message]
       (map #(repl-item % opts) items)))}))
