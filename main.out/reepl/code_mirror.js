// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.code_mirror');
goog.require('cljs.core');
goog.require('cljs.pprint');
goog.require('reagent.core');
goog.require('clojure.string');
reepl.code_mirror.wordChars = "[^\\s\\(\\)\\[\\]\\{\\},`']*";
reepl.code_mirror.back_rx = (new RegExp([cljs.core.str(reepl.code_mirror.wordChars),cljs.core.str("$")].join('')));
reepl.code_mirror.forward_rx = (new RegExp([cljs.core.str("^"),cljs.core.str(reepl.code_mirror.wordChars)].join('')));
reepl.code_mirror.word_in_line = (function reepl$code_mirror$word_in_line(line,lno,cno){
var back = cljs.core.first.call(null,line.slice((0),cno).match(reepl.code_mirror.back_rx));
var forward = cljs.core.first.call(null,line.slice(cno).match(reepl.code_mirror.forward_rx));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),{"line": lno, "ch": (cno - cljs.core.count.call(null,back))},new cljs.core.Keyword(null,"end","end",-268185958),{"line": lno, "ch": (cno + cljs.core.count.call(null,forward))}], null);
});
/**
 * Find the current 'word' according to CodeMirror's `wordChars' list
 */
reepl.code_mirror.get_word_range = (function reepl$code_mirror$get_word_range(cm){
var pos = cm.getCursor();
var lno = pos.line;
var cno = pos.ch;
var line = cm.getLine(lno);
return reepl.code_mirror.word_in_line.call(null,line,lno,cno);
});
reepl.code_mirror.get_word_and_range = (function reepl$code_mirror$get_word_and_range(cm){
var range = reepl.code_mirror.get_word_range.call(null,cm);
var text = cm.getRange(new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(range),new cljs.core.Keyword(null,"end","end",-268185958).cljs$core$IFn$_invoke$arity$1(range));
return cljs.core.assoc.call(null,range,new cljs.core.Keyword(null,"text","text",-1790561697),text);
});
reepl.code_mirror.cmp_show = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [(91),null,(93),null,(17),null,(18),null], null), null);
reepl.code_mirror.cancel_keys = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(27),null,(13),null], null), null);
reepl.code_mirror.cmp_ignore = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [(91),null,(93),null,(17),null,(9),null,(16),null,(18),null], null), null);
reepl.code_mirror.complete_keyup = (function reepl$code_mirror$complete_keyup(complete_cmd,key_code,cm){
if(cljs.core.truth_(reepl.code_mirror.cancel_keys.call(null,key_code))){
return complete_cmd.call(null,new cljs.core.Keyword(null,"clear","clear",1877104959)).call(null);
} else {
if(cljs.core.truth_(reepl.code_mirror.cmp_show.call(null,key_code))){
return complete_cmd.call(null,new cljs.core.Keyword(null,"stop-show-all","stop-show-all",491104641)).call(null);
} else {
if(cljs.core.truth_(reepl.code_mirror.cmp_ignore.call(null,key_code))){
return null;
} else {
return complete_cmd.call(null,new cljs.core.Keyword(null,"set","set",304602554)).call(null,reepl.code_mirror.get_word_and_range.call(null,cm));
}
}
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
reepl.code_mirror.code_mirror = (function reepl$code_mirror$code_mirror(value_atom,p__16368){
var map__16372 = p__16368;
var map__16372__$1 = ((((!((map__16372 == null)))?((((map__16372.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16372.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16372):map__16372);
var on_change = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
var js_cm_opts = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640));
var on_up = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"on-up","on-up",-127496699));
var should_eval = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"should-eval","should-eval",-681728538));
var on_cm_init = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782));
var should_go_down = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"should-go-down","should-go-down",473755082));
var should_go_up = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"should-go-up","should-go-up",2137977547));
var on_down = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"on-down","on-down",2037743467));
var on_eval = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"on-eval","on-eval",-1349336659));
var style = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"style","style",-496642736));
var complete_cmd = cljs.core.get.call(null,map__16372__$1,new cljs.core.Keyword(null,"complete-cmd","complete-cmd",1031836051));
var cm = cljs.core.atom.call(null,null);
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),((function (cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd){
return (function (this$){
var el = reagent.core.dom_node.call(null,this$);
var inst = (new CodeMirror(el,cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"lineNumbers","lineNumbers",1374890941),false,new cljs.core.Keyword(null,"viewportMargin","viewportMargin",948056881),Infinity,new cljs.core.Keyword(null,"matchBrackets","matchBrackets",1256448936),true,new cljs.core.Keyword(null,"autofocus","autofocus",-712814732),true,new cljs.core.Keyword(null,"extraKeys","extraKeys",1380834830),{"Shift-Enter": "newlineAndIndent"},new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,value_atom),new cljs.core.Keyword(null,"autoCloseBrackets","autoCloseBrackets",1157493311),true,new cljs.core.Keyword(null,"mode","mode",654403691),"clojure"], null),js_cm_opts))));
cljs.core.reset_BANG_.call(null,cm,inst);

inst.on("change",((function (el,inst,cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd){
return (function (){
var value = inst.getValue();
if(cljs.core._EQ_.call(null,value,cljs.core.deref.call(null,value_atom))){
return null;
} else {
return on_change.call(null,value);
}
});})(el,inst,cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd))
);

inst.on("keyup",((function (el,inst,cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd){
return (function (inst__$1,evt){
return reepl.code_mirror.complete_keyup.call(null,complete_cmd,evt.keyCode,inst__$1);
});})(el,inst,cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd))
);

inst.on("keydown",((function (el,inst,cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd){
return (function (inst__$1,evt){
var G__16374 = evt.keyCode;
switch (G__16374) {
case (17):
case (18):
case (91):
case (93):
return complete_cmd.call(null,new cljs.core.Keyword(null,"show-all","show-all",715701051)).call(null);

break;
case (9):
return complete_cmd.call(null,new cljs.core.Keyword(null,"cycle","cycle",710365284)).call(null,evt.shiftKey,inst__$1,evt);

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
});})(el,inst,cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd))
);

if(cljs.core.truth_(on_cm_init)){
return on_cm_init.call(null,inst);
} else {
return null;
}
});})(cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd))
,new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),((function (cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd){
return (function (this$,old_argv){
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,value_atom),cljs.core.deref.call(null,cm).getValue())){
return null;
} else {
cljs.core.deref.call(null,cm).setValue(cljs.core.deref.call(null,value_atom));

var last_line = cljs.core.deref.call(null,cm).lastLine();
var last_ch = cljs.core.count.call(null,cljs.core.deref.call(null,cm).getLine(last_line));
return cljs.core.deref.call(null,cm).setCursor(last_line,last_ch);
}
});})(cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd))
,new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),((function (cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd){
return (function (_,___$1,___$2){
cljs.core.deref.call(null,value_atom);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),style], null)], null);
});})(cm,map__16372,map__16372__$1,on_change,js_cm_opts,on_up,should_eval,on_cm_init,should_go_down,should_go_up,on_down,on_eval,style,complete_cmd))
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
