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

(def wordChars
  "[^\\s\\(\\)\\[\\]\\{\\},`']*")
(def back-rx
  (js/RegExp. (str wordChars "$")))
(def forward-rx
  (js/RegExp. (str "^" wordChars)))

(defn word-in-line
  [line lno cno]
  (let [back (first (.match (.slice line 0 cno) back-rx))
        forward (first (.match (.slice line cno) forward-rx))]
    {:start #js {:line lno
                 :ch (- cno (count back))}
     :end #js {:line lno
               :ch (+ cno (count forward))}}))

(defn get-word-range
  "Find the current 'word' according to CodeMirror's `wordChars' list"
  [cm]
  (let [pos (.getCursor cm)
        lno (.-line pos)
        cno (.-ch pos)
        line (.getLine cm lno)]
    (word-in-line line lno cno)))

(defn get-word-and-range [cm]
  (let [range (get-word-range cm)
        text (.getRange cm (:start range) (:end range))]
    (assoc range :text text)))

(def cmp-show #{17 18 91 93})
(def cancel-keys #{13 27})
(def cmp-ignore #{9 16 17 18 91 93})

(defn complete-keyup [complete-cmd key-code cm]
  (if (cancel-keys key-code)
    ((complete-cmd :clear))
    (if (cmp-show key-code)
      ((complete-cmd :stop-show-all))
      (when-not (cmp-ignore key-code)
        ((complete-cmd :set) (get-word-and-range cm))))))

;; TODO refactor this to be smaller
(defn code-mirror
  "Create a code-mirror editor that knows a fair amount about being a good
  repl. The parameters:

  value-atom (reagent atom)
    when this changes, the editor will update to reflect it.

  options (TODO finish documenting)

  :style (reagent style map)
    will be applied to the container element

  :on-change (fn [text] -> nil)
  :on-eval (fn [text] -> nil)
  :on-up (fn [] -> nil)
  :on-down (fn [] -> nil)
  :should-go-up
  :should-go-down
  :should-eval

  :js-cm-opts
    options passed into the CodeMirror constructor

  :on-cm-init (fn [cm] -> nil)
    called with the CodeMirror instance, for whatever extra fiddling you want to do."
  [value-atom {:keys [style
                      on-change
                      on-eval
                      on-up
                      on-down
                      complete-cmd
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

          (reset! cm inst)
          (.on inst "change"
               (fn []
                 (let [value (.getValue inst)]
                   (when-not (= value @value-atom)
                     (on-change value)))))

          (.on inst "keyup"
               (fn [inst evt]
                 (complete-keyup complete-cmd (.-keyCode evt) inst)))

          ;; TODO On Escape, should we revert to the pre-completion-text?
          (.on inst "keydown"
               (fn [inst evt]
                 (case (.-keyCode evt)
                   ;; TODO this is a copy of cmp-show integers
                   (17 18 91 93) ((complete-cmd :show-all))
                   ;; tab
                   9 ((complete-cmd :cycle) (.-shiftKey evt) inst evt)
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
                   :none)))

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
        ((aget js/CodeMirror "colorize") #js[node] "clojure")))
    :reagent-render
    (fn [_]
      [:pre {:style (merge {:padding 0 :margin 0} style)}
       text])}))
