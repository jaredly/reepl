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
var seq__18504_18518 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__18505_18519 = null;
var count__18506_18520 = (0);
var i__18507_18521 = (0);
while(true){
if((i__18507_18521 < count__18506_18520)){
var f_18522 = cljs.core._nth.call(null,chunk__18505_18519,i__18507_18521);
cljs.core.println.call(null,"  ",f_18522);

var G__18523 = seq__18504_18518;
var G__18524 = chunk__18505_18519;
var G__18525 = count__18506_18520;
var G__18526 = (i__18507_18521 + (1));
seq__18504_18518 = G__18523;
chunk__18505_18519 = G__18524;
count__18506_18520 = G__18525;
i__18507_18521 = G__18526;
continue;
} else {
var temp__4425__auto___18527 = cljs.core.seq.call(null,seq__18504_18518);
if(temp__4425__auto___18527){
var seq__18504_18528__$1 = temp__4425__auto___18527;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18504_18528__$1)){
var c__7256__auto___18529 = cljs.core.chunk_first.call(null,seq__18504_18528__$1);
var G__18530 = cljs.core.chunk_rest.call(null,seq__18504_18528__$1);
var G__18531 = c__7256__auto___18529;
var G__18532 = cljs.core.count.call(null,c__7256__auto___18529);
var G__18533 = (0);
seq__18504_18518 = G__18530;
chunk__18505_18519 = G__18531;
count__18506_18520 = G__18532;
i__18507_18521 = G__18533;
continue;
} else {
var f_18534 = cljs.core.first.call(null,seq__18504_18528__$1);
cljs.core.println.call(null,"  ",f_18534);

var G__18535 = cljs.core.next.call(null,seq__18504_18528__$1);
var G__18536 = null;
var G__18537 = (0);
var G__18538 = (0);
seq__18504_18518 = G__18535;
chunk__18505_18519 = G__18536;
count__18506_18520 = G__18537;
i__18507_18521 = G__18538;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_18539 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_18539);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_18539)))?cljs.core.second.call(null,arglists_18539):arglists_18539));
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
var seq__18508 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__18509 = null;
var count__18510 = (0);
var i__18511 = (0);
while(true){
if((i__18511 < count__18510)){
var vec__18512 = cljs.core._nth.call(null,chunk__18509,i__18511);
var name = cljs.core.nth.call(null,vec__18512,(0),null);
var map__18513 = cljs.core.nth.call(null,vec__18512,(1),null);
var map__18513__$1 = ((((!((map__18513 == null)))?((((map__18513.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18513.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18513):map__18513);
var doc = cljs.core.get.call(null,map__18513__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__18513__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__18540 = seq__18508;
var G__18541 = chunk__18509;
var G__18542 = count__18510;
var G__18543 = (i__18511 + (1));
seq__18508 = G__18540;
chunk__18509 = G__18541;
count__18510 = G__18542;
i__18511 = G__18543;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__18508);
if(temp__4425__auto__){
var seq__18508__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18508__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__18508__$1);
var G__18544 = cljs.core.chunk_rest.call(null,seq__18508__$1);
var G__18545 = c__7256__auto__;
var G__18546 = cljs.core.count.call(null,c__7256__auto__);
var G__18547 = (0);
seq__18508 = G__18544;
chunk__18509 = G__18545;
count__18510 = G__18546;
i__18511 = G__18547;
continue;
} else {
var vec__18515 = cljs.core.first.call(null,seq__18508__$1);
var name = cljs.core.nth.call(null,vec__18515,(0),null);
var map__18516 = cljs.core.nth.call(null,vec__18515,(1),null);
var map__18516__$1 = ((((!((map__18516 == null)))?((((map__18516.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18516.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18516):map__18516);
var doc = cljs.core.get.call(null,map__18516__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__18516__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__18548 = cljs.core.next.call(null,seq__18508__$1);
var G__18549 = null;
var G__18550 = (0);
var G__18551 = (0);
seq__18508 = G__18548;
chunk__18509 = G__18549;
count__18510 = G__18550;
i__18511 = G__18551;
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
