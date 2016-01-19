(set-env!
  :source-paths   #{"src"}
  :resource-paths #{"html"}
  :target-path "target"
  :dependencies
  '[
    [adzerk/boot-cljs            "1.7.228-1"       :scope "test"]
    [adzerk/boot-cljs-repl       "0.3.0"           :scope "test"]
    [adzerk/boot-reload          "0.4.4"           :scope "test"]
    [pandeiro/boot-http          "0.6.3"           :scope "test"]
    [crisptrutski/boot-cljs-test "0.2.1"  :scope "test"]
    [zilti/boot-typed "0.1.1" :scope "test"]

    [replumb "0.1.5-SNAPSHOT"]
    [parinfer "0.2.3"]
    [reagent "0.5.1"]
    [re-frame "0.6.0"]
    [binaryage/devtools "0.4.1"]
    [cljsjs/codemirror "5.10.0-0"]
    [quil "2.3.0"]

    [ajchemist/boot-figwheel "0.5.0-0"] ;; latest release
    [com.cemerick/piggieback "0.2.1" :scope "test"]
    [figwheel-sidecar "0.5.0-2" :scope "test"]

    [weasel                  "0.7.0"  :scope "test"]
    [org.clojure/tools.nrepl "0.2.12" :scope "test"]

    [org.clojure/clojure         "1.7.0"]
    [org.clojure/core.typed "0.3.18"]
    [org.clojure/clojurescript   "1.7.228"]
    ])

(require
  '[adzerk.boot-cljs      :refer [cljs]]
  '[adzerk.boot-cljs-repl :refer [cljs-repl start-repl]]
  '[adzerk.boot-reload    :refer [reload]]
  '[crisptrutski.boot-cljs-test  :refer [test-cljs]]
  '[pandeiro.boot-http    :refer [serve]])

(require 'boot-figwheel)
(refer 'boot-figwheel :rename '{cljs-repl fw-cljs-repl})

(task-options!
 figwheel {:build-ids  ["dev"]
           :all-builds [{:id "dev"
                         :compiler {:main 'reepl.example
                                    :output-to "example.js"}
                         :figwheel {:build-id  "dev"
                                    :on-jsload "reepl.example/main"
                                    :heads-up-display true
                                    :autoload true
                                    :debug false}}]
           :figwheel-options {:repl true
                              :http-server-root "target"
                              :css-dirs ["target"]
                              :open-file-command "emacsclient"}})

(deftask auto-test []
  (set-env! :source-paths #{"src" "test"})
  (comp (watch)
        (speak)
        (test-cljs)))

(def foreign-libs
  [{:file "parinfer/resources/public/codemirror/mode/clojure/clojure-parinfer.js"
    :provides ["parinfer.codemirror.mode.clojure.clojure-parinfer"]}])

(deftask dev []
  (set-env! :source-paths #{"src"})
  (set-env! :asset-paths #{"static"})
  (comp
   (target :dir #{"target"})
        (serve :dir "target")
        (watch)
        ;(speak)
        (reload :on-jsload 'reepl.example/main)
        (cljs-repl)
        (cljs :source-map true
              :compiler-options {:foreign-libs foreign-libs}
              :optimizations :none)
        (sift
         :add-jar
         {'cljsjs/codemirror
          #"cljsjs/codemirror/development/codemirror.css"})
        (sift
         :move
         {#"cljsjs/codemirror/development/codemirror.css"
          "vendor/codemirror/codemirror.css"})))

(deftask devfw []
  (set-env! :source-paths #(into % ["src"]))
  (comp (repl) (figwheel)))

(deftask build []
  (set-env! :source-paths #{"src"})
  (comp (cljs :source-map true
              :compiler-options {:asset-path "target/out"
                                 :foreign-libs foreign-libs}
              :optimizations :advanced)
        (sift :add-jar {'cljsjs/codemirror #"cljsjs/codemirror/development/codemirror.css"})
        (sift :move {#"cljsjs/codemirror/development/codemirror.css"
                     "vendor/codemirror/codemirror.css"})
        ))

