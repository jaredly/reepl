(ns reepl.show-value
  (:require [clojure.string :as str]
            [reagent.core :as r]

            [devtools.format :as devtools]
            [cljs.pprint :as pprint]
            [reepl.helpers :as helpers])
  (:require-macros
   [reagent.ratom :refer [reaction]]))

(def styles
  {:value-head {:flex-direction :row}
   :inline-value {:display :inline-flex}
   :value-toggle {:font-size 9
                  :padding 4
                  :cursor :pointer}
   :function {:color "#00a"}
   })

(def view (partial helpers/view styles))

(defn str? [val]
  (= js/String (type val)))

(defn pprint-str [val]
  (pprint/write val :stream nil))

(defn show-str [val]
  (if (str? val)
    val
    (pprint-str val)))

(defn show-value- [val config showers]
  (loop [shower-list showers]
    (if (empty? shower-list)
      (throw (js/Error. (str "No shower for value " val)))
      (let [res ((first shower-list) val config #(show-value- %1 %2 showers))]
        (if res
          [view :inline-value res]
          (recur (rest shower-list)))))))

(defn show-value [val opts show-opts]
  (show-value- val opts (conj (vec (:showers show-opts)) show-str)))
