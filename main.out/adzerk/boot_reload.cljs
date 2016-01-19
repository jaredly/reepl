(ns adzerk.boot-reload (:require [adzerk.boot-reload.client :as client] reepl.example))
(client/connect "ws://localhost:49751" {:asset-host nil, :on-jsload (fn* [] (reepl.example/main))})