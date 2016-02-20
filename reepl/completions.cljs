(ns reepl.completions
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

            [reepl.handlers :as handlers]
            [reepl.subs :as subs]
            [reepl.helpers :as helpers]
            )
  (:require-macros
   [reagent.ratom :refer [reaction]]))

(def styles
  {:completion-container {:position :relative
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
   })

(def view (partial helpers/view styles))
(def text (partial helpers/text styles))
(def button (partial helpers/button styles))

(def canScrollIfNeeded
  (not (nil? (.-scrollIntoViewIfNeeded js/document.body))))

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
