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
parinfer_codemirror.editor.parinferize_BANG_ = (function parinfer_codemirror$editor$parinferize_BANG_(cm,key_,parinfer_mode){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state),key_))){
return null;
} else {
var initial_state = cljs.core.assoc.call(null,parinfer_codemirror.state.empty_editor_state,new cljs.core.Keyword(null,"mode","mode",654403691),parinfer_mode);
var prev_editor_state = cljs.core.atom.call(null,null);
if(cljs.core.truth_(cljs.core.get.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state),key_))){
} else {
cljs.core.swap_BANG_.call(null,parinfer_codemirror.editor.frame_updates,cljs.core.assoc,key_,cljs.core.PersistentArrayMap.EMPTY);
}

cljs.core.swap_BANG_.call(null,parinfer_codemirror.state.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_], null),((function (initial_state,prev_editor_state){
return (function (p1__11172_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__6453__auto__ = p1__11172_SHARP_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm);
});})(initial_state,prev_editor_state))
);

var x11174_11175 = cm;
x11174_11175.parinfer_codemirror$editor_support$IEditor$ = true;

x11174_11175.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1 = ((function (x11174_11175,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x11174_11175,initial_state,prev_editor_state))
;

x11174_11175.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1 = ((function (x11174_11175,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x11174_11175,initial_state,prev_editor_state))
;

x11174_11175.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x11174_11175,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_codemirror.editor.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x11174_11175,initial_state,prev_editor_state))
;

x11174_11175.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x11174_11175,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,parinfer_codemirror.editor.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x11174_11175,initial_state,prev_editor_state))
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
var seq__11186 = cljs.core.seq.call(null,new_state);
var chunk__11187 = null;
var count__11188 = (0);
var i__11189 = (0);
while(true){
if((i__11189 < count__11188)){
var vec__11190 = cljs.core._nth.call(null,chunk__11187,i__11189);
var k = cljs.core.nth.call(null,vec__11190,(0),null);
var map__11191 = cljs.core.nth.call(null,vec__11190,(1),null);
var map__11191__$1 = ((((!((map__11191 == null)))?((((map__11191.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11191.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11191):map__11191);
var cm = cljs.core.get.call(null,map__11191__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__11191__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__11196 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__11196){
cm.setValue(text);
} else {
}

var G__11197 = seq__11186;
var G__11198 = chunk__11187;
var G__11199 = count__11188;
var G__11200 = (i__11189 + (1));
seq__11186 = G__11197;
chunk__11187 = G__11198;
count__11188 = G__11199;
i__11189 = G__11200;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__11186);
if(temp__4425__auto__){
var seq__11186__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11186__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__11186__$1);
var G__11201 = cljs.core.chunk_rest.call(null,seq__11186__$1);
var G__11202 = c__7256__auto__;
var G__11203 = cljs.core.count.call(null,c__7256__auto__);
var G__11204 = (0);
seq__11186 = G__11201;
chunk__11187 = G__11202;
count__11188 = G__11203;
i__11189 = G__11204;
continue;
} else {
var vec__11193 = cljs.core.first.call(null,seq__11186__$1);
var k = cljs.core.nth.call(null,vec__11193,(0),null);
var map__11194 = cljs.core.nth.call(null,vec__11193,(1),null);
var map__11194__$1 = ((((!((map__11194 == null)))?((((map__11194.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11194.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11194):map__11194);
var cm = cljs.core.get.call(null,map__11194__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__11194__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__11205 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__11205){
cm.setValue(text);
} else {
}

var G__11206 = cljs.core.next.call(null,seq__11186__$1);
var G__11207 = null;
var G__11208 = (0);
var G__11209 = (0);
seq__11186 = G__11206;
chunk__11187 = G__11207;
count__11188 = G__11208;
i__11189 = G__11209;
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
var seq__11220 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state));
var chunk__11221 = null;
var count__11222 = (0);
var i__11223 = (0);
while(true){
if((i__11223 < count__11222)){
var vec__11224 = cljs.core._nth.call(null,chunk__11221,i__11223);
var k = cljs.core.nth.call(null,vec__11224,(0),null);
var map__11225 = cljs.core.nth.call(null,vec__11224,(1),null);
var map__11225__$1 = ((((!((map__11225 == null)))?((((map__11225.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11225.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11225):map__11225);
var cm = cljs.core.get.call(null,map__11225__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__11225__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__11230 = seq__11220;
var G__11231 = chunk__11221;
var G__11232 = count__11222;
var G__11233 = (i__11223 + (1));
seq__11220 = G__11230;
chunk__11221 = G__11231;
count__11222 = G__11232;
i__11223 = G__11233;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__11220);
if(temp__4425__auto__){
var seq__11220__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11220__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__11220__$1);
var G__11234 = cljs.core.chunk_rest.call(null,seq__11220__$1);
var G__11235 = c__7256__auto__;
var G__11236 = cljs.core.count.call(null,c__7256__auto__);
var G__11237 = (0);
seq__11220 = G__11234;
chunk__11221 = G__11235;
count__11222 = G__11236;
i__11223 = G__11237;
continue;
} else {
var vec__11227 = cljs.core.first.call(null,seq__11220__$1);
var k = cljs.core.nth.call(null,vec__11227,(0),null);
var map__11228 = cljs.core.nth.call(null,vec__11227,(1),null);
var map__11228__$1 = ((((!((map__11228 == null)))?((((map__11228.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11228.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11228):map__11228);
var cm = cljs.core.get.call(null,map__11228__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__11228__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__11238 = cljs.core.next.call(null,seq__11220__$1);
var G__11239 = null;
var G__11240 = (0);
var G__11241 = (0);
seq__11220 = G__11238;
chunk__11221 = G__11239;
count__11222 = G__11240;
i__11223 = G__11241;
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

//# sourceMappingURL=editor.js.map