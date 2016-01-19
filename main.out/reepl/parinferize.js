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
return (function (p1__16040_SHARP_){
return cljs.core.assoc.call(null,(function (){var or__6453__auto__ = p1__16040_SHARP_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return initial_state;
}
})(),new cljs.core.Keyword(null,"cm","cm",540591536),cm);
});})(initial_state,prev_editor_state))
);

var x16042_16043 = cm;
x16042_16043.parinfer_codemirror$editor_support$IEditor$ = true;

x16042_16043.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1 = ((function (x16042_16043,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return prev_editor_state;
});})(x16042_16043,initial_state,prev_editor_state))
;

x16042_16043.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1 = ((function (x16042_16043,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return key_;
});})(x16042_16043,initial_state,prev_editor_state))
;

x16042_16043.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1 = ((function (x16042_16043,initial_state,prev_editor_state){
return (function (this$){
var this$__$1 = this;
return cljs.core.get_in.call(null,cljs.core.deref.call(null,reepl.parinferize.frame_updates),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null));
});})(x16042_16043,initial_state,prev_editor_state))
;

x16042_16043.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2 = ((function (x16042_16043,initial_state,prev_editor_state){
return (function (this$,value){
var this$__$1 = this;
return cljs.core.swap_BANG_.call(null,reepl.parinferize.frame_updates,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"frame-updated?","frame-updated?",-682706815)], null),value);
});})(x16042_16043,initial_state,prev_editor_state))
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
var seq__16054 = cljs.core.seq.call(null,new_state);
var chunk__16055 = null;
var count__16056 = (0);
var i__16057 = (0);
while(true){
if((i__16057 < count__16056)){
var vec__16058 = cljs.core._nth.call(null,chunk__16055,i__16057);
var k = cljs.core.nth.call(null,vec__16058,(0),null);
var map__16059 = cljs.core.nth.call(null,vec__16058,(1),null);
var map__16059__$1 = ((((!((map__16059 == null)))?((((map__16059.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16059.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16059):map__16059);
var cm = cljs.core.get.call(null,map__16059__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__16059__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__16064 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__16064){
cm.setValue(text);
} else {
}

var G__16065 = seq__16054;
var G__16066 = chunk__16055;
var G__16067 = count__16056;
var G__16068 = (i__16057 + (1));
seq__16054 = G__16065;
chunk__16055 = G__16066;
count__16056 = G__16067;
i__16057 = G__16068;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__16054);
if(temp__4425__auto__){
var seq__16054__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16054__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__16054__$1);
var G__16069 = cljs.core.chunk_rest.call(null,seq__16054__$1);
var G__16070 = c__7256__auto__;
var G__16071 = cljs.core.count.call(null,c__7256__auto__);
var G__16072 = (0);
seq__16054 = G__16069;
chunk__16055 = G__16070;
count__16056 = G__16071;
i__16057 = G__16072;
continue;
} else {
var vec__16061 = cljs.core.first.call(null,seq__16054__$1);
var k = cljs.core.nth.call(null,vec__16061,(0),null);
var map__16062 = cljs.core.nth.call(null,vec__16061,(1),null);
var map__16062__$1 = ((((!((map__16062 == null)))?((((map__16062.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16062.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16062):map__16062);
var cm = cljs.core.get.call(null,map__16062__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__16062__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
var changed_QMARK__16073 = cljs.core.not_EQ_.call(null,text,cm.getValue());
if(changed_QMARK__16073){
cm.setValue(text);
} else {
}

var G__16074 = cljs.core.next.call(null,seq__16054__$1);
var G__16075 = null;
var G__16076 = (0);
var G__16077 = (0);
seq__16054 = G__16074;
chunk__16055 = G__16075;
count__16056 = G__16076;
i__16057 = G__16077;
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
var seq__16088 = cljs.core.seq.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state));
var chunk__16089 = null;
var count__16090 = (0);
var i__16091 = (0);
while(true){
if((i__16091 < count__16090)){
var vec__16092 = cljs.core._nth.call(null,chunk__16089,i__16091);
var k = cljs.core.nth.call(null,vec__16092,(0),null);
var map__16093 = cljs.core.nth.call(null,vec__16092,(1),null);
var map__16093__$1 = ((((!((map__16093 == null)))?((((map__16093.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16093.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16093):map__16093);
var cm = cljs.core.get.call(null,map__16093__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__16093__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__16098 = seq__16088;
var G__16099 = chunk__16089;
var G__16100 = count__16090;
var G__16101 = (i__16091 + (1));
seq__16088 = G__16098;
chunk__16089 = G__16099;
count__16090 = G__16100;
i__16091 = G__16101;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__16088);
if(temp__4425__auto__){
var seq__16088__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16088__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__16088__$1);
var G__16102 = cljs.core.chunk_rest.call(null,seq__16088__$1);
var G__16103 = c__7256__auto__;
var G__16104 = cljs.core.count.call(null,c__7256__auto__);
var G__16105 = (0);
seq__16088 = G__16102;
chunk__16089 = G__16103;
count__16090 = G__16104;
i__16091 = G__16105;
continue;
} else {
var vec__16095 = cljs.core.first.call(null,seq__16088__$1);
var k = cljs.core.nth.call(null,vec__16095,(0),null);
var map__16096 = cljs.core.nth.call(null,vec__16095,(1),null);
var map__16096__$1 = ((((!((map__16096 == null)))?((((map__16096.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16096.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16096):map__16096);
var cm = cljs.core.get.call(null,map__16096__$1,new cljs.core.Keyword(null,"cm","cm",540591536));
var text = cljs.core.get.call(null,map__16096__$1,new cljs.core.Keyword(null,"text","text",-1790561697));
cm.setValue(text);

var G__16106 = cljs.core.next.call(null,seq__16088__$1);
var G__16107 = null;
var G__16108 = (0);
var G__16109 = (0);
seq__16088 = G__16106;
chunk__16089 = G__16107;
count__16090 = G__16108;
i__16091 = G__16109;
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

//# sourceMappingURL=parinferize.js.map