(ns adzerk.boot-cljs-repl (:require [weasel.repl :as repl]))
(let [repl-conn nil] (when (and repl-conn (not (repl/alive?))) (repl/connect nil)))