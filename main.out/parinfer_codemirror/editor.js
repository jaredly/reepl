// Compiled by ClojureScript 1.7.228 {}
goog.provide('parinfer_codemirror.editor');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('parinfer_codemirror.state');
goog.require('parinfer_codemirror.editor_support');
parinfer_codemirror.editor.frame_updates = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
 * Called before any change is applied to the editor.
 */
parinfer_codemirror.editor.before_change = (function parinfer_codemirror$editor$before_change(cm,change){
if((cljs.core._EQ_.call(null,"setValue",change.origin)) && (cljs.core._EQ_.call(null,cm.getValue(),clojure.string.join.call(null,"\n",change.text)))){
return change.cancel();
} else {
return null;
}
});
/**
 * Called after any change is applied to the editor.
 */
parinfer_codemirror.editor.on_change = (function parinfer_codemirror$editor$on_change(cm,change){
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
parinfer_codemirror.editor.on_cursor_activity = (function parinfer_codemirror$editor$on_cursor_activity(cm){
if(cljs.core.truth_(parinfer_codemirror.editor_support.frame_updated_QMARK_.call(null,cm))){
} else {
parinfer_codemirror.editor_support.fix_text_BANG_.call(null,cm);
}

return parinfer_codemirror.editor_support.set_frame_updated_BANG_.call(null,cm,false);
});
/**
 * Add parinfer goodness to a codemirror editor
 */
parinfer_codemirror.editor.parinferize_BANG_ = (function parinfer_codemirror$editor$parinferize_BANG_(cm,key_,parinfer_mode,initial_value){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state),key_))){
return null;
} else {
var initial_state = cljs.core.assoc.call(null,parinfer_codemirror.state.empty_editor_state,new cljs.core.Keyword(null,"mode","mode",654403691),parinfer_mode,new cljs.core.Keyword(null,"text","text",-1790561697),initial_value);
var prev_editor_state = cljs.core.atom.call(null,null);
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state),key_))){
} else {
cljs.core.swap_BANG_.call(null,parinfer_codemirror.editor.frame_updates,cljs.core.assoc,key_,cljs.core.PersistentArrayMap.EMPTY);
}

cljs.core.swap_BANG_.call(null,parinfer_codemirror.state.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (initial_state,prev_editor_state){
return (function (p1__16943_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__6453__auto__ = p1__16943_SHARP_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm);
});})(initial_state,prev_editor_state))
);

var x16945_16946 = cm;
x16945_16946.parinfer_codemirror$editor_support$IEditor$ = true;

x16945_16946.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1 = ((function (x16945_16946,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x16945_16946,initial_state,prev_editor_state))
;

x16945_16946.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1 = ((function (x16945_16946,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x16945_16946,initial_state,prev_editor_state))
;

x16945_16946.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x16945_16946,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_codemirror.editor.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x16945_16946,initial_state,prev_editor_state))
;

x16945_16946.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x16945_16946,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,parinfer_codemirror.editor.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x16945_16946,initial_state,prev_editor_state))
;


cm.on("change",parinfer_codemirror.editor.on_change);

cm.on("beforeChange",parinfer_codemirror.editor.before_change);

cm.on("cursorActivity",parinfer_codemirror.editor.on_cursor_activity);

return cm;
}
});
/**
 * Called everytime the state changes to sync the code editor.
 */
parinfer_codemirror.editor.on_state_change = (function parinfer_codemirror$editor$on_state_change(_,___$1,old_state,new_state){
var seq__16957 = cljs.core.seq.call(null,new_state);
var chunk__16958 = null;
var count__16959 = (0);
var i__16960 = (0);
while(true){
if((i__16960 < count__16959)){
var vec__16961 = cljs.core._nth.call(null,chunk__16958,i__16960);
var k = cljs.core.nth.call(null,vec__16961,(0),null);
var map__16962 = cljs.core.nth.call(null,vec__16961,(1),null);
var map__16962__$1 = ((((!((map__16962 == null)))?((((map__16962.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16962.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16962):map__16962);
var cm = cljs.core.get.call(null,map__16962__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__16962__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__16967 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__16967){
cm.setValue(text);
} else {
}

var G__16968 = seq__16957;
var G__16969 = chunk__16958;
var G__16970 = count__16959;
var G__16971 = (i__16960 + (1));
seq__16957 = G__16968;
chunk__16958 = G__16969;
count__16959 = G__16970;
i__16960 = G__16971;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__16957);
if(temp__4425__auto__){
var seq__16957__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16957__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__16957__$1);
var G__16972 = cljs.core.chunk_rest.call(null,seq__16957__$1);
var G__16973 = c__7256__auto__;
var G__16974 = cljs.core.count.call(null,c__7256__auto__);
var G__16975 = (0);
seq__16957 = G__16972;
chunk__16958 = G__16973;
count__16959 = G__16974;
i__16960 = G__16975;
continue;
} else {
var vec__16964 = cljs.core.first.call(null,seq__16957__$1);
var k = cljs.core.nth.call(null,vec__16964,(0),null);
var map__16965 = cljs.core.nth.call(null,vec__16964,(1),null);
var map__16965__$1 = ((((!((map__16965 == null)))?((((map__16965.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16965.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16965):map__16965);
var cm = cljs.core.get.call(null,map__16965__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__16965__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__16976 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__16976){
cm.setValue(text);
} else {
}

var G__16977 = cljs.core.next.call(null,seq__16957__$1);
var G__16978 = null;
var G__16979 = (0);
var G__16980 = (0);
seq__16957 = G__16977;
chunk__16958 = G__16978;
count__16959 = G__16979;
i__16960 = G__16980;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer_codemirror.editor.force_editor_sync_BANG_ = (function parinfer_codemirror$editor$force_editor_sync_BANG_(){
var seq__16991 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state));
var chunk__16992 = null;
var count__16993 = (0);
var i__16994 = (0);
while(true){
if((i__16994 < count__16993)){
var vec__16995 = cljs.core._nth.call(null,chunk__16992,i__16994);
var k = cljs.core.nth.call(null,vec__16995,(0),null);
var map__16996 = cljs.core.nth.call(null,vec__16995,(1),null);
var map__16996__$1 = ((((!((map__16996 == null)))?((((map__16996.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16996.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16996):map__16996);
var cm = cljs.core.get.call(null,map__16996__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__16996__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__17001 = seq__16991;
var G__17002 = chunk__16992;
var G__17003 = count__16993;
var G__17004 = (i__16994 + (1));
seq__16991 = G__17001;
chunk__16992 = G__17002;
count__16993 = G__17003;
i__16994 = G__17004;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__16991);
if(temp__4425__auto__){
var seq__16991__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16991__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__16991__$1);
var G__17005 = cljs.core.chunk_rest.call(null,seq__16991__$1);
var G__17006 = c__7256__auto__;
var G__17007 = cljs.core.count.call(null,c__7256__auto__);
var G__17008 = (0);
seq__16991 = G__17005;
chunk__16992 = G__17006;
count__16993 = G__17007;
i__16994 = G__17008;
continue;
} else {
var vec__16998 = cljs.core.first.call(null,seq__16991__$1);
var k = cljs.core.nth.call(null,vec__16998,(0),null);
var map__16999 = cljs.core.nth.call(null,vec__16998,(1),null);
var map__16999__$1 = ((((!((map__16999 == null)))?((((map__16999.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16999.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16999):map__16999);
var cm = cljs.core.get.call(null,map__16999__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__16999__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__17009 = cljs.core.next.call(null,seq__16991__$1);
var G__17010 = null;
var G__17011 = (0);
var G__17012 = (0);
seq__16991 = G__17009;
chunk__16992 = G__17010;
count__16993 = G__17011;
i__16994 = G__17012;
continue;
}
} else {
return null;
}
}
break;
}
});
parinfer_codemirror.editor.start_editor_sync_BANG_ = (function parinfer_codemirror$editor$start_editor_sync_BANG_(){
cljs.core.add_watch.call(null,parinfer_codemirror.state.state,new cljs.core.Keyword(null,"editor-updater","editor-updater",-323951652),parinfer_codemirror.editor.on_state_change);

return parinfer_codemirror.editor.force_editor_sync_BANG_.call(null);
});
