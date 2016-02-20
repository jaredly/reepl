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
            [reepl.repl-items :refer [repl-items]]
            [reepl.completions :refer [completion-list]]

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
          :padding "5px 10px"}
   :docs-empty {:color "#ccc"
                :padding "5px 10px"}

   :input-container {:flex-direction :row
                     :border-top "2px solid #eee"
                     :border-bottom "2px solid #eee"}
   :main-caret {:padding "8px 5px 8px 10px"
                :margin-right 0
                :flex-direction :row}

   :input-caret {:color "#55f"
                 :margin-right 10}
   })

(def view (partial helpers/view styles))
(def text (partial helpers/text styles))
(def button (partial helpers/button styles))

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
                       :complete-cmd
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

(defn repl-hint
  "Get a new completion state."
  [complete-word {:keys [start end text]} options]
  (let [words (when (not (empty? text))
                (vec (complete-word text)))]
    (when-not (empty? words)
      {:list words
       :num (count words)
       :active (= (get (first words) 2) text)
       :show-all false
       :initial-text text
       :pos 0
       :from start
       :to end})))

(defn cycle-pos
  "Cycle through positions. Returns [active? new-pos].

  count
    total number of completions
  current
    current position
  go-back?
    should we be going in reverse
  initial-active
    if false, then we return not-active when wrapping around"
  [count current go-back? initial-active]
  (if go-back?
    (if (>= 0 current)
      (if initial-active
        [true (dec count)]
        [false 0])
      [true (dec current)])
    (if (>= current (dec count))
      (if initial-active
        [true 0]
        [false 0])
      [true (inc current)])))

(defn cycle-completions
  "Cycle through completions, changing the codemirror text accordingly. Returns
  a new state map.

  state
    the current completion state
  go-back?
    whether to cycle in reverse (generally b/c shift is pressed)
  cm
    the codemirror instance
  evt
    the triggering event. it will be `.preventDefault'd if there are completions
    to cycle through."
  [{:keys [num pos active from to list initial-text] :as state}
   go-back? cm evt]
  (when (and state (or (< 1 (count list))
                       (and (< 0 (count list))
                            (not (= initial-text (get (first list) 2))))))
    (.preventDefault evt)
    (let [initial-active (= initial-text (get (first list) 2))
          [active pos] (if active
                         (cycle-pos num pos go-back? initial-active)
                         [true (if go-back? (dec num) pos)])
          text (if active
                 (get (get list pos) 2)
                 initial-text)]
      ;; TODO don't replaceRange here, instead watch the state atom and react to
      ;; that.
      (.replaceRange cm text from to)
      (assoc state
             :pos pos
             :active active
             :to #js {:line (.-line from)
                      :ch (+ (count text)
                             (.-ch from))}))))

;; TODO is there a macro or something that could do this cleaner?
(defn make-handlers [state]
  {:add-input (partial swap! state handlers/add-input)
   :add-result (partial swap! state handlers/add-result)
   :go-up (partial swap! state handlers/go-up)
   :go-down (partial swap! state handlers/go-down)
   :clear-items (partial swap! state handlers/clear-items)
   :set-text (partial swap! state handlers/set-text)
   :add-log (partial swap! state handlers/add-log)})

(defn make-complete-cmd [complete-word complete-atom]
  {:clear #(reset! complete-atom nil)
   :stop-show-all #(swap! complete-atom assoc :show-all false)
   :show-all #(swap! complete-atom assoc :show-all true)
   :set #(reset! complete-atom (repl-hint complete-word % nil))
   :cycle #(swap! complete-atom cycle-completions %1 %2 %3)})

(defn repl [& {:keys [execute
                      complete-word
                      get-docs
                      state
                      complete-atom
                      show-value-opts
                      js-cm-opts
                      on-cm-init]}]
  (let [state (or state (r/atom initial-state))
        complete-atom (or complete-atom (r/atom nil))

        {:keys
         [add-input add-result
          go-up go-down clear-items
          set-text add-log]} (make-handlers state)

        items (subs/items state)

        complete-cmd (make-complete-cmd complete-word complete-atom)

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
                   get-docs
                   state
                   show-value-opts
                   js-cm-opts
                   on-cm-init]}]
      [view :container
       [repl-items @items (assoc show-value-opts
                                 :set-text set-text)]
       [repl-input
        (subs/current-text state)
        submit
        {;; :complete-word complete-word
         :on-up go-up
         :on-down go-down
         :complete-cmd complete-cmd
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
