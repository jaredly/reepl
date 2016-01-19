// Compiled by ClojureScript 1.7.228 {}
goog.provide('parinfer.reader');
goog.require('cljs.core');
parinfer.reader.matching_delim = new cljs.core.PersistentArrayMap(null, 6, ["{","}","}","{","[","]","]","[","(",")",")","("], null);
parinfer.reader.opening_delim_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["(",null,"{",null,"[",null], null), null);
parinfer.reader.closing_delim_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["]",null,")",null,"}",null], null), null);
parinfer.reader.whitespace_QMARK_ = (function parinfer$reader$whitespace_QMARK_(ch){
return cljs.core.re_find.call(null,/\s/,ch);
});
parinfer.reader.prev_ch = (function parinfer$reader$prev_ch(stack){
return new cljs.core.Keyword(null,"ch","ch",-554717905).cljs$core$IFn$_invoke$arity$1(cljs.core.peek.call(null,stack));
});
/**
 * Next character will be escaped.
 */
parinfer.reader.escaping_QMARK_ = (function parinfer$reader$escaping_QMARK_(stack){
return cljs.core._EQ_.call(null,"\\",parinfer.reader.prev_ch.call(null,stack));
});
/**
 * Next character is inside a string.
 */
parinfer.reader.in_str_QMARK_ = (function parinfer$reader$in_str_QMARK_(stack){
var ch = parinfer.reader.prev_ch.call(null,(function (){var G__14916 = stack;
var G__14916__$1 = (cljs.core.truth_(parinfer.reader.escaping_QMARK_.call(null,stack))?cljs.core.pop.call(null,G__14916):G__14916);
return G__14916__$1;
})());
return cljs.core._EQ_.call(null,"\"",ch);
});
/**
 * Next character is inside a comment.
 */
parinfer.reader.in_comment_QMARK_ = (function parinfer$reader$in_comment_QMARK_(stack){
return cljs.core._EQ_.call(null,";",parinfer.reader.prev_ch.call(null,stack));
});
/**
 * Next character is inside actual code.
 */
parinfer.reader.in_code_QMARK_ = (function parinfer$reader$in_code_QMARK_(stack){
return (cljs.core.not.call(null,parinfer.reader.in_str_QMARK_.call(null,stack))) && (cljs.core.not.call(null,parinfer.reader.in_comment_QMARK_.call(null,stack)));
});
/**
 * Determine if the given closing delimiter can be used next, assuming we are inside code.
 */
parinfer.reader.valid_closer_QMARK_ = (function parinfer$reader$valid_closer_QMARK_(stack,ch){
return cljs.core._EQ_.call(null,parinfer.reader.prev_ch.call(null,stack),parinfer.reader.matching_delim.call(null,ch));
});
if(typeof parinfer.reader.push_char_STAR_ !== 'undefined'){
} else {
/**
 * Update the delimiter stack with the given character.
 */
parinfer.reader.push_char_STAR_ = (function (){var method_table__7366__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7367__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7368__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7369__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7370__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"parinfer.reader","push-char*"),((function (method_table__7366__auto__,prefer_table__7367__auto__,method_cache__7368__auto__,cached_hierarchy__7369__auto__,hierarchy__7370__auto__){
return (function (p__14917){
var map__14918 = p__14917;
var map__14918__$1 = ((((!((map__14918 == null)))?((((map__14918.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14918.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14918):map__14918);
var ch = cljs.core.get.call(null,map__14918__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
if(cljs.core.truth_(parinfer.reader.opening_delim_QMARK_.call(null,ch))){
return new cljs.core.Keyword(null,"open","open",-1763596448);
} else {
if(cljs.core.truth_(parinfer.reader.closing_delim_QMARK_.call(null,ch))){
return new cljs.core.Keyword(null,"close","close",1835149582);
} else {
return ch;

}
}
});})(method_table__7366__auto__,prefer_table__7367__auto__,method_cache__7368__auto__,cached_hierarchy__7369__auto__,hierarchy__7370__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7370__auto__,method_table__7366__auto__,prefer_table__7367__auto__,method_cache__7368__auto__,cached_hierarchy__7369__auto__));
})();
}
cljs.core._add_method.call(null,parinfer.reader.push_char_STAR_,"\t",(function (p__14920){
var map__14921 = p__14920;
var map__14921__$1 = ((((!((map__14921 == null)))?((((map__14921.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14921.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14921):map__14921);
var stack = cljs.core.get.call(null,map__14921__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.not.call(null,parinfer.reader.in_str_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ch","ch",-554717905),"  "], null);
} else {
return null;

}
}));
cljs.core._add_method.call(null,parinfer.reader.push_char_STAR_,new cljs.core.Keyword(null,"open","open",-1763596448),(function (p__14923){
var map__14924 = p__14923;
var map__14924__$1 = ((((!((map__14924 == null)))?((((map__14924.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14924.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14924):map__14924);
var state = map__14924__$1;
var stack = cljs.core.get.call(null,map__14924__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.reader.in_code_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.conj.call(null,stack,cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new cljs.core.Keyword(null,"ch","ch",-554717905),new cljs.core.Keyword(null,"indent-delta","indent-delta",-1753368232)], null)))], null);
} else {
return null;

}
}
}));
cljs.core._add_method.call(null,parinfer.reader.push_char_STAR_,new cljs.core.Keyword(null,"close","close",1835149582),(function (p__14926){
var map__14927 = p__14926;
var map__14927__$1 = ((((!((map__14927 == null)))?((((map__14927.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14927.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14927):map__14927);
var stack = cljs.core.get.call(null,map__14927__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var backup = cljs.core.get.call(null,map__14927__$1,new cljs.core.Keyword(null,"backup","backup",26347393));
var ch = cljs.core.get.call(null,map__14927__$1,new cljs.core.Keyword(null,"ch","ch",-554717905));
if(cljs.core.truth_(parinfer.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.reader.in_code_QMARK_.call(null,stack))){
if(cljs.core.truth_(parinfer.reader.valid_closer_QMARK_.call(null,stack,ch))){
var opener = cljs.core.peek.call(null,stack);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack),new cljs.core.Keyword(null,"backup","backup",26347393),cljs.core.conj.call(null,backup,opener)], null);
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ch","ch",-554717905),""], null);
}
} else {
return null;

}
}
}));
cljs.core._add_method.call(null,parinfer.reader.push_char_STAR_,";",(function (p__14929){
var map__14930 = p__14929;
var map__14930__$1 = ((((!((map__14930 == null)))?((((map__14930.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14930.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14930):map__14930);
var state = map__14930__$1;
var stack = cljs.core.get.call(null,map__14930__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.reader.in_code_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.conj.call(null,stack,cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new cljs.core.Keyword(null,"ch","ch",-554717905)], null)))], null);
} else {
return null;

}
}
}));
cljs.core._add_method.call(null,parinfer.reader.push_char_STAR_,"\n",(function (p__14932){
var map__14933 = p__14932;
var map__14933__$1 = ((((!((map__14933 == null)))?((((map__14933.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14933.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14933):map__14933);
var stack = cljs.core.get.call(null,map__14933__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
var stack__$1 = (function (){var G__14935 = stack;
var G__14935__$1 = (cljs.core.truth_(parinfer.reader.escaping_QMARK_.call(null,stack))?cljs.core.pop.call(null,G__14935):G__14935);
return G__14935__$1;
})();
var stack__$2 = (function (){var G__14936 = stack__$1;
var G__14936__$1 = (cljs.core.truth_(parinfer.reader.in_comment_QMARK_.call(null,stack__$1))?cljs.core.pop.call(null,G__14936):G__14936);
return G__14936__$1;
})();
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ch","ch",-554717905),"",new cljs.core.Keyword(null,"stack","stack",-793405930),stack__$2], null);
}));
cljs.core._add_method.call(null,parinfer.reader.push_char_STAR_,"\\",(function (p__14937){
var map__14938 = p__14937;
var map__14938__$1 = ((((!((map__14938 == null)))?((((map__14938.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14938.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14938):map__14938);
var state = map__14938__$1;
var stack = cljs.core.get.call(null,map__14938__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.reader.in_comment_QMARK_.call(null,stack))){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.conj.call(null,stack,cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new cljs.core.Keyword(null,"ch","ch",-554717905)], null)))], null);

}
}
}));
cljs.core._add_method.call(null,parinfer.reader.push_char_STAR_,"\"",(function (p__14940){
var map__14941 = p__14940;
var map__14941__$1 = ((((!((map__14941 == null)))?((((map__14941.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14941.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14941):map__14941);
var state = map__14941__$1;
var stack = cljs.core.get.call(null,map__14941__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.reader.in_str_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
if(cljs.core.truth_(parinfer.reader.in_comment_QMARK_.call(null,stack))){
return null;
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.conj.call(null,stack,cljs.core.select_keys.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x-pos","x-pos",-382213783),new cljs.core.Keyword(null,"ch","ch",-554717905)], null)))], null);

}
}
}
}));
cljs.core._add_method.call(null,parinfer.reader.push_char_STAR_,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__14943){
var map__14944 = p__14943;
var map__14944__$1 = ((((!((map__14944 == null)))?((((map__14944.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14944.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14944):map__14944);
var stack = cljs.core.get.call(null,map__14944__$1,new cljs.core.Keyword(null,"stack","stack",-793405930));
if(cljs.core.truth_(parinfer.reader.escaping_QMARK_.call(null,stack))){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"stack","stack",-793405930),cljs.core.pop.call(null,stack)], null);
} else {
return null;

}
}));
parinfer.reader.push_char = (function parinfer$reader$push_char(state){
var new_data = parinfer.reader.push_char_STAR_.call(null,state);
return cljs.core.merge_with.call(null,((function (new_data){
return (function (p1__14947_SHARP_,p2__14946_SHARP_){
var or__6453__auto__ = p2__14946_SHARP_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return p1__14947_SHARP_;
}
});})(new_data))
,state,new_data);
});
