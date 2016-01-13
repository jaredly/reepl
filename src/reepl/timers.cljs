(ns reepl.timers)

(defn num-timers [state]
  (count (::timers state)))

(defn new-timer [time handler]
  {:start (js/Date.now)
   :time time
   :handler handler})

(defn add-timer [state time handler]
  (update-in state [::timers]
             (fnil conj [])
             (new-timer time handler)))

(defn add-ival [state name time handler]
  (update-in state [::ivals]
             assoc name
             (new-timer time handler)))

(defn remove-ival [state name]
  (update-in state [::ivals]
             dissoc name))

(defn timer-ready [timer]
  (>= (- (js/Date.now) (:start timer)) (:time timer)))

(defn check-timer [state timer]
  (if-not (timer-ready timer)
    (update-in state [::timers] conj timer)
    (or ((:handler timer) state) state)))

(defn check-ival [state [name timer]]
  (if-not (timer-ready timer)
    state
    (or ((:handler timer) state) state)))

(defn update-timers [state]
  (if (empty? (::timers state))
    state ; TODO it'd be nice not to need to remove the ivals first...
    (reduce check-timer (assoc state ::timers []) (::timers state))))

(defn update-ivals [state]
  (if (empty? (::ivals state))
    state
    (reduce check-ival state (::ivals state))))

(defn update-fn [orig state]
  (-> state
      orig
      update-timers
      update-ivals))

(defn middleware [options]
  (assoc options :update #(update-fn (:update options) %)))
