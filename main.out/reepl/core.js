// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.core');
goog.require('cljs.core');
goog.require('reepl.completions');
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
reepl.core.styles = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"intro-message","intro-message",1521955840),new cljs.core.Keyword(null,"completion-active","completion-active",-855262010),new cljs.core.Keyword(null,"main-caret","main-caret",-843467512),new cljs.core.Keyword(null,"completion-show-all","completion-show-all",1293356904),new cljs.core.Keyword(null,"intro-code","intro-code",694747337),new cljs.core.Keyword(null,"docs","docs",-1974280502),new cljs.core.Keyword(null,"input-container","input-container",-1901353206),new cljs.core.Keyword(null,"input-caret","input-caret",-1491147666),new cljs.core.Keyword(null,"completion-container","completion-container",51436015),new cljs.core.Keyword(null,"completion-empty","completion-empty",424403284),new cljs.core.Keyword(null,"container","container",-1736937707),new cljs.core.Keyword(null,"completion-item","completion-item",-2129625962),new cljs.core.Keyword(null,"completion-selected","completion-selected",-1330940649),new cljs.core.Keyword(null,"completion-list","completion-list",-809135461),new cljs.core.Keyword(null,"docs-empty","docs-empty",1512179135)],[new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"padding","padding",1660304693),"10px 20px",new cljs.core.Keyword(null,"line-height","line-height",1870784992),1.5,new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"1px solid #aaa",new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(10)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#aaa"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"padding","padding",1660304693),"8px 5px 8px 10px",new cljs.core.Keyword(null,"margin-right","margin-right",809689658),(0),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521)], null),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"absolute","absolute",1655386478),new cljs.core.Keyword(null,"top","top",-1856271961),(0),new cljs.core.Keyword(null,"left","left",-399115937),(0),new cljs.core.Keyword(null,"right","right",-452581833),(0),new cljs.core.Keyword(null,"z-index","z-index",1892827090),(1000),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"background-color","background-color",570434026),"#eef",new cljs.core.Keyword(null,"flex-wrap","flex-wrap",455413707),new cljs.core.Keyword(null,"wrap","wrap",851669987)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#eee",new cljs.core.Keyword(null,"padding","padding",1660304693),"0 5px"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"height","height",1025178622),(200),new cljs.core.Keyword(null,"overflow","overflow",2058931880),new cljs.core.Keyword(null,"auto","auto",-566279492),new cljs.core.Keyword(null,"padding","padding",1660304693),"5px 10px"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"border-top","border-top",-158897573),"2px solid #eee",new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"2px solid #eee"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#55f",new cljs.core.Keyword(null,"margin-right","margin-right",809689658),(10)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"relative","relative",22796862),new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(12)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#ccc",new cljs.core.Keyword(null,"padding","padding",1660304693),"3px 10px"], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"font-family","font-family",-667419874),"monospace",new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"white-space","white-space",-707351930),"pre-wrap"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"padding","padding",1660304693),"3px 5px 3px"], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background-color","background-color",570434026),"#eee"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"overflow","overflow",2058931880),new cljs.core.Keyword(null,"hidden","hidden",-312506092),new cljs.core.Keyword(null,"height","height",1025178622),(20)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"color","color",1011675173),"#ccc",new cljs.core.Keyword(null,"padding","padding",1660304693),"5px 10px"], null)]);
reepl.core.view = cljs.core.partial.call(null,reepl.helpers.view,reepl.core.styles);
reepl.core.text = cljs.core.partial.call(null,reepl.helpers.text,reepl.core.styles);
reepl.core.button = cljs.core.partial.call(null,reepl.helpers.button,reepl.core.styles);
reepl.core.is_valid_cljs_QMARK_ = (function reepl$core$is_valid_cljs_QMARK_(source){
try{cljs.tools.reader.read_string.call(null,source);

return true;
}catch (e18205){if((e18205 instanceof Error)){
var _ = e18205;
return false;
} else {
throw e18205;

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
if(cljs.core.every_QMARK_.call(null,cljs.core.comp.call(null,cljs.core.not,cljs.core.nil_QMARK_),cljs.core.map.call(null,cm_opts,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"on-up","on-up",-127496699),new cljs.core.Keyword(null,"on-down","on-down",2037743467),new cljs.core.Keyword(null,"complete-cmd","complete-cmd",1031836051),new cljs.core.Keyword(null,"on-change","on-change",-732046149)], null)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"every?","every?",2083724064,null),cljs.core.list(new cljs.core.Symbol(null,"comp","comp",-1462482139,null),new cljs.core.Symbol(null,"not","not",1044554643,null),new cljs.core.Symbol(null,"nil?","nil?",1612038930,null)),cljs.core.list(new cljs.core.Symbol(null,"map","map",-1282745308,null),new cljs.core.Symbol(null,"cm-opts","cm-opts",846308107,null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"on-up","on-up",-127496699),new cljs.core.Keyword(null,"on-down","on-down",2037743467),new cljs.core.Keyword(null,"complete-cmd","complete-cmd",1031836051),new cljs.core.Keyword(null,"on-change","on-change",-732046149)], null)))))].join('')));
}

var map__18208 = cljs.core.deref.call(null,state);
var map__18208__$1 = ((((!((map__18208 == null)))?((((map__18208.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18208.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18208):map__18208);
var pos = cljs.core.get.call(null,map__18208__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var count = cljs.core.get.call(null,map__18208__$1,new cljs.core.Keyword(null,"count","count",2139924085));
var text = cljs.core.get.call(null,map__18208__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"input-container","input-container",-1901353206),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input-caret","input-caret",-1491147666),new cljs.core.Keyword(null,"main-caret","main-caret",-843467512)], null)], null),"[",(pos + (1)),"/",count,"]>"], null),cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.code_mirror.code_mirror,reagent.ratom.make_reaction.call(null,((function (map__18208,map__18208__$1,pos,count,text){
return (function (){
return new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state));
});})(map__18208,map__18208__$1,pos,count,text))
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
var G__18210__delegate = function (args){
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,args))){
return log.call(null,cljs.core.first.call(null,args));
} else {
return log.call(null,args);
}
};
var G__18210 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__18211__i = 0, G__18211__a = new Array(arguments.length -  0);
while (G__18211__i < G__18211__a.length) {G__18211__a[G__18211__i] = arguments[G__18211__i + 0]; ++G__18211__i;}
  args = new cljs.core.IndexedSeq(G__18211__a,0);
} 
return G__18210__delegate.call(this,args);};
G__18210.cljs$lang$maxFixedArity = 0;
G__18210.cljs$lang$applyTo = (function (arglist__18212){
var args = cljs.core.seq(arglist__18212);
return G__18210__delegate(args);
});
G__18210.cljs$core$IFn$_invoke$arity$variadic = G__18210__delegate;
return G__18210;
})()
;

return cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__18213__delegate = function (args){
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,args))){
return log.call(null,cljs.core.first.call(null,args));
} else {
return log.call(null,args);
}
};
var G__18213 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__18214__i = 0, G__18214__a = new Array(arguments.length -  0);
while (G__18214__i < G__18214__a.length) {G__18214__a[G__18214__i] = arguments[G__18214__i + 0]; ++G__18214__i;}
  args = new cljs.core.IndexedSeq(G__18214__a,0);
} 
return G__18213__delegate.call(this,args);};
G__18213.cljs$lang$maxFixedArity = 0;
G__18213.cljs$lang$applyTo = (function (arglist__18215){
var args = cljs.core.seq(arglist__18215);
return G__18213__delegate(args);
});
G__18213.cljs$core$IFn$_invoke$arity$variadic = G__18213__delegate;
return G__18213;
})()
;
});
reepl.core.initial_state = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178),(0),new cljs.core.Keyword(null,"history","history",-247395220),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["{:a 2 {:b 3} 4}"], null)], null);
/**
 * Get a new completion state.
 */
reepl.core.repl_hint = (function reepl$core$repl_hint(complete_word,p__18216,options){
var map__18219 = p__18216;
var map__18219__$1 = ((((!((map__18219 == null)))?((((map__18219.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18219.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18219):map__18219);
var start = cljs.core.get.call(null,map__18219__$1,new cljs.core.Keyword(null,"start","start",-355208981));
var end = cljs.core.get.call(null,map__18219__$1,new cljs.core.Keyword(null,"end","end",-268185958));
var text = cljs.core.get.call(null,map__18219__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var words = ((!(cljs.core.empty_QMARK_.call(null,text)))?cljs.core.vec.call(null,complete_word.call(null,text)):null);
if(cljs.core.empty_QMARK_.call(null,words)){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"list","list",765357683),words,new cljs.core.Keyword(null,"num","num",1985240673),cljs.core.count.call(null,words),new cljs.core.Keyword(null,"active","active",1895962068),cljs.core._EQ_.call(null,cljs.core.get.call(null,cljs.core.first.call(null,words),(2)),text),new cljs.core.Keyword(null,"show-all","show-all",715701051),false,new cljs.core.Keyword(null,"initial-text","initial-text",1211686190),text,new cljs.core.Keyword(null,"pos","pos",-864607220),(0),new cljs.core.Keyword(null,"from","from",1815293044),start,new cljs.core.Keyword(null,"to","to",192099007),end], null);
}
});
/**
 * Cycle through positions. Returns [active? new-pos].
 * 
 *   count
 *  total number of completions
 *   current
 *  current position
 *   go-back?
 *  should we be going in reverse
 *   initial-active
 *  if false, then we return not-active when wrapping around
 */
reepl.core.cycle_pos = (function reepl$core$cycle_pos(count,current,go_back_QMARK_,initial_active){
if(cljs.core.truth_(go_back_QMARK_)){
if(((0) >= current)){
if(cljs.core.truth_(initial_active)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(count - (1))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,(0)], null);
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(current - (1))], null);
}
} else {
if((current >= (count - (1)))){
if(cljs.core.truth_(initial_active)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(0)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [false,(0)], null);
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(current + (1))], null);
}
}
});
/**
 * Cycle through completions, changing the codemirror text accordingly. Returns
 *   a new state map.
 * 
 *   state
 *  the current completion state
 *   go-back?
 *  whether to cycle in reverse (generally b/c shift is pressed)
 *   cm
 *  the codemirror instance
 *   evt
 *  the triggering event. it will be `.preventDefault'd if there are completions
 *  to cycle through.
 */
reepl.core.cycle_completions = (function reepl$core$cycle_completions(p__18221,go_back_QMARK_,cm,evt){
var map__18225 = p__18221;
var map__18225__$1 = ((((!((map__18225 == null)))?((((map__18225.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18225.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18225):map__18225);
var state = map__18225__$1;
var num = cljs.core.get.call(null,map__18225__$1,new cljs.core.Keyword(null,"num","num",1985240673));
var pos = cljs.core.get.call(null,map__18225__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var active = cljs.core.get.call(null,map__18225__$1,new cljs.core.Keyword(null,"active","active",1895962068));
var from = cljs.core.get.call(null,map__18225__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.call(null,map__18225__$1,new cljs.core.Keyword(null,"to","to",192099007));
var list = cljs.core.get.call(null,map__18225__$1,new cljs.core.Keyword(null,"list","list",765357683));
var initial_text = cljs.core.get.call(null,map__18225__$1,new cljs.core.Keyword(null,"initial-text","initial-text",1211686190));
if(cljs.core.truth_((function (){var and__6441__auto__ = state;
if(cljs.core.truth_(and__6441__auto__)){
return (((1) < cljs.core.count.call(null,list))) || ((((0) < cljs.core.count.call(null,list))) && (!(cljs.core._EQ_.call(null,initial_text,cljs.core.get.call(null,cljs.core.first.call(null,list),(2))))));
} else {
return and__6441__auto__;
}
})())){
evt.preventDefault();

var initial_active = cljs.core._EQ_.call(null,initial_text,cljs.core.get.call(null,cljs.core.first.call(null,list),(2)));
var vec__18227 = (cljs.core.truth_(active)?reepl.core.cycle_pos.call(null,num,pos,go_back_QMARK_,initial_active):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(cljs.core.truth_(go_back_QMARK_)?(num - (1)):pos)], null));
var active__$1 = cljs.core.nth.call(null,vec__18227,(0),null);
var pos__$1 = cljs.core.nth.call(null,vec__18227,(1),null);
var text = (cljs.core.truth_(active__$1)?cljs.core.get.call(null,cljs.core.get.call(null,list,pos__$1),(2)):initial_text);
cm.replaceRange(text,from,to);

return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"pos","pos",-864607220),pos__$1,new cljs.core.Keyword(null,"active","active",1895962068),active__$1,new cljs.core.Keyword(null,"to","to",192099007),{"line": from.line, "ch": (cljs.core.count.call(null,text) + from.ch)});
} else {
return null;
}
});
reepl.core.make_handlers = (function reepl$core$make_handlers(state){
return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"add-input","add-input",-994386222),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.add_input),new cljs.core.Keyword(null,"add-result","add-result",1382794315),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.add_result),new cljs.core.Keyword(null,"go-up","go-up",-783282342),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.go_up),new cljs.core.Keyword(null,"go-down","go-down",-1002511595),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.go_down),new cljs.core.Keyword(null,"clear-items","clear-items",524826180),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.clear_items),new cljs.core.Keyword(null,"set-text","set-text",1346789745),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.set_text),new cljs.core.Keyword(null,"add-log","add-log",1433037691),cljs.core.partial.call(null,cljs.core.swap_BANG_,state,reepl.handlers.add_log)], null);
});
reepl.core.make_complete_cmd = (function reepl$core$make_complete_cmd(complete_word,complete_atom){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"clear","clear",1877104959),(function (){
return cljs.core.reset_BANG_.call(null,complete_atom,null);
}),new cljs.core.Keyword(null,"stop-show-all","stop-show-all",491104641),(function (){
return cljs.core.swap_BANG_.call(null,complete_atom,cljs.core.assoc,new cljs.core.Keyword(null,"show-all","show-all",715701051),false);
}),new cljs.core.Keyword(null,"show-all","show-all",715701051),(function (){
return cljs.core.swap_BANG_.call(null,complete_atom,cljs.core.assoc,new cljs.core.Keyword(null,"show-all","show-all",715701051),true);
}),new cljs.core.Keyword(null,"set","set",304602554),(function (p1__18228_SHARP_){
return cljs.core.reset_BANG_.call(null,complete_atom,reepl.core.repl_hint.call(null,complete_word,p1__18228_SHARP_,null));
}),new cljs.core.Keyword(null,"cycle","cycle",710365284),(function (p1__18229_SHARP_,p2__18230_SHARP_,p3__18231_SHARP_){
return cljs.core.swap_BANG_.call(null,complete_atom,reepl.core.cycle_completions,p1__18229_SHARP_,p2__18230_SHARP_,p3__18231_SHARP_);
})], null);
});
reepl.core.repl = (function reepl$core$repl(var_args){
var args__7518__auto__ = [];
var len__7511__auto___18245 = arguments.length;
var i__7512__auto___18246 = (0);
while(true){
if((i__7512__auto___18246 < len__7511__auto___18245)){
args__7518__auto__.push((arguments[i__7512__auto___18246]));

var G__18247 = (i__7512__auto___18246 + (1));
i__7512__auto___18246 = G__18247;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return reepl.core.repl.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

reepl.core.repl.cljs$core$IFn$_invoke$arity$variadic = (function (p__18235){
var map__18236 = p__18235;
var map__18236__$1 = ((((!((map__18236 == null)))?((((map__18236.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18236.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18236):map__18236);
var execute = cljs.core.get.call(null,map__18236__$1,new cljs.core.Keyword(null,"execute","execute",-129499188));
var complete_word = cljs.core.get.call(null,map__18236__$1,new cljs.core.Keyword(null,"complete-word","complete-word",1063206084));
var get_docs = cljs.core.get.call(null,map__18236__$1,new cljs.core.Keyword(null,"get-docs","get-docs",-698720007));
var state = cljs.core.get.call(null,map__18236__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var complete_atom = cljs.core.get.call(null,map__18236__$1,new cljs.core.Keyword(null,"complete-atom","complete-atom",-243286874));
var show_value_opts = cljs.core.get.call(null,map__18236__$1,new cljs.core.Keyword(null,"show-value-opts","show-value-opts",-412296519));
var js_cm_opts = cljs.core.get.call(null,map__18236__$1,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640));
var on_cm_init = cljs.core.get.call(null,map__18236__$1,new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782));
var state__$1 = (function (){var or__6453__auto__ = state;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return reagent.core.atom.call(null,reepl.core.initial_state);
}
})();
var complete_atom__$1 = (function (){var or__6453__auto__ = complete_atom;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return reagent.core.atom.call(null,null);
}
})();
var map__18238 = reepl.core.make_handlers.call(null,state__$1);
var map__18238__$1 = ((((!((map__18238 == null)))?((((map__18238.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18238.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18238):map__18238);
var add_input = cljs.core.get.call(null,map__18238__$1,new cljs.core.Keyword(null,"add-input","add-input",-994386222));
var add_result = cljs.core.get.call(null,map__18238__$1,new cljs.core.Keyword(null,"add-result","add-result",1382794315));
var go_up = cljs.core.get.call(null,map__18238__$1,new cljs.core.Keyword(null,"go-up","go-up",-783282342));
var go_down = cljs.core.get.call(null,map__18238__$1,new cljs.core.Keyword(null,"go-down","go-down",-1002511595));
var clear_items = cljs.core.get.call(null,map__18238__$1,new cljs.core.Keyword(null,"clear-items","clear-items",524826180));
var set_text = cljs.core.get.call(null,map__18238__$1,new cljs.core.Keyword(null,"set-text","set-text",1346789745));
var add_log = cljs.core.get.call(null,map__18238__$1,new cljs.core.Keyword(null,"add-log","add-log",1433037691));
var items = reepl.subs.items.call(null,state__$1);
var complete_cmd = reepl.core.make_complete_cmd.call(null,complete_word,complete_atom__$1);
var docs = reagent.ratom.make_reaction.call(null,((function (state__$1,complete_atom__$1,map__18238,map__18238__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_cmd,map__18236,map__18236__$1,execute,complete_word,get_docs,state,complete_atom,show_value_opts,js_cm_opts,on_cm_init){
return (function (){
var map__18240 = cljs.core.deref.call(null,complete_atom__$1);
var map__18240__$1 = ((((!((map__18240 == null)))?((((map__18240.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18240.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18240):map__18240);
var state__$2 = map__18240__$1;
var pos = cljs.core.get.call(null,map__18240__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var list = cljs.core.get.call(null,map__18240__$1,new cljs.core.Keyword(null,"list","list",765357683));
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
});})(state__$1,complete_atom__$1,map__18238,map__18238__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_cmd,map__18236,map__18236__$1,execute,complete_word,get_docs,state,complete_atom,show_value_opts,js_cm_opts,on_cm_init))
);
var submit = ((function (state__$1,complete_atom__$1,map__18238,map__18238__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_cmd,docs,map__18236,map__18236__$1,execute,complete_word,get_docs,state,complete_atom,show_value_opts,js_cm_opts,on_cm_init){
return (function (text){
if(cljs.core._EQ_.call(null,":cljs/clear",text.trim())){
clear_items.call(null);

return set_text.call(null,"");
} else {
if(((0) < cljs.core.count.call(null,text.trim()))){
set_text.call(null,text);

add_input.call(null,text);

return execute.call(null,text,((function (state__$1,complete_atom__$1,map__18238,map__18238__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_cmd,docs,map__18236,map__18236__$1,execute,complete_word,get_docs,state,complete_atom,show_value_opts,js_cm_opts,on_cm_init){
return (function (p1__18232_SHARP_,p2__18233_SHARP_){
return add_result.call(null,cljs.core.not.call(null,p1__18232_SHARP_),p2__18233_SHARP_);
});})(state__$1,complete_atom__$1,map__18238,map__18238__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_cmd,docs,map__18236,map__18236__$1,execute,complete_word,get_docs,state,complete_atom,show_value_opts,js_cm_opts,on_cm_init))
);
} else {
return null;
}
}
});})(state__$1,complete_atom__$1,map__18238,map__18238__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_cmd,docs,map__18236,map__18236__$1,execute,complete_word,get_docs,state,complete_atom,show_value_opts,js_cm_opts,on_cm_init))
;
reepl.core.set_print_BANG_.call(null,add_log);

return ((function (state__$1,complete_atom__$1,map__18238,map__18238__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_cmd,docs,submit,map__18236,map__18236__$1,execute,complete_word,get_docs,state,complete_atom,show_value_opts,js_cm_opts,on_cm_init){
return (function() { 
var G__18248__delegate = function (p__18242){
var map__18243 = p__18242;
var map__18243__$1 = ((((!((map__18243 == null)))?((((map__18243.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18243.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18243):map__18243);
var execute__$1 = cljs.core.get.call(null,map__18243__$1,new cljs.core.Keyword(null,"execute","execute",-129499188));
var get_docs__$1 = cljs.core.get.call(null,map__18243__$1,new cljs.core.Keyword(null,"get-docs","get-docs",-698720007));
var state__$2 = cljs.core.get.call(null,map__18243__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var show_value_opts__$1 = cljs.core.get.call(null,map__18243__$1,new cljs.core.Keyword(null,"show-value-opts","show-value-opts",-412296519));
var js_cm_opts__$1 = cljs.core.get.call(null,map__18243__$1,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640));
var on_cm_init__$1 = cljs.core.get.call(null,map__18243__$1,new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782));
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.view,new cljs.core.Keyword(null,"container","container",-1736937707),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.repl_items.repl_items,cljs.core.deref.call(null,items),cljs.core.assoc.call(null,show_value_opts__$1,new cljs.core.Keyword(null,"set-text","set-text",1346789745),set_text)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.repl_input,reepl.subs.current_text.call(null,state__$2),submit,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"on-up","on-up",-127496699),go_up,new cljs.core.Keyword(null,"on-down","on-down",2037743467),go_down,new cljs.core.Keyword(null,"complete-cmd","complete-cmd",1031836051),complete_cmd,new cljs.core.Keyword(null,"on-change","on-change",-732046149),set_text,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640),js_cm_opts__$1,new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782),on_cm_init__$1], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.completions.completion_list,cljs.core.deref.call(null,complete_atom__$1),cljs.core.identity], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.docs_view,cljs.core.deref.call(null,docs)], null)], null);
};
var G__18248 = function (var_args){
var p__18242 = null;
if (arguments.length > 0) {
var G__18249__i = 0, G__18249__a = new Array(arguments.length -  0);
while (G__18249__i < G__18249__a.length) {G__18249__a[G__18249__i] = arguments[G__18249__i + 0]; ++G__18249__i;}
  p__18242 = new cljs.core.IndexedSeq(G__18249__a,0);
} 
return G__18248__delegate.call(this,p__18242);};
G__18248.cljs$lang$maxFixedArity = 0;
G__18248.cljs$lang$applyTo = (function (arglist__18250){
var p__18242 = cljs.core.seq(arglist__18250);
return G__18248__delegate(p__18242);
});
G__18248.cljs$core$IFn$_invoke$arity$variadic = G__18248__delegate;
return G__18248;
})()
;
;})(state__$1,complete_atom__$1,map__18238,map__18238__$1,add_input,add_result,go_up,go_down,clear_items,set_text,add_log,items,complete_cmd,docs,submit,map__18236,map__18236__$1,execute,complete_word,get_docs,state,complete_atom,show_value_opts,js_cm_opts,on_cm_init))
});

reepl.core.repl.cljs$lang$maxFixedArity = (0);

reepl.core.repl.cljs$lang$applyTo = (function (seq18234){
return reepl.core.repl.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq18234));
});
