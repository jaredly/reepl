(ns reepl.show-value
  (:require [clojure.string :as str]
            [reagent.core :as r]

            [devtools.format :as devtools]
            [cljs.pprint :as pprint]
            [reepl.helpers :as helpers]
            )
  (:require-macros
   [reagent.ratom :refer [reaction]]))

(def styles
  {:value-head {:flex-direction :row}
   :inline-value {:display :inline-flex}
   :value-toggle {
                  :font-size 9
                  :padding 4
                  :cursor :pointer}
   :function {:color "#00a"}})

(def view (partial helpers/view styles))
(def text (partial helpers/text styles))
(def button (partial helpers/button styles))

(defn str? [val]
  (= js/String (type val)))

(defn pprint-str [val]
  (pprint/write val :stream nil))

(defn show-fn [fn]
  (let [parts (.split (.-name fn) \$)]
    [text
     :function
     "fn "
     (->
     (str
      (str/join \. (butlast parts))
      \/
      (last parts))
     (.replace
      "__GT_"
      "->")
     (.replace
      "_"
      "-"))]))

(defn show-str [val]
  (if (= js/Function (type val))
    (show-fn val)
    (if (str? val)
      val
      (pprint-str val))))

(declare show-value)

(defn js-array? [val]
  (= js/Array (type val)))

(defn parse-style [raw]
  (into {}
        (map (fn [line]
               (let [[k v] (str/split line ":")]
                 [(keyword k) v]))(str/split raw ";"))))

(defn show-el [val]
  (let [type (first val)
        opts (second val)
        children (drop 2 val)]
    (if (= "object" type)
      [show-value (.-object opts) (.-config opts)]
      (into
       [(keyword type) {:style (when opts (parse-style (.-style opts)))}]
       (map #(if-not (js-array? %) % (show-el %)) children))
      )))

;; see https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview
(defn show-value [val config]
  (if (var? val)
    [view :inline-value (show-str val)]
    (let [header (devtools/header-api-call val config)]
    (if-not header
      [view :inline-value (show-str val)]
      (if-not (devtools/has-body-api-call val config)
        [view :inline-value (show-el header)]
        (let [open (r/atom false)]
          (fn [_ _]
            (let [is-open @open]
              [view :value-with-body
               [view :value-head
                [view {:on-click #(swap! open not)
                       :style :value-toggle}
                 (if is-open "▼" "▶")]
                (show-el header)]
               (when is-open
                 (show-el (devtools/body-api-call val config)))
               ]))))))))
