(ns reepl.core
  (:require [re-frame.core :refer [dispatch
                                   dispatch-sync
                                   subscribe]]
            [clojure.string :as str]
            [cljs.reader]

            [reagent.core :as r]
            [reepl.code-mirror :as code-mirror]
            [reepl.show-value :refer [show-value]]

            [reepl.handlers :as handlers]
            [reepl.subs :as subs]
            [reepl.helpers :as helpers]
            )
  (:require-macros
   [reagent.ratom :refer [reaction]]))

(def styles
  {:container {:font-family "monospace"
               :flex 1
               :background-color "white"
               :display :flex
               :white-space "pre-wrap"}
   :docs {:height 200
          :overflow :auto
          }
   :repl-items {:flex 1
                :overflow :auto
                :height 500
                :flex-shrink 1
                }
   :repl-item {:flex-direction :row
               :padding "3px 5px"}
   :input-item {}
   :output-item {}
   :error-item {:color :red
                :padding "5px 10px"}
   :caret {:color "#aaa"
           :font-weight "bold"
           :margin-right 5
           :margin-left 5
           :font-size 11
           :padding-top 2
           }
   :input-caret {:color "#555"}
   :input-text {:flex 1
                :word-wrap :break-word}
   :output-caret {}
   :output-value {:flex 1
                  :word-wrap :break-word}
   :repl-input {:padding "5px 10px"
                :font-family "monospace"
                :font-size "1.3em"}
   :clear-button {}
   })

(def view (partial helpers/view styles))
(def text (partial helpers/text styles))
(def button (partial helpers/button styles))

(defmulti repl-item :type)

(defmethod repl-item :input
  [{:keys [text]}]
  [view {:style [:repl-item :input-item]}
   [view {:style [:caret :input-caret]} ">"]
   [view :input-text text]])

(defmethod repl-item :log
  [{:keys [value]}]
  [view {:style [:repl-item :log-item]}
   [show-value value nil]])

(defmethod repl-item :error
  [{:keys [value]}]
  (let [message (.-message value)
        underlying (.-cause value)]
    [view {:style [:repl-item :output-item :error-item]}
     message
     (when underlying
       (.-message underlying)) ; TODO also show stack?
     ]))

(defmethod repl-item :output
  [{:keys [value]}]
  [view {:style [:repl-item :output-item]}
   [view {:style [:caret :output-caret]} "<"]
   [view :output-value [show-value value nil]]])

(defn repl-items [_]
  (r/create-class
   {:component-did-update
    (fn [this]
      (let [el (r/dom-node this)]
        (set! (.-scrollTop el) (.-scrollHeight el))))
    :reagent-render
    (fn [items]
      (into
       [view :repl-items]
       (map repl-item items)))}))

(defn is-valid-cljs? [source]
  (try
    (do
      (cljs.reader/read-string source)
      true)
    (catch js/Error _
      false)))

(def cm-options
  {:should-go-up
   (fn [source inst]
     (let [pos (.getCursor inst)]
       (= 0 (.-line pos)))
     )

   :should-go-down
   (fn [source inst]
     (let [pos (.getCursor inst)
           last-line (.lastLine inst)]
       (= last-line (.-line pos))))

   :should-eval
   (fn [source inst evt] ; todo check syntax, cursor position
     (if (.-shiftKey evt)
       false
       (if (.-metaKey evt)
         true
         (let [lines (.lineCount inst)
               in-place (or (= 1 lines)
                            (let [pos (.getCursor inst)
                                  last-line (dec lines)]
                              (and
                               (= last-line (.-line pos))
                               (= (.-ch pos)
                                  (count (.getLine inst last-line))))))]
           (and in-place
                (is-valid-cljs? source))))))
   })

(defn repl-input [text submit complete-word {:keys [go-up go-down complete-atom set-text]}]
  [code-mirror/code-mirror text
   (merge
    cm-options
    {:style {:height "auto"
             :border-top "2px solid #eee"
             :font-size 16
             :padding "2px"}
     :on-change set-text
     :complete-word complete-word
     :complete-atom complete-atom
     :on-eval submit
     :on-up go-up
     :on-down go-down})])

(defn set-print! [log]
  (set! cljs.core/*print-newline* false)
  (set! cljs.core/*print-err-fn*
        (fn [& args]
          (if (= 1 (count args))
            (log (first args))
            (log args))))
  (set! cljs.core/*print-fn*
        (fn [& args]
          (if (= 1 (count args))
            (log (first args))
            (log args)))))

(def initial-state
  {:items []
   :hist-pos 0
   :history ["{:a 2 {:b 3} 4}"]})

(defn repl [execute complete-word get-docs]
  (let [state (r/atom initial-state)

        add-input (partial swap! state handlers/add-input)
        add-result (partial swap! state handlers/add-result)
        go-up (partial swap! state handlers/go-up)
        go-down (partial swap! state handlers/go-down)
        clear-items (partial swap! state handlers/clear-items)
        set-text (partial swap! state handlers/set-text)
        add-log (partial swap! state handlers/add-log)

        items (subs/items state)
        complete-atom (r/atom nil)
        docs (reaction
              (let [{:keys [pos list] :as state} @complete-atom]
                (when state
                  (get-docs (first (get list pos))))))
        submit (fn [text]
                 (when (< 0 (count (.trim text)))
                   (add-input text)
                   (execute text #(add-result (not %1) %2))))]

    (set-print! add-log)

    (fn []
      [view :container
       [button {:on-click clear-items
                :style :clear-button}
        "Clear"]
       [repl-items @items]
       [repl-input
        (subs/current-text state)
        submit complete-word
        {:go-up go-up
         :go-down go-down
         :complete-atom complete-atom
         :set-text set-text}]
       [view
        :docs
        "completions"
        (pr-str @complete-atom)
        "dpcs here"
        @docs]])))
