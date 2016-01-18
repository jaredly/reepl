(ns reepl.code-mirror
  (:require [clojure.string :as str]
            [reagent.core :as r]
            [cljsjs.codemirror]
            [cljsjs.codemirror.addon.edit.closebrackets]
            [cljsjs.codemirror.addon.edit.matchbrackets]
            [cljsjs.codemirror.addon.hint.show-hint]
            [cljsjs.codemirror.addon.runmode.runmode]
            [cljsjs.codemirror.addon.runmode.colorize]
            [cljsjs.codemirror.mode.clojure]
            [cljsjs.codemirror.mode.javascript]
            [cljsjs.codemirror.keymap.vim]
            [cljs.pprint :as pprint]))


(defn cm-current-word [cm]
  (let [pos (.getCursor cm)
        back #js {:line (.-line pos)
                  :ch (dec (.-ch pos))}]
    (.findWordAt cm back)))

(defn repl-hint [complete-word cm options]
  (let [range (cm-current-word cm)
        text (.getRange cm
                        (.-anchor range)
                        (.-head range))
        words (vec (complete-word text))]
    (when-not (empty? words)
      {:list words
       :num (count words)
       :active (= (get (first words) 2) text)
       :show-all false
       :initial-text text
       :pos 0
       :from (.-anchor range)
       :to (.-head range)})))

(js/CodeMirror.registerHelper
 "wordChars"
 "clojure"
 #"[^\s\(\)\[\]\{\},`']")

(defn enable-auto-complete [cm complete-word]
  (def thecm cm)
  (.on cm "keyup"
       (fn [cm evt]
         (when (not (or
                     (.-state.completionActive cm)
                     (#{13 27 32} (.-keyCode evt))))
           (.showHint cm #js {:hint (partial repl-hint
                                             complete-word)
                              :completeSingle false})
           ))))

(defn cycle-pos [count current go-back? initial-active]
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

(defn cycle-completions [{:keys [num pos active from to list initial-text] :as state}
                         go-back?
                         cm
                         evt
                         ]
  (when (and state (< 1 (count list)))
    (.preventDefault evt)
    (let [initial-active (= initial-text (get (first list) 2))
          [active pos] (if active
                         (cycle-pos num pos go-back? initial-active)
                         [true (if go-back? (dec num) pos)])
          text (if active
                 (get (get list pos) 2)
                 initial-text)]
      (.replaceRange cm text from to)
      (assoc state
             :pos pos
             :active active
             :to #js {:line (.-line from)
                      :ch (+ (count text)
                             (.-ch from))}))))

(defn code-mirror
  [value-atom {:keys [style
                      on-change
                      on-eval
                      on-up
                      on-down
                      complete-atom
                      complete-word
                      should-go-up
                      should-go-down
                      should-eval
                      js-cm-opts
                      on-cm-init]}]

  (let [cm (atom nil)]
    (r/create-class
     {:component-did-mount
      (fn [this]
        (let [el (r/dom-node this)
              ;; On Escape, should we revert to the pre-completion-text?
              cancel-keys #{13 27}
              cmp-ignore #{9 16 17 18 91 93}
              cmp-show #{17 18 91 93}
              inst (js/CodeMirror.
                    el
                    (clj->js
                     (merge
                      {:lineNumbers false
                       :viewportMargin js/Infinity
                       :matchBrackets true
                       :autofocus true
                       :extraKeys #js {"Shift-Enter" "newlineAndIndent"}
                       :value @value-atom
                       :autoCloseBrackets true
                       :mode "clojure"}
                      js-cm-opts)))]

          ;; (enable-auto-complete inst complete-word)
          (reset! cm inst)
          (.on inst "change"
               (fn []
                 (let [value (.getValue inst)]
                   (when-not (= value @value-atom)
                     (on-change value)))))

          (.on inst "keyup"
               (fn [inst evt]
                 (if (cancel-keys (.-keyCode evt))
                   (reset! complete-atom nil)
                   (if (cmp-show (.-keyCode evt))
                     (swap! complete-atom assoc :show-all false)
                     (when-not (cmp-ignore (.-keyCode evt))
                       (reset! complete-atom (repl-hint complete-word inst nil))
                       )))
                 ))

          (.on inst "keydown"
               (fn [inst evt]
                 (case (.-keyCode evt)
                   (17 18 91 93)
                   (swap! complete-atom assoc :show-all true)
                   ;; tab
                   9 (do
                       ;; TODO: do I ever want to use TAB normally?
                       ;; Maybe if there are no completions...
                       ;; Then I'd move this into cycle-completions?
                       (swap! complete-atom
                            cycle-completions
                            (.-shiftKey evt)
                            inst
                            evt))
                   ;; enter
                   13 (let [source (.getValue inst)]
                        (when (should-eval source inst evt)
                          (.preventDefault evt)
                          (on-eval source)))
                   ;; up
                   38 (let [source (.getValue inst)]
                        (when (and (not (.-shiftKey evt))
                                   (should-go-up source inst))
                          (.preventDefault evt)
                          (on-up)))
                   ;; down
                   40 (let [source (.getValue inst)]
                        (when (and (not (.-shiftKey evt))
                                   (should-go-down source inst))
                          (.preventDefault evt)
                          (on-down)))
                   :none)
                 ))
          (when on-cm-init
            (on-cm-init inst))
          ))

      :component-did-update
      (fn [this old-argv]
        (when-not (= @value-atom (.getValue @cm))
          (.setValue @cm @value-atom)
          (let [last-line (.lastLine @cm)
                last-ch (count (.getLine @cm last-line))]
            (.setCursor @cm last-line last-ch))))

      :reagent-render
      (fn [_ _ _]
        @value-atom
        [:div {:style style}])})))

(defn colored-text [text style]
  (r/create-class
   {:component-did-mount
    (fn [this]
      (let [node (r/dom-node this)]
        (js/CodeMirror.colorize #js[node] "clojure")))
    :reagent-render
    (fn [_]
      [:pre {:style (merge {:padding 0 :margin 0} style)}
       text])}))
