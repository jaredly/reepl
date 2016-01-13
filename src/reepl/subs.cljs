(ns reepl.subs
  (:require [reagent.core :as r])
  (:require-macros
   [reagent.ratom :refer [reaction]]))

(defn items [db]
  (reaction (:items @db)))

(defn current-text [db]
  (let [idx (reaction (:hist-pos @db))
        history (reaction (:history @db))]
    (reaction (let [items @history
                    pos (- (count items) @idx 1)]
                (get items pos)))))
