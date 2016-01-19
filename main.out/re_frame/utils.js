// Compiled by ClojureScript 1.7.228 {}
goog.provide('re_frame.utils');
goog.require('cljs.core');
goog.require('clojure.set');
re_frame.utils.default_loggers = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"log","log",-1595516004),(function (p1__16842_SHARP_){
return console.log(p1__16842_SHARP_);
}),new cljs.core.Keyword(null,"warn","warn",-436710552),(function (p1__16843_SHARP_){
return console.warn(p1__16843_SHARP_);
}),new cljs.core.Keyword(null,"error","error",-978969032),(function (p1__16844_SHARP_){
return console.error(p1__16844_SHARP_);
}),new cljs.core.Keyword(null,"group","group",582596132),(function (p1__16845_SHARP_){
if(cljs.core.truth_(console.groupCollapsed)){
return console.groupCollapsed(p1__16845_SHARP_);
} else {
return console.log(p1__16845_SHARP_);
}
}),new cljs.core.Keyword(null,"groupEnd","groupEnd",-337721382),(function (){
if(cljs.core.truth_(console.groupEnd)){
return console.groupEnd();
} else {
return null;
}
})], null);
re_frame.utils.loggers = cljs.core.atom.call(null,re_frame.utils.default_loggers);
/**
 * Change the set (subset?) of logging functions used by re-frame.
 *   'new-loggers' should be a map which looks like default-loggers
 */
re_frame.utils.set_loggers_BANG_ = (function re_frame$utils$set_loggers_BANG_(new_loggers){
if(cljs.core.empty_QMARK_.call(null,clojure.set.difference.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,new_loggers)),cljs.core.set.call(null,cljs.core.keys.call(null,re_frame.utils.default_loggers))))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Unknown keys in new-loggers"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"empty?","empty?",76408555,null),cljs.core.list(new cljs.core.Symbol(null,"difference","difference",-738334373,null),cljs.core.list(new cljs.core.Symbol(null,"set","set",1945134081,null),cljs.core.list(new cljs.core.Symbol(null,"keys","keys",-1586012071,null),new cljs.core.Symbol(null,"new-loggers","new-loggers",-1268568509,null))),cljs.core.list(new cljs.core.Symbol(null,"set","set",1945134081,null),cljs.core.list(new cljs.core.Symbol(null,"keys","keys",-1586012071,null),new cljs.core.Symbol(null,"default-loggers","default-loggers",387733219,null)))))))].join('')));
}

return cljs.core.swap_BANG_.call(null,re_frame.utils.loggers,cljs.core.merge,new_loggers);
});
re_frame.utils.log = (function re_frame$utils$log(var_args){
var args__7518__auto__ = [];
var len__7511__auto___16847 = arguments.length;
var i__7512__auto___16848 = (0);
while(true){
if((i__7512__auto___16848 < len__7511__auto___16847)){
args__7518__auto__.push((arguments[i__7512__auto___16848]));

var G__16849 = (i__7512__auto___16848 + (1));
i__7512__auto___16848 = G__16849;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return re_frame.utils.log.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

re_frame.utils.log.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return new cljs.core.Keyword(null,"log","log",-1595516004).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,re_frame.utils.loggers)).call(null,cljs.core.apply.call(null,cljs.core.str,args));
});

re_frame.utils.log.cljs$lang$maxFixedArity = (0);

re_frame.utils.log.cljs$lang$applyTo = (function (seq16846){
return re_frame.utils.log.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16846));
});
re_frame.utils.warn = (function re_frame$utils$warn(var_args){
var args__7518__auto__ = [];
var len__7511__auto___16851 = arguments.length;
var i__7512__auto___16852 = (0);
while(true){
if((i__7512__auto___16852 < len__7511__auto___16851)){
args__7518__auto__.push((arguments[i__7512__auto___16852]));

var G__16853 = (i__7512__auto___16852 + (1));
i__7512__auto___16852 = G__16853;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return re_frame.utils.warn.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

re_frame.utils.warn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return new cljs.core.Keyword(null,"warn","warn",-436710552).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,re_frame.utils.loggers)).call(null,cljs.core.apply.call(null,cljs.core.str,args));
});

re_frame.utils.warn.cljs$lang$maxFixedArity = (0);

re_frame.utils.warn.cljs$lang$applyTo = (function (seq16850){
return re_frame.utils.warn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16850));
});
re_frame.utils.group = (function re_frame$utils$group(var_args){
var args__7518__auto__ = [];
var len__7511__auto___16855 = arguments.length;
var i__7512__auto___16856 = (0);
while(true){
if((i__7512__auto___16856 < len__7511__auto___16855)){
args__7518__auto__.push((arguments[i__7512__auto___16856]));

var G__16857 = (i__7512__auto___16856 + (1));
i__7512__auto___16856 = G__16857;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return re_frame.utils.group.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

re_frame.utils.group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return new cljs.core.Keyword(null,"group","group",582596132).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,re_frame.utils.loggers)).call(null,cljs.core.apply.call(null,cljs.core.str,args));
});

re_frame.utils.group.cljs$lang$maxFixedArity = (0);

re_frame.utils.group.cljs$lang$applyTo = (function (seq16854){
return re_frame.utils.group.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16854));
});
re_frame.utils.groupEnd = (function re_frame$utils$groupEnd(var_args){
var args__7518__auto__ = [];
var len__7511__auto___16859 = arguments.length;
var i__7512__auto___16860 = (0);
while(true){
if((i__7512__auto___16860 < len__7511__auto___16859)){
args__7518__auto__.push((arguments[i__7512__auto___16860]));

var G__16861 = (i__7512__auto___16860 + (1));
i__7512__auto___16860 = G__16861;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return re_frame.utils.groupEnd.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

re_frame.utils.groupEnd.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return new cljs.core.Keyword(null,"groupEnd","groupEnd",-337721382).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,re_frame.utils.loggers)).call(null,cljs.core.apply.call(null,cljs.core.str,args));
});

re_frame.utils.groupEnd.cljs$lang$maxFixedArity = (0);

re_frame.utils.groupEnd.cljs$lang$applyTo = (function (seq16858){
return re_frame.utils.groupEnd.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16858));
});
re_frame.utils.error = (function re_frame$utils$error(var_args){
var args__7518__auto__ = [];
var len__7511__auto___16863 = arguments.length;
var i__7512__auto___16864 = (0);
while(true){
if((i__7512__auto___16864 < len__7511__auto___16863)){
args__7518__auto__.push((arguments[i__7512__auto___16864]));

var G__16865 = (i__7512__auto___16864 + (1));
i__7512__auto___16864 = G__16865;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return re_frame.utils.error.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

re_frame.utils.error.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,re_frame.utils.loggers)).call(null,cljs.core.apply.call(null,cljs.core.str,args));
});

re_frame.utils.error.cljs$lang$maxFixedArity = (0);

re_frame.utils.error.cljs$lang$applyTo = (function (seq16862){
return re_frame.utils.error.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq16862));
});
re_frame.utils.first_in_vector = (function re_frame$utils$first_in_vector(v){
if(cljs.core.vector_QMARK_.call(null,v)){
return cljs.core.first.call(null,v);
} else {
return re_frame.utils.error.call(null,"re-frame: expected a vector event, but got: ",v);
}
});
