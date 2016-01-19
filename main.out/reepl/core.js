// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.core');
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
goog.require('re_frame.core');
reepl.core.styles = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"intro-message","intro-message",1521955840),new cljs.core.Keyword(null,"output-item","output-item",-243378432),new cljs.core.Keyword(null,"repl-items","repl-items",847159361),new cljs.core.Keyword(null,"caret","caret",-1275001854),new cljs.core.Keyword(null,"input-item","input-item",-1524386460),new cljs.core.Keyword(null,"error-item","error-item",-13017340),new cljs.core.Keyword(null,"output-caret","output-caret",-1406552955),new cljs.core.Keyword(null,"completion-active","completion-active",-855262010),new cljs.core.Keyword(null,"input-text","input-text",-1336297114),new cljs.core.Keyword(null,"repl-input","repl-input",-1430642169),new cljs.core.Keyword(null,"main-caret","main-caret",-843467512),new cljs.core.Keyword(null,"completion-show-all","completion-show-all",1293356904),new cljs.core.Keyword(null,"intro-code","intro-code",694747337),new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Keyword(null,"input-container","input-container",-1901353206),new cljs.core.Keyword(null,"output-value","output-value",537285708),new cljs.core.Keyword(null,"input-caret","input-caret",-1491147666),new cljs.core.Keyword(null,"completion-container","completion-container",51436015),new cljs.core.Keyword(null,"underlying-error","underlying-error",-223698892),new cljs.core.Keyword(null,"completion-empty","completion-empty",424403284),new cljs.core.Keyword(null,"clear-button","clear-button",1904608692),new cljs.core.Keyword(null,"container","container",-1736937707),new cljs.core.Keyword(null,"completion-item","completion-item",-2129625962),new cljs.core.Keyword(null,"completion-selected","completion-selected",-1330940649),new cljs.core.Keyword(null,"completion-list","completion-list",-809135461),new cljs.core.Keyword(null,"repl-item","repl-item",152498044),new cljs.core.Keyword(null,"docs-empty","docs-empty",1512179135)],[new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"padding","padding",1660304693),"10px 20px",new cljs.core.Keyword(null,"line-height","line-height",1870784992),1.5,new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"1px solid #aaa",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(10)], null),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"overflow","overflow",2058931880),new cljs.core.Keyword(null,"auto","auto",-566279492),new cljs.core.Keyword(null,"height","height",1025178622),(500),new cljs.core.Keyword(null,"flex-shrink","flex-shrink",1481146383),(1)], null),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"color","color",1011675173),"#aaf",new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),"bold",new cljs.core.Keyword(null,"margin-right","margin-right",809689658),(5),new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),(5),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(11),new cljs.core.Keyword(null,"padding-top","padding-top",1929675955),(2),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521)], null),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"red","red",-969428204),new cljs.core.Keyword(null,"padding","padding",1660304693),"5px 10px"], null),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#aaa"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"word-wrap","word-wrap",-1700975926),new cljs.core.Keyword(null,"break-word","break-word",-153550263)], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"padding","padding",1660304693),"5px 10px",new cljs.core.Keyword(null,"font-family","font-family",-667419874),"monospace",new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.3em",new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"1px solid #aaa"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"padding","padding",1660304693),"8px 5px 8px 10px",new cljs.core.Keyword(null,"margin-right","margin-right",809689658),(0),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521)], null),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"absolute","absolute",1655386478),new cljs.core.Keyword(null,"top","top",-1856271961),(0),new cljs.core.Keyword(null,"left","left",-399115937),(0),new cljs.core.Keyword(null,"right","right",-452581833),(0),new cljs.core.Keyword(null,"z-index","z-index",1892827090),(1000),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"background-color","background-color",570434026),"#eef",new cljs.core.Keyword(null,"flex-wrap","flex-wrap",455413707),new cljs.core.Keyword(null,"wrap","wrap",851669987)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#eee",new cljs.core.Keyword(null,"padding","padding",1660304693),"0 5px"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),(200),new cljs.core.Keyword(null,"overflow","overflow",2058931880),new cljs.core.Keyword(null,"auto","auto",-566279492),new cljs.core.Keyword(null,"padding","padding",1660304693),"5px 10px"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"border-top","border-top",-158897573),"2px solid #eee",new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"2px solid #eee"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"word-wrap","word-wrap",-1700975926),new cljs.core.Keyword(null,"break-word","break-word",-153550263)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#55f",new cljs.core.Keyword(null,"margin-right","margin-right",809689658),(10)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"relative","relative",22796862),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(12)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),(10)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#ccc",new cljs.core.Keyword(null,"padding","padding",1660304693),"3px 10px"], null),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"font-family","font-family",-667419874),"monospace",new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"white-space","white-space",-707351930),"pre-wrap"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"3px 5px 3px"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#eee"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"overflow","overflow",2058931880),new cljs.core.Keyword(null,"hidden","hidden",-312506092),new cljs.core.Keyword(null,"height","height",1025178622),(20)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"padding","padding",1660304693),"3px 5px"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#ccc",new cljs.core.Keyword(null,"padding","padding",1660304693),"5px 10px"], null)]);
reepl.core.view = cljs.core.partial.call(null,reepl.helpers.view,reepl.core.styles);
reepl.core.text = cljs.core.partial.call(null,reepl.helpers.text,reepl.core.styles);
reepl.core.button = cljs.core.partial.call(null,reepl.helpers.button,reepl.core.styles);
reepl.core.intro_message = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.text,new cljs.core.Keyword(null,"intro-message","intro-message",1521955840),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.text,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"font-weight","font-weight",2085804583),new cljs.core.Keyword(null,"bold","bold",-116809535),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),"1.2em"], null)], null),"Reepl: "], null),"the cljs Read-eval-print-loop that really understands you.\n  Type ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.text,new cljs.core.Keyword(null,"intro-code","intro-code",694747337),":cljs/clear"], null)," to clear the history"], null);
if(typeof reepl.core.repl_item !== 'undefined'){
} else {
reepl.core.repl_item = (function (){var method_table__7366__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7367__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7368__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7369__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7370__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"reepl.core","repl-item"),((function (method_table__7366__auto__,prefer_table__7367__auto__,method_cache__7368__auto__,cached_hierarchy__7369__auto__,hierarchy__7370__auto__){
return (function (item,opts){
return new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(item);
});})(method_table__7366__auto__,prefer_table__7367__auto__,method_cache__7368__auto__,cached_hierarchy__7369__auto__,hierarchy__7370__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7370__auto__,method_table__7366__auto__,prefer_table__7367__auto__,method_cache__7368__auto__,cached_hierarchy__7369__auto__));
})();
}
cljs.core._add_method.call(null,reepl.core.repl_item,new cljs.core.Keyword(null,"input","input",556931961),(function (p__16992,_){
var map__16993 = p__16992;
var map__16993__$1 = ((((!((map__16993 == null)))?((((map__16993.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16993.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16993):map__16993);
var num = cljs.core.get.call(null,map__16993__$1,new cljs.core.Keyword(null,"num","num",1985240673));
var text = cljs.core.get.call(null,map__16993__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"repl-item","repl-item",152498044),new cljs.core.Keyword(null,"input-item","input-item",-1524386460)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"caret","caret",-1275001854),new cljs.core.Keyword(null,"input-caret","input-caret",-1491147666)], null)], null),"[",num,"]>"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"input-text","input-text",-1336297114),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.code_mirror.colored_text,text], null)], null)], null);
}));
cljs.core._add_method.call(null,reepl.core.repl_item,new cljs.core.Keyword(null,"log","log",-1595516004),(function (p__16995,opts){
var map__16996 = p__16995;
var map__16996__$1 = ((((!((map__16996 == null)))?((((map__16996.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16996.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16996):map__16996);
var value = cljs.core.get.call(null,map__16996__$1,new cljs.core.Keyword(null,"value","value",305978217));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"repl-item","repl-item",152498044),new cljs.core.Keyword(null,"log-item","log-item",-1168302303)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_value.show_value,value,null,opts], null)], null);
}));
cljs.core._add_method.call(null,reepl.core.repl_item,new cljs.core.Keyword(null,"error","error",-978969032),(function (p__16998,opts){
var map__16999 = p__16998;
var map__16999__$1 = ((((!((map__16999 == null)))?((((map__16999.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16999.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16999):map__16999);
var value = cljs.core.get.call(null,map__16999__$1,new cljs.core.Keyword(null,"value","value",305978217));
var message = value.message;
var underlying = value.cause;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"repl-item","repl-item",152498044),new cljs.core.Keyword(null,"output-item","output-item",-243378432),new cljs.core.Keyword(null,"error-item","error-item",-13017340)], null)], null),message,(cljs.core.truth_(underlying)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.text,new cljs.core.Keyword(null,"underlying-error","underlying-error",-223698892),underlying.message], null):null)], null);
}));
cljs.core._add_method.call(null,reepl.core.repl_item,new cljs.core.Keyword(null,"output","output",-1105869043),(function (p__17001,opts){
var map__17002 = p__17001;
var map__17002__$1 = ((((!((map__17002 == null)))?((((map__17002.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17002.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17002):map__17002);
var value = cljs.core.get.call(null,map__17002__$1,new cljs.core.Keyword(null,"value","value",305978217));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"repl-item","repl-item",152498044),new cljs.core.Keyword(null,"output-item","output-item",-243378432)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"caret","caret",-1275001854),new cljs.core.Keyword(null,"output-caret","output-caret",-1406552955)], null)], null),"<"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"output-value","output-value",537285708),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_value.show_value,value,null,opts], null)], null)], null);
}));
reepl.core.repl_items = (function reepl$core$repl_items(_){
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (this$){
var el = reagent.core.dom_node.call(null,this$);
return el.scrollTop = el.scrollHeight;
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (items,opts){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"repl-items","repl-items",847159361),reepl.core.intro_message], null),cljs.core.map.call(null,(function (p1__17004_SHARP_){
return reepl.core.repl_item.call(null,p1__17004_SHARP_,opts);
}),items));
})], null));
});
reepl.core.canScrollIfNeeded = !((document.body.scrollIntoViewIfNeeded() == null));
reepl.core.completion_item = (function reepl$core$completion_item(text,is_selected,is_active,set_active){
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (this$,p__17008){
var vec__17009 = p__17008;
var _ = cljs.core.nth.call(null,vec__17009,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__17009,(1),null);
var old_is_selected = cljs.core.nth.call(null,vec__17009,(2),null);
var vec__17010 = reagent.core.argv.call(null,this$);
var ___$2 = cljs.core.nth.call(null,vec__17010,(0),null);
var ___$3 = cljs.core.nth.call(null,vec__17010,(1),null);
var is_selected__$1 = cljs.core.nth.call(null,vec__17010,(2),null);
if(cljs.core.truth_((function (){var and__6441__auto__ = cljs.core.not.call(null,old_is_selected);
if(and__6441__auto__){
return is_selected__$1;
} else {
return and__6441__auto__;
}
})())){
if(cljs.core.truth_(reepl.core.canScrollIfNeeded)){
return reagent.core.dom_node.call(null,this$).scrollIntoViewIfNeeded(false);
} else {
return reagent.core.dom_node.call(null,this$).scrollIntoView();
}
} else {
return null;
}
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (text__$1,is_selected__$1,is_active__$1,set_active__$1){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),set_active__$1,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"completion-item","completion-item",-2129625962),(function (){var and__6441__auto__ = is_selected__$1;
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
reepl.core.completion_list = (function reepl$core$completion_list(p__17013,set_active){
var map__17016 = p__17013;
var map__17016__$1 = ((((!((map__17016 == null)))?((((map__17016.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17016.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17016):map__17016);
var pos = cljs.core.get.call(null,map__17016__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var list = cljs.core.get.call(null,map__17016__$1,new cljs.core.Keyword(null,"list","list",765357683));
var active = cljs.core.get.call(null,map__17016__$1,new cljs.core.Keyword(null,"active","active",1895962068));
var show_all = cljs.core.get.call(null,map__17016__$1,new cljs.core.Keyword(null,"show-all","show-all",715701051));
var items = cljs.core.map_indexed.call(null,((function (map__17016,map__17016__$1,pos,list,active,show_all){
return (function (p1__17012_SHARP_,p2__17011_SHARP_){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.completion_item,cljs.core.get.call(null,p2__17011_SHARP_,(2)),cljs.core._EQ_.call(null,p1__17012_SHARP_,pos),active,cljs.core.partial.call(null,set_active,p1__17012_SHARP_)], null);
});})(map__17016,map__17016__$1,pos,list,active,show_all))
,list);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"completion-container","completion-container",51436015),(cljs.core.truth_(show_all)?cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"completion-show-all","completion-show-all",1293356904)], null),items):null),((cljs.core.empty_QMARK_.call(null,items))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"completion-empty","completion-empty",424403284),"This is where completions show up"], null):cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"completion-list","completion-list",-809135461)], null),items))], null);
});
reepl.core.is_valid_cljs_QMARK_ = (function reepl$core$is_valid_cljs_QMARK_(source){
try{cljs.tools.reader.read_string.call(null,source);

return true;
}catch (e17019){if((e17019 instanceof Error)){
var _ = e17019;
return false;
} else {
throw e17019;

}
}});
reepl.core.default_cm_opts = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"should-go-up","should-go-up",2137977547),(function (source,inst){
var pos = inst.getCursor();
return cljs.core._EQ_.call(null,(0),pos.line);
}),new cljs.core.Keyword(null,"should-go-down","should-go-down",473755082),(function (source,inst){
var pos = inst.getCursor();
var last_line = inst.lastLine();
return cljs.core._EQ_.call(null,last_line,pos.line);
}),new cljs.core.Keyword(null,"should-eval","should-eval",-681728538),(function (source,inst,evt){
if(cljs.core.truth_(evt.shiftKey)){
return false;
} else {
if(cljs.core.truth_(evt.metaKey)){
return true;
} else {
var lines = inst.lineCount();
var in_place = (function (){var or__6453__auto__ = cljs.core._EQ_.call(null,(1),lines);
if(or__6453__auto__){
return or__6453__auto__;
} else {
var pos = inst.getCursor();
var last_line = (lines - (1));
return (cljs.core._EQ_.call(null,last_line,pos.line)) && (cljs.core._EQ_.call(null,pos.ch,cljs.core.count.call(null,inst.getLine(last_line))));
}
})();
var and__6441__auto__ = in_place;
if(and__6441__auto__){
return reepl.core.is_valid_cljs_QMARK_.call(null,source);
} else {
return and__6441__auto__;
}
}
}
})], null);
reepl.core.repl_input = (function reepl$core$repl_input(state,submit,cm_opts){
if(cljs.core.every_QMARK_.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.nil_QMARK_),cljs.core.map.call(null,cm_opts,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"on-up","on-up",-127496699),new cljs.core.Keyword(null,"on-down","on-down",2037743467),new cljs.core.Keyword(null,"complete-atom","complete-atom",-243286874),new cljs.core.Keyword(null,"complete-word","complete-word",1063206084),new cljs.core.Keyword(null,"on-change","on-change",-732046149)], null)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",2083724064,null),cljs.core.list(new cljs.core.Symbol(null,"comp","comp",-1462482139,null),new cljs.core.Symbol(null,"not","not",1044554643,null),new cljs.core.Symbol(null,"nil?","nil?",1612038930,null)),cljs.core.list(new cljs.core.Symbol(null,"map","map",-1282745308,null),new cljs.core.Symbol(null,"cm-opts","cm-opts",846308107,null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"on-up","on-up",-127496699),new cljs.core.Keyword(null,"on-down","on-down",2037743467),new cljs.core.Keyword(null,"complete-atom","complete-atom",-243286874),new cljs.core.Keyword(null,"complete-word","complete-word",1063206084),new cljs.core.Keyword(null,"on-change","on-change",-732046149)], null)))))].join('')));
}

var map__17022 = cljs.core.deref.call(null,state);
var map__17022__$1 = ((((!((map__17022 == null)))?((((map__17022.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17022.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17022):map__17022);
var pos = cljs.core.get.call(null,map__17022__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var count = cljs.core.get.call(null,map__17022__$1,new cljs.core.Keyword(null,"count","count",2139924085));
var text = cljs.core.get.call(null,map__17022__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"input-container","input-container",-1901353206),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input-caret","input-caret",-1491147666),new cljs.core.Keyword(null,"main-caret","main-caret",-843467512)], null)], null),"[",(pos + (1)),"/",count,"]>"], null),cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.code_mirror.code_mirror,reagent.ratom.make_reaction.call(null,((function (map__17022,map__17022__$1,pos,count,text){
return (function (){
return new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state));
});})(map__17022,map__17022__$1,pos,count,text))
),cljs.core.merge.call(null,reepl.core.default_cm_opts,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"height","height",1025178622),"auto",new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(16),new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"padding","padding",1660304693),"2px"], null),new cljs.core.Keyword(null,"on-eval","on-eval",-1349336659),submit], null),cm_opts)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),[cljs.core.str(cljs.core.hash.call(null,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640).cljs$core$IFn$_invoke$arity$1(cm_opts)))].join('')], null))], null);
});
reepl.core.docs_view = (function reepl$core$docs_view(docs){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"docs","docs",-1974280502),(function (){var or__6453__auto__ = docs;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"docs-empty","docs-empty",1512179135),"This is where docs show up"], null);
}
})()], null);
});
reepl.core.set_print_BANG_ = (function reepl$core$set_print_BANG_(log){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__17024__delegate = function (args){
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,args))){
return log.call(null,cljs.core.first.call(null,args));
} else {
return log.call(null,args);
}
};
var G__17024 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__17025__i = 0, G__17025__a = new Array(arguments.length -  0);
while (G__17025__i < G__17025__a.length) {G__17025__a[G__17025__i] = arguments[G__17025__i + 0]; ++G__17025__i;}
  args = new cljs.core.IndexedSeq(G__17025__a,0);
} 
return G__17024__delegate.call(this,args);};
G__17024.cljs$lang$maxFixedArity = 0;
G__17024.cljs$lang$applyTo = (function (arglist__17026){
var args = cljs.core.seq(arglist__17026);
return G__17024__delegate(args);
});
G__17024.cljs$core$IFn$_invoke$arity$variadic = G__17024__delegate;
return G__17024;
})()
;

return cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__17027__delegate = function (args){
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,args))){
return log.call(null,cljs.core.first.call(null,args));
} else {
return log.call(null,args);
}
};
var G__17027 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__17028__i = 0, G__17028__a = new Array(arguments.length -  0);
while (G__17028__i < G__17028__a.length) {G__17028__a[G__17028__i] = arguments[G__17028__i + 0]; ++G__17028__i;}
  args = new cljs.core.IndexedSeq(G__17028__a,0);
} 
return G__17027__delegate.call(this,args);};
G__17027.cljs$lang$maxFixedArity = 0;
G__17027.cljs$lang$applyTo = (function (arglist__17029){
var args = cljs.core.seq(arglist__17029);
return G__17027__delegate(args);
});
G__17027.cljs$core$IFn$_invoke$arity$variadic = G__17027__delegate;
return G__17027;
})()
;
});
reepl.core.initial_state = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178),(0),new cljs.core.Keyword(null,"history","history",-247395220),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["{:a 2 {:b 3} 4}"], null)], null);
reepl.core.make_handlers = (function reepl$core$make_handlers(state){
return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"add-input","add-input",-994386222),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.add_input),new cljs.core.Keyword(null,"add-result","add-result",1382794315),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.add_result),new cljs.core.Keyword(null,"go-up","go-up",-783282342),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.go_up),new cljs.core.Keyword(null,"go-down","go-down",-1002511595),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.go_down),new cljs.core.Keyword(null,"clear-items","clear-items",524826180),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.clear_items),new cljs.core.Keyword(null,"set-text","set-text",1346789745),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.set_text),new cljs.core.Keyword(null,"add-log","add-log",1433037691),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.add_log)], null);
});
reepl.core.repl = (function reepl$core$repl(var_args){
var args__7518__auto__ = [];
var len__7511__auto___17043 = arguments.length;
var i__7512__auto___17044 = (0);
while(true){
if((i__7512__auto___17044 < len__7511__auto___17043)){
args__7518__auto__.push((arguments[i__7512__auto___17044]));

var G__17045 = (i__7512__auto___17044 + (1));
i__7512__auto___17044 = G__17045;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return reepl.core.repl.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

reepl.core.repl.cljs$core$IFn$_invoke$arity$variadic = (function (p__17033){
var map__17034 = p__17033;
var map__17034__$1 = ((((!((map__17034 == null)))?((((map__17034.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17034.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17034):map__17034);
var execute = cljs.core.get.call(null,map__17034__$1,new cljs.core.Keyword(null,"execute","execute",-129499188));
var complete_word = cljs.core.get.call(null,map__17034__$1,new cljs.core.Keyword(null,"complete-word","complete-word",1063206084));
var get_docs = cljs.core.get.call(null,map__17034__$1,new cljs.core.Keyword(null,"get-docs","get-docs",-698720007));
var state = cljs.core.get.call(null,map__17034__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var show_value_opts = cljs.core.get.call(null,map__17034__$1,new cljs.core.Keyword(null,"show-value-opts","show-value-opts",-412296519));
var js_cm_opts = cljs.core.get.call(null,map__17034__$1,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640));
var on_cm_init = cljs.core.get.call(null,map__17034__$1,new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782));
var state__$1 = (function (){var or__6453__auto__ = state;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return reagent.core.atom.call(null,reepl.core.initial_state);
}
})();
var map__17036 = reepl.core.make_handlers.call(null,state__$1);
var map__17036__$1 = ((((!((map__17036 == null)))?((((map__17036.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17036.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17036):map__17036);
var add_input = cljs.core.get.call(null,map__17036__$1,new cljs.core.Keyword(null,"add-input","add-input",-994386222));
var add_result = cljs.core.get.call(null,map__17036__$1,new cljs.core.Keyword(null,"add-result","add-result",1382794315));
var go_up = cljs.core.get.call(null,map__17036__$1,new cljs.core.Keyword(null,"go-up","go-up",-783282342));
var go_down = cljs.core.get.call(null,map__17036__$1,new cljs.core.Keyword(null,"go-down","go-down",-1002511595));
var clear_items = cljs.core.get.call(null,map__17036__$1,new cljs.core.Keyword(null,"clear-items","clear-items",524826180));
var set_text = cljs.core.get.call(null,map__17036__$1,new cljs.core.Keyword(null,"set-text","set-text",1346789745));
var add_log = cljs.core.get.call(null,map__17036__$1,new cljs.core.Keyword(null,"add-log","add-log",1433037691));
var items = reepl.subs.items.call(null,state__$1);
var complete_atom = reagent.core.atom.call(null,null);
var docs = reagent.ratom.make_reaction.call(null,((function (state__$1,map__17036,map__17036__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_atom,map__17034,map__17034__$1,execute,complete_word,get_docs,state,show_value_opts,js_cm_opts,on_cm_init){
return (function (){
var map__17038 = cljs.core.deref.call(null,complete_atom);
var map__17038__$1 = ((((!((map__17038 == null)))?((((map__17038.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17038.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17038):map__17038);
var state__$2 = map__17038__$1;
var pos = cljs.core.get.call(null,map__17038__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var list = cljs.core.get.call(null,map__17038__$1,new cljs.core.Keyword(null,"list","list",765357683));
if(cljs.core.truth_(state__$2)){
var sym = cljs.core.first.call(null,cljs.core.get.call(null,list,pos));
if((sym instanceof cljs.core.Symbol)){
return get_docs.call(null,sym);
} else {
return null;
}
} else {
return null;
}
});})(state__$1,map__17036,map__17036__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_atom,map__17034,map__17034__$1,execute,complete_word,get_docs,state,show_value_opts,js_cm_opts,on_cm_init))
);
var submit = ((function (state__$1,map__17036,map__17036__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_atom,docs,map__17034,map__17034__$1,execute,complete_word,get_docs,state,show_value_opts,js_cm_opts,on_cm_init){
return (function (text){
if(cljs.core._EQ_.call(null,":cljs/clear",text.trim())){
clear_items.call(null);

return set_text.call(null,"");
} else {
if(((0) < cljs.core.count.call(null,text.trim()))){
set_text.call(null,text);

add_input.call(null,text);

return execute.call(null,text,((function (state__$1,map__17036,map__17036__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_atom,docs,map__17034,map__17034__$1,execute,complete_word,get_docs,state,show_value_opts,js_cm_opts,on_cm_init){
return (function (p1__17030_SHARP_,p2__17031_SHARP_){
return add_result.call(null,cljs.core.not.call(null,p1__17030_SHARP_),p2__17031_SHARP_);
});})(state__$1,map__17036,map__17036__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_atom,docs,map__17034,map__17034__$1,execute,complete_word,get_docs,state,show_value_opts,js_cm_opts,on_cm_init))
);
} else {
return null;
}
}
});})(state__$1,map__17036,map__17036__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_atom,docs,map__17034,map__17034__$1,execute,complete_word,get_docs,state,show_value_opts,js_cm_opts,on_cm_init))
;
reepl.core.set_print_BANG_.call(null,add_log);

return ((function (state__$1,map__17036,map__17036__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_atom,docs,submit,map__17034,map__17034__$1,execute,complete_word,get_docs,state,show_value_opts,js_cm_opts,on_cm_init){
return (function() { 
var G__17046__delegate = function (p__17040){
var map__17041 = p__17040;
var map__17041__$1 = ((((!((map__17041 == null)))?((((map__17041.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17041.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17041):map__17041);
var execute__$1 = cljs.core.get.call(null,map__17041__$1,new cljs.core.Keyword(null,"execute","execute",-129499188));
var complete_word__$1 = cljs.core.get.call(null,map__17041__$1,new cljs.core.Keyword(null,"complete-word","complete-word",1063206084));
var get_docs__$1 = cljs.core.get.call(null,map__17041__$1,new cljs.core.Keyword(null,"get-docs","get-docs",-698720007));
var state__$2 = cljs.core.get.call(null,map__17041__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var show_value_opts__$1 = cljs.core.get.call(null,map__17041__$1,new cljs.core.Keyword(null,"show-value-opts","show-value-opts",-412296519));
var js_cm_opts__$1 = cljs.core.get.call(null,map__17041__$1,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640));
var on_cm_init__$1 = cljs.core.get.call(null,map__17041__$1,new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782));
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"container","container",-1736937707),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.repl_items,cljs.core.deref.call(null,items),show_value_opts__$1], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.repl_input,reepl.subs.current_text.call(null,state__$2),submit,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"complete-word","complete-word",1063206084),complete_word__$1,new cljs.core.Keyword(null,"on-up","on-up",-127496699),go_up,new cljs.core.Keyword(null,"on-down","on-down",2037743467),go_down,new cljs.core.Keyword(null,"complete-atom","complete-atom",-243286874),complete_atom,new cljs.core.Keyword(null,"on-change","on-change",-732046149),set_text,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640),js_cm_opts__$1,new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782),on_cm_init__$1], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.completion_list,cljs.core.deref.call(null,complete_atom),cljs.core.identity], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.docs_view,cljs.core.deref.call(null,docs)], null)], null);
};
var G__17046 = function (var_args){
var p__17040 = null;
if (arguments.length > 0) {
var G__17047__i = 0, G__17047__a = new Array(arguments.length -  0);
while (G__17047__i < G__17047__a.length) {G__17047__a[G__17047__i] = arguments[G__17047__i + 0]; ++G__17047__i;}
  p__17040 = new cljs.core.IndexedSeq(G__17047__a,0);
} 
return G__17046__delegate.call(this,p__17040);};
G__17046.cljs$lang$maxFixedArity = 0;
G__17046.cljs$lang$applyTo = (function (arglist__17048){
var p__17040 = cljs.core.seq(arglist__17048);
return G__17046__delegate(p__17040);
});
G__17046.cljs$core$IFn$_invoke$arity$variadic = G__17046__delegate;
return G__17046;
})()
;
;})(state__$1,map__17036,map__17036__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_atom,docs,submit,map__17034,map__17034__$1,execute,complete_word,get_docs,state,show_value_opts,js_cm_opts,on_cm_init))
});

reepl.core.repl.cljs$lang$maxFixedArity = (0);

reepl.core.repl.cljs$lang$applyTo = (function (seq17032){
return reepl.core.repl.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17032));
});
