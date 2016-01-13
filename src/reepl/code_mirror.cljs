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
    (when words
      #js {:list (clj->js words)
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

(defn code-mirror
  [value-atom {:keys [style
                      on-change
                      on-eval
                      on-up
                      on-down
                      complete-word
                      should-go-up
                      should-go-down
                      should-eval]}]

  (let [cm (atom nil)]
    (r/create-class
     {:component-did-mount
      (fn [this]
        (let [el (r/dom-node this)
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

          (enable-auto-complete inst complete-word)
          (reset! cm inst)
          (.on inst "change"
               (fn []
                 (let [value (.getValue inst)]
                   (when-not (= value @value-atom)
                     (on-change value)))))

          (.on inst "keydown"
               (fn [inst evt]
                 (js/console.log (.-state.completionActive inst) "keydown" (.-keyCode evt))
                 (when (not (and (.-state.completionActive inst)
                                 (.-state.completionActive.data inst)
                                 (< 0 (.-state.completionActive.data.list.length inst))))
                   (case (.-keyCode evt)
                     13 (let [source (.getValue inst)] ; enter
                          (when (should-eval source inst evt)
                            (.preventDefault evt)
                            (on-eval source)))
                     38 (let [source (.getValue inst)] ; up
                          (when (should-go-up source inst)
                            (.preventDefault evt)
                            (on-up)))
                     40 (let [source (.getValue inst)] ; down
                          (when (should-go-down source inst)
                            (.preventDefault evt)
                            (on-down)))
                     :none))
                 ))
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
