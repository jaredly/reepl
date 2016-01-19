// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.code_mirror');
goog.require('cljs.core');
goog.require('cljs.pprint');
goog.require('reagent.core');
goog.require('clojure.string');
reepl.code_mirror.wordChars = "[^\\s\\(\\)\\[\\]\\{\\},`']*";
reepl.code_mirror.word_in_line = (function reepl$code_mirror$word_in_line(line,lno,cno){
var back = cljs.core.get.call(null,line.slice((0),cno).match((new RegExp([cljs.core.str(reepl.code_mirror.wordChars),cljs.core.str("$")].join('')))),(0));
var forward = cljs.core.get.call(null,line.slice(cno).match((new RegExp([cljs.core.str("^"),cljs.core.str(reepl.code_mirror.wordChars)].join('')))),(0));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),{"line": lno, "ch": (cno - cljs.core.count.call(null,back))},new cljs.core.Keyword(null,"end","end",-268185958),{"line": lno, "ch": (cno + cljs.core.count.call(null,forward))}], null);
});
/**
 * Find the current 'word' according to CodeMirror's `wordChars' list
 */
reepl.code_mirror.cm_current_word = (function reepl$code_mirror$cm_current_word(cm){
var pos = cm.getCursor();
var lno = pos.line;
var cno = pos.ch;
var line = cm.getLine(lno);
return reepl.code_mirror.word_in_line.call(null,line,lno,cno);
});
/**
 * Get a new completion state.
 */
reepl.code_mirror.repl_hint = (function reepl$code_mirror$repl_hint(complete_word,cm,options){
var range = reepl.code_mirror.cm_current_word.call(null,cm);
var text = cm.getRange(new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(range),new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(range));
var words = ((!(cljs.core.empty_QMARK_.call(null,text)))?cljs.core.vec.call(null,complete_word.call(null,text)):null);
if(cljs.core.empty_QMARK_.call(null,words)){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"list","list",765357683),words,new cljs.core.Keyword(null,"num","num",1985240673),cljs.core.count.call(null,words),new cljs.core.Keyword(null,"active","active",1895962068),cljs.core._EQ_.call(null,cljs.core.get.call(null,cljs.core.first.call(null,words),(2)),text),new cljs.core.Keyword(null,"show-all","show-all",715701051),false,new cljs.core.Keyword(null,"initial-text","initial-text",1211686190),text,new cljs.core.Keyword(null,"pos","pos",-864607220),(0),new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(range),new cljs.core.Keyword(null,"to","to",192099007),new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(range)], null);
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
reepl.code_mirror.cycle_pos = (function reepl$code_mirror$cycle_pos(count,current,go_back_QMARK_,initial_active){
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
reepl.code_mirror.cycle_completions = (function reepl$code_mirror$cycle_completions(p__16735,go_back_QMARK_,cm,evt){
var map__16739 = p__16735;
var map__16739__$1 = ((((!((map__16739 == null)))?((((map__16739.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16739.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16739):map__16739);
var state = map__16739__$1;
var num = cljs.core.get.call(null,map__16739__$1,new cljs.core.Keyword(null,"num","num",1985240673));
var pos = cljs.core.get.call(null,map__16739__$1,new cljs.core.Keyword(null,"pos","pos",-864607220));
var active = cljs.core.get.call(null,map__16739__$1,new cljs.core.Keyword(null,"active","active",1895962068));
var from = cljs.core.get.call(null,map__16739__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var to = cljs.core.get.call(null,map__16739__$1,new cljs.core.Keyword(null,"to","to",192099007));
var list = cljs.core.get.call(null,map__16739__$1,new cljs.core.Keyword(null,"list","list",765357683));
var initial_text = cljs.core.get.call(null,map__16739__$1,new cljs.core.Keyword(null,"initial-text","initial-text",1211686190));
if(cljs.core.truth_((function (){var and__6441__auto__ = state;
if(cljs.core.truth_(and__6441__auto__)){
return (((1) < cljs.core.count.call(null,list))) || ((((0) < cljs.core.count.call(null,list))) && (!(cljs.core._EQ_.call(null,initial_text,cljs.core.get.call(null,cljs.core.first.call(null,list),(2))))));
} else {
return and__6441__auto__;
}
})())){
evt.preventDefault();

var initial_active = cljs.core._EQ_.call(null,initial_text,cljs.core.get.call(null,cljs.core.first.call(null,list),(2)));
var vec__16741 = (cljs.core.truth_(active)?reepl.code_mirror.cycle_pos.call(null,num,pos,go_back_QMARK_,initial_active):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,(cljs.core.truth_(go_back_QMARK_)?(num - (1)):pos)], null));
var active__$1 = cljs.core.nth.call(null,vec__16741,(0),null);
var pos__$1 = cljs.core.nth.call(null,vec__16741,(1),null);
var text = (cljs.core.truth_(active__$1)?cljs.core.get.call(null,cljs.core.get.call(null,list,pos__$1),(2)):initial_text);
cm.replaceRange(text,from,to);

return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"pos","pos",-864607220),pos__$1,new cljs.core.Keyword(null,"active","active",1895962068),active__$1,new cljs.core.Keyword(null,"to","to",192099007),{"line": from.line, "ch": (cljs.core.count.call(null,text) + from.ch)});
} else {
return null;
}
});
/**
 * Create a code-mirror editor that knows a fair amount about being a good
 *   repl. The parameters:
 * 
 *   value-atom (reagent atom)
 *  when this changes, the editor will update to reflect it.
 * 
 *   options (TODO finish documenting)
 * 
 *   :style (reagent style map)
 *  will be applied to the container element
 * 
 *   :on-change (fn [text] -> nil)
 *   :on-eval (fn [text] -> nil)
 *   :on-up (fn [] -> nil)
 *   :on-down (fn [] -> nil)
 *   :should-go-up
 *   :should-go-down
 *   :should-eval
 * 
 *   :js-cm-opts
 *  options passed into the CodeMirror constructor
 * 
 *   :on-cm-init (fn [cm] -> nil)
 *  called with the CodeMirror instance, for whatever extra fiddling you want to do.
 */
reepl.code_mirror.code_mirror = (function reepl$code_mirror$code_mirror(value_atom,p__16742){
var map__16746 = p__16742;
var map__16746__$1 = ((((!((map__16746 == null)))?((((map__16746.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16746.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16746):map__16746);
var on_change = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var js_cm_opts = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640));
var complete_word = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"complete-word","complete-word",1063206084));
var on_up = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"on-up","on-up",-127496699));
var should_eval = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"should-eval","should-eval",-681728538));
var on_cm_init = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782));
var complete_atom = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"complete-atom","complete-atom",-243286874));
var should_go_down = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"should-go-down","should-go-down",473755082));
var should_go_up = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"should-go-up","should-go-up",2137977547));
var on_down = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"on-down","on-down",2037743467));
var on_eval = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"on-eval","on-eval",-1349336659));
var style = cljs.core.get.call(null,map__16746__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var cm = cljs.core.atom.call(null,null);
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),((function (cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style){
return (function (this$){
var el = reagent.core.dom_node.call(null,this$);
var cancel_keys = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(27),null,(13),null], null), null);
var cmp_ignore = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [(91),null,(93),null,(17),null,(9),null,(16),null,(18),null], null), null);
var cmp_show = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [(91),null,(93),null,(17),null,(18),null], null), null);
var inst = (new CodeMirror(el,cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"lineNumbers","lineNumbers",1374890941),false,new cljs.core.Keyword(null,"viewportMargin","viewportMargin",948056881),Infinity,new cljs.core.Keyword(null,"matchBrackets","matchBrackets",1256448936),true,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),true,new cljs.core.Keyword(null,"extraKeys","extraKeys",1380834830),{"Shift-Enter": "newlineAndIndent"},new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,value_atom),new cljs.core.Keyword(null,"autoCloseBrackets","autoCloseBrackets",1157493311),true,new cljs.core.Keyword(null,"mode","mode",654403691),"clojure"], null),js_cm_opts))));
cljs.core.reset_BANG_.call(null,cm,inst);

inst.on("change",((function (el,cancel_keys,cmp_ignore,cmp_show,inst,cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style){
return (function (){
var value = inst.getValue();
if(cljs.core._EQ_.call(null,value,cljs.core.deref.call(null,value_atom))){
return null;
} else {
return on_change.call(null,value);
}
});})(el,cancel_keys,cmp_ignore,cmp_show,inst,cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style))
);

inst.on("keyup",((function (el,cancel_keys,cmp_ignore,cmp_show,inst,cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style){
return (function (inst__$1,evt){
if(cljs.core.truth_(cancel_keys.call(null,evt.keyCode))){
return cljs.core.reset_BANG_.call(null,complete_atom,null);
} else {
if(cljs.core.truth_(cmp_show.call(null,evt.keyCode))){
return cljs.core.swap_BANG_.call(null,complete_atom,cljs.core.assoc,new cljs.core.Keyword(null,"show-all","show-all",715701051),false);
} else {
if(cljs.core.truth_(cmp_ignore.call(null,evt.keyCode))){
return null;
} else {
return cljs.core.reset_BANG_.call(null,complete_atom,reepl.code_mirror.repl_hint.call(null,complete_word,inst__$1,null));
}
}
}
});})(el,cancel_keys,cmp_ignore,cmp_show,inst,cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style))
);

inst.on("keydown",((function (el,cancel_keys,cmp_ignore,cmp_show,inst,cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style){
return (function (inst__$1,evt){
var G__16748 = evt.keyCode;
switch (G__16748) {
case (17):
case (18):
case (91):
case (93):
return cljs.core.swap_BANG_.call(null,complete_atom,cljs.core.assoc,new cljs.core.Keyword(null,"show-all","show-all",715701051),true);

break;
case (9):
return cljs.core.swap_BANG_.call(null,complete_atom,reepl.code_mirror.cycle_completions,evt.shiftKey,inst__$1,evt);

break;
case (13):
var source = inst__$1.getValue();
if(cljs.core.truth_(should_eval.call(null,source,inst__$1,evt))){
evt.preventDefault();

return on_eval.call(null,source);
} else {
return null;
}

break;
case (38):
var source = inst__$1.getValue();
if(cljs.core.truth_((function (){var and__6441__auto__ = cljs.core.not.call(null,evt.shiftKey);
if(and__6441__auto__){
return should_go_up.call(null,source,inst__$1);
} else {
return and__6441__auto__;
}
})())){
evt.preventDefault();

return on_up.call(null);
} else {
return null;
}

break;
case (40):
var source = inst__$1.getValue();
if(cljs.core.truth_((function (){var and__6441__auto__ = cljs.core.not.call(null,evt.shiftKey);
if(and__6441__auto__){
return should_go_down.call(null,source,inst__$1);
} else {
return and__6441__auto__;
}
})())){
evt.preventDefault();

return on_down.call(null);
} else {
return null;
}

break;
default:
return new cljs.core.Keyword(null,"none","none",1333468478);

}
});})(el,cancel_keys,cmp_ignore,cmp_show,inst,cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style))
);

if(cljs.core.truth_(on_cm_init)){
return on_cm_init.call(null,inst);
} else {
return null;
}
});})(cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style))
,new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),((function (cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style){
return (function (this$,old_argv){
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,value_atom),cljs.core.deref.call(null,cm).getValue())){
return null;
} else {
cljs.core.deref.call(null,cm).setValue(cljs.core.deref.call(null,value_atom));

var last_line = cljs.core.deref.call(null,cm).lastLine();
var last_ch = cljs.core.count.call(null,cljs.core.deref.call(null,cm).getLine(last_line));
return cljs.core.deref.call(null,cm).setCursor(last_line,last_ch);
}
});})(cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style))
,new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),((function (cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style){
return (function (_,___$1,___$2){
cljs.core.deref.call(null,value_atom);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),style], null)], null);
});})(cm,map__16746,map__16746__$1,on_change,js_cm_opts,complete_word,on_up,should_eval,on_cm_init,complete_atom,should_go_down,should_go_up,on_down,on_eval,style))
], null));
});
reepl.code_mirror.colored_text = (function reepl$code_mirror$colored_text(text,style){
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (this$){
var node = reagent.core.dom_node.call(null,this$);
return (CodeMirror["colorize"]).call(null,[node],"clojure");
}),new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),(function (_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",2118456869),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"padding","padding",1660304693),(0),new cljs.core.Keyword(null,"margin","margin",-995903681),(0)], null),style)], null),text], null);
})], null));
});
