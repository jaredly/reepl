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
return (function (p1__15208_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__6453__auto__ = p1__15208_SHARP_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm);
});})(initial_state,prev_editor_state))
);

var x15210_15211 = cm;
x15210_15211.parinfer_codemirror$editor_support$IEditor$ = true;

x15210_15211.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1 = ((function (x15210_15211,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x15210_15211,initial_state,prev_editor_state))
;

x15210_15211.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1 = ((function (x15210_15211,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x15210_15211,initial_state,prev_editor_state))
;

x15210_15211.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x15210_15211,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_codemirror.editor.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x15210_15211,initial_state,prev_editor_state))
;

x15210_15211.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x15210_15211,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,parinfer_codemirror.editor.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x15210_15211,initial_state,prev_editor_state))
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
var seq__15222 = cljs.core.seq.call(null,new_state);
var chunk__15223 = null;
var count__15224 = (0);
var i__15225 = (0);
while(true){
if((i__15225 < count__15224)){
var vec__15226 = cljs.core._nth.call(null,chunk__15223,i__15225);
var k = cljs.core.nth.call(null,vec__15226,(0),null);
var map__15227 = cljs.core.nth.call(null,vec__15226,(1),null);
var map__15227__$1 = ((((!((map__15227 == null)))?((((map__15227.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15227.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15227):map__15227);
var cm = cljs.core.get.call(null,map__15227__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__15227__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__15232 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__15232){
cm.setValue(text);
} else {
}

var G__15233 = seq__15222;
var G__15234 = chunk__15223;
var G__15235 = count__15224;
var G__15236 = (i__15225 + (1));
seq__15222 = G__15233;
chunk__15223 = G__15234;
count__15224 = G__15235;
i__15225 = G__15236;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__15222);
if(temp__4425__auto__){
var seq__15222__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15222__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__15222__$1);
var G__15237 = cljs.core.chunk_rest.call(null,seq__15222__$1);
var G__15238 = c__7256__auto__;
var G__15239 = cljs.core.count.call(null,c__7256__auto__);
var G__15240 = (0);
seq__15222 = G__15237;
chunk__15223 = G__15238;
count__15224 = G__15239;
i__15225 = G__15240;
continue;
} else {
var vec__15229 = cljs.core.first.call(null,seq__15222__$1);
var k = cljs.core.nth.call(null,vec__15229,(0),null);
var map__15230 = cljs.core.nth.call(null,vec__15229,(1),null);
var map__15230__$1 = ((((!((map__15230 == null)))?((((map__15230.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15230.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15230):map__15230);
var cm = cljs.core.get.call(null,map__15230__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__15230__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__15241 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__15241){
cm.setValue(text);
} else {
}

var G__15242 = cljs.core.next.call(null,seq__15222__$1);
var G__15243 = null;
var G__15244 = (0);
var G__15245 = (0);
seq__15222 = G__15242;
chunk__15223 = G__15243;
count__15224 = G__15244;
i__15225 = G__15245;
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
var seq__15256 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state));
var chunk__15257 = null;
var count__15258 = (0);
var i__15259 = (0);
while(true){
if((i__15259 < count__15258)){
var vec__15260 = cljs.core._nth.call(null,chunk__15257,i__15259);
var k = cljs.core.nth.call(null,vec__15260,(0),null);
var map__15261 = cljs.core.nth.call(null,vec__15260,(1),null);
var map__15261__$1 = ((((!((map__15261 == null)))?((((map__15261.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15261.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15261):map__15261);
var cm = cljs.core.get.call(null,map__15261__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__15261__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__15266 = seq__15256;
var G__15267 = chunk__15257;
var G__15268 = count__15258;
var G__15269 = (i__15259 + (1));
seq__15256 = G__15266;
chunk__15257 = G__15267;
count__15258 = G__15268;
i__15259 = G__15269;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__15256);
if(temp__4425__auto__){
var seq__15256__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15256__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__15256__$1);
var G__15270 = cljs.core.chunk_rest.call(null,seq__15256__$1);
var G__15271 = c__7256__auto__;
var G__15272 = cljs.core.count.call(null,c__7256__auto__);
var G__15273 = (0);
seq__15256 = G__15270;
chunk__15257 = G__15271;
count__15258 = G__15272;
i__15259 = G__15273;
continue;
} else {
var vec__15263 = cljs.core.first.call(null,seq__15256__$1);
var k = cljs.core.nth.call(null,vec__15263,(0),null);
var map__15264 = cljs.core.nth.call(null,vec__15263,(1),null);
var map__15264__$1 = ((((!((map__15264 == null)))?((((map__15264.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15264.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15264):map__15264);
var cm = cljs.core.get.call(null,map__15264__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__15264__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__15274 = cljs.core.next.call(null,seq__15256__$1);
var G__15275 = null;
var G__15276 = (0);
var G__15277 = (0);
seq__15256 = G__15274;
chunk__15257 = G__15275;
count__15258 = G__15276;
i__15259 = G__15277;
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
