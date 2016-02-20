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
return (function (p1__18253_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__6453__auto__ = p1__18253_SHARP_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm);
});})(initial_state,prev_editor_state))
);

var x18255_18256 = cm;
x18255_18256.parinfer_codemirror$editor_support$IEditor$ = true;

x18255_18256.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1 = ((function (x18255_18256,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x18255_18256,initial_state,prev_editor_state))
;

x18255_18256.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1 = ((function (x18255_18256,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x18255_18256,initial_state,prev_editor_state))
;

x18255_18256.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x18255_18256,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,reepl.parinferize.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x18255_18256,initial_state,prev_editor_state))
;

x18255_18256.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x18255_18256,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,reepl.parinferize.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x18255_18256,initial_state,prev_editor_state))
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
var seq__18267 = cljs.core.seq.call(null,new_state);
var chunk__18268 = null;
var count__18269 = (0);
var i__18270 = (0);
while(true){
if((i__18270 < count__18269)){
var vec__18271 = cljs.core._nth.call(null,chunk__18268,i__18270);
var k = cljs.core.nth.call(null,vec__18271,(0),null);
var map__18272 = cljs.core.nth.call(null,vec__18271,(1),null);
var map__18272__$1 = ((((!((map__18272 == null)))?((((map__18272.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18272.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18272):map__18272);
var cm = cljs.core.get.call(null,map__18272__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__18272__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__18277 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__18277){
cm.setValue(text);
} else {
}

var G__18278 = seq__18267;
var G__18279 = chunk__18268;
var G__18280 = count__18269;
var G__18281 = (i__18270 + (1));
seq__18267 = G__18278;
chunk__18268 = G__18279;
count__18269 = G__18280;
i__18270 = G__18281;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__18267);
if(temp__4425__auto__){
var seq__18267__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18267__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__18267__$1);
var G__18282 = cljs.core.chunk_rest.call(null,seq__18267__$1);
var G__18283 = c__7256__auto__;
var G__18284 = cljs.core.count.call(null,c__7256__auto__);
var G__18285 = (0);
seq__18267 = G__18282;
chunk__18268 = G__18283;
count__18269 = G__18284;
i__18270 = G__18285;
continue;
} else {
var vec__18274 = cljs.core.first.call(null,seq__18267__$1);
var k = cljs.core.nth.call(null,vec__18274,(0),null);
var map__18275 = cljs.core.nth.call(null,vec__18274,(1),null);
var map__18275__$1 = ((((!((map__18275 == null)))?((((map__18275.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18275.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18275):map__18275);
var cm = cljs.core.get.call(null,map__18275__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__18275__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__18286 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__18286){
cm.setValue(text);
} else {
}

var G__18287 = cljs.core.next.call(null,seq__18267__$1);
var G__18288 = null;
var G__18289 = (0);
var G__18290 = (0);
seq__18267 = G__18287;
chunk__18268 = G__18288;
count__18269 = G__18289;
i__18270 = G__18290;
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
var seq__18301 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state));
var chunk__18302 = null;
var count__18303 = (0);
var i__18304 = (0);
while(true){
if((i__18304 < count__18303)){
var vec__18305 = cljs.core._nth.call(null,chunk__18302,i__18304);
var k = cljs.core.nth.call(null,vec__18305,(0),null);
var map__18306 = cljs.core.nth.call(null,vec__18305,(1),null);
var map__18306__$1 = ((((!((map__18306 == null)))?((((map__18306.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18306.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18306):map__18306);
var cm = cljs.core.get.call(null,map__18306__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__18306__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__18311 = seq__18301;
var G__18312 = chunk__18302;
var G__18313 = count__18303;
var G__18314 = (i__18304 + (1));
seq__18301 = G__18311;
chunk__18302 = G__18312;
count__18303 = G__18313;
i__18304 = G__18314;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__18301);
if(temp__4425__auto__){
var seq__18301__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18301__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__18301__$1);
var G__18315 = cljs.core.chunk_rest.call(null,seq__18301__$1);
var G__18316 = c__7256__auto__;
var G__18317 = cljs.core.count.call(null,c__7256__auto__);
var G__18318 = (0);
seq__18301 = G__18315;
chunk__18302 = G__18316;
count__18303 = G__18317;
i__18304 = G__18318;
continue;
} else {
var vec__18308 = cljs.core.first.call(null,seq__18301__$1);
var k = cljs.core.nth.call(null,vec__18308,(0),null);
var map__18309 = cljs.core.nth.call(null,vec__18308,(1),null);
var map__18309__$1 = ((((!((map__18309 == null)))?((((map__18309.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18309.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18309):map__18309);
var cm = cljs.core.get.call(null,map__18309__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__18309__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__18319 = cljs.core.next.call(null,seq__18301__$1);
var G__18320 = null;
var G__18321 = (0);
var G__18322 = (0);
seq__18301 = G__18319;
chunk__18302 = G__18320;
count__18303 = G__18321;
i__18304 = G__18322;
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
