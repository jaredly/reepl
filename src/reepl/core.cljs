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

   :intro-message {:padding "10px 20px"
                   :line-height 1.5
                   :border-bottom "1px solid #aaa"
                   :flex-direction :row
                   :margin-bottom 10}
   :intro-code {:background-color "#eee"
                :padding "0 5px"}

   :completion-container {:position :relative
                          :font-size 12}
   :completion-list {:flex-direction :row
                     :overflow :hidden
                     :height 20}
   :completion-empty {:color "#ccc"
                      ;;:font-weight :bold
                      :padding "3px 10px"}

   :completion-show-all {:position :absolute
                         :top 0
                         :left 0
                         :right 0
                         :z-index 1000
                         :flex-direction :row
                         :background-color "#eef"
                         :flex-wrap :wrap}
   :completion-item {:padding "3px 5px 3px"}
   :completion-selected {:background-color "#eee"}
   :completion-active {:background-color "#aaa"}

   :docs {:height 200
          :overflow :auto
          :padding "5px 10px"
          }
   :docs-empty {:color "#ccc"
                :padding "5px 10px"}

   :repl-items {:flex 1
                :overflow :auto
                :height 500
                :flex-shrink 1
                }
   :repl-item {:flex-direction :row
               :padding "3px 5px"}

   :input-container {:flex-direction :row
                     :border-top "2px solid #eee"
                     :border-bottom "2px solid #eee"
                     }
   :main-caret {:padding "8px 10px"}

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
           }
   :input-caret {:color "#55f"}
   :input-text {:flex 1
                :word-wrap :break-word}
   :output-caret {}
   :output-value {:flex 1
                  :word-wrap :break-word}
   :repl-input {:padding "5px 10px"
                :font-family "monospace"
                :font-size "1.3em"
                :border-bottom "1px solid #aaa"}
   :clear-button {}
   })

(def view (partial helpers/view styles))
(def text (partial helpers/text styles))
(def button (partial helpers/button styles))

(def intro-message
  [text :intro-message
   [text {:style {:font-weight :bold
                  :font-size "1.2em"}}
    "Reepl: "]
   "the Read-eval-print-loop that really understands you.
  Type "
   [text :intro-code ":cljs/clear"]
   " to clear the history"])

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
       ;; TODO also show stack?
       [text :underlying-error (.-message underlying)])
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
       [view :repl-items
        intro-message]
       (map repl-item items)))}))

(def canScrollIfNeeded
  (not (nil? (.scrollIntoViewIfNeeded js/document.body))))

(defn completion-item [text is-selected is-active set-active]
  (r/create-class
   {:component-did-update
    (fn [this [_ _ old-is-selected]]
      (let [[_ _ is-selected] (r/argv this)]
        (if (and (not old-is-selected)
                 is-selected)
          ;; (js/console.log "selecting" text is-selected old-is-selected)
          (if canScrollIfNeeded
            (.scrollIntoViewIfNeeded (r/dom-node this) false)
            (.scrollIntoView (r/dom-node this))))))
    :reagent-render
    (fn [text is-selected is-active set-active]
      [view {:on-click set-active
             :style [:completion-item
                     (and is-selected
                          (if is-active
                            :completion-active
                            :completion-selected))]}
       text])}))

(defn completion-list [{:keys [pos list active show-all]} set-active]
  (let [items (map-indexed
               #(-> [completion-item
                     (get %2 2)
                     (= %1 pos)
                     active
                     (partial set-active pos)])
               list)
        ]
    [view :completion-container
     (if show-all
       (into [view :completion-show-all] items))
     (if (empty? items)
       [view :completion-empty "This is where completions show up"]
       (into
        [view :completion-list]
        items))
     ]))

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
  [view :input-container
   [view {:style [:main-caret :input-caret]} ">"]
   [code-mirror/code-mirror text
   (merge
    cm-options
    {:style {:height "auto"
             :font-size 16
             :flex 1
             :padding "2px"}
     :on-change set-text
     :complete-word complete-word
     :complete-atom complete-atom
     :on-eval submit
     :on-up go-up
     :on-down go-down})]])

(defn docs-view [docs]
  [view :docs
   (or docs [view :docs-empty "This is where docs show up"])])

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
                 (if (= ":cljs/clear" (.trim text))
                   (do
                     (clear-items)
                     (set-text ""))
                   (when (< 0 (count (.trim text)))
                     (add-input text)
                     (execute text #(add-result (not %1) %2)))))]

    (set-print! add-log)

    (fn []
      [view :container
       [repl-items @items]
       [repl-input
        (subs/current-text state)
        submit complete-word
        {:go-up go-up
         :go-down go-down
         :complete-atom complete-atom
         :set-text set-text}]
       [completion-list
        @complete-atom
        ;; TODO this should also replace the text....
        #(swap! complete-atom assoc :pos %)]
       [docs-view
        @docs]])))

#_(defn repl
  ([execute complete-word get-docs]
   (repl-view execute completion-list get-docs (r/atom initial-state)))
  ([execute complete-word get-docs state]
   (repl-view execute complete-word get-docs state)))
