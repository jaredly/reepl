// Compiled by ClojureScript 1.7.228 {}
goog.provide('re_frame.db');
goog.require('cljs.core');
goog.require('reagent.core');
re_frame.db.app_db = reagent.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
