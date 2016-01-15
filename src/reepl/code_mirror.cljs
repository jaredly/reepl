(ns reepl.code-mirror
  (:require [clojure.string :as str]
            [reagent.core :as r]
            [cljsjs.codemirror]
            [cljsjs.codemirror.addon.edit.closebrackets]
            [cljsjs.codemirror.addon.edit.matchbrackets]
            [cljsjs.codemirror.addon.hint.show-hint]
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
        words (complete-word text)]
    (when-not (empty? words)
      {:list words
       :num (count words)
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

(defn cycle-pos [count current go-back?]
  (if go-back?
    (if (>= 0 current)
      (dec count)
      (dec current))
    (if (>= current (dec count))
      0
      (inc current))))

(defn cycle-completions [{:keys [num pos] :as state} go-back?]
  (if (> num 1)
    (assoc state :pos (cycle-pos num pos go-back?))
    state))

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
                      should-eval]}]

  (let [cm (atom nil)]
    (r/create-class
     {:component-did-mount
      (fn [this]
        (let [el (r/dom-node this)
              cancel-keys #{37 38 39 40 13 27}
              cmp-ignore #{9}
              inst (js/CodeMirror.
                    el
                    #js {:lineNumbers false
                         :viewportMargin js/Infinity
                         :matchBrackets true
                         :extraKeys
                         #js {"Shift-Enter" "newlineAndIndent"}
                         :value @value-atom
                         :autoCloseBrackets true
                         :mode "clojure"})]

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
                   (when-not (cmp-ignore (.-keyCode evt))
                     (reset! complete-atom (repl-hint complete-word inst nil))
                     ))
                 ))

          (.on inst "keydown"
               (fn [inst evt]
                 (case (.-keyCode evt)
                   ;; tab
                   9 (do
                       ;; TODO: do I ever want to use TAB normally?
                       ;; Maybe if there are no completions...
                       ;; Then I'd move this into cycle-completions?
                       (.preventDefault evt)
                       (swap! complete-atom
                            cycle-completions
                            (.-shiftKey evt)))
                   ;; enter
                   13 (let [source (.getValue inst)]
                        (when (should-eval source inst evt)
                          (.preventDefault evt)
                          (on-eval source)))
                   ;; up
                   38 (let [source (.getValue inst)]
                        (when (should-go-up source inst)
                          (.preventDefault evt)
                          (on-up)))
                   ;; down
                   40 (let [source (.getValue inst)]
                        (when (should-go-down source inst)
                          (.preventDefault evt)
                          (on-down)))
                   :none)
                 ))))

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
