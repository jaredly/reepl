// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.completions');
goog.require('cljs.core');
goog.require('reepl.subs');
goog.require('reepl.helpers');
goog.require('cljs.tools.reader');
goog.require('reepl.code_mirror');
goog.require('reagent.core');
goog.require('reepl.handlers');
goog.require('reepl.show_value');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('reepl.repl_items');
goog.require('re_frame.core');
reepl.completions.styles = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"completion-container","completion-container",51436015),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"relative","relative",22796862),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(12)], null),new cljs.core.Keyword(null,"completion-list","completion-list",-809135461),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"overflow","overflow",2058931880),new cljs.core.Keyword(null,"hidden","hidden",-312506092),new cljs.core.Keyword(null,"height","height",1025178622),(20)], null),new cljs.core.Keyword(null,"completion-empty","completion-empty",424403284),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#ccc",new cljs.core.Keyword(null,"padding","padding",1660304693),"3px 10px"], null),new cljs.core.Keyword(null,"completion-show-all","completion-show-all",1293356904),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"absolute","absolute",1655386478),new cljs.core.Keyword(null,"top","top",-1856271961),(0),new cljs.core.Keyword(null,"left","left",-399115937),(0),new cljs.core.Keyword(null,"right","right",-452581833),(0),new cljs.core.Keyword(null,"z-index","z-index",1892827090),(1000),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"background-color","background-color",570434026),"#eef",new cljs.core.Keyword(null,"flex-wrap","flex-wrap",455413707),new cljs.core.Keyword(null,"wrap","wrap",851669987)], null),new cljs.core.Keyword(null,"completion-item","completion-item",-2129625962),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"3px 5px 3px"], null),new cljs.core.Keyword(null,"completion-selected","completion-selected",-1330940649),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#eee"], null),new cljs.core.Keyword(null,"completion-active","completion-active",-855262010),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#aaa"], null)], null);
reepl.completions.view = cljs.core.partial.call(null,reepl.helpers.view,reepl.completions.styles);
reepl.completions.text = cljs.core.partial.call(null,reepl.helpers.text,reepl.completions.styles);
reepl.completions.button = cljs.core.partial.call(null,reepl.helpers.button,reepl.completions.styles);
reepl.completions.canScrollIfNeeded = !((document.body.scrollIntoViewIfNeeded == null));
reepl.completions.completion_item = (function reepl$completions$completion_item(text,is_selected,is_active,set_active){
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (this$,p__16636){
var vec__16637 = p__16636;
var _ = cljs.core.nth.call(null,vec__16637,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__16637,(1),null);
var old_is_selected = cljs.core.nth.call(null,vec__16637,(2),null);
var vec__16638 = reagent.core.argv.call(null,this$);
var ___$2 = cljs.core.nth.call(null,vec__16638,(0),null);
var ___$3 = cljs.core.nth.call(null,vec__16638,(1),null);
var is_selected__$1 = cljs.core.nth.call(null,vec__16638,(2),null);
if(cljs.core.truth_((function (){var and__6441__auto__ = cljs.core.not.call(null,old_is_selected);
if(and__6441__auto__){
return is_selected__$1;
} else {
return and__6441__auto__;
}
})())){
if(cljs.core.truth_(reepl.completions.canScrollIfNeeded)){
return reagent.core.dom_node.call(null,this$).scrollIntoViewIfNeeded(false);
} else {
return reagent.core.dom_node.call(null,this$).scrollIntoView();
}
} else {
return null;
}
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (text__$1,is_selected__$1,is_active__$1,set_active__$1){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.completions.view,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),set_active__$1,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"completion-item","completion-item",-2129625962),(function (){var and__6441__auto__ = is_selected__$1;
if(cljs.core.truth_(and__6441__auto__)){
if(cljs.core.truth_(is_active__$1)){
return new cljs.core.Keyword(null,"completion-active","completion-active",-855262010);
} else {
return new cljs.core.Keyword(null,"completion-selected","completion-selected",-1330940649);
}
} else {
return and__6441__auto__;
}
})()], null)], null),text__$1], null);
})], null));
});
reepl.completions.completion_list = (function reepl$completions$completion_list(p__16641,set_active){
var map__16644 = p__16641;
var map__16644__$1 = ((((!((map__16644 == null)))?((((map__16644.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16644.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16644):map__16644);
var pos = cljs.core.get.call(null,map__16644__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var list = cljs.core.get.call(null,map__16644__$1,new cljs.core.Keyword(null,"list","list",765357683));
var active = cljs.core.get.call(null,map__16644__$1,new cljs.core.Keyword(null,"active","active",1895962068));
var show_all = cljs.core.get.call(null,map__16644__$1,new cljs.core.Keyword(null,"show-all","show-all",715701051));
var items = cljs.core.map_indexed.call(null,((function (map__16644,map__16644__$1,pos,list,active,show_all){
return (function (p1__16640_SHARP_,p2__16639_SHARP_){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.completions.completion_item,cljs.core.get.call(null,p2__16639_SHARP_,(2)),cljs.core._EQ_.call(null,p1__16640_SHARP_,pos),active,cljs.core.partial.call(null,set_active,p1__16640_SHARP_)], null);
});})(map__16644,map__16644__$1,pos,list,active,show_all))
,list);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.completions.view,new cljs.core.Keyword(null,"completion-container","completion-container",51436015),(cljs.core.truth_(show_all)?cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.completions.view,new cljs.core.Keyword(null,"completion-show-all","completion-show-all",1293356904)], null),items):null),((cljs.core.empty_QMARK_.call(null,items))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.completions.view,new cljs.core.Keyword(null,"completion-empty","completion-empty",424403284),"This is where completions show up"], null):cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.completions.view,new cljs.core.Keyword(null,"completion-list","completion-list",-809135461)], null),items))], null);
});
