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
return (function (p1__17051_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__6453__auto__ = p1__17051_SHARP_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm);
});})(initial_state,prev_editor_state))
);

var x17053_17054 = cm;
x17053_17054.parinfer_codemirror$editor_support$IEditor$ = true;

x17053_17054.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1 = ((function (x17053_17054,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x17053_17054,initial_state,prev_editor_state))
;

x17053_17054.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1 = ((function (x17053_17054,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x17053_17054,initial_state,prev_editor_state))
;

x17053_17054.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x17053_17054,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,reepl.parinferize.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x17053_17054,initial_state,prev_editor_state))
;

x17053_17054.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x17053_17054,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,reepl.parinferize.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x17053_17054,initial_state,prev_editor_state))
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
var seq__17065 = cljs.core.seq.call(null,new_state);
var chunk__17066 = null;
var count__17067 = (0);
var i__17068 = (0);
while(true){
if((i__17068 < count__17067)){
var vec__17069 = cljs.core._nth.call(null,chunk__17066,i__17068);
var k = cljs.core.nth.call(null,vec__17069,(0),null);
var map__17070 = cljs.core.nth.call(null,vec__17069,(1),null);
var map__17070__$1 = ((((!((map__17070 == null)))?((((map__17070.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17070.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17070):map__17070);
var cm = cljs.core.get.call(null,map__17070__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__17070__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__17075 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__17075){
cm.setValue(text);
} else {
}

var G__17076 = seq__17065;
var G__17077 = chunk__17066;
var G__17078 = count__17067;
var G__17079 = (i__17068 + (1));
seq__17065 = G__17076;
chunk__17066 = G__17077;
count__17067 = G__17078;
i__17068 = G__17079;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__17065);
if(temp__4425__auto__){
var seq__17065__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17065__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__17065__$1);
var G__17080 = cljs.core.chunk_rest.call(null,seq__17065__$1);
var G__17081 = c__7256__auto__;
var G__17082 = cljs.core.count.call(null,c__7256__auto__);
var G__17083 = (0);
seq__17065 = G__17080;
chunk__17066 = G__17081;
count__17067 = G__17082;
i__17068 = G__17083;
continue;
} else {
var vec__17072 = cljs.core.first.call(null,seq__17065__$1);
var k = cljs.core.nth.call(null,vec__17072,(0),null);
var map__17073 = cljs.core.nth.call(null,vec__17072,(1),null);
var map__17073__$1 = ((((!((map__17073 == null)))?((((map__17073.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17073.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17073):map__17073);
var cm = cljs.core.get.call(null,map__17073__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__17073__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__17084 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__17084){
cm.setValue(text);
} else {
}

var G__17085 = cljs.core.next.call(null,seq__17065__$1);
var G__17086 = null;
var G__17087 = (0);
var G__17088 = (0);
seq__17065 = G__17085;
chunk__17066 = G__17086;
count__17067 = G__17087;
i__17068 = G__17088;
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
var seq__17099 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state));
var chunk__17100 = null;
var count__17101 = (0);
var i__17102 = (0);
while(true){
if((i__17102 < count__17101)){
var vec__17103 = cljs.core._nth.call(null,chunk__17100,i__17102);
var k = cljs.core.nth.call(null,vec__17103,(0),null);
var map__17104 = cljs.core.nth.call(null,vec__17103,(1),null);
var map__17104__$1 = ((((!((map__17104 == null)))?((((map__17104.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17104.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17104):map__17104);
var cm = cljs.core.get.call(null,map__17104__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__17104__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__17109 = seq__17099;
var G__17110 = chunk__17100;
var G__17111 = count__17101;
var G__17112 = (i__17102 + (1));
seq__17099 = G__17109;
chunk__17100 = G__17110;
count__17101 = G__17111;
i__17102 = G__17112;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__17099);
if(temp__4425__auto__){
var seq__17099__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17099__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__17099__$1);
var G__17113 = cljs.core.chunk_rest.call(null,seq__17099__$1);
var G__17114 = c__7256__auto__;
var G__17115 = cljs.core.count.call(null,c__7256__auto__);
var G__17116 = (0);
seq__17099 = G__17113;
chunk__17100 = G__17114;
count__17101 = G__17115;
i__17102 = G__17116;
continue;
} else {
var vec__17106 = cljs.core.first.call(null,seq__17099__$1);
var k = cljs.core.nth.call(null,vec__17106,(0),null);
var map__17107 = cljs.core.nth.call(null,vec__17106,(1),null);
var map__17107__$1 = ((((!((map__17107 == null)))?((((map__17107.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17107.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17107):map__17107);
var cm = cljs.core.get.call(null,map__17107__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__17107__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__17117 = cljs.core.next.call(null,seq__17099__$1);
var G__17118 = null;
var G__17119 = (0);
var G__17120 = (0);
seq__17099 = G__17117;
chunk__17100 = G__17118;
count__17101 = G__17119;
i__17102 = G__17120;
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
