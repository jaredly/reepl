// Compiled by ClojureScript 1.7.228 {}
goog.provide('quil.middlewares.deprecated_options');
goog.require('cljs.core');
quil.middlewares.deprecated_options.deprecated = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"decor","decor",-1730969431),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["2.0","Try :features [:present] for similar effect"], null),new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["2.0","Use :features [:keep-on-top] instead."], null),new cljs.core.Keyword(null,"safe-draw-fn","safe-draw-fn",1454900202),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["2.0","Use :features [:no-safe-fns] instead."], null)], null);
quil.middlewares.deprecated_options.check_features_vector = (function quil$middlewares$deprecated_options$check_features_vector(features){
var features__$1 = cljs.core.set.call(null,features);
if(cljs.core.truth_(features__$1.call(null,new cljs.core.Keyword(null,"no-safe-draw","no-safe-draw",-1157778157)))){
cljs.core.println.call(null,"Feature :no-safe-draw was renamed to :no-safe-fns in Quil 2.1.","Use :feature [:no-safe-fns] now.");
} else {
}

return cljs.core.disj.call(null,features__$1,new cljs.core.Keyword(null,"no-safe-draw","no-safe-draw",-1157778157));
});
/**
 * Checks if options map contains deprected options and removes them.
 *   Prints messages how to fix deprecated functions.
 */
quil.middlewares.deprecated_options.deprecated_options = (function quil$middlewares$deprecated_options$deprecated_options(options){
var options__$1 = cljs.core.update_in.call(null,options,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"features","features",-1146962336)], null),quil.middlewares.deprecated_options.check_features_vector);
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.call(null,cljs.core.nil_QMARK_,(function (){var iter__7225__auto__ = ((function (options__$1){
return (function quil$middlewares$deprecated_options$deprecated_options_$_iter__17135(s__17136){
return (new cljs.core.LazySeq(null,((function (options__$1){
return (function (){
var s__17136__$1 = s__17136;
while(true){
var temp__4425__auto__ = cljs.core.seq.call(null,s__17136__$1);
if(temp__4425__auto__){
var s__17136__$2 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17136__$2)){
var c__7223__auto__ = cljs.core.chunk_first.call(null,s__17136__$2);
var size__7224__auto__ = cljs.core.count.call(null,c__7223__auto__);
var b__17138 = cljs.core.chunk_buffer.call(null,size__7224__auto__);
if((function (){var i__17137 = (0);
while(true){
if((i__17137 < size__7224__auto__)){
var vec__17143 = cljs.core._nth.call(null,c__7223__auto__,i__17137);
var name = cljs.core.nth.call(null,vec__17143,(0),null);
var value = cljs.core.nth.call(null,vec__17143,(1),null);
cljs.core.chunk_append.call(null,b__17138,(function (){var temp__4423__auto__ = quil.middlewares.deprecated_options.deprecated.call(null,name);
if(cljs.core.truth_(temp__4423__auto__)){
var vec__17144 = temp__4423__auto__;
var version = cljs.core.nth.call(null,vec__17144,(0),null);
var message = cljs.core.nth.call(null,vec__17144,(1),null);
cljs.core.println.call(null,name,"option was removed in Quil",version,".",message);

return null;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,value], null);
}
})());

var G__17147 = (i__17137 + (1));
i__17137 = G__17147;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17138),quil$middlewares$deprecated_options$deprecated_options_$_iter__17135.call(null,cljs.core.chunk_rest.call(null,s__17136__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17138),null);
}
} else {
var vec__17145 = cljs.core.first.call(null,s__17136__$2);
var name = cljs.core.nth.call(null,vec__17145,(0),null);
var value = cljs.core.nth.call(null,vec__17145,(1),null);
return cljs.core.cons.call(null,(function (){var temp__4423__auto__ = quil.middlewares.deprecated_options.deprecated.call(null,name);
if(cljs.core.truth_(temp__4423__auto__)){
var vec__17146 = temp__4423__auto__;
var version = cljs.core.nth.call(null,vec__17146,(0),null);
var message = cljs.core.nth.call(null,vec__17146,(1),null);
cljs.core.println.call(null,name,"option was removed in Quil",version,".",message);

return null;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [name,value], null);
}
})(),quil$middlewares$deprecated_options$deprecated_options_$_iter__17135.call(null,cljs.core.rest.call(null,s__17136__$2)));
}
} else {
return null;
}
break;
}
});})(options__$1))
,null,null));
});})(options__$1))
;
return iter__7225__auto__.call(null,options__$1);
})()));
});
