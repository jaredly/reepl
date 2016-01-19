// Compiled by ClojureScript 1.7.228 {}
goog.provide('parinfer_codemirror.editor_support');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('parinfer.indent_mode');
goog.require('parinfer.paren_mode');
goog.require('parinfer_codemirror.state');

/**
 * Custom data/methods for a CodeMirror editor.
 * @interface
 */
parinfer_codemirror.editor_support.IEditor = function(){};

parinfer_codemirror.editor_support.cm_key = (function parinfer_codemirror$editor_support$cm_key(this$){
if((!((this$ == null))) && (!((this$.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1 == null)))){
return this$.parinfer_codemirror$editor_support$IEditor$cm_key$arity$1(this$);
} else {
var x__7108__auto__ = (((this$ == null))?null:this$);
var m__7109__auto__ = (parinfer_codemirror.editor_support.cm_key[goog.typeOf(x__7108__auto__)]);
if(!((m__7109__auto__ == null))){
return m__7109__auto__.call(null,this$);
} else {
var m__7109__auto____$1 = (parinfer_codemirror.editor_support.cm_key["_"]);
if(!((m__7109__auto____$1 == null))){
return m__7109__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEditor.cm-key",this$);
}
}
}
});

parinfer_codemirror.editor_support.get_prev_state = (function parinfer_codemirror$editor_support$get_prev_state(this$){
if((!((this$ == null))) && (!((this$.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1 == null)))){
return this$.parinfer_codemirror$editor_support$IEditor$get_prev_state$arity$1(this$);
} else {
var x__7108__auto__ = (((this$ == null))?null:this$);
var m__7109__auto__ = (parinfer_codemirror.editor_support.get_prev_state[goog.typeOf(x__7108__auto__)]);
if(!((m__7109__auto__ == null))){
return m__7109__auto__.call(null,this$);
} else {
var m__7109__auto____$1 = (parinfer_codemirror.editor_support.get_prev_state["_"]);
if(!((m__7109__auto____$1 == null))){
return m__7109__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEditor.get-prev-state",this$);
}
}
}
});

parinfer_codemirror.editor_support.frame_updated_QMARK_ = (function parinfer_codemirror$editor_support$frame_updated_QMARK_(this$){
if((!((this$ == null))) && (!((this$.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1 == null)))){
return this$.parinfer_codemirror$editor_support$IEditor$frame_updated_QMARK_$arity$1(this$);
} else {
var x__7108__auto__ = (((this$ == null))?null:this$);
var m__7109__auto__ = (parinfer_codemirror.editor_support.frame_updated_QMARK_[goog.typeOf(x__7108__auto__)]);
if(!((m__7109__auto__ == null))){
return m__7109__auto__.call(null,this$);
} else {
var m__7109__auto____$1 = (parinfer_codemirror.editor_support.frame_updated_QMARK_["_"]);
if(!((m__7109__auto____$1 == null))){
return m__7109__auto____$1.call(null,this$);
} else {
throw cljs.core.missing_protocol.call(null,"IEditor.frame-updated?",this$);
}
}
}
});

parinfer_codemirror.editor_support.set_frame_updated_BANG_ = (function parinfer_codemirror$editor_support$set_frame_updated_BANG_(this$,value){
if((!((this$ == null))) && (!((this$.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2 == null)))){
return this$.parinfer_codemirror$editor_support$IEditor$set_frame_updated_BANG_$arity$2(this$,value);
} else {
var x__7108__auto__ = (((this$ == null))?null:this$);
var m__7109__auto__ = (parinfer_codemirror.editor_support.set_frame_updated_BANG_[goog.typeOf(x__7108__auto__)]);
if(!((m__7109__auto__ == null))){
return m__7109__auto__.call(null,this$,value);
} else {
var m__7109__auto____$1 = (parinfer_codemirror.editor_support.set_frame_updated_BANG_["_"]);
if(!((m__7109__auto____$1 == null))){
return m__7109__auto____$1.call(null,this$,value);
} else {
throw cljs.core.missing_protocol.call(null,"IEditor.set-frame-updated!",this$);
}
}
}
});

/**
 * Correctly position cursor after text that was just typed.
 *   We need this since reformatting the text can shift things forward past our cursor.
 */
parinfer_codemirror.editor_support.update_cursor_BANG_ = (function parinfer_codemirror$editor_support$update_cursor_BANG_(cm,change){
if(cljs.core._EQ_.call(null,"+input",change.origin)){
var selection_QMARK_ = cm.somethingSelected();
var text = clojure.string.join.call(null,"\n",change.text);
var from_x = change.from.ch;
var line_no = change.from.line;
var line = cm.getLine(line_no);
var insert_x = line.indexOf(text,from_x);
var after_x = (insert_x + cljs.core.count.call(null,text));
if(cljs.core.truth_(selection_QMARK_)){
return null;
} else {
if(cljs.core._EQ_.call(null,text,"\n")){
return null;
} else {
if(cljs.core._EQ_.call(null,text,";")){
return cm.setCursor(line_no,after_x);
} else {
if((cljs.core._EQ_.call(null,(-1),insert_x)) || ((insert_x > from_x))){
return cm.setCursor(line_no,from_x);
} else {
return null;

}
}
}
}
} else {
return null;
}
});
parinfer_codemirror.editor_support.compute_cursor_dx = (function parinfer_codemirror$editor_support$compute_cursor_dx(cursor,change){
if(cljs.core.truth_(change)){
var ignore_QMARK_ = cljs.core._EQ_.call(null,"+indenthack",change.origin);
if(ignore_QMARK_){
return (0);
} else {
var start_x = change.to.ch;
var new_lines = change.text;
var len_last_line = cljs.core.count.call(null,cljs.core.last.call(null,new_lines));
var end_x = (((cljs.core.count.call(null,new_lines) > (1)))?len_last_line:(len_last_line + change.from.ch));
return (end_x - start_x);
}
} else {
return null;
}
});
parinfer_codemirror.editor_support.compute_cm_change = (function parinfer_codemirror$editor_support$compute_cm_change(cm,change,options,prev_state){
var map__11153 = (cljs.core.truth_(change)?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"start-line","start-line",-41746654),change.from.line,new cljs.core.Keyword(null,"end-line","end-line",1837326455),(change.to.line + (1)),new cljs.core.Keyword(null,"num-new-lines","num-new-lines",-1319642646),change.text.length], null):(function (){var start = new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007).cljs$core$IFn$_invoke$arity$1(prev_state);
var end = (start + (1));
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"start-line","start-line",-41746654),start,new cljs.core.Keyword(null,"end-line","end-line",1837326455),end,new cljs.core.Keyword(null,"num-new-lines","num-new-lines",-1319642646),(end - start)], null);
})());
var map__11153__$1 = ((((!((map__11153 == null)))?((((map__11153.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11153.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11153):map__11153);
var start_line = cljs.core.get.call(null,map__11153__$1,new cljs.core.Keyword(null,"start-line","start-line",-41746654));
var end_line = cljs.core.get.call(null,map__11153__$1,new cljs.core.Keyword(null,"end-line","end-line",1837326455));
var num_new_lines = cljs.core.get.call(null,map__11153__$1,new cljs.core.Keyword(null,"num-new-lines","num-new-lines",-1319642646));
var lines = (function (){var iter__7225__auto__ = ((function (map__11153,map__11153__$1,start_line,end_line,num_new_lines){
return (function parinfer_codemirror$editor_support$compute_cm_change_$_iter__11155(s__11156){
return (new cljs.core.LazySeq(null,((function (map__11153,map__11153__$1,start_line,end_line,num_new_lines){
return (function (){
var s__11156__$1 = s__11156;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__11156__$1);
if(temp__4425__auto__){
var s__11156__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__11156__$2)){
var c__7223__auto__ = cljs.core.chunk_first.call(null,s__11156__$2);
var size__7224__auto__ = cljs.core.count.call(null,c__7223__auto__);
var b__11158 = cljs.core.chunk_buffer.call(null,size__7224__auto__);
if((function (){var i__11157 = (0);
while(true){
if((i__11157 < size__7224__auto__)){
var i = cljs.core._nth.call(null,c__7223__auto__,i__11157);
cljs.core.chunk_append.call(null,b__11158,cm.getLine(i));

var G__11159 = (i__11157 + (1));
i__11157 = G__11159;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__11158),parinfer_codemirror$editor_support$compute_cm_change_$_iter__11155.call(null,cljs.core.chunk_rest.call(null,s__11156__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__11158),null);
}
} else {
var i = cljs.core.first.call(null,s__11156__$2);
return cljs.core.cons.call(null,cm.getLine(i),parinfer_codemirror$editor_support$compute_cm_change_$_iter__11155.call(null,cljs.core.rest.call(null,s__11156__$2)));
}
} else {
return null;
}
break;
}
});})(map__11153,map__11153__$1,start_line,end_line,num_new_lines))
,null,null));
});})(map__11153,map__11153__$1,start_line,end_line,num_new_lines))
;
return iter__7225__auto__.call(null,cljs.core.range.call(null,start_line,(start_line + num_new_lines)));
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line-no","line-no",-666819466),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start_line,end_line], null),new cljs.core.Keyword(null,"new-line","new-line",1060819447),lines], null);
});
/**
 * Correctly format the text from the given editor.
 */
parinfer_codemirror.editor_support.fix_text_BANG_ = (function parinfer_codemirror$editor_support$fix_text_BANG_(var_args){
var args__7518__auto__ = [];
var len__7511__auto___11166 = arguments.length;
var i__7512__auto___11167 = (0);
while(true){
if((i__7512__auto___11167 < len__7511__auto___11166)){
args__7518__auto__.push((arguments[i__7512__auto___11167]));

var G__11168 = (i__7512__auto___11167 + (1));
i__7512__auto___11167 = G__11168;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((1) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((1)),(0))):null);
return parinfer_codemirror.editor_support.fix_text_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7519__auto__);
});

parinfer_codemirror.editor_support.fix_text_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (cm,p__11162){
var map__11163 = p__11162;
var map__11163__$1 = ((((!((map__11163 == null)))?((((map__11163.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11163.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11163):map__11163);
var change = cljs.core.get.call(null,map__11163__$1,new cljs.core.Keyword(null,"change","change",-1163046502),null);
var use_cache_QMARK_ = cljs.core.get.call(null,map__11163__$1,new cljs.core.Keyword(null,"use-cache?","use-cache?",-81331778),false);
var current_text = cm.getValue();
var selection_QMARK_ = cm.somethingSelected();
var selections = cm.listSelections();
var cursor = cm.getCursor();
var scroller = cm.getScrollerElement();
var scroll_x = scroller.scrollLeft;
var scroll_y = scroller.scrollTop;
var options = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"cursor-line","cursor-line",-1089611007),cursor.line,new cljs.core.Keyword(null,"cursor-x","cursor-x",475204266),cursor.ch,new cljs.core.Keyword(null,"cursor-dx","cursor-dx",133069327),parinfer_codemirror.editor_support.compute_cursor_dx.call(null,cursor,change)], null);
var key_ = parinfer_codemirror.editor_support.cm_key.call(null,cm);
var mode = (function (){var or__6453__auto__ = cljs.core.get_in.call(null,cljs.core.deref.call(null,parinfer_codemirror.state.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"mode","mode",654403691)], null));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return new cljs.core.Keyword(null,"indent-mode","indent-mode",1737814542);
}
})();
var prev_state = parinfer_codemirror.editor_support.get_prev_state.call(null,cm);
var new_text = (function (){var G__11165 = (((mode instanceof cljs.core.Keyword))?mode.fqn:null);
switch (G__11165) {
case "indent-mode":
var result = (cljs.core.truth_((function (){var and__6441__auto__ = use_cache_QMARK_;
if(cljs.core.truth_(and__6441__auto__)){
return cljs.core.deref.call(null,prev_state);
} else {
return and__6441__auto__;
}
})())?parinfer.indent_mode.format_text_change.call(null,current_text,cljs.core.deref.call(null,prev_state),parinfer_codemirror.editor_support.compute_cm_change.call(null,cm,change,options,cljs.core.deref.call(null,prev_state)),options):parinfer.indent_mode.format_text.call(null,current_text,options));
if(cljs.core.truth_(new cljs.core.Keyword(null,"valid?","valid?",-212412379).cljs$core$IFn$_invoke$arity$1(result))){
cljs.core.reset_BANG_.call(null,prev_state,new cljs.core.Keyword(null,"state","state",-1988618099).cljs$core$IFn$_invoke$arity$1(result));
} else {
}

return new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(result);

break;
case "paren-mode":
var result = parinfer.paren_mode.format_text.call(null,current_text,options);
return new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(result);

break;
default:
return null;

}
})();
cljs.core.swap_BANG_.call(null,parinfer_codemirror.state.state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key_,new cljs.core.Keyword(null,"text","text",-1790561697)], null),new_text);

if(cljs.core.truth_(selection_QMARK_)){
cm.setSelections(selections);
} else {
cm.setCursor(cursor);
}

return cm.scrollTo(scroll_x,scroll_y);
});

parinfer_codemirror.editor_support.fix_text_BANG_.cljs$lang$maxFixedArity = (1);

parinfer_codemirror.editor_support.fix_text_BANG_.cljs$lang$applyTo = (function (seq11160){
var G__11161 = cljs.core.first.call(null,seq11160);
var seq11160__$1 = cljs.core.next.call(null,seq11160);
return parinfer_codemirror.editor_support.fix_text_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__11161,seq11160__$1);
});

//# sourceMappingURL=editor_support.js.map