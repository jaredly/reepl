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
var seq__14766_14780 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__14767_14781 = null;
var count__14768_14782 = (0);
var i__14769_14783 = (0);
while(true){
if((i__14769_14783 < count__14768_14782)){
var f_14784 = cljs.core._nth.call(null,chunk__14767_14781,i__14769_14783);
cljs.core.println.call(null,"  ",f_14784);

var G__14785 = seq__14766_14780;
var G__14786 = chunk__14767_14781;
var G__14787 = count__14768_14782;
var G__14788 = (i__14769_14783 + (1));
seq__14766_14780 = G__14785;
chunk__14767_14781 = G__14786;
count__14768_14782 = G__14787;
i__14769_14783 = G__14788;
continue;
} else {
var temp__4425__auto___14789 = cljs.core.seq.call(null,seq__14766_14780);
if(temp__4425__auto___14789){
var seq__14766_14790__$1 = temp__4425__auto___14789;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14766_14790__$1)){
var c__7256__auto___14791 = cljs.core.chunk_first.call(null,seq__14766_14790__$1);
var G__14792 = cljs.core.chunk_rest.call(null,seq__14766_14790__$1);
var G__14793 = c__7256__auto___14791;
var G__14794 = cljs.core.count.call(null,c__7256__auto___14791);
var G__14795 = (0);
seq__14766_14780 = G__14792;
chunk__14767_14781 = G__14793;
count__14768_14782 = G__14794;
i__14769_14783 = G__14795;
continue;
} else {
var f_14796 = cljs.core.first.call(null,seq__14766_14790__$1);
cljs.core.println.call(null,"  ",f_14796);

var G__14797 = cljs.core.next.call(null,seq__14766_14790__$1);
var G__14798 = null;
var G__14799 = (0);
var G__14800 = (0);
seq__14766_14780 = G__14797;
chunk__14767_14781 = G__14798;
count__14768_14782 = G__14799;
i__14769_14783 = G__14800;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_14801 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_14801);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_14801)))?cljs.core.second.call(null,arglists_14801):arglists_14801));
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
var seq__14770 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__14771 = null;
var count__14772 = (0);
var i__14773 = (0);
while(true){
if((i__14773 < count__14772)){
var vec__14774 = cljs.core._nth.call(null,chunk__14771,i__14773);
var name = cljs.core.nth.call(null,vec__14774,(0),null);
var map__14775 = cljs.core.nth.call(null,vec__14774,(1),null);
var map__14775__$1 = ((((!((map__14775 == null)))?((((map__14775.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14775.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14775):map__14775);
var doc = cljs.core.get.call(null,map__14775__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__14775__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__14802 = seq__14770;
var G__14803 = chunk__14771;
var G__14804 = count__14772;
var G__14805 = (i__14773 + (1));
seq__14770 = G__14802;
chunk__14771 = G__14803;
count__14772 = G__14804;
i__14773 = G__14805;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__14770);
if(temp__4425__auto__){
var seq__14770__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14770__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__14770__$1);
var G__14806 = cljs.core.chunk_rest.call(null,seq__14770__$1);
var G__14807 = c__7256__auto__;
var G__14808 = cljs.core.count.call(null,c__7256__auto__);
var G__14809 = (0);
seq__14770 = G__14806;
chunk__14771 = G__14807;
count__14772 = G__14808;
i__14773 = G__14809;
continue;
} else {
var vec__14777 = cljs.core.first.call(null,seq__14770__$1);
var name = cljs.core.nth.call(null,vec__14777,(0),null);
var map__14778 = cljs.core.nth.call(null,vec__14777,(1),null);
var map__14778__$1 = ((((!((map__14778 == null)))?((((map__14778.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14778.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14778):map__14778);
var doc = cljs.core.get.call(null,map__14778__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__14778__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__14810 = cljs.core.next.call(null,seq__14770__$1);
var G__14811 = null;
var G__14812 = (0);
var G__14813 = (0);
seq__14770 = G__14810;
chunk__14771 = G__14811;
count__14772 = G__14812;
i__14773 = G__14813;
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

//# sourceMappingURL=repl.js.map