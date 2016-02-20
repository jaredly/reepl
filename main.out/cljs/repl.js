// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4425__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4425__auto__)){
var ns = temp__4425__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__19210_19224 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__19211_19225 = null;
var count__19212_19226 = (0);
var i__19213_19227 = (0);
while(true){
if((i__19213_19227 < count__19212_19226)){
var f_19228 = cljs.core._nth.call(null,chunk__19211_19225,i__19213_19227);
cljs.core.println.call(null,"  ",f_19228);

var G__19229 = seq__19210_19224;
var G__19230 = chunk__19211_19225;
var G__19231 = count__19212_19226;
var G__19232 = (i__19213_19227 + (1));
seq__19210_19224 = G__19229;
chunk__19211_19225 = G__19230;
count__19212_19226 = G__19231;
i__19213_19227 = G__19232;
continue;
} else {
var temp__4425__auto___19233 = cljs.core.seq.call(null,seq__19210_19224);
if(temp__4425__auto___19233){
var seq__19210_19234__$1 = temp__4425__auto___19233;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19210_19234__$1)){
var c__7256__auto___19235 = cljs.core.chunk_first.call(null,seq__19210_19234__$1);
var G__19236 = cljs.core.chunk_rest.call(null,seq__19210_19234__$1);
var G__19237 = c__7256__auto___19235;
var G__19238 = cljs.core.count.call(null,c__7256__auto___19235);
var G__19239 = (0);
seq__19210_19224 = G__19236;
chunk__19211_19225 = G__19237;
count__19212_19226 = G__19238;
i__19213_19227 = G__19239;
continue;
} else {
var f_19240 = cljs.core.first.call(null,seq__19210_19234__$1);
cljs.core.println.call(null,"  ",f_19240);

var G__19241 = cljs.core.next.call(null,seq__19210_19234__$1);
var G__19242 = null;
var G__19243 = (0);
var G__19244 = (0);
seq__19210_19224 = G__19241;
chunk__19211_19225 = G__19242;
count__19212_19226 = G__19243;
i__19213_19227 = G__19244;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_19245 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_19245);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_19245)))?cljs.core.second.call(null,arglists_19245):arglists_19245));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__19214 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__19215 = null;
var count__19216 = (0);
var i__19217 = (0);
while(true){
if((i__19217 < count__19216)){
var vec__19218 = cljs.core._nth.call(null,chunk__19215,i__19217);
var name = cljs.core.nth.call(null,vec__19218,(0),null);
var map__19219 = cljs.core.nth.call(null,vec__19218,(1),null);
var map__19219__$1 = ((((!((map__19219 == null)))?((((map__19219.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19219.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19219):map__19219);
var doc = cljs.core.get.call(null,map__19219__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__19219__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__19246 = seq__19214;
var G__19247 = chunk__19215;
var G__19248 = count__19216;
var G__19249 = (i__19217 + (1));
seq__19214 = G__19246;
chunk__19215 = G__19247;
count__19216 = G__19248;
i__19217 = G__19249;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__19214);
if(temp__4425__auto__){
var seq__19214__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19214__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__19214__$1);
var G__19250 = cljs.core.chunk_rest.call(null,seq__19214__$1);
var G__19251 = c__7256__auto__;
var G__19252 = cljs.core.count.call(null,c__7256__auto__);
var G__19253 = (0);
seq__19214 = G__19250;
chunk__19215 = G__19251;
count__19216 = G__19252;
i__19217 = G__19253;
continue;
} else {
var vec__19221 = cljs.core.first.call(null,seq__19214__$1);
var name = cljs.core.nth.call(null,vec__19221,(0),null);
var map__19222 = cljs.core.nth.call(null,vec__19221,(1),null);
var map__19222__$1 = ((((!((map__19222 == null)))?((((map__19222.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19222.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19222):map__19222);
var doc = cljs.core.get.call(null,map__19222__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__19222__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__19254 = cljs.core.next.call(null,seq__19214__$1);
var G__19255 = null;
var G__19256 = (0);
var G__19257 = (0);
seq__19214 = G__19254;
chunk__19215 = G__19255;
count__19216 = G__19256;
i__19217 = G__19257;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});
