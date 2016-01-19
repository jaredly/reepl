// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.subs');
goog.require('cljs.core');
goog.require('reagent.core');
reepl.subs.items = (function reepl$subs$items(db){
return reagent.ratom.make_reaction.call(null,(function (){
return new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,db));
}));
});
reepl.subs.current_text = (function reepl$subs$current_text(db){
var idx = reagent.ratom.make_reaction.call(null,(function (){
return new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,db));
}));
var history = reagent.ratom.make_reaction.call(null,((function (idx){
return (function (){
return new cljs.core.Keyword(null,"history","history",-247395220).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,db));
});})(idx))
);
return reagent.ratom.make_reaction.call(null,((function (idx,history){
return (function (){
var items = cljs.core.deref.call(null,history);
var pos = ((cljs.core.count.call(null,items) - cljs.core.deref.call(null,idx)) - (1));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"pos","pos",-864607220),pos,new cljs.core.Keyword(null,"count","count",2139924085),cljs.core.count.call(null,items),new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.get.call(null,items,pos)], null);
});})(idx,history))
);
});
