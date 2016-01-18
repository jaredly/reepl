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
   :function {:color "#00a"}
   })

(def view (partial helpers/view styles))
(def text (partial helpers/text styles))
(def button (partial helpers/button styles))

(defn str? [val]
  (= js/String (type val)))

(defn pprint-str [val]
  (pprint/write val :stream nil))

(def cljs-fn-prefix
  "cljs$core$IFn$_invoke$arity$")

(defn recover-cljs-name [parts]
  (-> (str/join \. (butlast parts))
      (str \/ (last parts))
      demunge
      ))

(defn get-cljs-arities [fn]
  (map
   #(aget fn %)
   (filter #(.startsWith % cljs-fn-prefix) (js->clj (js/Object.keys fn)))))

(defn get-fn-summary [fn]
  (let [source (str fn)
        ;; lines (str/split string "\n")
        args (second (re-find #"\(([^\)]+)\)" source))]
    (map demunge
         (str/split args \,))))

(defn get-function-forms [fn]
  (let [arities (get-cljs-arities fn)
        arities (if (empty? arities)
                  [fn]
                  arities)]
    (map get-fn-summary
         arities)))

(defn get-fn-name [fn]
  (let [parts (.split (.-name fn) \$)]
    (cond
      (empty? (.-name fn)) "[anonymous]"
      (= 1 (count parts)) (.-name fn)
      :else (recover-cljs-name parts))))

(defn str-fn-forms [forms]
  (str
   \[
   (str/join "] [" (map (partial str/join " ") forms))
   \]))

(defn show-fn [fn]
  [view
   :function
   [text
    :function-head
    "fn "
    (get-fn-name fn)
    ]
   [text
    :function-arities
    (str-fn-forms
     (get-function-forms fn))]
   [text
    :function-body
    ;; TODO get the docs! that'd be so awesome

    ]])

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
