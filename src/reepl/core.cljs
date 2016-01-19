(ns reepl.core
  (:require [re-frame.core :refer [dispatch
                                   dispatch-sync
                                   subscribe]]
            [clojure.string :as str]
            [cljs.reader]
            [cljs.tools.reader]

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
   :completion-item {;; :cursor :pointer TODO make these clickable
                     :padding "3px 5px 3px"}
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
   :main-caret {:padding "8px 5px 8px 10px"
                :margin-right 0
                :flex-direction :row}

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
   "the cljs Read-eval-print-loop that really understands you.
  Type "
   [text :intro-code ":cljs/clear"]
   " to clear the history"])

(defmulti repl-item (fn [item opts] (:type item)))

(defmethod repl-item :input
  [{:keys [num text]} _]
  [view {:style [:repl-item :input-item]}
   [view {:style [:caret :input-caret]} "[" num "]>"]
   [view :input-text
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

(def canScrollIfNeeded
  (not (nil? (.scrollIntoViewIfNeeded js/document.body))))

(defn completion-item [text is-selected is-active set-active]
  (r/create-class
   {:component-did-update
    (fn [this [_ _ old-is-selected]]
      (let [[_ _ is-selected] (r/argv this)]
        (if (and (not old-is-selected)
                 is-selected)
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
                     (partial set-active %1)])
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
      (cljs.tools.reader/read-string source)
      true)
    (catch js/Error _
      false)))

;; TODO these should probably go inside code-mirror.cljs? They are really
;; coupled to CodeMirror....
(def default-cm-opts
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

   ;; TODO if the cursor is inside a list, and the function doesn't have enought
   ;; arguments yet, then return false
   ;; e.g. (map |) <- map needs at least one argument.
   :should-eval
   (fn [source inst evt]
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

(defn repl-input [state submit cm-opts]
  {:pre [(every? (comp not nil?)
                 (map cm-opts
                      [:on-up
                       :on-down
                       :complete-atom
                       :complete-word
                       :on-change]))]}
  (let [{:keys [pos count text]} @state]
    [view :input-container
     [view {:style [:input-caret :main-caret]}
      "[" (inc pos) "/" count "]>"]
     ^{:key (str (hash (:js-cm-opts cm-opts)))}
     [code-mirror/code-mirror (reaction (:text @state))
      (merge
       default-cm-opts
       {:style {:height "auto"
                :font-size 16
                :flex 1
                :padding "2px"}
        :on-eval submit}
       cm-opts)]]))

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

;; TODO is there a macro or something that could do this cleaner?
(defn make-handlers [state]
  {:add-input (partial swap! state handlers/add-input)
   :add-result (partial swap! state handlers/add-result)
   :go-up (partial swap! state handlers/go-up)
   :go-down (partial swap! state handlers/go-down)
   :clear-items (partial swap! state handlers/clear-items)
   :set-text (partial swap! state handlers/set-text)
   :add-log (partial swap! state handlers/add-log)})

(defn repl [& {:keys [execute
                      complete-word
                      get-docs
                      state
                      show-value-opts
                      js-cm-opts
                      on-cm-init]}]
  (let [state (or state (r/atom initial-state))
        {:keys
         [add-input
          add-result
          go-up
          go-down
          clear-items
          set-text
          add-log]} (make-handlers state)

        items (subs/items state)
        complete-atom (r/atom nil)
        docs (reaction
              (let [{:keys [pos list] :as state} @complete-atom]
                (when state
                  (let [sym (first (get list pos))]
                    (when (symbol? sym)
                      (get-docs sym))))))
        submit (fn [text]
                 (if (= ":cljs/clear" (.trim text))
                   (do
                     (clear-items)
                     (set-text ""))
                   (when (< 0 (count (.trim text)))
                     (set-text text)
                     (add-input text)
                     (execute text #(add-result (not %1) %2)))))]

    (set-print! add-log)

    (fn [& {:keys [execute
                   complete-word
                   get-docs
                   state
                   show-value-opts
                   js-cm-opts
                   on-cm-init]}]
      [view :container
       [repl-items @items show-value-opts]
       [repl-input
        (subs/current-text state)
        submit
        {:complete-word complete-word
         :on-up go-up
         :on-down go-down
         :complete-atom complete-atom
         :on-change set-text
         :js-cm-opts js-cm-opts
         :on-cm-init on-cm-init
         }]
       [completion-list
        @complete-atom
        ;; TODO this should also replace the text....
        identity
        #_(swap! complete-atom assoc :pos % :active true)]
       [docs-view
        @docs]])))
