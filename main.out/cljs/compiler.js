// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
goog.require('clojure.string');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
cljs.compiler.ns_first_segments = (function cljs$compiler$ns_first_segments(){
var get_first_ns_segment = (function cljs$compiler$ns_first_segments_$_get_first_ns_segment(ns){
return cljs.core.first.call(null,clojure.string.split.call(null,[cljs.core.str(ns)].join(''),/\./));
});
return cljs.core.map.call(null,get_first_ns_segment,cljs.core.keys.call(null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__9470 = s;
var map__9470__$1 = ((((!((map__9470 == null)))?((((map__9470.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9470.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9470):map__9470);
var name = cljs.core.get.call(null,map__9470__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__9470__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__9473 = info;
var map__9474 = G__9473;
var map__9474__$1 = ((((!((map__9474 == null)))?((((map__9474.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9474.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9474):map__9474);
var shadow = cljs.core.get.call(null,map__9474__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__9473__$1 = G__9473;
while(true){
var d__$2 = d__$1;
var map__9476 = G__9473__$1;
var map__9476__$1 = ((((!((map__9476 == null)))?((((map__9476.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9476.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9476):map__9476);
var shadow__$1 = cljs.core.get.call(null,map__9476__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__9478 = (d__$2 + (1));
var G__9479 = shadow__$1;
d__$1 = G__9478;
G__9473__$1 = G__9479;
continue;
} else {
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([[cljs.core.str(name)].join('')], true),cljs.compiler.ns_first_segments.call(null)))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine.call(null,cljs.core._hash.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s)),cljs.compiler.shadow_depth.call(null,s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__9480){
var map__9485 = p__9480;
var map__9485__$1 = ((((!((map__9485 == null)))?((((map__9485.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9485.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9485):map__9485);
var name_var = map__9485__$1;
var name = cljs.core.get.call(null,map__9485__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__9485__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace.call(null,[cljs.core.str(name)].join(''),"..","_DOT__DOT_");
var map__9487 = info;
var map__9487__$1 = ((((!((map__9487 == null)))?((((map__9487.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9487.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9487):map__9487);
var ns = cljs.core.get.call(null,map__9487__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.call(null,map__9487__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,"_$_",cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.call(null,cljs.compiler.munge.call(null,[cljs.core.str(clojure.string.replace.call(null,[cljs.core.str(ns)].join(''),".","$")),cljs.core.str("$"),cljs.core.str(scoped_name)].join('')));
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if(!((cljs.core.get.call(null,reserved,s) == null))){
return [cljs.core.str(s),cljs.core.str("$")].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var args9489 = [];
var len__7511__auto___9492 = arguments.length;
var i__7512__auto___9493 = (0);
while(true){
if((i__7512__auto___9493 < len__7511__auto___9492)){
args9489.push((arguments[i__7512__auto___9493]));

var G__9494 = (i__7512__auto___9493 + (1));
i__7512__auto___9493 = G__9494;
continue;
} else {
}
break;
}

var G__9491 = args9489.length;
switch (G__9491) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9489.length)].join('')));

}
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.call(null,s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_.call(null,s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if(!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null))){
return cljs.compiler.fn_self_name.call(null,s);
} else {
var depth = cljs.compiler.shadow_depth.call(null,s);
var code = cljs.compiler.hash_scope.call(null,s);
var renamed = cljs.core.get.call(null,cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?[cljs.core.str("self__."),cljs.core.str(name)].join(''):((!((renamed == null)))?renamed:name
));
var munged_name = cljs.compiler.munge.call(null,name__$1,reserved);
if((field === true) || ((depth === (0)))){
return munged_name;
} else {
return cljs.core.symbol.call(null,[cljs.core.str(munged_name),cljs.core.str("__$"),cljs.core.str(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace.call(null,[cljs.core.str(s)].join(''),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace.call(null,ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved.call(null,reserved);
var ss__$2 = cljs.core.map.call(null,rf,clojure.string.split.call(null,ss__$1,/\./));
var ss__$3 = clojure.string.join.call(null,".",ss__$2);
var ms = cljs.core.munge.call(null,ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.call(null,ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;
cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.call(null,",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__9497 = cp;
switch (G__9497) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if((((31) < cp)) && ((cp < (127)))){
return c;
} else {
return [cljs.core.str("\\u"),cljs.core.str(cp.toString((16)))].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__9503_9507 = cljs.core.seq.call(null,s);
var chunk__9504_9508 = null;
var count__9505_9509 = (0);
var i__9506_9510 = (0);
while(true){
if((i__9506_9510 < count__9505_9509)){
var c_9511 = cljs.core._nth.call(null,chunk__9504_9508,i__9506_9510);
sb.append(cljs.compiler.escape_char.call(null,c_9511));

var G__9512 = seq__9503_9507;
var G__9513 = chunk__9504_9508;
var G__9514 = count__9505_9509;
var G__9515 = (i__9506_9510 + (1));
seq__9503_9507 = G__9512;
chunk__9504_9508 = G__9513;
count__9505_9509 = G__9514;
i__9506_9510 = G__9515;
continue;
} else {
var temp__4425__auto___9516 = cljs.core.seq.call(null,seq__9503_9507);
if(temp__4425__auto___9516){
var seq__9503_9517__$1 = temp__4425__auto___9516;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9503_9517__$1)){
var c__7256__auto___9518 = cljs.core.chunk_first.call(null,seq__9503_9517__$1);
var G__9519 = cljs.core.chunk_rest.call(null,seq__9503_9517__$1);
var G__9520 = c__7256__auto___9518;
var G__9521 = cljs.core.count.call(null,c__7256__auto___9518);
var G__9522 = (0);
seq__9503_9507 = G__9519;
chunk__9504_9508 = G__9520;
count__9505_9509 = G__9521;
i__9506_9510 = G__9522;
continue;
} else {
var c_9523 = cljs.core.first.call(null,seq__9503_9517__$1);
sb.append(cljs.compiler.escape_char.call(null,c_9523));

var G__9524 = cljs.core.next.call(null,seq__9503_9517__$1);
var G__9525 = null;
var G__9526 = (0);
var G__9527 = (0);
seq__9503_9507 = G__9524;
chunk__9504_9508 = G__9525;
count__9505_9509 = G__9526;
i__9506_9510 = G__9527;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return [cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join('');
});
if(typeof cljs.compiler.emit_STAR_ !== 'undefined'){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__7366__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7367__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7368__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7369__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7370__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7370__auto__,method_table__7366__auto__,prefer_table__7367__auto__,method_cache__7368__auto__,cached_hierarchy__7369__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
var val__8037__auto__ = cljs.env._STAR_compiler_STAR_;
if((val__8037__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = cljs.env.default_compiler_env.call(null);
} else {
}

try{if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__9533_9538 = ast;
var map__9533_9539__$1 = ((((!((map__9533_9538 == null)))?((((map__9533_9538.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9533_9538.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9533_9538):map__9533_9538);
var env_9540 = cljs.core.get.call(null,map__9533_9539__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_9540))){
var map__9535_9541 = env_9540;
var map__9535_9542__$1 = ((((!((map__9535_9541 == null)))?((((map__9535_9541.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9535_9541.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9535_9541):map__9535_9541);
var line_9543 = cljs.core.get.call(null,map__9535_9542__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_9544 = cljs.core.get.call(null,map__9535_9542__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,((function (map__9535_9541,map__9535_9542__$1,line_9543,column_9544,map__9533_9538,map__9533_9539__$1,env_9540,val__8037__auto__){
return (function (m){
var minfo = (function (){var G__9537 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
var G__9537__$1 = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast),new cljs.core.Keyword(null,"var","var",-769682797)))?cljs.core.assoc.call(null,G__9537,new cljs.core.Keyword(null,"name","name",1843675177),[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast)))].join('')):G__9537);
return G__9537__$1;
})();
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_9543 - (1))], null),cljs.core.fnil.call(null,((function (minfo,map__9535_9541,map__9535_9542__$1,line_9543,column_9544,map__9533_9538,map__9533_9539__$1,env_9540,val__8037__auto__){
return (function (line__$1){
return cljs.core.update_in.call(null,line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_9544)?(column_9544 - (1)):(0))], null),cljs.core.fnil.call(null,((function (minfo,map__9535_9541,map__9535_9542__$1,line_9543,column_9544,map__9533_9538,map__9533_9539__$1,env_9540,val__8037__auto__){
return (function (column__$1){
return cljs.core.conj.call(null,column__$1,minfo);
});})(minfo,map__9535_9541,map__9535_9542__$1,line_9543,column_9544,map__9533_9538,map__9533_9539__$1,env_9540,val__8037__auto__))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__9535_9541,map__9535_9542__$1,line_9543,column_9544,map__9533_9538,map__9533_9539__$1,env_9540,val__8037__auto__))
,cljs.core.sorted_map.call(null)));
});})(map__9535_9541,map__9535_9542__$1,line_9543,column_9544,map__9533_9538,map__9533_9539__$1,env_9540,val__8037__auto__))
);
} else {
}
} else {
}

return cljs.compiler.emit_STAR_.call(null,ast);
}finally {if((val__8037__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = null;
} else {
}
}});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var args__7518__auto__ = [];
var len__7511__auto___9551 = arguments.length;
var i__7512__auto___9552 = (0);
while(true){
if((i__7512__auto___9552 < len__7511__auto___9551)){
args__7518__auto__.push((arguments[i__7512__auto___9552]));

var G__9553 = (i__7512__auto___9552 + (1));
i__7512__auto___9552 = G__9553;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
var seq__9547_9554 = cljs.core.seq.call(null,xs);
var chunk__9548_9555 = null;
var count__9549_9556 = (0);
var i__9550_9557 = (0);
while(true){
if((i__9550_9557 < count__9549_9556)){
var x_9558 = cljs.core._nth.call(null,chunk__9548_9555,i__9550_9557);
if((x_9558 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x_9558)){
cljs.compiler.emit.call(null,x_9558);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x_9558)){
cljs.core.apply.call(null,cljs.compiler.emits,x_9558);
} else {
if(goog.isFunction(x_9558)){
x_9558.call(null);
} else {
var s_9559 = cljs.core.print_str.call(null,x_9558);
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__9547_9554,chunk__9548_9555,count__9549_9556,i__9550_9557,s_9559,x_9558){
return (function (p1__9545_SHARP_){
return (p1__9545_SHARP_ + cljs.core.count.call(null,s_9559));
});})(seq__9547_9554,chunk__9548_9555,count__9549_9556,i__9550_9557,s_9559,x_9558))
);
}

cljs.core.print.call(null,s_9559);

}
}
}
}

var G__9560 = seq__9547_9554;
var G__9561 = chunk__9548_9555;
var G__9562 = count__9549_9556;
var G__9563 = (i__9550_9557 + (1));
seq__9547_9554 = G__9560;
chunk__9548_9555 = G__9561;
count__9549_9556 = G__9562;
i__9550_9557 = G__9563;
continue;
} else {
var temp__4425__auto___9564 = cljs.core.seq.call(null,seq__9547_9554);
if(temp__4425__auto___9564){
var seq__9547_9565__$1 = temp__4425__auto___9564;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9547_9565__$1)){
var c__7256__auto___9566 = cljs.core.chunk_first.call(null,seq__9547_9565__$1);
var G__9567 = cljs.core.chunk_rest.call(null,seq__9547_9565__$1);
var G__9568 = c__7256__auto___9566;
var G__9569 = cljs.core.count.call(null,c__7256__auto___9566);
var G__9570 = (0);
seq__9547_9554 = G__9567;
chunk__9548_9555 = G__9568;
count__9549_9556 = G__9569;
i__9550_9557 = G__9570;
continue;
} else {
var x_9571 = cljs.core.first.call(null,seq__9547_9565__$1);
if((x_9571 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x_9571)){
cljs.compiler.emit.call(null,x_9571);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x_9571)){
cljs.core.apply.call(null,cljs.compiler.emits,x_9571);
} else {
if(goog.isFunction(x_9571)){
x_9571.call(null);
} else {
var s_9572 = cljs.core.print_str.call(null,x_9571);
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__9547_9554,chunk__9548_9555,count__9549_9556,i__9550_9557,s_9572,x_9571,seq__9547_9565__$1,temp__4425__auto___9564){
return (function (p1__9545_SHARP_){
return (p1__9545_SHARP_ + cljs.core.count.call(null,s_9572));
});})(seq__9547_9554,chunk__9548_9555,count__9549_9556,i__9550_9557,s_9572,x_9571,seq__9547_9565__$1,temp__4425__auto___9564))
);
}

cljs.core.print.call(null,s_9572);

}
}
}
}

var G__9573 = cljs.core.next.call(null,seq__9547_9565__$1);
var G__9574 = null;
var G__9575 = (0);
var G__9576 = (0);
seq__9547_9554 = G__9573;
chunk__9548_9555 = G__9574;
count__9549_9556 = G__9575;
i__9550_9557 = G__9576;
continue;
}
} else {
}
}
break;
}

return null;
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (0);

cljs.compiler.emits.cljs$lang$applyTo = (function (seq9546){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq9546));
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var args__7518__auto__ = [];
var len__7511__auto___9581 = arguments.length;
var i__7512__auto___9582 = (0);
while(true){
if((i__7512__auto___9582 < len__7511__auto___9581)){
args__7518__auto__.push((arguments[i__7512__auto___9582]));

var G__9583 = (i__7512__auto___9582 + (1));
i__7512__auto___9582 = G__9583;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
cljs.core.apply.call(null,cljs.compiler.emits,xs);

cljs.core.println.call(null);

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,(function (p__9578){
var map__9579 = p__9578;
var map__9579__$1 = ((((!((map__9579 == null)))?((((map__9579.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9579.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9579):map__9579);
var m = map__9579__$1;
var gen_line = cljs.core.get.call(null,map__9579__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0));
}));
} else {
}

return null;
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (0);

cljs.compiler.emitln.cljs$lang$applyTo = (function (seq9577){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq9577));
});
cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__7427__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_9586_9588 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_9587_9589 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_9586_9588,_STAR_print_fn_STAR_9587_9589,sb__7427__auto__){
return (function (x__7428__auto__){
return sb__7427__auto__.append(x__7428__auto__);
});})(_STAR_print_newline_STAR_9586_9588,_STAR_print_fn_STAR_9587_9589,sb__7427__auto__))
;

try{cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_9587_9589;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_9586_9588;
}
return [cljs.core.str(sb__7427__auto__)].join('');
});
if(typeof cljs.compiler.emit_constant !== 'undefined'){
} else {
cljs.compiler.emit_constant = (function (){var method_table__7366__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7367__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7368__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7369__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7370__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit-constant"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7370__auto__,method_table__7366__auto__,prefer_table__7367__auto__,method_cache__7368__auto__,cached_hierarchy__7369__auto__));
})();
}
cljs.core._add_method.call(null,cljs.compiler.emit_constant,null,(function (x){
return cljs.compiler.emits.call(null,"null");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,Number,(function (x){
return cljs.compiler.emits.call(null,"(",x,")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,String,(function (x){
return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,Boolean,(function (x){
return cljs.compiler.emits.call(null,(cljs.core.truth_(x)?"true":"false"));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,RegExp,(function (x){
if(cljs.core._EQ_.call(null,"",[cljs.core.str(x)].join(''))){
return cljs.compiler.emits.call(null,"(new RegExp(\"\"))");
} else {
var vec__9590 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__9590,(0),null);
var flags = cljs.core.nth.call(null,vec__9590,(1),null);
var pattern = cljs.core.nth.call(null,vec__9590,(2),null);
return cljs.compiler.emits.call(null,pattern);
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace.call(null,kw);
var name = cljs.core.name.call(null,kw);
cljs.compiler.emits.call(null,"new cljs.core.Keyword(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,(cljs.core.truth_(ns)?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,kw));

return cljs.compiler.emits.call(null,")");
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace.call(null,sym);
var name = cljs.core.name.call(null,sym);
var symstr = ((!((ns == null)))?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name);
cljs.compiler.emits.call(null,"new cljs.core.Symbol(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,symstr);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,sym));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,null);

return cljs.compiler.emits.call(null,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant,cljs.core.Keyword,(function (x){
if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))))){
var value = x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_keyword.call(null,x);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,cljs.core.Symbol,(function (x){
if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))))){
var value = x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_symbol.call(null,x);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,Date,(function (date){
return cljs.compiler.emits.call(null,"new Date(",date.getTime(),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.call(null,"new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash.call(null,uuid_str),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var","var",-769682797),(function (p__9592){
var map__9593 = p__9592;
var map__9593__$1 = ((((!((map__9593 == null)))?((((map__9593.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9593.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9593):map__9593);
var arg = map__9593__$1;
var info = cljs.core.get.call(null,map__9593__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.call(null,map__9593__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.call(null,map__9593__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name.call(null,var_name)], null));
var or__6453__auto__ = js_module_name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(arg))){
return cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,arg));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,(function (){var G__9595 = info__$1;
var G__9595__$1 = ((cljs.core.not_EQ_.call(null,form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null)))?cljs.compiler.munge.call(null,G__9595):G__9595);
return G__9595__$1;
})());

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var-special","var-special",1131576802),(function (p__9596){
var map__9597 = p__9596;
var map__9597__$1 = ((((!((map__9597 == null)))?((((map__9597.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9597.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9597):map__9597);
var arg = map__9597__$1;
var env = cljs.core.get.call(null,map__9597__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.call(null,map__9597__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.call(null,map__9597__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.call(null,map__9597__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_.call(null,sym)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol("ana","ast?","ana/ast?",1470128118,null),new cljs.core.Symbol(null,"sym","sym",195671222,null))))].join('')));
}

if(cljs.analyzer.ast_QMARK_.call(null,meta)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol("ana","ast?","ana/ast?",1470128118,null),new cljs.core.Symbol(null,"meta","meta",-1154898805,null))))].join('')));
}

var map__9599 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__9599__$1 = ((((!((map__9599 == null)))?((((map__9599.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9599.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9599):map__9599);
var name = cljs.core.get.call(null,map__9599__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"new cljs.core.Var(function(){return ",cljs.compiler.munge.call(null,name),";},",sym,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"meta","meta",1499536964),(function (p__9601){
var map__9602 = p__9601;
var map__9602__$1 = ((((!((map__9602 == null)))?((((map__9602.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9602.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9602):map__9602);
var expr = cljs.core.get.call(null,map__9602__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.call(null,map__9602__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.call(null,map__9602__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = (8);
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
return (cljs.core.every_QMARK_.call(null,(function (p1__9604_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__9604_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),keys)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,keys)),cljs.core.count.call(null,keys)));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__9605){
var map__9606 = p__9605;
var map__9606__$1 = ((((!((map__9606 == null)))?((((map__9606.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9606.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9606):map__9606);
var env = cljs.core.get.call(null,map__9606__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.call(null,map__9606__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__9606__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if((cljs.core.count.call(null,keys) === (0))){
cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count.call(null,keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(cljs.compiler.distinct_keys_QMARK_.call(null,keys))){
cljs.compiler.emits.call(null,"new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,keys),", [",cljs.compiler.comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"], null)");
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.fromArray([",cljs.compiler.comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"], true, false)");
}
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentHashMap.fromArrays([",cljs.compiler.comma_sep.call(null,keys),"],[",cljs.compiler.comma_sep.call(null,vals),"])");

}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"list","list",765357683),(function (p__9608){
var map__9609 = p__9608;
var map__9609__$1 = ((((!((map__9609 == null)))?((((map__9609.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9609.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9609):map__9609);
var items = cljs.core.get.call(null,map__9609__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__9609__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.empty_QMARK_.call(null,items)){
cljs.compiler.emits.call(null,"cljs.core.List.EMPTY");
} else {
cljs.compiler.emits.call(null,"cljs.core.list(",cljs.compiler.comma_sep.call(null,items),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__9611){
var map__9612 = p__9611;
var map__9612__$1 = ((((!((map__9612 == null)))?((((map__9612.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9612.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9612):map__9612);
var items = cljs.core.get.call(null,map__9612__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__9612__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.empty_QMARK_.call(null,items)){
cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else {
var cnt_9614 = cljs.core.count.call(null,items);
if((cnt_9614 < (32))){
cljs.compiler.emits.call(null,"new cljs.core.PersistentVector(null, ",cnt_9614,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",cljs.compiler.comma_sep.call(null,items),"], null)");
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
return (cljs.core.every_QMARK_.call(null,(function (p1__9615_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__9615_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),items)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,items)),cljs.core.count.call(null,items)));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set","set",304602554),(function (p__9616){
var map__9617 = p__9616;
var map__9617__$1 = ((((!((map__9617 == null)))?((((map__9617.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9617.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9617):map__9617);
var items = cljs.core.get.call(null,map__9617__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__9617__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.empty_QMARK_.call(null,items)){
cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_(cljs.compiler.distinct_constants_QMARK_.call(null,items))){
cljs.compiler.emits.call(null,"new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,items),", [",cljs.compiler.comma_sep.call(null,cljs.core.interleave.call(null,items,cljs.core.repeat.call(null,"null"))),"], null), null)");
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");

}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-value","js-value",-758336661),(function (p__9619){
var map__9620 = p__9619;
var map__9620__$1 = ((((!((map__9620 == null)))?((((map__9620.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9620.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9620):map__9620);
var items = cljs.core.get.call(null,map__9620__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var js_type = cljs.core.get.call(null,map__9620__$1,new cljs.core.Keyword(null,"js-type","js-type",539386702));
var env = cljs.core.get.call(null,map__9620__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core._EQ_.call(null,js_type,new cljs.core.Keyword(null,"object","object",1474613949))){
cljs.compiler.emits.call(null,"{");

var temp__4425__auto___9630 = cljs.core.seq.call(null,items);
if(temp__4425__auto___9630){
var items_9631__$1 = temp__4425__auto___9630;
var vec__9622_9632 = items_9631__$1;
var vec__9623_9633 = cljs.core.nth.call(null,vec__9622_9632,(0),null);
var k_9634 = cljs.core.nth.call(null,vec__9623_9633,(0),null);
var v_9635 = cljs.core.nth.call(null,vec__9623_9633,(1),null);
var r_9636 = cljs.core.nthnext.call(null,vec__9622_9632,(1));
cljs.compiler.emits.call(null,"\"",cljs.core.name.call(null,k_9634),"\": ",v_9635);

var seq__9624_9637 = cljs.core.seq.call(null,r_9636);
var chunk__9625_9638 = null;
var count__9626_9639 = (0);
var i__9627_9640 = (0);
while(true){
if((i__9627_9640 < count__9626_9639)){
var vec__9628_9641 = cljs.core._nth.call(null,chunk__9625_9638,i__9627_9640);
var k_9642__$1 = cljs.core.nth.call(null,vec__9628_9641,(0),null);
var v_9643__$1 = cljs.core.nth.call(null,vec__9628_9641,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_9642__$1),"\": ",v_9643__$1);

var G__9644 = seq__9624_9637;
var G__9645 = chunk__9625_9638;
var G__9646 = count__9626_9639;
var G__9647 = (i__9627_9640 + (1));
seq__9624_9637 = G__9644;
chunk__9625_9638 = G__9645;
count__9626_9639 = G__9646;
i__9627_9640 = G__9647;
continue;
} else {
var temp__4425__auto___9648__$1 = cljs.core.seq.call(null,seq__9624_9637);
if(temp__4425__auto___9648__$1){
var seq__9624_9649__$1 = temp__4425__auto___9648__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9624_9649__$1)){
var c__7256__auto___9650 = cljs.core.chunk_first.call(null,seq__9624_9649__$1);
var G__9651 = cljs.core.chunk_rest.call(null,seq__9624_9649__$1);
var G__9652 = c__7256__auto___9650;
var G__9653 = cljs.core.count.call(null,c__7256__auto___9650);
var G__9654 = (0);
seq__9624_9637 = G__9651;
chunk__9625_9638 = G__9652;
count__9626_9639 = G__9653;
i__9627_9640 = G__9654;
continue;
} else {
var vec__9629_9655 = cljs.core.first.call(null,seq__9624_9649__$1);
var k_9656__$1 = cljs.core.nth.call(null,vec__9629_9655,(0),null);
var v_9657__$1 = cljs.core.nth.call(null,vec__9629_9655,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_9656__$1),"\": ",v_9657__$1);

var G__9658 = cljs.core.next.call(null,seq__9624_9649__$1);
var G__9659 = null;
var G__9660 = (0);
var G__9661 = (0);
seq__9624_9637 = G__9658;
chunk__9625_9638 = G__9659;
count__9626_9639 = G__9660;
i__9627_9640 = G__9661;
continue;
}
} else {
}
}
break;
}
} else {
}

cljs.compiler.emits.call(null,"}");
} else {
cljs.compiler.emits.call(null,"[",cljs.compiler.comma_sep.call(null,items),"]");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"constant","constant",-379609303),(function (p__9662){
var map__9663 = p__9662;
var map__9663__$1 = ((((!((map__9663 == null)))?((((map__9663.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9663.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9663):map__9663);
var form = cljs.core.get.call(null,map__9663__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.call(null,map__9663__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_constant.call(null,form);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(p__9665){
var map__9668 = p__9665;
var map__9668__$1 = ((((!((map__9668 == null)))?((((map__9668.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9668.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9668):map__9668);
var op = cljs.core.get.call(null,map__9668__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__9668__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var and__6441__auto__ = cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"constant","constant",-379609303));
if(and__6441__auto__){
var and__6441__auto____$1 = form;
if(cljs.core.truth_(and__6441__auto____$1)){
return !(((typeof form === 'string') && (cljs.core._EQ_.call(null,form,""))) || ((typeof form === 'number') && ((form === (0)))));
} else {
return and__6441__auto____$1;
}
} else {
return and__6441__auto__;
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(p__9670){
var map__9673 = p__9670;
var map__9673__$1 = ((((!((map__9673 == null)))?((((map__9673.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9673.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9673):map__9673);
var op = cljs.core.get.call(null,map__9673__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__9673__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
return (cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"constant","constant",-379609303))) && ((form === false) || ((form == null)));
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag.call(null,env,e);
var or__6453__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null).call(null,tag);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_.call(null,e);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__9675){
var map__9676 = p__9675;
var map__9676__$1 = ((((!((map__9676 == null)))?((((map__9676.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9676.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9676):map__9676);
var test = cljs.core.get.call(null,map__9676__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.call(null,map__9676__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.call(null,map__9676__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.call(null,map__9676__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.call(null,map__9676__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not.call(null,(function (){var or__6453__auto__ = unchecked;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.compiler.safe_test_QMARK_.call(null,env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,then);
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,else$);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")");
} else {
if(checked){
cljs.compiler.emitln.call(null,"if(cljs.core.truth_(",test,")){");
} else {
cljs.compiler.emitln.call(null,"if(",test,"){");
}

cljs.compiler.emitln.call(null,then,"} else {");

return cljs.compiler.emitln.call(null,else$,"}");
}

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"case*","case*",716180697),(function (p__9678){
var map__9679 = p__9678;
var map__9679__$1 = ((((!((map__9679 == null)))?((((map__9679.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9679.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9679):map__9679);
var v = cljs.core.get.call(null,map__9679__$1,new cljs.core.Keyword(null,"v","v",21465059));
var tests = cljs.core.get.call(null,map__9679__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var thens = cljs.core.get.call(null,map__9679__$1,new cljs.core.Keyword(null,"thens","thens",226631442));
var default$ = cljs.core.get.call(null,map__9679__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.call(null,map__9679__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.call(null,"(function(){");
} else {
}

var gs = cljs.core.gensym.call(null,"caseval__");
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"var ",gs,";");
} else {
}

cljs.compiler.emitln.call(null,"switch (",v,") {");

var seq__9681_9695 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.interleave.call(null,tests,thens)));
var chunk__9682_9696 = null;
var count__9683_9697 = (0);
var i__9684_9698 = (0);
while(true){
if((i__9684_9698 < count__9683_9697)){
var vec__9685_9699 = cljs.core._nth.call(null,chunk__9682_9696,i__9684_9698);
var ts_9700 = cljs.core.nth.call(null,vec__9685_9699,(0),null);
var then_9701 = cljs.core.nth.call(null,vec__9685_9699,(1),null);
var seq__9686_9702 = cljs.core.seq.call(null,ts_9700);
var chunk__9687_9703 = null;
var count__9688_9704 = (0);
var i__9689_9705 = (0);
while(true){
if((i__9689_9705 < count__9688_9704)){
var test_9706 = cljs.core._nth.call(null,chunk__9687_9703,i__9689_9705);
cljs.compiler.emitln.call(null,"case ",test_9706,":");

var G__9707 = seq__9686_9702;
var G__9708 = chunk__9687_9703;
var G__9709 = count__9688_9704;
var G__9710 = (i__9689_9705 + (1));
seq__9686_9702 = G__9707;
chunk__9687_9703 = G__9708;
count__9688_9704 = G__9709;
i__9689_9705 = G__9710;
continue;
} else {
var temp__4425__auto___9711 = cljs.core.seq.call(null,seq__9686_9702);
if(temp__4425__auto___9711){
var seq__9686_9712__$1 = temp__4425__auto___9711;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9686_9712__$1)){
var c__7256__auto___9713 = cljs.core.chunk_first.call(null,seq__9686_9712__$1);
var G__9714 = cljs.core.chunk_rest.call(null,seq__9686_9712__$1);
var G__9715 = c__7256__auto___9713;
var G__9716 = cljs.core.count.call(null,c__7256__auto___9713);
var G__9717 = (0);
seq__9686_9702 = G__9714;
chunk__9687_9703 = G__9715;
count__9688_9704 = G__9716;
i__9689_9705 = G__9717;
continue;
} else {
var test_9718 = cljs.core.first.call(null,seq__9686_9712__$1);
cljs.compiler.emitln.call(null,"case ",test_9718,":");

var G__9719 = cljs.core.next.call(null,seq__9686_9712__$1);
var G__9720 = null;
var G__9721 = (0);
var G__9722 = (0);
seq__9686_9702 = G__9719;
chunk__9687_9703 = G__9720;
count__9688_9704 = G__9721;
i__9689_9705 = G__9722;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_9701);
} else {
cljs.compiler.emitln.call(null,then_9701);
}

cljs.compiler.emitln.call(null,"break;");

var G__9723 = seq__9681_9695;
var G__9724 = chunk__9682_9696;
var G__9725 = count__9683_9697;
var G__9726 = (i__9684_9698 + (1));
seq__9681_9695 = G__9723;
chunk__9682_9696 = G__9724;
count__9683_9697 = G__9725;
i__9684_9698 = G__9726;
continue;
} else {
var temp__4425__auto___9727 = cljs.core.seq.call(null,seq__9681_9695);
if(temp__4425__auto___9727){
var seq__9681_9728__$1 = temp__4425__auto___9727;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9681_9728__$1)){
var c__7256__auto___9729 = cljs.core.chunk_first.call(null,seq__9681_9728__$1);
var G__9730 = cljs.core.chunk_rest.call(null,seq__9681_9728__$1);
var G__9731 = c__7256__auto___9729;
var G__9732 = cljs.core.count.call(null,c__7256__auto___9729);
var G__9733 = (0);
seq__9681_9695 = G__9730;
chunk__9682_9696 = G__9731;
count__9683_9697 = G__9732;
i__9684_9698 = G__9733;
continue;
} else {
var vec__9690_9734 = cljs.core.first.call(null,seq__9681_9728__$1);
var ts_9735 = cljs.core.nth.call(null,vec__9690_9734,(0),null);
var then_9736 = cljs.core.nth.call(null,vec__9690_9734,(1),null);
var seq__9691_9737 = cljs.core.seq.call(null,ts_9735);
var chunk__9692_9738 = null;
var count__9693_9739 = (0);
var i__9694_9740 = (0);
while(true){
if((i__9694_9740 < count__9693_9739)){
var test_9741 = cljs.core._nth.call(null,chunk__9692_9738,i__9694_9740);
cljs.compiler.emitln.call(null,"case ",test_9741,":");

var G__9742 = seq__9691_9737;
var G__9743 = chunk__9692_9738;
var G__9744 = count__9693_9739;
var G__9745 = (i__9694_9740 + (1));
seq__9691_9737 = G__9742;
chunk__9692_9738 = G__9743;
count__9693_9739 = G__9744;
i__9694_9740 = G__9745;
continue;
} else {
var temp__4425__auto___9746__$1 = cljs.core.seq.call(null,seq__9691_9737);
if(temp__4425__auto___9746__$1){
var seq__9691_9747__$1 = temp__4425__auto___9746__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9691_9747__$1)){
var c__7256__auto___9748 = cljs.core.chunk_first.call(null,seq__9691_9747__$1);
var G__9749 = cljs.core.chunk_rest.call(null,seq__9691_9747__$1);
var G__9750 = c__7256__auto___9748;
var G__9751 = cljs.core.count.call(null,c__7256__auto___9748);
var G__9752 = (0);
seq__9691_9737 = G__9749;
chunk__9692_9738 = G__9750;
count__9693_9739 = G__9751;
i__9694_9740 = G__9752;
continue;
} else {
var test_9753 = cljs.core.first.call(null,seq__9691_9747__$1);
cljs.compiler.emitln.call(null,"case ",test_9753,":");

var G__9754 = cljs.core.next.call(null,seq__9691_9747__$1);
var G__9755 = null;
var G__9756 = (0);
var G__9757 = (0);
seq__9691_9737 = G__9754;
chunk__9692_9738 = G__9755;
count__9693_9739 = G__9756;
i__9694_9740 = G__9757;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_9736);
} else {
cljs.compiler.emitln.call(null,then_9736);
}

cljs.compiler.emitln.call(null,"break;");

var G__9758 = cljs.core.next.call(null,seq__9681_9728__$1);
var G__9759 = null;
var G__9760 = (0);
var G__9761 = (0);
seq__9681_9695 = G__9758;
chunk__9682_9696 = G__9759;
count__9683_9697 = G__9760;
i__9684_9698 = G__9761;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.call(null,"default:");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",default$);
} else {
cljs.compiler.emitln.call(null,default$);
}
} else {
}

cljs.compiler.emitln.call(null,"}");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"return ",gs,";})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__9762){
var map__9763 = p__9762;
var map__9763__$1 = ((((!((map__9763 == null)))?((((map__9763.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9763.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9763):map__9763);
var throw$ = cljs.core.get.call(null,map__9763__$1,new cljs.core.Keyword(null,"throw","throw",-1044625833));
var env = cljs.core.get.call(null,map__9763__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.call(null,"(function(){throw ",throw$,"})()");
} else {
return cljs.compiler.emitln.call(null,"throw ",throw$,";");
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.mapped_types,t))){
return cljs.core.get.call(null,cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return [cljs.core.str("!"),cljs.core.str(cljs$compiler$resolve_type.call(null,env,cljs.core.subs.call(null,t,(1))))].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__9768 = ((!(((-1) === idx)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.call(null,t,(0),idx),cljs.core.subs.call(null,t,(idx + (1)),cljs.core.count.call(null,t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.call(null,vec__9768,(0),null);
var rstr = cljs.core.nth.call(null,vec__9768,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs$compiler$resolve_type.call(null,env,rstr):null);
var axstr = cljs.core.subs.call(null,fstr,(9),(cljs.core.count.call(null,fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_.call(null,axstr))?null:cljs.core.map.call(null,cljs.core.comp.call(null,((function (idx,vec__9768,fstr,rstr,ret_t,axstr){
return (function (p1__9765_SHARP_){
return cljs$compiler$resolve_type.call(null,env,p1__9765_SHARP_);
});})(idx,vec__9768,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.call(null,axstr,/,/)));
var G__9769 = [cljs.core.str("function("),cljs.core.str(clojure.string.join.call(null,",",args_ts)),cljs.core.str(")")].join('');
var G__9769__$1 = (cljs.core.truth_(ret_t)?[cljs.core.str(G__9769),cljs.core.str(":"),cljs.core.str(ret_t)].join(''):G__9769);
return G__9769__$1;
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str(cljs$compiler$resolve_type.call(null,env,cljs.core.subs.call(null,t,(0),(cljs.core.count.call(null,t) - (1))))),cljs.core.str("=")].join('');
} else {
return cljs.compiler.munge.call(null,[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.call(null,env,cljs.core.symbol.call(null,t))))].join(''));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.call(null,clojure.string.trim.call(null,ts),(1),(cljs.core.count.call(null,ts) - (1)));
var xs = clojure.string.split.call(null,ts__$1,/\|/);
return [cljs.core.str("{"),cljs.core.str(clojure.string.join.call(null,"|",cljs.core.map.call(null,((function (ts__$1,xs){
return (function (p1__9770_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__9770_SHARP_);
});})(ts__$1,xs))
,xs))),cljs.core.str("}")].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find.call(null,/@param/,line))){
var vec__9773 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var p = cljs.core.nth.call(null,vec__9773,(0),null);
var ts = cljs.core.nth.call(null,vec__9773,(1),null);
var n = cljs.core.nth.call(null,vec__9773,(2),null);
var xs = cljs.core.nthnext.call(null,vec__9773,(3));
if(cljs.core.truth_((function (){var and__6441__auto__ = cljs.core._EQ_.call(null,"@param",p);
if(and__6441__auto__){
var and__6441__auto____$1 = ts;
if(cljs.core.truth_(and__6441__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__6441__auto____$1;
}
} else {
return and__6441__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts),cljs.compiler.munge.call(null,n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find.call(null,/@return/,line))){
var vec__9774 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var p = cljs.core.nth.call(null,vec__9774,(0),null);
var ts = cljs.core.nth.call(null,vec__9774,(1),null);
var xs = cljs.core.nthnext.call(null,vec__9774,(2));
if(cljs.core.truth_((function (){var and__6441__auto__ = cljs.core._EQ_.call(null,"@return",p);
if(and__6441__auto__){
var and__6441__auto____$1 = ts;
if(cljs.core.truth_(and__6441__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__6441__auto____$1;
}
} else {
return and__6441__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warn","warn",-436710552),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null).call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var args9776 = [];
var len__7511__auto___9803 = arguments.length;
var i__7512__auto___9804 = (0);
while(true){
if((i__7512__auto___9804 < len__7511__auto___9803)){
args9776.push((arguments[i__7512__auto___9804]));

var G__9805 = (i__7512__auto___9804 + (1));
i__7512__auto___9804 = G__9805;
continue;
} else {
}
break;
}

var G__9778 = args9776.length;
switch (G__9778) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9776.length)].join('')));

}
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.call(null,null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.call(null,docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__9794 = cljs.core.map.call(null,((function (docs,docs__$1,docs__$2){
return (function (p1__9775_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_.call(null))){
return cljs.compiler.munge_param_return.call(null,env,p1__9775_SHARP_);
} else {
return p1__9775_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines.call(null,e));
var x = cljs.core.nth.call(null,vec__9794,(0),null);
var ys = cljs.core.nthnext.call(null,vec__9794,(1));
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,x,"*/","* /"));

var seq__9795 = cljs.core.seq.call(null,ys);
var chunk__9796 = null;
var count__9797 = (0);
var i__9798 = (0);
while(true){
if((i__9798 < count__9797)){
var next_line = cljs.core._nth.call(null,chunk__9796,i__9798);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));

var G__9807 = seq__9795;
var G__9808 = chunk__9796;
var G__9809 = count__9797;
var G__9810 = (i__9798 + (1));
seq__9795 = G__9807;
chunk__9796 = G__9808;
count__9797 = G__9809;
i__9798 = G__9810;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__9795);
if(temp__4425__auto__){
var seq__9795__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9795__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__9795__$1);
var G__9811 = cljs.core.chunk_rest.call(null,seq__9795__$1);
var G__9812 = c__7256__auto__;
var G__9813 = cljs.core.count.call(null,c__7256__auto__);
var G__9814 = (0);
seq__9795 = G__9811;
chunk__9796 = G__9812;
count__9797 = G__9813;
i__9798 = G__9814;
continue;
} else {
var next_line = cljs.core.first.call(null,seq__9795__$1);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));

var G__9815 = cljs.core.next.call(null,seq__9795__$1);
var G__9816 = null;
var G__9817 = (0);
var G__9818 = (0);
seq__9795 = G__9815;
chunk__9796 = G__9816;
count__9797 = G__9817;
i__9798 = G__9818;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq.call(null,docs__$2)){
cljs.compiler.emitln.call(null,"/**");

var seq__9799_9819 = cljs.core.seq.call(null,docs__$2);
var chunk__9800_9820 = null;
var count__9801_9821 = (0);
var i__9802_9822 = (0);
while(true){
if((i__9802_9822 < count__9801_9821)){
var e_9823 = cljs.core._nth.call(null,chunk__9800_9820,i__9802_9822);
if(cljs.core.truth_(e_9823)){
print_comment_lines.call(null,e_9823);
} else {
}

var G__9824 = seq__9799_9819;
var G__9825 = chunk__9800_9820;
var G__9826 = count__9801_9821;
var G__9827 = (i__9802_9822 + (1));
seq__9799_9819 = G__9824;
chunk__9800_9820 = G__9825;
count__9801_9821 = G__9826;
i__9802_9822 = G__9827;
continue;
} else {
var temp__4425__auto___9828 = cljs.core.seq.call(null,seq__9799_9819);
if(temp__4425__auto___9828){
var seq__9799_9829__$1 = temp__4425__auto___9828;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9799_9829__$1)){
var c__7256__auto___9830 = cljs.core.chunk_first.call(null,seq__9799_9829__$1);
var G__9831 = cljs.core.chunk_rest.call(null,seq__9799_9829__$1);
var G__9832 = c__7256__auto___9830;
var G__9833 = cljs.core.count.call(null,c__7256__auto___9830);
var G__9834 = (0);
seq__9799_9819 = G__9831;
chunk__9800_9820 = G__9832;
count__9801_9821 = G__9833;
i__9802_9822 = G__9834;
continue;
} else {
var e_9835 = cljs.core.first.call(null,seq__9799_9829__$1);
if(cljs.core.truth_(e_9835)){
print_comment_lines.call(null,e_9835);
} else {
}

var G__9836 = cljs.core.next.call(null,seq__9799_9829__$1);
var G__9837 = null;
var G__9838 = (0);
var G__9839 = (0);
seq__9799_9819 = G__9836;
chunk__9800_9820 = G__9837;
count__9801_9821 = G__9838;
i__9802_9822 = G__9839;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.call(null," */");
} else {
return null;
}
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;
cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return (typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number');
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.Keyword(null,"options","options",99638489));
var and__6441__auto__ = cljs.core.some.call(null,((function (opts){
return (function (p1__9841_SHARP_){
return goog.string.startsWith(p1__9841_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__6441__auto__)){
var and__6441__auto____$1 = opts;
if(cljs.core.truth_(and__6441__auto____$1)){
var and__6441__auto____$2 = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478));
if(and__6441__auto____$2){
var define = cljs.core.get_in.call(null,opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),[cljs.core.str(mname)].join('')], null));
if(cljs.core.truth_(cljs.compiler.valid_define_value_QMARK_.call(null,define))){
return cljs.core.pr_str.call(null,define);
} else {
return null;
}
} else {
return and__6441__auto____$2;
}
} else {
return and__6441__auto____$1;
}
} else {
return and__6441__auto__;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__9842){
var map__9843 = p__9842;
var map__9843__$1 = ((((!((map__9843 == null)))?((((map__9843.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9843.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9843):map__9843);
var name = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var var$ = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var init = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var env = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var doc = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var export$ = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"export","export",214356590));
var test = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"test","test",577538877));
var var_ast = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__6453__auto__ = init;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.call(null,name);
cljs.compiler.emit_comment.call(null,env,doc,cljs.core.concat.call(null,jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"return (");
} else {
}

cljs.compiler.emitln.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,var$);

if(cljs.core.truth_(init)){
cljs.compiler.emits.call(null," = ",(function (){var temp__4423__auto__ = cljs.compiler.get_define.call(null,mname,jsdoc);
if(cljs.core.truth_(temp__4423__auto__)){
var define = temp__4423__auto__;
return define;
} else {
return init;
}
})());
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"; return (");

cljs.compiler.emits.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"var-special","var-special",1131576802),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.call(null,env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast));

cljs.compiler.emitln.call(null,");})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,")");
} else {
}
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.call(null,";");
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.call(null,"goog.exportSymbol('",cljs.compiler.munge.call(null,export$),"', ",mname,");");
} else {
}

if(cljs.core.truth_((function (){var and__6441__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(cljs.core.truth_(and__6441__auto__)){
return test;
} else {
return and__6441__auto__;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,";");
} else {
}

return cljs.compiler.emitln.call(null,var$,".cljs$lang$test = ",test,";");
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__9845){
var map__9862 = p__9845;
var map__9862__$1 = ((((!((map__9862 == null)))?((((map__9862.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9862.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9862):map__9862);
var name = cljs.core.get.call(null,map__9862__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__9862__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__9862__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function (",arglist,"){");

var seq__9864_9878 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.drop_last.call(null,(2),params)));
var chunk__9865_9879 = null;
var count__9866_9880 = (0);
var i__9867_9881 = (0);
while(true){
if((i__9867_9881 < count__9866_9880)){
var vec__9868_9882 = cljs.core._nth.call(null,chunk__9865_9879,i__9867_9881);
var i_9883 = cljs.core.nth.call(null,vec__9868_9882,(0),null);
var param_9884 = cljs.core.nth.call(null,vec__9868_9882,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_9884);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");

var G__9885 = seq__9864_9878;
var G__9886 = chunk__9865_9879;
var G__9887 = count__9866_9880;
var G__9888 = (i__9867_9881 + (1));
seq__9864_9878 = G__9885;
chunk__9865_9879 = G__9886;
count__9866_9880 = G__9887;
i__9867_9881 = G__9888;
continue;
} else {
var temp__4425__auto___9889 = cljs.core.seq.call(null,seq__9864_9878);
if(temp__4425__auto___9889){
var seq__9864_9890__$1 = temp__4425__auto___9889;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9864_9890__$1)){
var c__7256__auto___9891 = cljs.core.chunk_first.call(null,seq__9864_9890__$1);
var G__9892 = cljs.core.chunk_rest.call(null,seq__9864_9890__$1);
var G__9893 = c__7256__auto___9891;
var G__9894 = cljs.core.count.call(null,c__7256__auto___9891);
var G__9895 = (0);
seq__9864_9878 = G__9892;
chunk__9865_9879 = G__9893;
count__9866_9880 = G__9894;
i__9867_9881 = G__9895;
continue;
} else {
var vec__9869_9896 = cljs.core.first.call(null,seq__9864_9890__$1);
var i_9897 = cljs.core.nth.call(null,vec__9869_9896,(0),null);
var param_9898 = cljs.core.nth.call(null,vec__9869_9896,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_9898);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");

var G__9899 = cljs.core.next.call(null,seq__9864_9890__$1);
var G__9900 = null;
var G__9901 = (0);
var G__9902 = (0);
seq__9864_9878 = G__9899;
chunk__9865_9879 = G__9900;
count__9866_9880 = G__9901;
i__9867_9881 = G__9902;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count.call(null,params))){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,cljs.core.butlast.call(null,params)));

cljs.compiler.emitln.call(null," = cljs.core.first(",arglist,");");

cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.rest(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__9870_9903 = cljs.core.seq.call(null,params);
var chunk__9871_9904 = null;
var count__9872_9905 = (0);
var i__9873_9906 = (0);
while(true){
if((i__9873_9906 < count__9872_9905)){
var param_9907 = cljs.core._nth.call(null,chunk__9871_9904,i__9873_9906);
cljs.compiler.emit.call(null,param_9907);

if(cljs.core._EQ_.call(null,param_9907,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__9908 = seq__9870_9903;
var G__9909 = chunk__9871_9904;
var G__9910 = count__9872_9905;
var G__9911 = (i__9873_9906 + (1));
seq__9870_9903 = G__9908;
chunk__9871_9904 = G__9909;
count__9872_9905 = G__9910;
i__9873_9906 = G__9911;
continue;
} else {
var temp__4425__auto___9912 = cljs.core.seq.call(null,seq__9870_9903);
if(temp__4425__auto___9912){
var seq__9870_9913__$1 = temp__4425__auto___9912;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9870_9913__$1)){
var c__7256__auto___9914 = cljs.core.chunk_first.call(null,seq__9870_9913__$1);
var G__9915 = cljs.core.chunk_rest.call(null,seq__9870_9913__$1);
var G__9916 = c__7256__auto___9914;
var G__9917 = cljs.core.count.call(null,c__7256__auto___9914);
var G__9918 = (0);
seq__9870_9903 = G__9915;
chunk__9871_9904 = G__9916;
count__9872_9905 = G__9917;
i__9873_9906 = G__9918;
continue;
} else {
var param_9919 = cljs.core.first.call(null,seq__9870_9913__$1);
cljs.compiler.emit.call(null,param_9919);

if(cljs.core._EQ_.call(null,param_9919,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__9920 = cljs.core.next.call(null,seq__9870_9913__$1);
var G__9921 = null;
var G__9922 = (0);
var G__9923 = (0);
seq__9870_9903 = G__9920;
chunk__9871_9904 = G__9921;
count__9872_9905 = G__9922;
i__9873_9906 = G__9923;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
} else {
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.seq(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__9874_9924 = cljs.core.seq.call(null,params);
var chunk__9875_9925 = null;
var count__9876_9926 = (0);
var i__9877_9927 = (0);
while(true){
if((i__9877_9927 < count__9876_9926)){
var param_9928 = cljs.core._nth.call(null,chunk__9875_9925,i__9877_9927);
cljs.compiler.emit.call(null,param_9928);

if(cljs.core._EQ_.call(null,param_9928,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__9929 = seq__9874_9924;
var G__9930 = chunk__9875_9925;
var G__9931 = count__9876_9926;
var G__9932 = (i__9877_9927 + (1));
seq__9874_9924 = G__9929;
chunk__9875_9925 = G__9930;
count__9876_9926 = G__9931;
i__9877_9927 = G__9932;
continue;
} else {
var temp__4425__auto___9933 = cljs.core.seq.call(null,seq__9874_9924);
if(temp__4425__auto___9933){
var seq__9874_9934__$1 = temp__4425__auto___9933;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9874_9934__$1)){
var c__7256__auto___9935 = cljs.core.chunk_first.call(null,seq__9874_9934__$1);
var G__9936 = cljs.core.chunk_rest.call(null,seq__9874_9934__$1);
var G__9937 = c__7256__auto___9935;
var G__9938 = cljs.core.count.call(null,c__7256__auto___9935);
var G__9939 = (0);
seq__9874_9924 = G__9936;
chunk__9875_9925 = G__9937;
count__9876_9926 = G__9938;
i__9877_9927 = G__9939;
continue;
} else {
var param_9940 = cljs.core.first.call(null,seq__9874_9934__$1);
cljs.compiler.emit.call(null,param_9940);

if(cljs.core._EQ_.call(null,param_9940,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__9941 = cljs.core.next.call(null,seq__9874_9934__$1);
var G__9942 = null;
var G__9943 = (0);
var G__9944 = (0);
seq__9874_9924 = G__9941;
chunk__9875_9925 = G__9942;
count__9876_9926 = G__9943;
i__9877_9927 = G__9944;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__9949 = cljs.core.seq.call(null,params);
var chunk__9950 = null;
var count__9951 = (0);
var i__9952 = (0);
while(true){
if((i__9952 < count__9951)){
var param = cljs.core._nth.call(null,chunk__9950,i__9952);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__9953 = seq__9949;
var G__9954 = chunk__9950;
var G__9955 = count__9951;
var G__9956 = (i__9952 + (1));
seq__9949 = G__9953;
chunk__9950 = G__9954;
count__9951 = G__9955;
i__9952 = G__9956;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__9949);
if(temp__4425__auto__){
var seq__9949__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9949__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__9949__$1);
var G__9957 = cljs.core.chunk_rest.call(null,seq__9949__$1);
var G__9958 = c__7256__auto__;
var G__9959 = cljs.core.count.call(null,c__7256__auto__);
var G__9960 = (0);
seq__9949 = G__9957;
chunk__9950 = G__9958;
count__9951 = G__9959;
i__9952 = G__9960;
continue;
} else {
var param = cljs.core.first.call(null,seq__9949__$1);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__9961 = cljs.core.next.call(null,seq__9949__$1);
var G__9962 = null;
var G__9963 = (0);
var G__9964 = (0);
seq__9949 = G__9961;
chunk__9950 = G__9962;
count__9951 = G__9963;
i__9952 = G__9964;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__9965){
var map__9968 = p__9965;
var map__9968__$1 = ((((!((map__9968 == null)))?((((map__9968.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9968.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9968):map__9968);
var type = cljs.core.get.call(null,map__9968__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__9968__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.call(null,map__9968__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.call(null,map__9968__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.call(null,map__9968__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__9968__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__9968__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.call(null,map__9968__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(function ",cljs.compiler.munge.call(null,name),"(");

cljs.compiler.emit_fn_params.call(null,params);

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emits.call(null,"})");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if(((startslice >= (0))) && (cljs.core.integer_QMARK_.call(null,startslice))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Symbol(null,">=",">=",1016916022,null),new cljs.core.Symbol(null,"startslice","startslice",1404029423,null),(0)),cljs.core.list(new cljs.core.Symbol(null,"integer?","integer?",1303791671,null),new cljs.core.Symbol(null,"startslice","startslice",1404029423,null)))))].join('')));
}

var mname = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
var i = [cljs.core.str(mname),cljs.core.str("__i")].join('');
var a = [cljs.core.str(mname),cljs.core.str("__a")].join('');
cljs.compiler.emitln.call(null,"var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");");

cljs.compiler.emitln.call(null,"while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}");

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__9970){
var map__9981 = p__9970;
var map__9981__$1 = ((((!((map__9981 == null)))?((((map__9981.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9981.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9981):map__9981);
var f = map__9981__$1;
var type = cljs.core.get.call(null,map__9981__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__9981__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.call(null,map__9981__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.call(null,map__9981__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.call(null,map__9981__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__9981__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__9981__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.call(null,map__9981__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var name_9991__$1 = (function (){var or__6453__auto__ = name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_9992 = cljs.compiler.munge.call(null,name_9991__$1);
var delegate_name_9993 = [cljs.core.str(mname_9992),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");

cljs.compiler.emits.call(null,"var ",delegate_name_9993," = function (");

var seq__9983_9994 = cljs.core.seq.call(null,params);
var chunk__9984_9995 = null;
var count__9985_9996 = (0);
var i__9986_9997 = (0);
while(true){
if((i__9986_9997 < count__9985_9996)){
var param_9998 = cljs.core._nth.call(null,chunk__9984_9995,i__9986_9997);
cljs.compiler.emit.call(null,param_9998);

if(cljs.core._EQ_.call(null,param_9998,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__9999 = seq__9983_9994;
var G__10000 = chunk__9984_9995;
var G__10001 = count__9985_9996;
var G__10002 = (i__9986_9997 + (1));
seq__9983_9994 = G__9999;
chunk__9984_9995 = G__10000;
count__9985_9996 = G__10001;
i__9986_9997 = G__10002;
continue;
} else {
var temp__4425__auto___10003 = cljs.core.seq.call(null,seq__9983_9994);
if(temp__4425__auto___10003){
var seq__9983_10004__$1 = temp__4425__auto___10003;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9983_10004__$1)){
var c__7256__auto___10005 = cljs.core.chunk_first.call(null,seq__9983_10004__$1);
var G__10006 = cljs.core.chunk_rest.call(null,seq__9983_10004__$1);
var G__10007 = c__7256__auto___10005;
var G__10008 = cljs.core.count.call(null,c__7256__auto___10005);
var G__10009 = (0);
seq__9983_9994 = G__10006;
chunk__9984_9995 = G__10007;
count__9985_9996 = G__10008;
i__9986_9997 = G__10009;
continue;
} else {
var param_10010 = cljs.core.first.call(null,seq__9983_10004__$1);
cljs.compiler.emit.call(null,param_10010);

if(cljs.core._EQ_.call(null,param_10010,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10011 = cljs.core.next.call(null,seq__9983_10004__$1);
var G__10012 = null;
var G__10013 = (0);
var G__10014 = (0);
seq__9983_9994 = G__10011;
chunk__9984_9995 = G__10012;
count__9985_9996 = G__10013;
i__9986_9997 = G__10014;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,"var ",mname_9992," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",(cljs.core.count.call(null,params) - (1)),") {");

var a_10015 = cljs.compiler.emit_arguments_to_array.call(null,(cljs.core.count.call(null,params) - (1)));
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params)," = new cljs.core.IndexedSeq(",a_10015,",0);");

cljs.compiler.emitln.call(null,"} ");
} else {
}

cljs.compiler.emits.call(null,"return ",delegate_name_9993,".call(this,");

var seq__9987_10016 = cljs.core.seq.call(null,params);
var chunk__9988_10017 = null;
var count__9989_10018 = (0);
var i__9990_10019 = (0);
while(true){
if((i__9990_10019 < count__9989_10018)){
var param_10020 = cljs.core._nth.call(null,chunk__9988_10017,i__9990_10019);
cljs.compiler.emit.call(null,param_10020);

if(cljs.core._EQ_.call(null,param_10020,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10021 = seq__9987_10016;
var G__10022 = chunk__9988_10017;
var G__10023 = count__9989_10018;
var G__10024 = (i__9990_10019 + (1));
seq__9987_10016 = G__10021;
chunk__9988_10017 = G__10022;
count__9989_10018 = G__10023;
i__9990_10019 = G__10024;
continue;
} else {
var temp__4425__auto___10025 = cljs.core.seq.call(null,seq__9987_10016);
if(temp__4425__auto___10025){
var seq__9987_10026__$1 = temp__4425__auto___10025;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9987_10026__$1)){
var c__7256__auto___10027 = cljs.core.chunk_first.call(null,seq__9987_10026__$1);
var G__10028 = cljs.core.chunk_rest.call(null,seq__9987_10026__$1);
var G__10029 = c__7256__auto___10027;
var G__10030 = cljs.core.count.call(null,c__7256__auto___10027);
var G__10031 = (0);
seq__9987_10016 = G__10028;
chunk__9988_10017 = G__10029;
count__9989_10018 = G__10030;
i__9990_10019 = G__10031;
continue;
} else {
var param_10032 = cljs.core.first.call(null,seq__9987_10026__$1);
cljs.compiler.emit.call(null,param_10032);

if(cljs.core._EQ_.call(null,param_10032,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10033 = cljs.core.next.call(null,seq__9987_10026__$1);
var G__10034 = null;
var G__10035 = (0);
var G__10036 = (0);
seq__9987_10016 = G__10033;
chunk__9988_10017 = G__10034;
count__9989_10018 = G__10035;
i__9990_10019 = G__10036;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,");");

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,mname_9992,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.call(null,mname_9992,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,new cljs.core.Keyword(null,"name","name",1843675177),name_9991__$1));

cljs.compiler.emitln.call(null,";");

cljs.compiler.emitln.call(null,mname_9992,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_9993,";");

cljs.compiler.emitln.call(null,"return ",mname_9992,";");

cljs.compiler.emitln.call(null,"})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__10040){
var map__10041 = p__10040;
var map__10041__$1 = ((((!((map__10041 == null)))?((((map__10041.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10041.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10041):map__10041);
var name = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var variadic = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var recur_frames = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var loop_lets = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),cljs.core.filter.call(null,((function (map__10041,map__10041__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__10037_SHARP_){
var and__6441__auto__ = p1__10037_SHARP_;
if(cljs.core.truth_(and__6441__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__10037_SHARP_));
} else {
return and__6441__auto__;
}
});})(map__10041,map__10041__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,recur_frames)),cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),loop_lets))));
if(loop_locals){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"((function (",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,loop_locals)),"){");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.call(null,"return ");
}
} else {
}

if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_10062__$1 = (function (){var or__6453__auto__ = name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_10063 = cljs.compiler.munge.call(null,name_10062__$1);
var maxparams_10064 = cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_10065 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (name_10062__$1,mname_10063,maxparams_10064,loop_locals,map__10041,map__10041__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_10063),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_10062__$1,mname_10063,maxparams_10064,loop_locals,map__10041,map__10041__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,methods$));
var ms_10066 = cljs.core.sort_by.call(null,((function (name_10062__$1,mname_10063,maxparams_10064,mmap_10065,loop_locals,map__10041,map__10041__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__10038_SHARP_){
return cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__10038_SHARP_)));
});})(name_10062__$1,mname_10063,maxparams_10064,mmap_10065,loop_locals,map__10041,map__10041__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,cljs.core.seq.call(null,mmap_10065));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"(function() {");

cljs.compiler.emitln.call(null,"var ",mname_10063," = null;");

var seq__10043_10067 = cljs.core.seq.call(null,ms_10066);
var chunk__10044_10068 = null;
var count__10045_10069 = (0);
var i__10046_10070 = (0);
while(true){
if((i__10046_10070 < count__10045_10069)){
var vec__10047_10071 = cljs.core._nth.call(null,chunk__10044_10068,i__10046_10070);
var n_10072 = cljs.core.nth.call(null,vec__10047_10071,(0),null);
var meth_10073 = cljs.core.nth.call(null,vec__10047_10071,(1),null);
cljs.compiler.emits.call(null,"var ",n_10072," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10073))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_10073);
} else {
cljs.compiler.emit_fn_method.call(null,meth_10073);
}

cljs.compiler.emitln.call(null,";");

var G__10074 = seq__10043_10067;
var G__10075 = chunk__10044_10068;
var G__10076 = count__10045_10069;
var G__10077 = (i__10046_10070 + (1));
seq__10043_10067 = G__10074;
chunk__10044_10068 = G__10075;
count__10045_10069 = G__10076;
i__10046_10070 = G__10077;
continue;
} else {
var temp__4425__auto___10078 = cljs.core.seq.call(null,seq__10043_10067);
if(temp__4425__auto___10078){
var seq__10043_10079__$1 = temp__4425__auto___10078;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10043_10079__$1)){
var c__7256__auto___10080 = cljs.core.chunk_first.call(null,seq__10043_10079__$1);
var G__10081 = cljs.core.chunk_rest.call(null,seq__10043_10079__$1);
var G__10082 = c__7256__auto___10080;
var G__10083 = cljs.core.count.call(null,c__7256__auto___10080);
var G__10084 = (0);
seq__10043_10067 = G__10081;
chunk__10044_10068 = G__10082;
count__10045_10069 = G__10083;
i__10046_10070 = G__10084;
continue;
} else {
var vec__10048_10085 = cljs.core.first.call(null,seq__10043_10079__$1);
var n_10086 = cljs.core.nth.call(null,vec__10048_10085,(0),null);
var meth_10087 = cljs.core.nth.call(null,vec__10048_10085,(1),null);
cljs.compiler.emits.call(null,"var ",n_10086," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10087))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_10087);
} else {
cljs.compiler.emit_fn_method.call(null,meth_10087);
}

cljs.compiler.emitln.call(null,";");

var G__10088 = cljs.core.next.call(null,seq__10043_10079__$1);
var G__10089 = null;
var G__10090 = (0);
var G__10091 = (0);
seq__10043_10067 = G__10088;
chunk__10044_10068 = G__10089;
count__10045_10069 = G__10090;
i__10046_10070 = G__10091;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,mname_10063," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_10064),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_10064)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,maxparams_10064));

cljs.compiler.emitln.call(null," = var_args;");
} else {
}

cljs.compiler.emitln.call(null,"switch(arguments.length){");

var seq__10049_10092 = cljs.core.seq.call(null,ms_10066);
var chunk__10050_10093 = null;
var count__10051_10094 = (0);
var i__10052_10095 = (0);
while(true){
if((i__10052_10095 < count__10051_10094)){
var vec__10053_10096 = cljs.core._nth.call(null,chunk__10050_10093,i__10052_10095);
var n_10097 = cljs.core.nth.call(null,vec__10053_10096,(0),null);
var meth_10098 = cljs.core.nth.call(null,vec__10053_10096,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10098))){
cljs.compiler.emitln.call(null,"default:");

var restarg_10099 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_10099," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_10100 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_10099," = new cljs.core.IndexedSeq(",a_10100,",0);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_10097,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_10064)),(((cljs.core.count.call(null,maxparams_10064) > (1)))?", ":null),restarg_10099,");");
} else {
var pcnt_10101 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_10098));
cljs.compiler.emitln.call(null,"case ",pcnt_10101,":");

cljs.compiler.emitln.call(null,"return ",n_10097,".call(this",(((pcnt_10101 === (0)))?null:cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_10101,maxparams_10064))),",")),");");
}

var G__10102 = seq__10049_10092;
var G__10103 = chunk__10050_10093;
var G__10104 = count__10051_10094;
var G__10105 = (i__10052_10095 + (1));
seq__10049_10092 = G__10102;
chunk__10050_10093 = G__10103;
count__10051_10094 = G__10104;
i__10052_10095 = G__10105;
continue;
} else {
var temp__4425__auto___10106 = cljs.core.seq.call(null,seq__10049_10092);
if(temp__4425__auto___10106){
var seq__10049_10107__$1 = temp__4425__auto___10106;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10049_10107__$1)){
var c__7256__auto___10108 = cljs.core.chunk_first.call(null,seq__10049_10107__$1);
var G__10109 = cljs.core.chunk_rest.call(null,seq__10049_10107__$1);
var G__10110 = c__7256__auto___10108;
var G__10111 = cljs.core.count.call(null,c__7256__auto___10108);
var G__10112 = (0);
seq__10049_10092 = G__10109;
chunk__10050_10093 = G__10110;
count__10051_10094 = G__10111;
i__10052_10095 = G__10112;
continue;
} else {
var vec__10054_10113 = cljs.core.first.call(null,seq__10049_10107__$1);
var n_10114 = cljs.core.nth.call(null,vec__10054_10113,(0),null);
var meth_10115 = cljs.core.nth.call(null,vec__10054_10113,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10115))){
cljs.compiler.emitln.call(null,"default:");

var restarg_10116 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_10116," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_10117 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_10116," = new cljs.core.IndexedSeq(",a_10117,",0);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_10114,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_10064)),(((cljs.core.count.call(null,maxparams_10064) > (1)))?", ":null),restarg_10116,");");
} else {
var pcnt_10118 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_10115));
cljs.compiler.emitln.call(null,"case ",pcnt_10118,":");

cljs.compiler.emitln.call(null,"return ",n_10114,".call(this",(((pcnt_10118 === (0)))?null:cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_10118,maxparams_10064))),",")),");");
}

var G__10119 = cljs.core.next.call(null,seq__10049_10107__$1);
var G__10120 = null;
var G__10121 = (0);
var G__10122 = (0);
seq__10049_10092 = G__10119;
chunk__10050_10093 = G__10120;
count__10051_10094 = G__10121;
i__10052_10095 = G__10122;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"throw(new Error('Invalid arity: ' + arguments.length));");

cljs.compiler.emitln.call(null,"};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.call(null,mname_10063,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.call(null,mname_10063,".cljs$lang$applyTo = ",cljs.core.some.call(null,((function (name_10062__$1,mname_10063,maxparams_10064,mmap_10065,ms_10066,loop_locals,map__10041,map__10041__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__10039_SHARP_){
var vec__10055 = p1__10039_SHARP_;
var n = cljs.core.nth.call(null,vec__10055,(0),null);
var m = cljs.core.nth.call(null,vec__10055,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_10062__$1,mname_10063,maxparams_10064,mmap_10065,ms_10066,loop_locals,map__10041,map__10041__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,ms_10066),".cljs$lang$applyTo;");
} else {
}

var seq__10056_10123 = cljs.core.seq.call(null,ms_10066);
var chunk__10057_10124 = null;
var count__10058_10125 = (0);
var i__10059_10126 = (0);
while(true){
if((i__10059_10126 < count__10058_10125)){
var vec__10060_10127 = cljs.core._nth.call(null,chunk__10057_10124,i__10059_10126);
var n_10128 = cljs.core.nth.call(null,vec__10060_10127,(0),null);
var meth_10129 = cljs.core.nth.call(null,vec__10060_10127,(1),null);
var c_10130 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_10129));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10129))){
cljs.compiler.emitln.call(null,mname_10063,".cljs$core$IFn$_invoke$arity$variadic = ",n_10128,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_10063,".cljs$core$IFn$_invoke$arity$",c_10130," = ",n_10128,";");
}

var G__10131 = seq__10056_10123;
var G__10132 = chunk__10057_10124;
var G__10133 = count__10058_10125;
var G__10134 = (i__10059_10126 + (1));
seq__10056_10123 = G__10131;
chunk__10057_10124 = G__10132;
count__10058_10125 = G__10133;
i__10059_10126 = G__10134;
continue;
} else {
var temp__4425__auto___10135 = cljs.core.seq.call(null,seq__10056_10123);
if(temp__4425__auto___10135){
var seq__10056_10136__$1 = temp__4425__auto___10135;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10056_10136__$1)){
var c__7256__auto___10137 = cljs.core.chunk_first.call(null,seq__10056_10136__$1);
var G__10138 = cljs.core.chunk_rest.call(null,seq__10056_10136__$1);
var G__10139 = c__7256__auto___10137;
var G__10140 = cljs.core.count.call(null,c__7256__auto___10137);
var G__10141 = (0);
seq__10056_10123 = G__10138;
chunk__10057_10124 = G__10139;
count__10058_10125 = G__10140;
i__10059_10126 = G__10141;
continue;
} else {
var vec__10061_10142 = cljs.core.first.call(null,seq__10056_10136__$1);
var n_10143 = cljs.core.nth.call(null,vec__10061_10142,(0),null);
var meth_10144 = cljs.core.nth.call(null,vec__10061_10142,(1),null);
var c_10145 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_10144));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10144))){
cljs.compiler.emitln.call(null,mname_10063,".cljs$core$IFn$_invoke$arity$variadic = ",n_10143,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_10063,".cljs$core$IFn$_invoke$arity$",c_10145," = ",n_10143,";");
}

var G__10146 = cljs.core.next.call(null,seq__10056_10136__$1);
var G__10147 = null;
var G__10148 = (0);
var G__10149 = (0);
seq__10056_10123 = G__10146;
chunk__10057_10124 = G__10147;
count__10058_10125 = G__10148;
i__10059_10126 = G__10149;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"return ",mname_10063,";");

cljs.compiler.emitln.call(null,"})()");
}

if(loop_locals){
return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else {
return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"do","do",46310725),(function (p__10150){
var map__10151 = p__10150;
var map__10151__$1 = ((((!((map__10151 == null)))?((((map__10151.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10151.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10151):map__10151);
var statements = cljs.core.get.call(null,map__10151__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.call(null,map__10151__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.call(null,map__10151__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var and__6441__auto__ = statements;
if(cljs.core.truth_(and__6441__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context);
} else {
return and__6441__auto__;
}
})())){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

var seq__10153_10157 = cljs.core.seq.call(null,statements);
var chunk__10154_10158 = null;
var count__10155_10159 = (0);
var i__10156_10160 = (0);
while(true){
if((i__10156_10160 < count__10155_10159)){
var s_10161 = cljs.core._nth.call(null,chunk__10154_10158,i__10156_10160);
cljs.compiler.emitln.call(null,s_10161);

var G__10162 = seq__10153_10157;
var G__10163 = chunk__10154_10158;
var G__10164 = count__10155_10159;
var G__10165 = (i__10156_10160 + (1));
seq__10153_10157 = G__10162;
chunk__10154_10158 = G__10163;
count__10155_10159 = G__10164;
i__10156_10160 = G__10165;
continue;
} else {
var temp__4425__auto___10166 = cljs.core.seq.call(null,seq__10153_10157);
if(temp__4425__auto___10166){
var seq__10153_10167__$1 = temp__4425__auto___10166;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10153_10167__$1)){
var c__7256__auto___10168 = cljs.core.chunk_first.call(null,seq__10153_10167__$1);
var G__10169 = cljs.core.chunk_rest.call(null,seq__10153_10167__$1);
var G__10170 = c__7256__auto___10168;
var G__10171 = cljs.core.count.call(null,c__7256__auto___10168);
var G__10172 = (0);
seq__10153_10157 = G__10169;
chunk__10154_10158 = G__10170;
count__10155_10159 = G__10171;
i__10156_10160 = G__10172;
continue;
} else {
var s_10173 = cljs.core.first.call(null,seq__10153_10167__$1);
cljs.compiler.emitln.call(null,s_10173);

var G__10174 = cljs.core.next.call(null,seq__10153_10167__$1);
var G__10175 = null;
var G__10176 = (0);
var G__10177 = (0);
seq__10153_10157 = G__10174;
chunk__10154_10158 = G__10175;
count__10155_10159 = G__10176;
i__10156_10160 = G__10177;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit.call(null,ret);

if(cljs.core.truth_((function (){var and__6441__auto__ = statements;
if(cljs.core.truth_(and__6441__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context);
} else {
return and__6441__auto__;
}
})())){
return cljs.compiler.emitln.call(null,"})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__10178){
var map__10179 = p__10178;
var map__10179__$1 = ((((!((map__10179 == null)))?((((map__10179.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10179.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10179):map__10179);
var env = cljs.core.get.call(null,map__10179__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var try$ = cljs.core.get.call(null,map__10179__$1,new cljs.core.Keyword(null,"try","try",1380742522));
var catch$ = cljs.core.get.call(null,map__10179__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.call(null,map__10179__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.call(null,map__10179__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__6453__auto__ = name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,"try{",try$,"}");

if(cljs.core.truth_(name)){
cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){",catch$,"}");
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"constant","constant",-379609303),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(finally$))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),new cljs.core.Keyword(null,"constant","constant",-379609303),cljs.core.list(new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Symbol(null,"finally","finally",-1065347064,null)))))].join('')));
}

cljs.compiler.emits.call(null,"finally {",finally$,"}");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
} else {
return cljs.compiler.emits.call(null,try$);
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__10181,is_loop){
var map__10193 = p__10181;
var map__10193__$1 = ((((!((map__10193 == null)))?((((map__10193.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10193.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10193):map__10193);
var bindings = cljs.core.get.call(null,map__10193__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.call(null,map__10193__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__10193__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var _STAR_lexical_renames_STAR_10195_10204 = cljs.compiler._STAR_lexical_renames_STAR_;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.call(null,((function (_STAR_lexical_renames_STAR_10195_10204,context,map__10193,map__10193__$1,bindings,expr,env){
return (function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope.call(null,binding),cljs.core.gensym.call(null,[cljs.core.str(name),cljs.core.str("-")].join(''))],null));
});})(_STAR_lexical_renames_STAR_10195_10204,context,map__10193,map__10193__$1,bindings,expr,env))
,bindings):null));

try{var seq__10196_10205 = cljs.core.seq.call(null,bindings);
var chunk__10197_10206 = null;
var count__10198_10207 = (0);
var i__10199_10208 = (0);
while(true){
if((i__10199_10208 < count__10198_10207)){
var map__10200_10209 = cljs.core._nth.call(null,chunk__10197_10206,i__10199_10208);
var map__10200_10210__$1 = ((((!((map__10200_10209 == null)))?((((map__10200_10209.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10200_10209.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10200_10209):map__10200_10209);
var binding_10211 = map__10200_10210__$1;
var init_10212 = cljs.core.get.call(null,map__10200_10210__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_10211);

cljs.compiler.emitln.call(null," = ",init_10212,";");

var G__10213 = seq__10196_10205;
var G__10214 = chunk__10197_10206;
var G__10215 = count__10198_10207;
var G__10216 = (i__10199_10208 + (1));
seq__10196_10205 = G__10213;
chunk__10197_10206 = G__10214;
count__10198_10207 = G__10215;
i__10199_10208 = G__10216;
continue;
} else {
var temp__4425__auto___10217 = cljs.core.seq.call(null,seq__10196_10205);
if(temp__4425__auto___10217){
var seq__10196_10218__$1 = temp__4425__auto___10217;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10196_10218__$1)){
var c__7256__auto___10219 = cljs.core.chunk_first.call(null,seq__10196_10218__$1);
var G__10220 = cljs.core.chunk_rest.call(null,seq__10196_10218__$1);
var G__10221 = c__7256__auto___10219;
var G__10222 = cljs.core.count.call(null,c__7256__auto___10219);
var G__10223 = (0);
seq__10196_10205 = G__10220;
chunk__10197_10206 = G__10221;
count__10198_10207 = G__10222;
i__10199_10208 = G__10223;
continue;
} else {
var map__10202_10224 = cljs.core.first.call(null,seq__10196_10218__$1);
var map__10202_10225__$1 = ((((!((map__10202_10224 == null)))?((((map__10202_10224.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10202_10224.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10202_10224):map__10202_10224);
var binding_10226 = map__10202_10225__$1;
var init_10227 = cljs.core.get.call(null,map__10202_10225__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_10226);

cljs.compiler.emitln.call(null," = ",init_10227,";");

var G__10228 = cljs.core.next.call(null,seq__10196_10218__$1);
var G__10229 = null;
var G__10230 = (0);
var G__10231 = (0);
seq__10196_10205 = G__10228;
chunk__10197_10206 = G__10229;
count__10198_10207 = G__10230;
i__10199_10208 = G__10231;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_10195_10204;
}
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let.call(null,ast,false);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let.call(null,ast,true);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__10232){
var map__10233 = p__10232;
var map__10233__$1 = ((((!((map__10233 == null)))?((((map__10233.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10233.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10233):map__10233);
var frame = cljs.core.get.call(null,map__10233__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.call(null,map__10233__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.call(null,map__10233__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__7356__auto___10235 = cljs.core.count.call(null,exprs);
var i_10236 = (0);
while(true){
if((i_10236 < n__7356__auto___10235)){
cljs.compiler.emitln.call(null,"var ",temps.call(null,i_10236)," = ",exprs.call(null,i_10236),";");

var G__10237 = (i_10236 + (1));
i_10236 = G__10237;
continue;
} else {
}
break;
}

var n__7356__auto___10238 = cljs.core.count.call(null,exprs);
var i_10239 = (0);
while(true){
if((i_10239 < n__7356__auto___10238)){
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_10239))," = ",temps.call(null,i_10239),";");

var G__10240 = (i_10239 + (1));
i_10239 = G__10240;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.call(null,"continue;");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__10241){
var map__10242 = p__10241;
var map__10242__$1 = ((((!((map__10242 == null)))?((((map__10242.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10242.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10242):map__10242);
var bindings = cljs.core.get.call(null,map__10242__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.call(null,map__10242__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__10242__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var seq__10244_10252 = cljs.core.seq.call(null,bindings);
var chunk__10245_10253 = null;
var count__10246_10254 = (0);
var i__10247_10255 = (0);
while(true){
if((i__10247_10255 < count__10246_10254)){
var map__10248_10256 = cljs.core._nth.call(null,chunk__10245_10253,i__10247_10255);
var map__10248_10257__$1 = ((((!((map__10248_10256 == null)))?((((map__10248_10256.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10248_10256.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10248_10256):map__10248_10256);
var binding_10258 = map__10248_10257__$1;
var init_10259 = cljs.core.get.call(null,map__10248_10257__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_10258)," = ",init_10259,";");

var G__10260 = seq__10244_10252;
var G__10261 = chunk__10245_10253;
var G__10262 = count__10246_10254;
var G__10263 = (i__10247_10255 + (1));
seq__10244_10252 = G__10260;
chunk__10245_10253 = G__10261;
count__10246_10254 = G__10262;
i__10247_10255 = G__10263;
continue;
} else {
var temp__4425__auto___10264 = cljs.core.seq.call(null,seq__10244_10252);
if(temp__4425__auto___10264){
var seq__10244_10265__$1 = temp__4425__auto___10264;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10244_10265__$1)){
var c__7256__auto___10266 = cljs.core.chunk_first.call(null,seq__10244_10265__$1);
var G__10267 = cljs.core.chunk_rest.call(null,seq__10244_10265__$1);
var G__10268 = c__7256__auto___10266;
var G__10269 = cljs.core.count.call(null,c__7256__auto___10266);
var G__10270 = (0);
seq__10244_10252 = G__10267;
chunk__10245_10253 = G__10268;
count__10246_10254 = G__10269;
i__10247_10255 = G__10270;
continue;
} else {
var map__10250_10271 = cljs.core.first.call(null,seq__10244_10265__$1);
var map__10250_10272__$1 = ((((!((map__10250_10271 == null)))?((((map__10250_10271.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10250_10271.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10250_10271):map__10250_10271);
var binding_10273 = map__10250_10272__$1;
var init_10274 = cljs.core.get.call(null,map__10250_10272__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_10273)," = ",init_10274,";");

var G__10275 = cljs.core.next.call(null,seq__10244_10265__$1);
var G__10276 = null;
var G__10277 = (0);
var G__10278 = (0);
seq__10244_10252 = G__10275;
chunk__10245_10253 = G__10276;
count__10246_10254 = G__10277;
i__10247_10255 = G__10278;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,expr);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.call(null,[cljs.core.str([cljs.core.str(psym)].join('').replace((new RegExp("\\.","g")),"$").replace("/","$")),cljs.core.str("$")].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__10281){
var map__10282 = p__10281;
var map__10282__$1 = ((((!((map__10282 == null)))?((((map__10282.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10282.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10282):map__10282);
var expr = map__10282__$1;
var f = cljs.core.get.call(null,map__10282__$1,new cljs.core.Keyword(null,"f","f",-1597136552));
var args = cljs.core.get.call(null,map__10282__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__10282__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__6441__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__6441__auto__)){
var and__6441__auto____$1 = cljs.core.not.call(null,new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info));
if(and__6441__auto____$1){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__6441__auto____$1;
}
} else {
return and__6441__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__6441__auto__ = protocol;
if(cljs.core.truth_(and__6441__auto__)){
var and__6441__auto____$1 = tag;
if(cljs.core.truth_(and__6441__auto____$1)){
var or__6453__auto__ = (function (){var and__6441__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__6441__auto____$2)){
var and__6441__auto____$3 = protocol;
if(cljs.core.truth_(and__6441__auto____$3)){
return cljs.core._EQ_.call(null,tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__6441__auto____$3;
}
} else {
return and__6441__auto____$2;
}
})();
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
var and__6441__auto____$2 = (function (){var or__6453__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__6453__auto____$1)){
return or__6453__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__6441__auto____$2)){
var or__6453__auto____$1 = cljs.core._EQ_.call(null,protocol,tag);
if(or__6453__auto____$1){
return or__6453__auto____$1;
} else {
var and__6441__auto____$3 = !(cljs.core.set_QMARK_.call(null,tag));
if(and__6441__auto____$3){
var and__6441__auto____$4 = cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [new cljs.core.Symbol(null,"clj","clj",980036099,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null,new cljs.core.Symbol(null,"object","object",-1179821820,null),null,new cljs.core.Symbol(null,"any","any",-948528346,null),null,new cljs.core.Symbol(null,"number","number",-1084057331,null),null,new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),null,new cljs.core.Symbol(null,"array","array",-440182315,null),null,new cljs.core.Symbol(null,"string","string",-349010059,null),null,new cljs.core.Symbol(null,"function","function",-486723946,null),null,new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),null], null), null).call(null,tag));
if(and__6441__auto____$4){
var temp__4425__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var.call(null,cljs.core.dissoc.call(null,env,new cljs.core.Keyword(null,"locals","locals",535295783)),tag));
if(cljs.core.truth_(temp__4425__auto__)){
var ps = temp__4425__auto__;
return ps.call(null,protocol);
} else {
return null;
}
} else {
return and__6441__auto____$4;
}
} else {
return and__6441__auto____$3;
}
}
} else {
return and__6441__auto____$2;
}
}
} else {
return and__6441__auto____$1;
}
} else {
return and__6441__auto__;
}
})();
var opt_not_QMARK_ = (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.call(null,cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr))),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = (cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"js","js",-886355190,null))) || (cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null)));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__6453__auto__ = cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__6453__auto__){
return or__6453__auto__;
} else {
var temp__4425__auto__ = [cljs.core.str(ns)].join('');
if(cljs.core.truth_(temp__4425__auto__)){
var ns_str = temp__4425__auto__;
return cljs.core._EQ_.call(null,cljs.core.get.call(null,clojure.string.split.call(null,ns_str,/\./),(0),null),"goog");
} else {
return null;
}
}
})():null);
var keyword_QMARK_ = (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f),new cljs.core.Keyword(null,"constant","constant",-379609303))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f) instanceof cljs.core.Keyword));
var vec__10284 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if((cljs.core.not.call(null,variadic_QMARK_)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,mps),(1)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__6441__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__6441__auto__)){
return (arity > mfa);
} else {
return and__6441__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10282,map__10282__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$variadic")].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10282,map__10282__$1,expr,f,args,env){
return (function (p1__10279_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__10279_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10282,map__10282__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10282,map__10282__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([arity], true),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10282,map__10282__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10282,map__10282__$1,expr,f,args,env){
return (function (p1__10280_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__10280_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10282,map__10282__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10282,map__10282__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.call(null,vec__10284,(0),null);
var variadic_invoke = cljs.core.nth.call(null,vec__10284,(1),null);
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_10285 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_10285,"(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",cljs.core.rest.call(null,args))),")");
} else {
if(keyword_QMARK_){
cljs.compiler.emits.call(null,f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count.call(null,args),"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_10286 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_10286,args)),(((mfa_10286 === (0)))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_10286,args)),"], 0))");
} else {
if(cljs.core.truth_((function (){var or__6453__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
var or__6453__auto____$1 = js_QMARK_;
if(or__6453__auto____$1){
return or__6453__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_((function (){var and__6441__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__6441__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"var","var",-769682797));
} else {
return and__6441__auto__;
}
})())){
var fprop_10287 = [cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_10287," ? ",f__$1,fprop_10287,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
} else {
cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}

}
}
}
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__10288){
var map__10289 = p__10288;
var map__10289__$1 = ((((!((map__10289 == null)))?((((map__10289.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10289.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10289):map__10289);
var ctor = cljs.core.get.call(null,map__10289__$1,new cljs.core.Keyword(null,"ctor","ctor",1750864802));
var args = cljs.core.get.call(null,map__10289__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__10289__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__10291){
var map__10292 = p__10291;
var map__10292__$1 = ((((!((map__10292 == null)))?((((map__10292.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10292.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10292):map__10292);
var target = cljs.core.get.call(null,map__10292__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.call(null,map__10292__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.call(null,map__10292__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,target," = ",val);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads){
var loaded_libs = cljs.compiler.munge.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.call(null,cljs.core.gensym.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set();");

cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.set();");
} else {
}

var seq__10298_10302 = cljs.core.seq.call(null,cljs.core.remove.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,seen)),cljs.core.distinct.call(null,cljs.core.vals.call(null,libs))));
var chunk__10299_10303 = null;
var count__10300_10304 = (0);
var i__10301_10305 = (0);
while(true){
if((i__10301_10305 < count__10300_10304)){
var lib_10306 = cljs.core._nth.call(null,chunk__10299_10303,i__10301_10305);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_10306),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10306),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_10306),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10306),"', 'reload-all');");
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10306),"');");

}
}

var G__10307 = seq__10298_10302;
var G__10308 = chunk__10299_10303;
var G__10309 = count__10300_10304;
var G__10310 = (i__10301_10305 + (1));
seq__10298_10302 = G__10307;
chunk__10299_10303 = G__10308;
count__10300_10304 = G__10309;
i__10301_10305 = G__10310;
continue;
} else {
var temp__4425__auto___10311 = cljs.core.seq.call(null,seq__10298_10302);
if(temp__4425__auto___10311){
var seq__10298_10312__$1 = temp__4425__auto___10311;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10298_10312__$1)){
var c__7256__auto___10313 = cljs.core.chunk_first.call(null,seq__10298_10312__$1);
var G__10314 = cljs.core.chunk_rest.call(null,seq__10298_10312__$1);
var G__10315 = c__7256__auto___10313;
var G__10316 = cljs.core.count.call(null,c__7256__auto___10313);
var G__10317 = (0);
seq__10298_10302 = G__10314;
chunk__10299_10303 = G__10315;
count__10300_10304 = G__10316;
i__10301_10305 = G__10317;
continue;
} else {
var lib_10318 = cljs.core.first.call(null,seq__10298_10312__$1);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_10318),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10318),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_10318),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10318),"', 'reload-all');");
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10318),"');");

}
}

var G__10319 = cljs.core.next.call(null,seq__10298_10312__$1);
var G__10320 = null;
var G__10321 = (0);
var G__10322 = (0);
seq__10298_10302 = G__10319;
chunk__10299_10303 = G__10320;
count__10300_10304 = G__10321;
i__10301_10305 = G__10322;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
return cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__10323){
var map__10324 = p__10323;
var map__10324__$1 = ((((!((map__10324 == null)))?((((map__10324.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10324.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10324):map__10324);
var name = cljs.core.get.call(null,map__10324__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__10324__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__10324__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__10324__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__10324__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__10324__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");

if(cljs.core._EQ_.call(null,name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}

cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads));

return cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"deftype*","deftype*",-677871637),(function (p__10326){
var map__10327 = p__10326;
var map__10327__$1 = ((((!((map__10327 == null)))?((((map__10327.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10327.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10327):map__10327);
var t = cljs.core.get.call(null,map__10327__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__10327__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__10327__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__10327__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__10327__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__10329_10343 = cljs.core.seq.call(null,protocols);
var chunk__10330_10344 = null;
var count__10331_10345 = (0);
var i__10332_10346 = (0);
while(true){
if((i__10332_10346 < count__10331_10345)){
var protocol_10347 = cljs.core._nth.call(null,chunk__10330_10344,i__10332_10346);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_10347)].join('')),"}");

var G__10348 = seq__10329_10343;
var G__10349 = chunk__10330_10344;
var G__10350 = count__10331_10345;
var G__10351 = (i__10332_10346 + (1));
seq__10329_10343 = G__10348;
chunk__10330_10344 = G__10349;
count__10331_10345 = G__10350;
i__10332_10346 = G__10351;
continue;
} else {
var temp__4425__auto___10352 = cljs.core.seq.call(null,seq__10329_10343);
if(temp__4425__auto___10352){
var seq__10329_10353__$1 = temp__4425__auto___10352;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10329_10353__$1)){
var c__7256__auto___10354 = cljs.core.chunk_first.call(null,seq__10329_10353__$1);
var G__10355 = cljs.core.chunk_rest.call(null,seq__10329_10353__$1);
var G__10356 = c__7256__auto___10354;
var G__10357 = cljs.core.count.call(null,c__7256__auto___10354);
var G__10358 = (0);
seq__10329_10343 = G__10355;
chunk__10330_10344 = G__10356;
count__10331_10345 = G__10357;
i__10332_10346 = G__10358;
continue;
} else {
var protocol_10359 = cljs.core.first.call(null,seq__10329_10353__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_10359)].join('')),"}");

var G__10360 = cljs.core.next.call(null,seq__10329_10353__$1);
var G__10361 = null;
var G__10362 = (0);
var G__10363 = (0);
seq__10329_10343 = G__10360;
chunk__10330_10344 = G__10361;
count__10331_10345 = G__10362;
i__10332_10346 = G__10363;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__10333_10364 = cljs.core.seq.call(null,fields__$1);
var chunk__10334_10365 = null;
var count__10335_10366 = (0);
var i__10336_10367 = (0);
while(true){
if((i__10336_10367 < count__10335_10366)){
var fld_10368 = cljs.core._nth.call(null,chunk__10334_10365,i__10336_10367);
cljs.compiler.emitln.call(null,"this.",fld_10368," = ",fld_10368,";");

var G__10369 = seq__10333_10364;
var G__10370 = chunk__10334_10365;
var G__10371 = count__10335_10366;
var G__10372 = (i__10336_10367 + (1));
seq__10333_10364 = G__10369;
chunk__10334_10365 = G__10370;
count__10335_10366 = G__10371;
i__10336_10367 = G__10372;
continue;
} else {
var temp__4425__auto___10373 = cljs.core.seq.call(null,seq__10333_10364);
if(temp__4425__auto___10373){
var seq__10333_10374__$1 = temp__4425__auto___10373;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10333_10374__$1)){
var c__7256__auto___10375 = cljs.core.chunk_first.call(null,seq__10333_10374__$1);
var G__10376 = cljs.core.chunk_rest.call(null,seq__10333_10374__$1);
var G__10377 = c__7256__auto___10375;
var G__10378 = cljs.core.count.call(null,c__7256__auto___10375);
var G__10379 = (0);
seq__10333_10364 = G__10376;
chunk__10334_10365 = G__10377;
count__10335_10366 = G__10378;
i__10336_10367 = G__10379;
continue;
} else {
var fld_10380 = cljs.core.first.call(null,seq__10333_10374__$1);
cljs.compiler.emitln.call(null,"this.",fld_10380," = ",fld_10380,";");

var G__10381 = cljs.core.next.call(null,seq__10333_10374__$1);
var G__10382 = null;
var G__10383 = (0);
var G__10384 = (0);
seq__10333_10364 = G__10381;
chunk__10334_10365 = G__10382;
count__10335_10366 = G__10383;
i__10336_10367 = G__10384;
continue;
}
} else {
}
}
break;
}

var seq__10337_10385 = cljs.core.seq.call(null,pmasks);
var chunk__10338_10386 = null;
var count__10339_10387 = (0);
var i__10340_10388 = (0);
while(true){
if((i__10340_10388 < count__10339_10387)){
var vec__10341_10389 = cljs.core._nth.call(null,chunk__10338_10386,i__10340_10388);
var pno_10390 = cljs.core.nth.call(null,vec__10341_10389,(0),null);
var pmask_10391 = cljs.core.nth.call(null,vec__10341_10389,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_10390,"$ = ",pmask_10391,";");

var G__10392 = seq__10337_10385;
var G__10393 = chunk__10338_10386;
var G__10394 = count__10339_10387;
var G__10395 = (i__10340_10388 + (1));
seq__10337_10385 = G__10392;
chunk__10338_10386 = G__10393;
count__10339_10387 = G__10394;
i__10340_10388 = G__10395;
continue;
} else {
var temp__4425__auto___10396 = cljs.core.seq.call(null,seq__10337_10385);
if(temp__4425__auto___10396){
var seq__10337_10397__$1 = temp__4425__auto___10396;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10337_10397__$1)){
var c__7256__auto___10398 = cljs.core.chunk_first.call(null,seq__10337_10397__$1);
var G__10399 = cljs.core.chunk_rest.call(null,seq__10337_10397__$1);
var G__10400 = c__7256__auto___10398;
var G__10401 = cljs.core.count.call(null,c__7256__auto___10398);
var G__10402 = (0);
seq__10337_10385 = G__10399;
chunk__10338_10386 = G__10400;
count__10339_10387 = G__10401;
i__10340_10388 = G__10402;
continue;
} else {
var vec__10342_10403 = cljs.core.first.call(null,seq__10337_10397__$1);
var pno_10404 = cljs.core.nth.call(null,vec__10342_10403,(0),null);
var pmask_10405 = cljs.core.nth.call(null,vec__10342_10403,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_10404,"$ = ",pmask_10405,";");

var G__10406 = cljs.core.next.call(null,seq__10337_10397__$1);
var G__10407 = null;
var G__10408 = (0);
var G__10409 = (0);
seq__10337_10385 = G__10406;
chunk__10338_10386 = G__10407;
count__10339_10387 = G__10408;
i__10340_10388 = G__10409;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"})");

return cljs.compiler.emit.call(null,body);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"defrecord*","defrecord*",718069562),(function (p__10410){
var map__10411 = p__10410;
var map__10411__$1 = ((((!((map__10411 == null)))?((((map__10411.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10411.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10411):map__10411);
var t = cljs.core.get.call(null,map__10411__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__10411__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__10411__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__10411__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__10411__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__10413_10427 = cljs.core.seq.call(null,protocols);
var chunk__10414_10428 = null;
var count__10415_10429 = (0);
var i__10416_10430 = (0);
while(true){
if((i__10416_10430 < count__10415_10429)){
var protocol_10431 = cljs.core._nth.call(null,chunk__10414_10428,i__10416_10430);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_10431)].join('')),"}");

var G__10432 = seq__10413_10427;
var G__10433 = chunk__10414_10428;
var G__10434 = count__10415_10429;
var G__10435 = (i__10416_10430 + (1));
seq__10413_10427 = G__10432;
chunk__10414_10428 = G__10433;
count__10415_10429 = G__10434;
i__10416_10430 = G__10435;
continue;
} else {
var temp__4425__auto___10436 = cljs.core.seq.call(null,seq__10413_10427);
if(temp__4425__auto___10436){
var seq__10413_10437__$1 = temp__4425__auto___10436;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10413_10437__$1)){
var c__7256__auto___10438 = cljs.core.chunk_first.call(null,seq__10413_10437__$1);
var G__10439 = cljs.core.chunk_rest.call(null,seq__10413_10437__$1);
var G__10440 = c__7256__auto___10438;
var G__10441 = cljs.core.count.call(null,c__7256__auto___10438);
var G__10442 = (0);
seq__10413_10427 = G__10439;
chunk__10414_10428 = G__10440;
count__10415_10429 = G__10441;
i__10416_10430 = G__10442;
continue;
} else {
var protocol_10443 = cljs.core.first.call(null,seq__10413_10437__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_10443)].join('')),"}");

var G__10444 = cljs.core.next.call(null,seq__10413_10437__$1);
var G__10445 = null;
var G__10446 = (0);
var G__10447 = (0);
seq__10413_10427 = G__10444;
chunk__10414_10428 = G__10445;
count__10415_10429 = G__10446;
i__10416_10430 = G__10447;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__10417_10448 = cljs.core.seq.call(null,fields__$1);
var chunk__10418_10449 = null;
var count__10419_10450 = (0);
var i__10420_10451 = (0);
while(true){
if((i__10420_10451 < count__10419_10450)){
var fld_10452 = cljs.core._nth.call(null,chunk__10418_10449,i__10420_10451);
cljs.compiler.emitln.call(null,"this.",fld_10452," = ",fld_10452,";");

var G__10453 = seq__10417_10448;
var G__10454 = chunk__10418_10449;
var G__10455 = count__10419_10450;
var G__10456 = (i__10420_10451 + (1));
seq__10417_10448 = G__10453;
chunk__10418_10449 = G__10454;
count__10419_10450 = G__10455;
i__10420_10451 = G__10456;
continue;
} else {
var temp__4425__auto___10457 = cljs.core.seq.call(null,seq__10417_10448);
if(temp__4425__auto___10457){
var seq__10417_10458__$1 = temp__4425__auto___10457;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10417_10458__$1)){
var c__7256__auto___10459 = cljs.core.chunk_first.call(null,seq__10417_10458__$1);
var G__10460 = cljs.core.chunk_rest.call(null,seq__10417_10458__$1);
var G__10461 = c__7256__auto___10459;
var G__10462 = cljs.core.count.call(null,c__7256__auto___10459);
var G__10463 = (0);
seq__10417_10448 = G__10460;
chunk__10418_10449 = G__10461;
count__10419_10450 = G__10462;
i__10420_10451 = G__10463;
continue;
} else {
var fld_10464 = cljs.core.first.call(null,seq__10417_10458__$1);
cljs.compiler.emitln.call(null,"this.",fld_10464," = ",fld_10464,";");

var G__10465 = cljs.core.next.call(null,seq__10417_10458__$1);
var G__10466 = null;
var G__10467 = (0);
var G__10468 = (0);
seq__10417_10448 = G__10465;
chunk__10418_10449 = G__10466;
count__10419_10450 = G__10467;
i__10420_10451 = G__10468;
continue;
}
} else {
}
}
break;
}

var seq__10421_10469 = cljs.core.seq.call(null,pmasks);
var chunk__10422_10470 = null;
var count__10423_10471 = (0);
var i__10424_10472 = (0);
while(true){
if((i__10424_10472 < count__10423_10471)){
var vec__10425_10473 = cljs.core._nth.call(null,chunk__10422_10470,i__10424_10472);
var pno_10474 = cljs.core.nth.call(null,vec__10425_10473,(0),null);
var pmask_10475 = cljs.core.nth.call(null,vec__10425_10473,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_10474,"$ = ",pmask_10475,";");

var G__10476 = seq__10421_10469;
var G__10477 = chunk__10422_10470;
var G__10478 = count__10423_10471;
var G__10479 = (i__10424_10472 + (1));
seq__10421_10469 = G__10476;
chunk__10422_10470 = G__10477;
count__10423_10471 = G__10478;
i__10424_10472 = G__10479;
continue;
} else {
var temp__4425__auto___10480 = cljs.core.seq.call(null,seq__10421_10469);
if(temp__4425__auto___10480){
var seq__10421_10481__$1 = temp__4425__auto___10480;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10421_10481__$1)){
var c__7256__auto___10482 = cljs.core.chunk_first.call(null,seq__10421_10481__$1);
var G__10483 = cljs.core.chunk_rest.call(null,seq__10421_10481__$1);
var G__10484 = c__7256__auto___10482;
var G__10485 = cljs.core.count.call(null,c__7256__auto___10482);
var G__10486 = (0);
seq__10421_10469 = G__10483;
chunk__10422_10470 = G__10484;
count__10423_10471 = G__10485;
i__10424_10472 = G__10486;
continue;
} else {
var vec__10426_10487 = cljs.core.first.call(null,seq__10421_10481__$1);
var pno_10488 = cljs.core.nth.call(null,vec__10426_10487,(0),null);
var pmask_10489 = cljs.core.nth.call(null,vec__10426_10487,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_10488,"$ = ",pmask_10489,";");

var G__10490 = cljs.core.next.call(null,seq__10421_10481__$1);
var G__10491 = null;
var G__10492 = (0);
var G__10493 = (0);
seq__10421_10469 = G__10490;
chunk__10422_10470 = G__10491;
count__10423_10471 = G__10492;
i__10424_10472 = G__10493;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"})");

return cljs.compiler.emit.call(null,body);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"dot","dot",1442709401),(function (p__10494){
var map__10495 = p__10494;
var map__10495__$1 = ((((!((map__10495 == null)))?((((map__10495.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10495.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10495):map__10495);
var target = cljs.core.get.call(null,map__10495__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.call(null,map__10495__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.call(null,map__10495__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.call(null,map__10495__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__10495__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__10497){
var map__10498 = p__10497;
var map__10498__$1 = ((((!((map__10498 == null)))?((((map__10498.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10498.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10498):map__10498);
var op = cljs.core.get.call(null,map__10498__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.call(null,map__10498__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.call(null,map__10498__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.call(null,map__10498__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.call(null,map__10498__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__6441__auto__ = code;
if(cljs.core.truth_(and__6441__auto__)){
return goog.string.startsWith(clojure.string.trim.call(null,code),"/*");
} else {
return and__6441__auto__;
}
})())){
return cljs.compiler.emits.call(null,code);
} else {
var env__9454__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.call(null,code);
} else {
cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9454__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.build_affecting_options = (function cljs$compiler$build_affecting_options(opts){
return cljs.core.select_keys.call(null,opts,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"static-fns","static-fns",-501950748),new cljs.core.Keyword(null,"optimize-constants","optimize-constants",232704518),new cljs.core.Keyword(null,"elide-asserts","elide-asserts",537063272),new cljs.core.Keyword(null,"target","target",253001721)], null));
});
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
var seq__10508 = cljs.core.seq.call(null,table);
var chunk__10509 = null;
var count__10510 = (0);
var i__10511 = (0);
while(true){
if((i__10511 < count__10510)){
var vec__10512 = cljs.core._nth.call(null,chunk__10509,i__10511);
var sym = cljs.core.nth.call(null,vec__10512,(0),null);
var value = cljs.core.nth.call(null,vec__10512,(1),null);
var ns_10514 = cljs.core.namespace.call(null,sym);
var name_10515 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,[cljs.core.str("Cannot emit constant for type "),cljs.core.str(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.call(null,";\n");

var G__10516 = seq__10508;
var G__10517 = chunk__10509;
var G__10518 = count__10510;
var G__10519 = (i__10511 + (1));
seq__10508 = G__10516;
chunk__10509 = G__10517;
count__10510 = G__10518;
i__10511 = G__10519;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__10508);
if(temp__4425__auto__){
var seq__10508__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10508__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__10508__$1);
var G__10520 = cljs.core.chunk_rest.call(null,seq__10508__$1);
var G__10521 = c__7256__auto__;
var G__10522 = cljs.core.count.call(null,c__7256__auto__);
var G__10523 = (0);
seq__10508 = G__10520;
chunk__10509 = G__10521;
count__10510 = G__10522;
i__10511 = G__10523;
continue;
} else {
var vec__10513 = cljs.core.first.call(null,seq__10508__$1);
var sym = cljs.core.nth.call(null,vec__10513,(0),null);
var value = cljs.core.nth.call(null,vec__10513,(1),null);
var ns_10524 = cljs.core.namespace.call(null,sym);
var name_10525 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,[cljs.core.str("Cannot emit constant for type "),cljs.core.str(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.call(null,";\n");

var G__10526 = cljs.core.next.call(null,seq__10508__$1);
var G__10527 = null;
var G__10528 = (0);
var G__10529 = (0);
seq__10508 = G__10526;
chunk__10509 = G__10527;
count__10510 = G__10528;
i__10511 = G__10529;
continue;
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=compiler.js.map