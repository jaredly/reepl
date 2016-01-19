// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.parinferize');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('parinfer_codemirror.state');
goog.require('parinfer_codemirror.editor_support');
reepl.parinferize.frame_updates = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Called before any change is applied to the editor.
 */
reepl.parinferize.before_change = (function reepl$parinferize$before_change(cm,change){
if((cljs.core._EQ_.call(null,"setValue",change.origin)) && (cljs.core._EQ_.call(null,cm.getValue(),clojure.string.join.call(null,"\n",change.text)))){
return change.cancel();
} else {
return null;
}
});
/**
 * Called after any change is applied to the editor.
 */
reepl.parinferize.on_change = (function reepl$parinferize$on_change(cm,change){
if(cljs.core.not_EQ_.call(null,"setValue",change.origin)){
parinfer_codemirror.editor_support.fix_text_BANG_.call(null,cm,new cljs.core.Keyword(null,"change","change",-1163046502),change);

parinfer_codemirror.editor_support.update_cursor_BANG_.call(null,cm,change);

return parinfer_codemirror.editor_support.set_frame_updated_BANG_.call(null,cm,true);
} else {
return null;
}
});
/**
 * Called after the cursor moves in the editor.
 */
reepl.parinferize.on_cursor_activity = (function reepl$parinferize$on_cursor_activity(cm){
if(cljs.core.truth_(parinfer_codemirror.editor_support.frame_updated_QMARK_.call(null,cm))){
} else {
parinfer_codemirror.editor_support.fix_text_BANG_.call(null,cm);
}

return parinfer_codemirror.editor_support.set_frame_updated_BANG_.call(null,cm,false);
});
/**
 * Indent selection or insert two spaces when tab is pressed.
 *   from: https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785
 */
reepl.parinferize.on_tab = (function reepl$parinferize$on_tab(cm){
if(cljs.core.truth_(cm.somethingSelected())){
return cm.indentSelection();
} else {
var n = cm.getOption("indentUnit");
var spaces = cljs.core.apply.call(null,cljs.core.str,cljs.core.repeat.call(null,n," "));
return cm.replaceSelection(spaces);
}
});
reepl.parinferize.editor_opts = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer",new cljs.core.Keyword(null,"matchBrackets","matchBrackets",1256448936),true,new cljs.core.Keyword(null,"extraKeys","extraKeys",1380834830),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"Tab","Tab",-1823302454),reepl.parinferize.on_tab], null)], null);
(CodeMirror["keyMap"]["default"]["Shift-Tab"] = "indentLess");
/**
 * Add parinfer goodness to a codemirror editor
 */
reepl.parinferize.parinferize_BANG_ = (function reepl$parinferize$parinferize_BANG_(cm,key_,parinfer_mode){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state),key_))){
return null;
} else {
var initial_state = cljs.core.assoc.call(null,parinfer_codemirror.state.empty_editor_state,new cljs.core.Keyword(null,"mode","mode",654403691),parinfer_mode);
var prev_editor_state = cljs.core.atom.call(null,null);
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state),key_))){
} else {
cljs.core.swap_BANG_.call(null,reepl.parinferize.frame_updates,cljs.core.assoc,key_,cljs.core.PersistentArrayMap.EMPTY);
}

cljs.core.swap_BANG_.call(null,parinfer_codemirror.state.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (initial_state,prev_editor_state){
return (function (p1__17045_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__6453__auto__ = p1__17045_SHARP_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm);
});})(initial_state,prev_editor_state))
);

var x17047_17048 = cm;
x17047_17048.parinfer_codemirror$editor_support$IEditor$ = true;

x17047_17048.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1 = ((function (x17047_17048,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x17047_17048,initial_state,prev_editor_state))
;

x17047_17048.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1 = ((function (x17047_17048,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x17047_17048,initial_state,prev_editor_state))
;

x17047_17048.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x17047_17048,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,reepl.parinferize.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x17047_17048,initial_state,prev_editor_state))
;

x17047_17048.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x17047_17048,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,reepl.parinferize.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x17047_17048,initial_state,prev_editor_state))
;


cm.on("change",reepl.parinferize.on_change);

cm.on("beforeChange",reepl.parinferize.before_change);

cm.on("cursorActivity",reepl.parinferize.on_cursor_activity);

return cm;
}
});
/**
 * Called everytime the state changes to sync the code editor.
 */
reepl.parinferize.on_state_change = (function reepl$parinferize$on_state_change(_,___$1,old_state,new_state){
var seq__17059 = cljs.core.seq.call(null,new_state);
var chunk__17060 = null;
var count__17061 = (0);
var i__17062 = (0);
while(true){
if((i__17062 < count__17061)){
var vec__17063 = cljs.core._nth.call(null,chunk__17060,i__17062);
var k = cljs.core.nth.call(null,vec__17063,(0),null);
var map__17064 = cljs.core.nth.call(null,vec__17063,(1),null);
var map__17064__$1 = ((((!((map__17064 == null)))?((((map__17064.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17064.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17064):map__17064);
var cm = cljs.core.get.call(null,map__17064__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__17064__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__17069 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__17069){
cm.setValue(text);
} else {
}

var G__17070 = seq__17059;
var G__17071 = chunk__17060;
var G__17072 = count__17061;
var G__17073 = (i__17062 + (1));
seq__17059 = G__17070;
chunk__17060 = G__17071;
count__17061 = G__17072;
i__17062 = G__17073;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__17059);
if(temp__4425__auto__){
var seq__17059__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17059__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__17059__$1);
var G__17074 = cljs.core.chunk_rest.call(null,seq__17059__$1);
var G__17075 = c__7256__auto__;
var G__17076 = cljs.core.count.call(null,c__7256__auto__);
var G__17077 = (0);
seq__17059 = G__17074;
chunk__17060 = G__17075;
count__17061 = G__17076;
i__17062 = G__17077;
continue;
} else {
var vec__17066 = cljs.core.first.call(null,seq__17059__$1);
var k = cljs.core.nth.call(null,vec__17066,(0),null);
var map__17067 = cljs.core.nth.call(null,vec__17066,(1),null);
var map__17067__$1 = ((((!((map__17067 == null)))?((((map__17067.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17067.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17067):map__17067);
var cm = cljs.core.get.call(null,map__17067__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__17067__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__17078 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__17078){
cm.setValue(text);
} else {
}

var G__17079 = cljs.core.next.call(null,seq__17059__$1);
var G__17080 = null;
var G__17081 = (0);
var G__17082 = (0);
seq__17059 = G__17079;
chunk__17060 = G__17080;
count__17061 = G__17081;
i__17062 = G__17082;
continue;
}
} else {
return null;
}
}
break;
}
});
reepl.parinferize.force_editor_sync_BANG_ = (function reepl$parinferize$force_editor_sync_BANG_(){
var seq__17093 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state));
var chunk__17094 = null;
var count__17095 = (0);
var i__17096 = (0);
while(true){
if((i__17096 < count__17095)){
var vec__17097 = cljs.core._nth.call(null,chunk__17094,i__17096);
var k = cljs.core.nth.call(null,vec__17097,(0),null);
var map__17098 = cljs.core.nth.call(null,vec__17097,(1),null);
var map__17098__$1 = ((((!((map__17098 == null)))?((((map__17098.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17098.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17098):map__17098);
var cm = cljs.core.get.call(null,map__17098__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__17098__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__17103 = seq__17093;
var G__17104 = chunk__17094;
var G__17105 = count__17095;
var G__17106 = (i__17096 + (1));
seq__17093 = G__17103;
chunk__17094 = G__17104;
count__17095 = G__17105;
i__17096 = G__17106;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__17093);
if(temp__4425__auto__){
var seq__17093__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17093__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__17093__$1);
var G__17107 = cljs.core.chunk_rest.call(null,seq__17093__$1);
var G__17108 = c__7256__auto__;
var G__17109 = cljs.core.count.call(null,c__7256__auto__);
var G__17110 = (0);
seq__17093 = G__17107;
chunk__17094 = G__17108;
count__17095 = G__17109;
i__17096 = G__17110;
continue;
} else {
var vec__17100 = cljs.core.first.call(null,seq__17093__$1);
var k = cljs.core.nth.call(null,vec__17100,(0),null);
var map__17101 = cljs.core.nth.call(null,vec__17100,(1),null);
var map__17101__$1 = ((((!((map__17101 == null)))?((((map__17101.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17101.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17101):map__17101);
var cm = cljs.core.get.call(null,map__17101__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__17101__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__17111 = cljs.core.next.call(null,seq__17093__$1);
var G__17112 = null;
var G__17113 = (0);
var G__17114 = (0);
seq__17093 = G__17111;
chunk__17094 = G__17112;
count__17095 = G__17113;
i__17096 = G__17114;
continue;
}
} else {
return null;
}
}
break;
}
});
reepl.parinferize.start_editor_sync_BANG_ = (function reepl$parinferize$start_editor_sync_BANG_(){
cljs.core.add_watch.call(null,parinfer_codemirror.state.state,new cljs.core.Keyword(null,"editor-updater","editor-updater",-323951652),reepl.parinferize.on_state_change);

return reepl.parinferize.force_editor_sync_BANG_.call(null);
});
