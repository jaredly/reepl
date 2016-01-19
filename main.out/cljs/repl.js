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
var seq__18498_18512 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__18499_18513 = null;
var count__18500_18514 = (0);
var i__18501_18515 = (0);
while(true){
if((i__18501_18515 < count__18500_18514)){
var f_18516 = cljs.core._nth.call(null,chunk__18499_18513,i__18501_18515);
cljs.core.println.call(null,"  ",f_18516);

var G__18517 = seq__18498_18512;
var G__18518 = chunk__18499_18513;
var G__18519 = count__18500_18514;
var G__18520 = (i__18501_18515 + (1));
seq__18498_18512 = G__18517;
chunk__18499_18513 = G__18518;
count__18500_18514 = G__18519;
i__18501_18515 = G__18520;
continue;
} else {
var temp__4425__auto___18521 = cljs.core.seq.call(null,seq__18498_18512);
if(temp__4425__auto___18521){
var seq__18498_18522__$1 = temp__4425__auto___18521;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18498_18522__$1)){
var c__7256__auto___18523 = cljs.core.chunk_first.call(null,seq__18498_18522__$1);
var G__18524 = cljs.core.chunk_rest.call(null,seq__18498_18522__$1);
var G__18525 = c__7256__auto___18523;
var G__18526 = cljs.core.count.call(null,c__7256__auto___18523);
var G__18527 = (0);
seq__18498_18512 = G__18524;
chunk__18499_18513 = G__18525;
count__18500_18514 = G__18526;
i__18501_18515 = G__18527;
continue;
} else {
var f_18528 = cljs.core.first.call(null,seq__18498_18522__$1);
cljs.core.println.call(null,"  ",f_18528);

var G__18529 = cljs.core.next.call(null,seq__18498_18522__$1);
var G__18530 = null;
var G__18531 = (0);
var G__18532 = (0);
seq__18498_18512 = G__18529;
chunk__18499_18513 = G__18530;
count__18500_18514 = G__18531;
i__18501_18515 = G__18532;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_18533 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_18533);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_18533)))?cljs.core.second.call(null,arglists_18533):arglists_18533));
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
var seq__18502 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__18503 = null;
var count__18504 = (0);
var i__18505 = (0);
while(true){
if((i__18505 < count__18504)){
var vec__18506 = cljs.core._nth.call(null,chunk__18503,i__18505);
var name = cljs.core.nth.call(null,vec__18506,(0),null);
var map__18507 = cljs.core.nth.call(null,vec__18506,(1),null);
var map__18507__$1 = ((((!((map__18507 == null)))?((((map__18507.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18507.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18507):map__18507);
var doc = cljs.core.get.call(null,map__18507__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__18507__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__18534 = seq__18502;
var G__18535 = chunk__18503;
var G__18536 = count__18504;
var G__18537 = (i__18505 + (1));
seq__18502 = G__18534;
chunk__18503 = G__18535;
count__18504 = G__18536;
i__18505 = G__18537;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__18502);
if(temp__4425__auto__){
var seq__18502__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18502__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__18502__$1);
var G__18538 = cljs.core.chunk_rest.call(null,seq__18502__$1);
var G__18539 = c__7256__auto__;
var G__18540 = cljs.core.count.call(null,c__7256__auto__);
var G__18541 = (0);
seq__18502 = G__18538;
chunk__18503 = G__18539;
count__18504 = G__18540;
i__18505 = G__18541;
continue;
} else {
var vec__18509 = cljs.core.first.call(null,seq__18502__$1);
var name = cljs.core.nth.call(null,vec__18509,(0),null);
var map__18510 = cljs.core.nth.call(null,vec__18509,(1),null);
var map__18510__$1 = ((((!((map__18510 == null)))?((((map__18510.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18510.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18510):map__18510);
var doc = cljs.core.get.call(null,map__18510__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__18510__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__18542 = cljs.core.next.call(null,seq__18502__$1);
var G__18543 = null;
var G__18544 = (0);
var G__18545 = (0);
seq__18502 = G__18542;
chunk__18503 = G__18543;
count__18504 = G__18544;
i__18505 = G__18545;
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
