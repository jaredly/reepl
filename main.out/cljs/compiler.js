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
var map__13379 = s;
var map__13379__$1 = ((((!((map__13379 == null)))?((((map__13379.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13379.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13379):map__13379);
var name = cljs.core.get.call(null,map__13379__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__13379__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__13382 = info;
var map__13383 = G__13382;
var map__13383__$1 = ((((!((map__13383 == null)))?((((map__13383.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13383.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13383):map__13383);
var shadow = cljs.core.get.call(null,map__13383__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__13382__$1 = G__13382;
while(true){
var d__$2 = d__$1;
var map__13385 = G__13382__$1;
var map__13385__$1 = ((((!((map__13385 == null)))?((((map__13385.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13385.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13385):map__13385);
var shadow__$1 = cljs.core.get.call(null,map__13385__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__13387 = (d__$2 + (1));
var G__13388 = shadow__$1;
d__$1 = G__13387;
G__13382__$1 = G__13388;
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
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__13389){
var map__13394 = p__13389;
var map__13394__$1 = ((((!((map__13394 == null)))?((((map__13394.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13394.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13394):map__13394);
var name_var = map__13394__$1;
var name = cljs.core.get.call(null,map__13394__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__13394__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace.call(null,[cljs.core.str(name)].join(''),"..","_DOT__DOT_");
var map__13396 = info;
var map__13396__$1 = ((((!((map__13396 == null)))?((((map__13396.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13396.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13396):map__13396);
var ns = cljs.core.get.call(null,map__13396__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.call(null,map__13396__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
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
var args13398 = [];
var len__7511__auto___13401 = arguments.length;
var i__7512__auto___13402 = (0);
while(true){
if((i__7512__auto___13402 < len__7511__auto___13401)){
args13398.push((arguments[i__7512__auto___13402]));

var G__13403 = (i__7512__auto___13402 + (1));
i__7512__auto___13402 = G__13403;
continue;
} else {
}
break;
}

var G__13400 = args13398.length;
switch (G__13400) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13398.length)].join('')));

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
var G__13406 = cp;
switch (G__13406) {
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
var seq__13412_13416 = cljs.core.seq.call(null,s);
var chunk__13413_13417 = null;
var count__13414_13418 = (0);
var i__13415_13419 = (0);
while(true){
if((i__13415_13419 < count__13414_13418)){
var c_13420 = cljs.core._nth.call(null,chunk__13413_13417,i__13415_13419);
sb.append(cljs.compiler.escape_char.call(null,c_13420));

var G__13421 = seq__13412_13416;
var G__13422 = chunk__13413_13417;
var G__13423 = count__13414_13418;
var G__13424 = (i__13415_13419 + (1));
seq__13412_13416 = G__13421;
chunk__13413_13417 = G__13422;
count__13414_13418 = G__13423;
i__13415_13419 = G__13424;
continue;
} else {
var temp__4425__auto___13425 = cljs.core.seq.call(null,seq__13412_13416);
if(temp__4425__auto___13425){
var seq__13412_13426__$1 = temp__4425__auto___13425;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13412_13426__$1)){
var c__7256__auto___13427 = cljs.core.chunk_first.call(null,seq__13412_13426__$1);
var G__13428 = cljs.core.chunk_rest.call(null,seq__13412_13426__$1);
var G__13429 = c__7256__auto___13427;
var G__13430 = cljs.core.count.call(null,c__7256__auto___13427);
var G__13431 = (0);
seq__13412_13416 = G__13428;
chunk__13413_13417 = G__13429;
count__13414_13418 = G__13430;
i__13415_13419 = G__13431;
continue;
} else {
var c_13432 = cljs.core.first.call(null,seq__13412_13426__$1);
sb.append(cljs.compiler.escape_char.call(null,c_13432));

var G__13433 = cljs.core.next.call(null,seq__13412_13426__$1);
var G__13434 = null;
var G__13435 = (0);
var G__13436 = (0);
seq__13412_13416 = G__13433;
chunk__13413_13417 = G__13434;
count__13414_13418 = G__13435;
i__13415_13419 = G__13436;
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
var val__11946__auto__ = cljs.env._STAR_compiler_STAR_;
if((val__11946__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = cljs.env.default_compiler_env.call(null);
} else {
}

try{if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__13442_13447 = ast;
var map__13442_13448__$1 = ((((!((map__13442_13447 == null)))?((((map__13442_13447.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13442_13447.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13442_13447):map__13442_13447);
var env_13449 = cljs.core.get.call(null,map__13442_13448__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_13449))){
var map__13444_13450 = env_13449;
var map__13444_13451__$1 = ((((!((map__13444_13450 == null)))?((((map__13444_13450.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13444_13450.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13444_13450):map__13444_13450);
var line_13452 = cljs.core.get.call(null,map__13444_13451__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_13453 = cljs.core.get.call(null,map__13444_13451__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,((function (map__13444_13450,map__13444_13451__$1,line_13452,column_13453,map__13442_13447,map__13442_13448__$1,env_13449,val__11946__auto__){
return (function (m){
var minfo = (function (){var G__13446 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
var G__13446__$1 = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast),new cljs.core.Keyword(null,"var","var",-769682797)))?cljs.core.assoc.call(null,G__13446,new cljs.core.Keyword(null,"name","name",1843675177),[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast)))].join('')):G__13446);
return G__13446__$1;
})();
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_13452 - (1))], null),cljs.core.fnil.call(null,((function (minfo,map__13444_13450,map__13444_13451__$1,line_13452,column_13453,map__13442_13447,map__13442_13448__$1,env_13449,val__11946__auto__){
return (function (line__$1){
return cljs.core.update_in.call(null,line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_13453)?(column_13453 - (1)):(0))], null),cljs.core.fnil.call(null,((function (minfo,map__13444_13450,map__13444_13451__$1,line_13452,column_13453,map__13442_13447,map__13442_13448__$1,env_13449,val__11946__auto__){
return (function (column__$1){
return cljs.core.conj.call(null,column__$1,minfo);
});})(minfo,map__13444_13450,map__13444_13451__$1,line_13452,column_13453,map__13442_13447,map__13442_13448__$1,env_13449,val__11946__auto__))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__13444_13450,map__13444_13451__$1,line_13452,column_13453,map__13442_13447,map__13442_13448__$1,env_13449,val__11946__auto__))
,cljs.core.sorted_map.call(null)));
});})(map__13444_13450,map__13444_13451__$1,line_13452,column_13453,map__13442_13447,map__13442_13448__$1,env_13449,val__11946__auto__))
);
} else {
}
} else {
}

return cljs.compiler.emit_STAR_.call(null,ast);
}finally {if((val__11946__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = null;
} else {
}
}});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var args__7518__auto__ = [];
var len__7511__auto___13460 = arguments.length;
var i__7512__auto___13461 = (0);
while(true){
if((i__7512__auto___13461 < len__7511__auto___13460)){
args__7518__auto__.push((arguments[i__7512__auto___13461]));

var G__13462 = (i__7512__auto___13461 + (1));
i__7512__auto___13461 = G__13462;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
var seq__13456_13463 = cljs.core.seq.call(null,xs);
var chunk__13457_13464 = null;
var count__13458_13465 = (0);
var i__13459_13466 = (0);
while(true){
if((i__13459_13466 < count__13458_13465)){
var x_13467 = cljs.core._nth.call(null,chunk__13457_13464,i__13459_13466);
if((x_13467 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x_13467)){
cljs.compiler.emit.call(null,x_13467);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x_13467)){
cljs.core.apply.call(null,cljs.compiler.emits,x_13467);
} else {
if(goog.isFunction(x_13467)){
x_13467.call(null);
} else {
var s_13468 = cljs.core.print_str.call(null,x_13467);
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__13456_13463,chunk__13457_13464,count__13458_13465,i__13459_13466,s_13468,x_13467){
return (function (p1__13454_SHARP_){
return (p1__13454_SHARP_ + cljs.core.count.call(null,s_13468));
});})(seq__13456_13463,chunk__13457_13464,count__13458_13465,i__13459_13466,s_13468,x_13467))
);
}

cljs.core.print.call(null,s_13468);

}
}
}
}

var G__13469 = seq__13456_13463;
var G__13470 = chunk__13457_13464;
var G__13471 = count__13458_13465;
var G__13472 = (i__13459_13466 + (1));
seq__13456_13463 = G__13469;
chunk__13457_13464 = G__13470;
count__13458_13465 = G__13471;
i__13459_13466 = G__13472;
continue;
} else {
var temp__4425__auto___13473 = cljs.core.seq.call(null,seq__13456_13463);
if(temp__4425__auto___13473){
var seq__13456_13474__$1 = temp__4425__auto___13473;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13456_13474__$1)){
var c__7256__auto___13475 = cljs.core.chunk_first.call(null,seq__13456_13474__$1);
var G__13476 = cljs.core.chunk_rest.call(null,seq__13456_13474__$1);
var G__13477 = c__7256__auto___13475;
var G__13478 = cljs.core.count.call(null,c__7256__auto___13475);
var G__13479 = (0);
seq__13456_13463 = G__13476;
chunk__13457_13464 = G__13477;
count__13458_13465 = G__13478;
i__13459_13466 = G__13479;
continue;
} else {
var x_13480 = cljs.core.first.call(null,seq__13456_13474__$1);
if((x_13480 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x_13480)){
cljs.compiler.emit.call(null,x_13480);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x_13480)){
cljs.core.apply.call(null,cljs.compiler.emits,x_13480);
} else {
if(goog.isFunction(x_13480)){
x_13480.call(null);
} else {
var s_13481 = cljs.core.print_str.call(null,x_13480);
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__13456_13463,chunk__13457_13464,count__13458_13465,i__13459_13466,s_13481,x_13480,seq__13456_13474__$1,temp__4425__auto___13473){
return (function (p1__13454_SHARP_){
return (p1__13454_SHARP_ + cljs.core.count.call(null,s_13481));
});})(seq__13456_13463,chunk__13457_13464,count__13458_13465,i__13459_13466,s_13481,x_13480,seq__13456_13474__$1,temp__4425__auto___13473))
);
}

cljs.core.print.call(null,s_13481);

}
}
}
}

var G__13482 = cljs.core.next.call(null,seq__13456_13474__$1);
var G__13483 = null;
var G__13484 = (0);
var G__13485 = (0);
seq__13456_13463 = G__13482;
chunk__13457_13464 = G__13483;
count__13458_13465 = G__13484;
i__13459_13466 = G__13485;
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

cljs.compiler.emits.cljs$lang$applyTo = (function (seq13455){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq13455));
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var args__7518__auto__ = [];
var len__7511__auto___13490 = arguments.length;
var i__7512__auto___13491 = (0);
while(true){
if((i__7512__auto___13491 < len__7511__auto___13490)){
args__7518__auto__.push((arguments[i__7512__auto___13491]));

var G__13492 = (i__7512__auto___13491 + (1));
i__7512__auto___13491 = G__13492;
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
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,(function (p__13487){
var map__13488 = p__13487;
var map__13488__$1 = ((((!((map__13488 == null)))?((((map__13488.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13488.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13488):map__13488);
var m = map__13488__$1;
var gen_line = cljs.core.get.call(null,map__13488__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0));
}));
} else {
}

return null;
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (0);

cljs.compiler.emitln.cljs$lang$applyTo = (function (seq13486){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq13486));
});
cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__7427__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13495_13497 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13496_13498 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13495_13497,_STAR_print_fn_STAR_13496_13498,sb__7427__auto__){
return (function (x__7428__auto__){
return sb__7427__auto__.append(x__7428__auto__);
});})(_STAR_print_newline_STAR_13495_13497,_STAR_print_fn_STAR_13496_13498,sb__7427__auto__))
;

try{cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13496_13498;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13495_13497;
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
var vec__13499 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__13499,(0),null);
var flags = cljs.core.nth.call(null,vec__13499,(1),null);
var pattern = cljs.core.nth.call(null,vec__13499,(2),null);
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var","var",-769682797),(function (p__13501){
var map__13502 = p__13501;
var map__13502__$1 = ((((!((map__13502 == null)))?((((map__13502.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13502.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13502):map__13502);
var arg = map__13502__$1;
var info = cljs.core.get.call(null,map__13502__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.call(null,map__13502__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.call(null,map__13502__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
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
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,(function (){var G__13504 = info__$1;
var G__13504__$1 = ((cljs.core.not_EQ_.call(null,form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null)))?cljs.compiler.munge.call(null,G__13504):G__13504);
return G__13504__$1;
})());

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var-special","var-special",1131576802),(function (p__13505){
var map__13506 = p__13505;
var map__13506__$1 = ((((!((map__13506 == null)))?((((map__13506.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13506.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13506):map__13506);
var arg = map__13506__$1;
var env = cljs.core.get.call(null,map__13506__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.call(null,map__13506__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.call(null,map__13506__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.call(null,map__13506__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_.call(null,sym)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol("ana","ast?","ana/ast?",1470128118,null),new cljs.core.Symbol(null,"sym","sym",195671222,null))))].join('')));
}

if(cljs.analyzer.ast_QMARK_.call(null,meta)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol("ana","ast?","ana/ast?",1470128118,null),new cljs.core.Symbol(null,"meta","meta",-1154898805,null))))].join('')));
}

var map__13508 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__13508__$1 = ((((!((map__13508 == null)))?((((map__13508.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13508.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13508):map__13508);
var name = cljs.core.get.call(null,map__13508__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"new cljs.core.Var(function(){return ",cljs.compiler.munge.call(null,name),";},",sym,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"meta","meta",1499536964),(function (p__13510){
var map__13511 = p__13510;
var map__13511__$1 = ((((!((map__13511 == null)))?((((map__13511.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13511.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13511):map__13511);
var expr = cljs.core.get.call(null,map__13511__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.call(null,map__13511__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.call(null,map__13511__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = (8);
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
return (cljs.core.every_QMARK_.call(null,(function (p1__13513_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__13513_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),keys)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,keys)),cljs.core.count.call(null,keys)));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__13514){
var map__13515 = p__13514;
var map__13515__$1 = ((((!((map__13515 == null)))?((((map__13515.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13515.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13515):map__13515);
var env = cljs.core.get.call(null,map__13515__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.call(null,map__13515__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__13515__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
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

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"list","list",765357683),(function (p__13517){
var map__13518 = p__13517;
var map__13518__$1 = ((((!((map__13518 == null)))?((((map__13518.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13518.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13518):map__13518);
var items = cljs.core.get.call(null,map__13518__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__13518__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.empty_QMARK_.call(null,items)){
cljs.compiler.emits.call(null,"cljs.core.List.EMPTY");
} else {
cljs.compiler.emits.call(null,"cljs.core.list(",cljs.compiler.comma_sep.call(null,items),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__13520){
var map__13521 = p__13520;
var map__13521__$1 = ((((!((map__13521 == null)))?((((map__13521.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13521.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13521):map__13521);
var items = cljs.core.get.call(null,map__13521__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__13521__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.empty_QMARK_.call(null,items)){
cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else {
var cnt_13523 = cljs.core.count.call(null,items);
if((cnt_13523 < (32))){
cljs.compiler.emits.call(null,"new cljs.core.PersistentVector(null, ",cnt_13523,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",cljs.compiler.comma_sep.call(null,items),"], null)");
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
return (cljs.core.every_QMARK_.call(null,(function (p1__13524_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__13524_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),items)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,items)),cljs.core.count.call(null,items)));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set","set",304602554),(function (p__13525){
var map__13526 = p__13525;
var map__13526__$1 = ((((!((map__13526 == null)))?((((map__13526.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13526.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13526):map__13526);
var items = cljs.core.get.call(null,map__13526__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__13526__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
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

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-value","js-value",-758336661),(function (p__13528){
var map__13529 = p__13528;
var map__13529__$1 = ((((!((map__13529 == null)))?((((map__13529.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13529.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13529):map__13529);
var items = cljs.core.get.call(null,map__13529__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var js_type = cljs.core.get.call(null,map__13529__$1,new cljs.core.Keyword(null,"js-type","js-type",539386702));
var env = cljs.core.get.call(null,map__13529__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core._EQ_.call(null,js_type,new cljs.core.Keyword(null,"object","object",1474613949))){
cljs.compiler.emits.call(null,"{");

var temp__4425__auto___13539 = cljs.core.seq.call(null,items);
if(temp__4425__auto___13539){
var items_13540__$1 = temp__4425__auto___13539;
var vec__13531_13541 = items_13540__$1;
var vec__13532_13542 = cljs.core.nth.call(null,vec__13531_13541,(0),null);
var k_13543 = cljs.core.nth.call(null,vec__13532_13542,(0),null);
var v_13544 = cljs.core.nth.call(null,vec__13532_13542,(1),null);
var r_13545 = cljs.core.nthnext.call(null,vec__13531_13541,(1));
cljs.compiler.emits.call(null,"\"",cljs.core.name.call(null,k_13543),"\": ",v_13544);

var seq__13533_13546 = cljs.core.seq.call(null,r_13545);
var chunk__13534_13547 = null;
var count__13535_13548 = (0);
var i__13536_13549 = (0);
while(true){
if((i__13536_13549 < count__13535_13548)){
var vec__13537_13550 = cljs.core._nth.call(null,chunk__13534_13547,i__13536_13549);
var k_13551__$1 = cljs.core.nth.call(null,vec__13537_13550,(0),null);
var v_13552__$1 = cljs.core.nth.call(null,vec__13537_13550,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_13551__$1),"\": ",v_13552__$1);

var G__13553 = seq__13533_13546;
var G__13554 = chunk__13534_13547;
var G__13555 = count__13535_13548;
var G__13556 = (i__13536_13549 + (1));
seq__13533_13546 = G__13553;
chunk__13534_13547 = G__13554;
count__13535_13548 = G__13555;
i__13536_13549 = G__13556;
continue;
} else {
var temp__4425__auto___13557__$1 = cljs.core.seq.call(null,seq__13533_13546);
if(temp__4425__auto___13557__$1){
var seq__13533_13558__$1 = temp__4425__auto___13557__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13533_13558__$1)){
var c__7256__auto___13559 = cljs.core.chunk_first.call(null,seq__13533_13558__$1);
var G__13560 = cljs.core.chunk_rest.call(null,seq__13533_13558__$1);
var G__13561 = c__7256__auto___13559;
var G__13562 = cljs.core.count.call(null,c__7256__auto___13559);
var G__13563 = (0);
seq__13533_13546 = G__13560;
chunk__13534_13547 = G__13561;
count__13535_13548 = G__13562;
i__13536_13549 = G__13563;
continue;
} else {
var vec__13538_13564 = cljs.core.first.call(null,seq__13533_13558__$1);
var k_13565__$1 = cljs.core.nth.call(null,vec__13538_13564,(0),null);
var v_13566__$1 = cljs.core.nth.call(null,vec__13538_13564,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_13565__$1),"\": ",v_13566__$1);

var G__13567 = cljs.core.next.call(null,seq__13533_13558__$1);
var G__13568 = null;
var G__13569 = (0);
var G__13570 = (0);
seq__13533_13546 = G__13567;
chunk__13534_13547 = G__13568;
count__13535_13548 = G__13569;
i__13536_13549 = G__13570;
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

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"constant","constant",-379609303),(function (p__13571){
var map__13572 = p__13571;
var map__13572__$1 = ((((!((map__13572 == null)))?((((map__13572.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13572.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13572):map__13572);
var form = cljs.core.get.call(null,map__13572__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.call(null,map__13572__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_constant.call(null,form);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(p__13574){
var map__13577 = p__13574;
var map__13577__$1 = ((((!((map__13577 == null)))?((((map__13577.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13577.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13577):map__13577);
var op = cljs.core.get.call(null,map__13577__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__13577__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
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
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(p__13579){
var map__13582 = p__13579;
var map__13582__$1 = ((((!((map__13582 == null)))?((((map__13582.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13582.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13582):map__13582);
var op = cljs.core.get.call(null,map__13582__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__13582__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__13584){
var map__13585 = p__13584;
var map__13585__$1 = ((((!((map__13585 == null)))?((((map__13585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13585):map__13585);
var test = cljs.core.get.call(null,map__13585__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.call(null,map__13585__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.call(null,map__13585__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.call(null,map__13585__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.call(null,map__13585__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"case*","case*",716180697),(function (p__13587){
var map__13588 = p__13587;
var map__13588__$1 = ((((!((map__13588 == null)))?((((map__13588.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13588.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13588):map__13588);
var v = cljs.core.get.call(null,map__13588__$1,new cljs.core.Keyword(null,"v","v",21465059));
var tests = cljs.core.get.call(null,map__13588__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var thens = cljs.core.get.call(null,map__13588__$1,new cljs.core.Keyword(null,"thens","thens",226631442));
var default$ = cljs.core.get.call(null,map__13588__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.call(null,map__13588__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
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

var seq__13590_13604 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.interleave.call(null,tests,thens)));
var chunk__13591_13605 = null;
var count__13592_13606 = (0);
var i__13593_13607 = (0);
while(true){
if((i__13593_13607 < count__13592_13606)){
var vec__13594_13608 = cljs.core._nth.call(null,chunk__13591_13605,i__13593_13607);
var ts_13609 = cljs.core.nth.call(null,vec__13594_13608,(0),null);
var then_13610 = cljs.core.nth.call(null,vec__13594_13608,(1),null);
var seq__13595_13611 = cljs.core.seq.call(null,ts_13609);
var chunk__13596_13612 = null;
var count__13597_13613 = (0);
var i__13598_13614 = (0);
while(true){
if((i__13598_13614 < count__13597_13613)){
var test_13615 = cljs.core._nth.call(null,chunk__13596_13612,i__13598_13614);
cljs.compiler.emitln.call(null,"case ",test_13615,":");

var G__13616 = seq__13595_13611;
var G__13617 = chunk__13596_13612;
var G__13618 = count__13597_13613;
var G__13619 = (i__13598_13614 + (1));
seq__13595_13611 = G__13616;
chunk__13596_13612 = G__13617;
count__13597_13613 = G__13618;
i__13598_13614 = G__13619;
continue;
} else {
var temp__4425__auto___13620 = cljs.core.seq.call(null,seq__13595_13611);
if(temp__4425__auto___13620){
var seq__13595_13621__$1 = temp__4425__auto___13620;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13595_13621__$1)){
var c__7256__auto___13622 = cljs.core.chunk_first.call(null,seq__13595_13621__$1);
var G__13623 = cljs.core.chunk_rest.call(null,seq__13595_13621__$1);
var G__13624 = c__7256__auto___13622;
var G__13625 = cljs.core.count.call(null,c__7256__auto___13622);
var G__13626 = (0);
seq__13595_13611 = G__13623;
chunk__13596_13612 = G__13624;
count__13597_13613 = G__13625;
i__13598_13614 = G__13626;
continue;
} else {
var test_13627 = cljs.core.first.call(null,seq__13595_13621__$1);
cljs.compiler.emitln.call(null,"case ",test_13627,":");

var G__13628 = cljs.core.next.call(null,seq__13595_13621__$1);
var G__13629 = null;
var G__13630 = (0);
var G__13631 = (0);
seq__13595_13611 = G__13628;
chunk__13596_13612 = G__13629;
count__13597_13613 = G__13630;
i__13598_13614 = G__13631;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_13610);
} else {
cljs.compiler.emitln.call(null,then_13610);
}

cljs.compiler.emitln.call(null,"break;");

var G__13632 = seq__13590_13604;
var G__13633 = chunk__13591_13605;
var G__13634 = count__13592_13606;
var G__13635 = (i__13593_13607 + (1));
seq__13590_13604 = G__13632;
chunk__13591_13605 = G__13633;
count__13592_13606 = G__13634;
i__13593_13607 = G__13635;
continue;
} else {
var temp__4425__auto___13636 = cljs.core.seq.call(null,seq__13590_13604);
if(temp__4425__auto___13636){
var seq__13590_13637__$1 = temp__4425__auto___13636;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13590_13637__$1)){
var c__7256__auto___13638 = cljs.core.chunk_first.call(null,seq__13590_13637__$1);
var G__13639 = cljs.core.chunk_rest.call(null,seq__13590_13637__$1);
var G__13640 = c__7256__auto___13638;
var G__13641 = cljs.core.count.call(null,c__7256__auto___13638);
var G__13642 = (0);
seq__13590_13604 = G__13639;
chunk__13591_13605 = G__13640;
count__13592_13606 = G__13641;
i__13593_13607 = G__13642;
continue;
} else {
var vec__13599_13643 = cljs.core.first.call(null,seq__13590_13637__$1);
var ts_13644 = cljs.core.nth.call(null,vec__13599_13643,(0),null);
var then_13645 = cljs.core.nth.call(null,vec__13599_13643,(1),null);
var seq__13600_13646 = cljs.core.seq.call(null,ts_13644);
var chunk__13601_13647 = null;
var count__13602_13648 = (0);
var i__13603_13649 = (0);
while(true){
if((i__13603_13649 < count__13602_13648)){
var test_13650 = cljs.core._nth.call(null,chunk__13601_13647,i__13603_13649);
cljs.compiler.emitln.call(null,"case ",test_13650,":");

var G__13651 = seq__13600_13646;
var G__13652 = chunk__13601_13647;
var G__13653 = count__13602_13648;
var G__13654 = (i__13603_13649 + (1));
seq__13600_13646 = G__13651;
chunk__13601_13647 = G__13652;
count__13602_13648 = G__13653;
i__13603_13649 = G__13654;
continue;
} else {
var temp__4425__auto___13655__$1 = cljs.core.seq.call(null,seq__13600_13646);
if(temp__4425__auto___13655__$1){
var seq__13600_13656__$1 = temp__4425__auto___13655__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13600_13656__$1)){
var c__7256__auto___13657 = cljs.core.chunk_first.call(null,seq__13600_13656__$1);
var G__13658 = cljs.core.chunk_rest.call(null,seq__13600_13656__$1);
var G__13659 = c__7256__auto___13657;
var G__13660 = cljs.core.count.call(null,c__7256__auto___13657);
var G__13661 = (0);
seq__13600_13646 = G__13658;
chunk__13601_13647 = G__13659;
count__13602_13648 = G__13660;
i__13603_13649 = G__13661;
continue;
} else {
var test_13662 = cljs.core.first.call(null,seq__13600_13656__$1);
cljs.compiler.emitln.call(null,"case ",test_13662,":");

var G__13663 = cljs.core.next.call(null,seq__13600_13656__$1);
var G__13664 = null;
var G__13665 = (0);
var G__13666 = (0);
seq__13600_13646 = G__13663;
chunk__13601_13647 = G__13664;
count__13602_13648 = G__13665;
i__13603_13649 = G__13666;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_13645);
} else {
cljs.compiler.emitln.call(null,then_13645);
}

cljs.compiler.emitln.call(null,"break;");

var G__13667 = cljs.core.next.call(null,seq__13590_13637__$1);
var G__13668 = null;
var G__13669 = (0);
var G__13670 = (0);
seq__13590_13604 = G__13667;
chunk__13591_13605 = G__13668;
count__13592_13606 = G__13669;
i__13593_13607 = G__13670;
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__13671){
var map__13672 = p__13671;
var map__13672__$1 = ((((!((map__13672 == null)))?((((map__13672.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13672.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13672):map__13672);
var throw$ = cljs.core.get.call(null,map__13672__$1,new cljs.core.Keyword(null,"throw","throw",-1044625833));
var env = cljs.core.get.call(null,map__13672__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
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
var vec__13677 = ((!(((-1) === idx)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.call(null,t,(0),idx),cljs.core.subs.call(null,t,(idx + (1)),cljs.core.count.call(null,t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.call(null,vec__13677,(0),null);
var rstr = cljs.core.nth.call(null,vec__13677,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs$compiler$resolve_type.call(null,env,rstr):null);
var axstr = cljs.core.subs.call(null,fstr,(9),(cljs.core.count.call(null,fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_.call(null,axstr))?null:cljs.core.map.call(null,cljs.core.comp.call(null,((function (idx,vec__13677,fstr,rstr,ret_t,axstr){
return (function (p1__13674_SHARP_){
return cljs$compiler$resolve_type.call(null,env,p1__13674_SHARP_);
});})(idx,vec__13677,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.call(null,axstr,/,/)));
var G__13678 = [cljs.core.str("function("),cljs.core.str(clojure.string.join.call(null,",",args_ts)),cljs.core.str(")")].join('');
var G__13678__$1 = (cljs.core.truth_(ret_t)?[cljs.core.str(G__13678),cljs.core.str(":"),cljs.core.str(ret_t)].join(''):G__13678);
return G__13678__$1;
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
return (function (p1__13679_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__13679_SHARP_);
});})(ts__$1,xs))
,xs))),cljs.core.str("}")].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find.call(null,/@param/,line))){
var vec__13682 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var p = cljs.core.nth.call(null,vec__13682,(0),null);
var ts = cljs.core.nth.call(null,vec__13682,(1),null);
var n = cljs.core.nth.call(null,vec__13682,(2),null);
var xs = cljs.core.nthnext.call(null,vec__13682,(3));
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
var vec__13683 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var p = cljs.core.nth.call(null,vec__13683,(0),null);
var ts = cljs.core.nth.call(null,vec__13683,(1),null);
var xs = cljs.core.nthnext.call(null,vec__13683,(2));
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
var args13685 = [];
var len__7511__auto___13712 = arguments.length;
var i__7512__auto___13713 = (0);
while(true){
if((i__7512__auto___13713 < len__7511__auto___13712)){
args13685.push((arguments[i__7512__auto___13713]));

var G__13714 = (i__7512__auto___13713 + (1));
i__7512__auto___13713 = G__13714;
continue;
} else {
}
break;
}

var G__13687 = args13685.length;
switch (G__13687) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13685.length)].join('')));

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
var vec__13703 = cljs.core.map.call(null,((function (docs,docs__$1,docs__$2){
return (function (p1__13684_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_.call(null))){
return cljs.compiler.munge_param_return.call(null,env,p1__13684_SHARP_);
} else {
return p1__13684_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines.call(null,e));
var x = cljs.core.nth.call(null,vec__13703,(0),null);
var ys = cljs.core.nthnext.call(null,vec__13703,(1));
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,x,"*/","* /"));

var seq__13704 = cljs.core.seq.call(null,ys);
var chunk__13705 = null;
var count__13706 = (0);
var i__13707 = (0);
while(true){
if((i__13707 < count__13706)){
var next_line = cljs.core._nth.call(null,chunk__13705,i__13707);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));

var G__13716 = seq__13704;
var G__13717 = chunk__13705;
var G__13718 = count__13706;
var G__13719 = (i__13707 + (1));
seq__13704 = G__13716;
chunk__13705 = G__13717;
count__13706 = G__13718;
i__13707 = G__13719;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__13704);
if(temp__4425__auto__){
var seq__13704__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13704__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__13704__$1);
var G__13720 = cljs.core.chunk_rest.call(null,seq__13704__$1);
var G__13721 = c__7256__auto__;
var G__13722 = cljs.core.count.call(null,c__7256__auto__);
var G__13723 = (0);
seq__13704 = G__13720;
chunk__13705 = G__13721;
count__13706 = G__13722;
i__13707 = G__13723;
continue;
} else {
var next_line = cljs.core.first.call(null,seq__13704__$1);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));

var G__13724 = cljs.core.next.call(null,seq__13704__$1);
var G__13725 = null;
var G__13726 = (0);
var G__13727 = (0);
seq__13704 = G__13724;
chunk__13705 = G__13725;
count__13706 = G__13726;
i__13707 = G__13727;
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

var seq__13708_13728 = cljs.core.seq.call(null,docs__$2);
var chunk__13709_13729 = null;
var count__13710_13730 = (0);
var i__13711_13731 = (0);
while(true){
if((i__13711_13731 < count__13710_13730)){
var e_13732 = cljs.core._nth.call(null,chunk__13709_13729,i__13711_13731);
if(cljs.core.truth_(e_13732)){
print_comment_lines.call(null,e_13732);
} else {
}

var G__13733 = seq__13708_13728;
var G__13734 = chunk__13709_13729;
var G__13735 = count__13710_13730;
var G__13736 = (i__13711_13731 + (1));
seq__13708_13728 = G__13733;
chunk__13709_13729 = G__13734;
count__13710_13730 = G__13735;
i__13711_13731 = G__13736;
continue;
} else {
var temp__4425__auto___13737 = cljs.core.seq.call(null,seq__13708_13728);
if(temp__4425__auto___13737){
var seq__13708_13738__$1 = temp__4425__auto___13737;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13708_13738__$1)){
var c__7256__auto___13739 = cljs.core.chunk_first.call(null,seq__13708_13738__$1);
var G__13740 = cljs.core.chunk_rest.call(null,seq__13708_13738__$1);
var G__13741 = c__7256__auto___13739;
var G__13742 = cljs.core.count.call(null,c__7256__auto___13739);
var G__13743 = (0);
seq__13708_13728 = G__13740;
chunk__13709_13729 = G__13741;
count__13710_13730 = G__13742;
i__13711_13731 = G__13743;
continue;
} else {
var e_13744 = cljs.core.first.call(null,seq__13708_13738__$1);
if(cljs.core.truth_(e_13744)){
print_comment_lines.call(null,e_13744);
} else {
}

var G__13745 = cljs.core.next.call(null,seq__13708_13738__$1);
var G__13746 = null;
var G__13747 = (0);
var G__13748 = (0);
seq__13708_13728 = G__13745;
chunk__13709_13729 = G__13746;
count__13710_13730 = G__13747;
i__13711_13731 = G__13748;
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
return (function (p1__13750_SHARP_){
return goog.string.startsWith(p1__13750_SHARP_,"@define");
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__13751){
var map__13752 = p__13751;
var map__13752__$1 = ((((!((map__13752 == null)))?((((map__13752.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13752.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13752):map__13752);
var name = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var var$ = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var init = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var env = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var doc = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var export$ = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"export","export",214356590));
var test = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"test","test",577538877));
var var_ast = cljs.core.get.call(null,map__13752__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
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
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__13754){
var map__13771 = p__13754;
var map__13771__$1 = ((((!((map__13771 == null)))?((((map__13771.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13771.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13771):map__13771);
var name = cljs.core.get.call(null,map__13771__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__13771__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__13771__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function (",arglist,"){");

var seq__13773_13787 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.drop_last.call(null,(2),params)));
var chunk__13774_13788 = null;
var count__13775_13789 = (0);
var i__13776_13790 = (0);
while(true){
if((i__13776_13790 < count__13775_13789)){
var vec__13777_13791 = cljs.core._nth.call(null,chunk__13774_13788,i__13776_13790);
var i_13792 = cljs.core.nth.call(null,vec__13777_13791,(0),null);
var param_13793 = cljs.core.nth.call(null,vec__13777_13791,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_13793);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");

var G__13794 = seq__13773_13787;
var G__13795 = chunk__13774_13788;
var G__13796 = count__13775_13789;
var G__13797 = (i__13776_13790 + (1));
seq__13773_13787 = G__13794;
chunk__13774_13788 = G__13795;
count__13775_13789 = G__13796;
i__13776_13790 = G__13797;
continue;
} else {
var temp__4425__auto___13798 = cljs.core.seq.call(null,seq__13773_13787);
if(temp__4425__auto___13798){
var seq__13773_13799__$1 = temp__4425__auto___13798;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13773_13799__$1)){
var c__7256__auto___13800 = cljs.core.chunk_first.call(null,seq__13773_13799__$1);
var G__13801 = cljs.core.chunk_rest.call(null,seq__13773_13799__$1);
var G__13802 = c__7256__auto___13800;
var G__13803 = cljs.core.count.call(null,c__7256__auto___13800);
var G__13804 = (0);
seq__13773_13787 = G__13801;
chunk__13774_13788 = G__13802;
count__13775_13789 = G__13803;
i__13776_13790 = G__13804;
continue;
} else {
var vec__13778_13805 = cljs.core.first.call(null,seq__13773_13799__$1);
var i_13806 = cljs.core.nth.call(null,vec__13778_13805,(0),null);
var param_13807 = cljs.core.nth.call(null,vec__13778_13805,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_13807);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");

var G__13808 = cljs.core.next.call(null,seq__13773_13799__$1);
var G__13809 = null;
var G__13810 = (0);
var G__13811 = (0);
seq__13773_13787 = G__13808;
chunk__13774_13788 = G__13809;
count__13775_13789 = G__13810;
i__13776_13790 = G__13811;
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

var seq__13779_13812 = cljs.core.seq.call(null,params);
var chunk__13780_13813 = null;
var count__13781_13814 = (0);
var i__13782_13815 = (0);
while(true){
if((i__13782_13815 < count__13781_13814)){
var param_13816 = cljs.core._nth.call(null,chunk__13780_13813,i__13782_13815);
cljs.compiler.emit.call(null,param_13816);

if(cljs.core._EQ_.call(null,param_13816,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13817 = seq__13779_13812;
var G__13818 = chunk__13780_13813;
var G__13819 = count__13781_13814;
var G__13820 = (i__13782_13815 + (1));
seq__13779_13812 = G__13817;
chunk__13780_13813 = G__13818;
count__13781_13814 = G__13819;
i__13782_13815 = G__13820;
continue;
} else {
var temp__4425__auto___13821 = cljs.core.seq.call(null,seq__13779_13812);
if(temp__4425__auto___13821){
var seq__13779_13822__$1 = temp__4425__auto___13821;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13779_13822__$1)){
var c__7256__auto___13823 = cljs.core.chunk_first.call(null,seq__13779_13822__$1);
var G__13824 = cljs.core.chunk_rest.call(null,seq__13779_13822__$1);
var G__13825 = c__7256__auto___13823;
var G__13826 = cljs.core.count.call(null,c__7256__auto___13823);
var G__13827 = (0);
seq__13779_13812 = G__13824;
chunk__13780_13813 = G__13825;
count__13781_13814 = G__13826;
i__13782_13815 = G__13827;
continue;
} else {
var param_13828 = cljs.core.first.call(null,seq__13779_13822__$1);
cljs.compiler.emit.call(null,param_13828);

if(cljs.core._EQ_.call(null,param_13828,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13829 = cljs.core.next.call(null,seq__13779_13822__$1);
var G__13830 = null;
var G__13831 = (0);
var G__13832 = (0);
seq__13779_13812 = G__13829;
chunk__13780_13813 = G__13830;
count__13781_13814 = G__13831;
i__13782_13815 = G__13832;
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

var seq__13783_13833 = cljs.core.seq.call(null,params);
var chunk__13784_13834 = null;
var count__13785_13835 = (0);
var i__13786_13836 = (0);
while(true){
if((i__13786_13836 < count__13785_13835)){
var param_13837 = cljs.core._nth.call(null,chunk__13784_13834,i__13786_13836);
cljs.compiler.emit.call(null,param_13837);

if(cljs.core._EQ_.call(null,param_13837,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13838 = seq__13783_13833;
var G__13839 = chunk__13784_13834;
var G__13840 = count__13785_13835;
var G__13841 = (i__13786_13836 + (1));
seq__13783_13833 = G__13838;
chunk__13784_13834 = G__13839;
count__13785_13835 = G__13840;
i__13786_13836 = G__13841;
continue;
} else {
var temp__4425__auto___13842 = cljs.core.seq.call(null,seq__13783_13833);
if(temp__4425__auto___13842){
var seq__13783_13843__$1 = temp__4425__auto___13842;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13783_13843__$1)){
var c__7256__auto___13844 = cljs.core.chunk_first.call(null,seq__13783_13843__$1);
var G__13845 = cljs.core.chunk_rest.call(null,seq__13783_13843__$1);
var G__13846 = c__7256__auto___13844;
var G__13847 = cljs.core.count.call(null,c__7256__auto___13844);
var G__13848 = (0);
seq__13783_13833 = G__13845;
chunk__13784_13834 = G__13846;
count__13785_13835 = G__13847;
i__13786_13836 = G__13848;
continue;
} else {
var param_13849 = cljs.core.first.call(null,seq__13783_13843__$1);
cljs.compiler.emit.call(null,param_13849);

if(cljs.core._EQ_.call(null,param_13849,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13850 = cljs.core.next.call(null,seq__13783_13843__$1);
var G__13851 = null;
var G__13852 = (0);
var G__13853 = (0);
seq__13783_13833 = G__13850;
chunk__13784_13834 = G__13851;
count__13785_13835 = G__13852;
i__13786_13836 = G__13853;
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
var seq__13858 = cljs.core.seq.call(null,params);
var chunk__13859 = null;
var count__13860 = (0);
var i__13861 = (0);
while(true){
if((i__13861 < count__13860)){
var param = cljs.core._nth.call(null,chunk__13859,i__13861);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13862 = seq__13858;
var G__13863 = chunk__13859;
var G__13864 = count__13860;
var G__13865 = (i__13861 + (1));
seq__13858 = G__13862;
chunk__13859 = G__13863;
count__13860 = G__13864;
i__13861 = G__13865;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__13858);
if(temp__4425__auto__){
var seq__13858__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13858__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__13858__$1);
var G__13866 = cljs.core.chunk_rest.call(null,seq__13858__$1);
var G__13867 = c__7256__auto__;
var G__13868 = cljs.core.count.call(null,c__7256__auto__);
var G__13869 = (0);
seq__13858 = G__13866;
chunk__13859 = G__13867;
count__13860 = G__13868;
i__13861 = G__13869;
continue;
} else {
var param = cljs.core.first.call(null,seq__13858__$1);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13870 = cljs.core.next.call(null,seq__13858__$1);
var G__13871 = null;
var G__13872 = (0);
var G__13873 = (0);
seq__13858 = G__13870;
chunk__13859 = G__13871;
count__13860 = G__13872;
i__13861 = G__13873;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__13874){
var map__13877 = p__13874;
var map__13877__$1 = ((((!((map__13877 == null)))?((((map__13877.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13877.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13877):map__13877);
var type = cljs.core.get.call(null,map__13877__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__13877__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.call(null,map__13877__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.call(null,map__13877__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.call(null,map__13877__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__13877__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__13877__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.call(null,map__13877__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
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

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
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
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__13879){
var map__13890 = p__13879;
var map__13890__$1 = ((((!((map__13890 == null)))?((((map__13890.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13890.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13890):map__13890);
var f = map__13890__$1;
var type = cljs.core.get.call(null,map__13890__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__13890__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.call(null,map__13890__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.call(null,map__13890__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.call(null,map__13890__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__13890__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__13890__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.call(null,map__13890__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var name_13900__$1 = (function (){var or__6453__auto__ = name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_13901 = cljs.compiler.munge.call(null,name_13900__$1);
var delegate_name_13902 = [cljs.core.str(mname_13901),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");

cljs.compiler.emits.call(null,"var ",delegate_name_13902," = function (");

var seq__13892_13903 = cljs.core.seq.call(null,params);
var chunk__13893_13904 = null;
var count__13894_13905 = (0);
var i__13895_13906 = (0);
while(true){
if((i__13895_13906 < count__13894_13905)){
var param_13907 = cljs.core._nth.call(null,chunk__13893_13904,i__13895_13906);
cljs.compiler.emit.call(null,param_13907);

if(cljs.core._EQ_.call(null,param_13907,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13908 = seq__13892_13903;
var G__13909 = chunk__13893_13904;
var G__13910 = count__13894_13905;
var G__13911 = (i__13895_13906 + (1));
seq__13892_13903 = G__13908;
chunk__13893_13904 = G__13909;
count__13894_13905 = G__13910;
i__13895_13906 = G__13911;
continue;
} else {
var temp__4425__auto___13912 = cljs.core.seq.call(null,seq__13892_13903);
if(temp__4425__auto___13912){
var seq__13892_13913__$1 = temp__4425__auto___13912;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13892_13913__$1)){
var c__7256__auto___13914 = cljs.core.chunk_first.call(null,seq__13892_13913__$1);
var G__13915 = cljs.core.chunk_rest.call(null,seq__13892_13913__$1);
var G__13916 = c__7256__auto___13914;
var G__13917 = cljs.core.count.call(null,c__7256__auto___13914);
var G__13918 = (0);
seq__13892_13903 = G__13915;
chunk__13893_13904 = G__13916;
count__13894_13905 = G__13917;
i__13895_13906 = G__13918;
continue;
} else {
var param_13919 = cljs.core.first.call(null,seq__13892_13913__$1);
cljs.compiler.emit.call(null,param_13919);

if(cljs.core._EQ_.call(null,param_13919,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13920 = cljs.core.next.call(null,seq__13892_13913__$1);
var G__13921 = null;
var G__13922 = (0);
var G__13923 = (0);
seq__13892_13903 = G__13920;
chunk__13893_13904 = G__13921;
count__13894_13905 = G__13922;
i__13895_13906 = G__13923;
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

cljs.compiler.emitln.call(null,"var ",mname_13901," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",(cljs.core.count.call(null,params) - (1)),") {");

var a_13924 = cljs.compiler.emit_arguments_to_array.call(null,(cljs.core.count.call(null,params) - (1)));
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params)," = new cljs.core.IndexedSeq(",a_13924,",0);");

cljs.compiler.emitln.call(null,"} ");
} else {
}

cljs.compiler.emits.call(null,"return ",delegate_name_13902,".call(this,");

var seq__13896_13925 = cljs.core.seq.call(null,params);
var chunk__13897_13926 = null;
var count__13898_13927 = (0);
var i__13899_13928 = (0);
while(true){
if((i__13899_13928 < count__13898_13927)){
var param_13929 = cljs.core._nth.call(null,chunk__13897_13926,i__13899_13928);
cljs.compiler.emit.call(null,param_13929);

if(cljs.core._EQ_.call(null,param_13929,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13930 = seq__13896_13925;
var G__13931 = chunk__13897_13926;
var G__13932 = count__13898_13927;
var G__13933 = (i__13899_13928 + (1));
seq__13896_13925 = G__13930;
chunk__13897_13926 = G__13931;
count__13898_13927 = G__13932;
i__13899_13928 = G__13933;
continue;
} else {
var temp__4425__auto___13934 = cljs.core.seq.call(null,seq__13896_13925);
if(temp__4425__auto___13934){
var seq__13896_13935__$1 = temp__4425__auto___13934;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13896_13935__$1)){
var c__7256__auto___13936 = cljs.core.chunk_first.call(null,seq__13896_13935__$1);
var G__13937 = cljs.core.chunk_rest.call(null,seq__13896_13935__$1);
var G__13938 = c__7256__auto___13936;
var G__13939 = cljs.core.count.call(null,c__7256__auto___13936);
var G__13940 = (0);
seq__13896_13925 = G__13937;
chunk__13897_13926 = G__13938;
count__13898_13927 = G__13939;
i__13899_13928 = G__13940;
continue;
} else {
var param_13941 = cljs.core.first.call(null,seq__13896_13935__$1);
cljs.compiler.emit.call(null,param_13941);

if(cljs.core._EQ_.call(null,param_13941,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__13942 = cljs.core.next.call(null,seq__13896_13935__$1);
var G__13943 = null;
var G__13944 = (0);
var G__13945 = (0);
seq__13896_13925 = G__13942;
chunk__13897_13926 = G__13943;
count__13898_13927 = G__13944;
i__13899_13928 = G__13945;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,");");

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,mname_13901,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.call(null,mname_13901,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,new cljs.core.Keyword(null,"name","name",1843675177),name_13900__$1));

cljs.compiler.emitln.call(null,";");

cljs.compiler.emitln.call(null,mname_13901,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_13902,";");

cljs.compiler.emitln.call(null,"return ",mname_13901,";");

cljs.compiler.emitln.call(null,"})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__13949){
var map__13950 = p__13949;
var map__13950__$1 = ((((!((map__13950 == null)))?((((map__13950.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13950.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13950):map__13950);
var name = cljs.core.get.call(null,map__13950__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__13950__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.call(null,map__13950__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.call(null,map__13950__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var variadic = cljs.core.get.call(null,map__13950__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var recur_frames = cljs.core.get.call(null,map__13950__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var loop_lets = cljs.core.get.call(null,map__13950__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),cljs.core.filter.call(null,((function (map__13950,map__13950__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__13946_SHARP_){
var and__6441__auto__ = p1__13946_SHARP_;
if(cljs.core.truth_(and__6441__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__13946_SHARP_));
} else {
return and__6441__auto__;
}
});})(map__13950,map__13950__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
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
var name_13971__$1 = (function (){var or__6453__auto__ = name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_13972 = cljs.compiler.munge.call(null,name_13971__$1);
var maxparams_13973 = cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_13974 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (name_13971__$1,mname_13972,maxparams_13973,loop_locals,map__13950,map__13950__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_13972),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_13971__$1,mname_13972,maxparams_13973,loop_locals,map__13950,map__13950__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,methods$));
var ms_13975 = cljs.core.sort_by.call(null,((function (name_13971__$1,mname_13972,maxparams_13973,mmap_13974,loop_locals,map__13950,map__13950__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__13947_SHARP_){
return cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__13947_SHARP_)));
});})(name_13971__$1,mname_13972,maxparams_13973,mmap_13974,loop_locals,map__13950,map__13950__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,cljs.core.seq.call(null,mmap_13974));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"(function() {");

cljs.compiler.emitln.call(null,"var ",mname_13972," = null;");

var seq__13952_13976 = cljs.core.seq.call(null,ms_13975);
var chunk__13953_13977 = null;
var count__13954_13978 = (0);
var i__13955_13979 = (0);
while(true){
if((i__13955_13979 < count__13954_13978)){
var vec__13956_13980 = cljs.core._nth.call(null,chunk__13953_13977,i__13955_13979);
var n_13981 = cljs.core.nth.call(null,vec__13956_13980,(0),null);
var meth_13982 = cljs.core.nth.call(null,vec__13956_13980,(1),null);
cljs.compiler.emits.call(null,"var ",n_13981," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_13982))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_13982);
} else {
cljs.compiler.emit_fn_method.call(null,meth_13982);
}

cljs.compiler.emitln.call(null,";");

var G__13983 = seq__13952_13976;
var G__13984 = chunk__13953_13977;
var G__13985 = count__13954_13978;
var G__13986 = (i__13955_13979 + (1));
seq__13952_13976 = G__13983;
chunk__13953_13977 = G__13984;
count__13954_13978 = G__13985;
i__13955_13979 = G__13986;
continue;
} else {
var temp__4425__auto___13987 = cljs.core.seq.call(null,seq__13952_13976);
if(temp__4425__auto___13987){
var seq__13952_13988__$1 = temp__4425__auto___13987;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13952_13988__$1)){
var c__7256__auto___13989 = cljs.core.chunk_first.call(null,seq__13952_13988__$1);
var G__13990 = cljs.core.chunk_rest.call(null,seq__13952_13988__$1);
var G__13991 = c__7256__auto___13989;
var G__13992 = cljs.core.count.call(null,c__7256__auto___13989);
var G__13993 = (0);
seq__13952_13976 = G__13990;
chunk__13953_13977 = G__13991;
count__13954_13978 = G__13992;
i__13955_13979 = G__13993;
continue;
} else {
var vec__13957_13994 = cljs.core.first.call(null,seq__13952_13988__$1);
var n_13995 = cljs.core.nth.call(null,vec__13957_13994,(0),null);
var meth_13996 = cljs.core.nth.call(null,vec__13957_13994,(1),null);
cljs.compiler.emits.call(null,"var ",n_13995," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_13996))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_13996);
} else {
cljs.compiler.emit_fn_method.call(null,meth_13996);
}

cljs.compiler.emitln.call(null,";");

var G__13997 = cljs.core.next.call(null,seq__13952_13988__$1);
var G__13998 = null;
var G__13999 = (0);
var G__14000 = (0);
seq__13952_13976 = G__13997;
chunk__13953_13977 = G__13998;
count__13954_13978 = G__13999;
i__13955_13979 = G__14000;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,mname_13972," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_13973),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_13973)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,maxparams_13973));

cljs.compiler.emitln.call(null," = var_args;");
} else {
}

cljs.compiler.emitln.call(null,"switch(arguments.length){");

var seq__13958_14001 = cljs.core.seq.call(null,ms_13975);
var chunk__13959_14002 = null;
var count__13960_14003 = (0);
var i__13961_14004 = (0);
while(true){
if((i__13961_14004 < count__13960_14003)){
var vec__13962_14005 = cljs.core._nth.call(null,chunk__13959_14002,i__13961_14004);
var n_14006 = cljs.core.nth.call(null,vec__13962_14005,(0),null);
var meth_14007 = cljs.core.nth.call(null,vec__13962_14005,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_14007))){
cljs.compiler.emitln.call(null,"default:");

var restarg_14008 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_14008," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_14009 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_14008," = new cljs.core.IndexedSeq(",a_14009,",0);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_14006,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_13973)),(((cljs.core.count.call(null,maxparams_13973) > (1)))?", ":null),restarg_14008,");");
} else {
var pcnt_14010 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_14007));
cljs.compiler.emitln.call(null,"case ",pcnt_14010,":");

cljs.compiler.emitln.call(null,"return ",n_14006,".call(this",(((pcnt_14010 === (0)))?null:cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_14010,maxparams_13973))),",")),");");
}

var G__14011 = seq__13958_14001;
var G__14012 = chunk__13959_14002;
var G__14013 = count__13960_14003;
var G__14014 = (i__13961_14004 + (1));
seq__13958_14001 = G__14011;
chunk__13959_14002 = G__14012;
count__13960_14003 = G__14013;
i__13961_14004 = G__14014;
continue;
} else {
var temp__4425__auto___14015 = cljs.core.seq.call(null,seq__13958_14001);
if(temp__4425__auto___14015){
var seq__13958_14016__$1 = temp__4425__auto___14015;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13958_14016__$1)){
var c__7256__auto___14017 = cljs.core.chunk_first.call(null,seq__13958_14016__$1);
var G__14018 = cljs.core.chunk_rest.call(null,seq__13958_14016__$1);
var G__14019 = c__7256__auto___14017;
var G__14020 = cljs.core.count.call(null,c__7256__auto___14017);
var G__14021 = (0);
seq__13958_14001 = G__14018;
chunk__13959_14002 = G__14019;
count__13960_14003 = G__14020;
i__13961_14004 = G__14021;
continue;
} else {
var vec__13963_14022 = cljs.core.first.call(null,seq__13958_14016__$1);
var n_14023 = cljs.core.nth.call(null,vec__13963_14022,(0),null);
var meth_14024 = cljs.core.nth.call(null,vec__13963_14022,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_14024))){
cljs.compiler.emitln.call(null,"default:");

var restarg_14025 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_14025," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_14026 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_14025," = new cljs.core.IndexedSeq(",a_14026,",0);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_14023,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_13973)),(((cljs.core.count.call(null,maxparams_13973) > (1)))?", ":null),restarg_14025,");");
} else {
var pcnt_14027 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_14024));
cljs.compiler.emitln.call(null,"case ",pcnt_14027,":");

cljs.compiler.emitln.call(null,"return ",n_14023,".call(this",(((pcnt_14027 === (0)))?null:cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_14027,maxparams_13973))),",")),");");
}

var G__14028 = cljs.core.next.call(null,seq__13958_14016__$1);
var G__14029 = null;
var G__14030 = (0);
var G__14031 = (0);
seq__13958_14001 = G__14028;
chunk__13959_14002 = G__14029;
count__13960_14003 = G__14030;
i__13961_14004 = G__14031;
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
cljs.compiler.emitln.call(null,mname_13972,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.call(null,mname_13972,".cljs$lang$applyTo = ",cljs.core.some.call(null,((function (name_13971__$1,mname_13972,maxparams_13973,mmap_13974,ms_13975,loop_locals,map__13950,map__13950__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__13948_SHARP_){
var vec__13964 = p1__13948_SHARP_;
var n = cljs.core.nth.call(null,vec__13964,(0),null);
var m = cljs.core.nth.call(null,vec__13964,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_13971__$1,mname_13972,maxparams_13973,mmap_13974,ms_13975,loop_locals,map__13950,map__13950__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,ms_13975),".cljs$lang$applyTo;");
} else {
}

var seq__13965_14032 = cljs.core.seq.call(null,ms_13975);
var chunk__13966_14033 = null;
var count__13967_14034 = (0);
var i__13968_14035 = (0);
while(true){
if((i__13968_14035 < count__13967_14034)){
var vec__13969_14036 = cljs.core._nth.call(null,chunk__13966_14033,i__13968_14035);
var n_14037 = cljs.core.nth.call(null,vec__13969_14036,(0),null);
var meth_14038 = cljs.core.nth.call(null,vec__13969_14036,(1),null);
var c_14039 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_14038));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_14038))){
cljs.compiler.emitln.call(null,mname_13972,".cljs$core$IFn$_invoke$arity$variadic = ",n_14037,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_13972,".cljs$core$IFn$_invoke$arity$",c_14039," = ",n_14037,";");
}

var G__14040 = seq__13965_14032;
var G__14041 = chunk__13966_14033;
var G__14042 = count__13967_14034;
var G__14043 = (i__13968_14035 + (1));
seq__13965_14032 = G__14040;
chunk__13966_14033 = G__14041;
count__13967_14034 = G__14042;
i__13968_14035 = G__14043;
continue;
} else {
var temp__4425__auto___14044 = cljs.core.seq.call(null,seq__13965_14032);
if(temp__4425__auto___14044){
var seq__13965_14045__$1 = temp__4425__auto___14044;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13965_14045__$1)){
var c__7256__auto___14046 = cljs.core.chunk_first.call(null,seq__13965_14045__$1);
var G__14047 = cljs.core.chunk_rest.call(null,seq__13965_14045__$1);
var G__14048 = c__7256__auto___14046;
var G__14049 = cljs.core.count.call(null,c__7256__auto___14046);
var G__14050 = (0);
seq__13965_14032 = G__14047;
chunk__13966_14033 = G__14048;
count__13967_14034 = G__14049;
i__13968_14035 = G__14050;
continue;
} else {
var vec__13970_14051 = cljs.core.first.call(null,seq__13965_14045__$1);
var n_14052 = cljs.core.nth.call(null,vec__13970_14051,(0),null);
var meth_14053 = cljs.core.nth.call(null,vec__13970_14051,(1),null);
var c_14054 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_14053));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_14053))){
cljs.compiler.emitln.call(null,mname_13972,".cljs$core$IFn$_invoke$arity$variadic = ",n_14052,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_13972,".cljs$core$IFn$_invoke$arity$",c_14054," = ",n_14052,";");
}

var G__14055 = cljs.core.next.call(null,seq__13965_14045__$1);
var G__14056 = null;
var G__14057 = (0);
var G__14058 = (0);
seq__13965_14032 = G__14055;
chunk__13966_14033 = G__14056;
count__13967_14034 = G__14057;
i__13968_14035 = G__14058;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"return ",mname_13972,";");

cljs.compiler.emitln.call(null,"})()");
}

if(loop_locals){
return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else {
return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"do","do",46310725),(function (p__14059){
var map__14060 = p__14059;
var map__14060__$1 = ((((!((map__14060 == null)))?((((map__14060.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14060.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14060):map__14060);
var statements = cljs.core.get.call(null,map__14060__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.call(null,map__14060__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.call(null,map__14060__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
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

var seq__14062_14066 = cljs.core.seq.call(null,statements);
var chunk__14063_14067 = null;
var count__14064_14068 = (0);
var i__14065_14069 = (0);
while(true){
if((i__14065_14069 < count__14064_14068)){
var s_14070 = cljs.core._nth.call(null,chunk__14063_14067,i__14065_14069);
cljs.compiler.emitln.call(null,s_14070);

var G__14071 = seq__14062_14066;
var G__14072 = chunk__14063_14067;
var G__14073 = count__14064_14068;
var G__14074 = (i__14065_14069 + (1));
seq__14062_14066 = G__14071;
chunk__14063_14067 = G__14072;
count__14064_14068 = G__14073;
i__14065_14069 = G__14074;
continue;
} else {
var temp__4425__auto___14075 = cljs.core.seq.call(null,seq__14062_14066);
if(temp__4425__auto___14075){
var seq__14062_14076__$1 = temp__4425__auto___14075;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14062_14076__$1)){
var c__7256__auto___14077 = cljs.core.chunk_first.call(null,seq__14062_14076__$1);
var G__14078 = cljs.core.chunk_rest.call(null,seq__14062_14076__$1);
var G__14079 = c__7256__auto___14077;
var G__14080 = cljs.core.count.call(null,c__7256__auto___14077);
var G__14081 = (0);
seq__14062_14066 = G__14078;
chunk__14063_14067 = G__14079;
count__14064_14068 = G__14080;
i__14065_14069 = G__14081;
continue;
} else {
var s_14082 = cljs.core.first.call(null,seq__14062_14076__$1);
cljs.compiler.emitln.call(null,s_14082);

var G__14083 = cljs.core.next.call(null,seq__14062_14076__$1);
var G__14084 = null;
var G__14085 = (0);
var G__14086 = (0);
seq__14062_14066 = G__14083;
chunk__14063_14067 = G__14084;
count__14064_14068 = G__14085;
i__14065_14069 = G__14086;
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__14087){
var map__14088 = p__14087;
var map__14088__$1 = ((((!((map__14088 == null)))?((((map__14088.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14088.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14088):map__14088);
var env = cljs.core.get.call(null,map__14088__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var try$ = cljs.core.get.call(null,map__14088__$1,new cljs.core.Keyword(null,"try","try",1380742522));
var catch$ = cljs.core.get.call(null,map__14088__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.call(null,map__14088__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.call(null,map__14088__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
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
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__14090,is_loop){
var map__14102 = p__14090;
var map__14102__$1 = ((((!((map__14102 == null)))?((((map__14102.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14102.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14102):map__14102);
var bindings = cljs.core.get.call(null,map__14102__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.call(null,map__14102__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__14102__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var _STAR_lexical_renames_STAR_14104_14113 = cljs.compiler._STAR_lexical_renames_STAR_;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.call(null,((function (_STAR_lexical_renames_STAR_14104_14113,context,map__14102,map__14102__$1,bindings,expr,env){
return (function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope.call(null,binding),cljs.core.gensym.call(null,[cljs.core.str(name),cljs.core.str("-")].join(''))],null));
});})(_STAR_lexical_renames_STAR_14104_14113,context,map__14102,map__14102__$1,bindings,expr,env))
,bindings):null));

try{var seq__14105_14114 = cljs.core.seq.call(null,bindings);
var chunk__14106_14115 = null;
var count__14107_14116 = (0);
var i__14108_14117 = (0);
while(true){
if((i__14108_14117 < count__14107_14116)){
var map__14109_14118 = cljs.core._nth.call(null,chunk__14106_14115,i__14108_14117);
var map__14109_14119__$1 = ((((!((map__14109_14118 == null)))?((((map__14109_14118.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14109_14118.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14109_14118):map__14109_14118);
var binding_14120 = map__14109_14119__$1;
var init_14121 = cljs.core.get.call(null,map__14109_14119__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_14120);

cljs.compiler.emitln.call(null," = ",init_14121,";");

var G__14122 = seq__14105_14114;
var G__14123 = chunk__14106_14115;
var G__14124 = count__14107_14116;
var G__14125 = (i__14108_14117 + (1));
seq__14105_14114 = G__14122;
chunk__14106_14115 = G__14123;
count__14107_14116 = G__14124;
i__14108_14117 = G__14125;
continue;
} else {
var temp__4425__auto___14126 = cljs.core.seq.call(null,seq__14105_14114);
if(temp__4425__auto___14126){
var seq__14105_14127__$1 = temp__4425__auto___14126;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14105_14127__$1)){
var c__7256__auto___14128 = cljs.core.chunk_first.call(null,seq__14105_14127__$1);
var G__14129 = cljs.core.chunk_rest.call(null,seq__14105_14127__$1);
var G__14130 = c__7256__auto___14128;
var G__14131 = cljs.core.count.call(null,c__7256__auto___14128);
var G__14132 = (0);
seq__14105_14114 = G__14129;
chunk__14106_14115 = G__14130;
count__14107_14116 = G__14131;
i__14108_14117 = G__14132;
continue;
} else {
var map__14111_14133 = cljs.core.first.call(null,seq__14105_14127__$1);
var map__14111_14134__$1 = ((((!((map__14111_14133 == null)))?((((map__14111_14133.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14111_14133.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14111_14133):map__14111_14133);
var binding_14135 = map__14111_14134__$1;
var init_14136 = cljs.core.get.call(null,map__14111_14134__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_14135);

cljs.compiler.emitln.call(null," = ",init_14136,";");

var G__14137 = cljs.core.next.call(null,seq__14105_14127__$1);
var G__14138 = null;
var G__14139 = (0);
var G__14140 = (0);
seq__14105_14114 = G__14137;
chunk__14106_14115 = G__14138;
count__14107_14116 = G__14139;
i__14108_14117 = G__14140;
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
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_14104_14113;
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__14141){
var map__14142 = p__14141;
var map__14142__$1 = ((((!((map__14142 == null)))?((((map__14142.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14142.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14142):map__14142);
var frame = cljs.core.get.call(null,map__14142__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.call(null,map__14142__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.call(null,map__14142__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__7356__auto___14144 = cljs.core.count.call(null,exprs);
var i_14145 = (0);
while(true){
if((i_14145 < n__7356__auto___14144)){
cljs.compiler.emitln.call(null,"var ",temps.call(null,i_14145)," = ",exprs.call(null,i_14145),";");

var G__14146 = (i_14145 + (1));
i_14145 = G__14146;
continue;
} else {
}
break;
}

var n__7356__auto___14147 = cljs.core.count.call(null,exprs);
var i_14148 = (0);
while(true){
if((i_14148 < n__7356__auto___14147)){
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_14148))," = ",temps.call(null,i_14148),";");

var G__14149 = (i_14148 + (1));
i_14148 = G__14149;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.call(null,"continue;");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__14150){
var map__14151 = p__14150;
var map__14151__$1 = ((((!((map__14151 == null)))?((((map__14151.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14151.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14151):map__14151);
var bindings = cljs.core.get.call(null,map__14151__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.call(null,map__14151__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__14151__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var seq__14153_14161 = cljs.core.seq.call(null,bindings);
var chunk__14154_14162 = null;
var count__14155_14163 = (0);
var i__14156_14164 = (0);
while(true){
if((i__14156_14164 < count__14155_14163)){
var map__14157_14165 = cljs.core._nth.call(null,chunk__14154_14162,i__14156_14164);
var map__14157_14166__$1 = ((((!((map__14157_14165 == null)))?((((map__14157_14165.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14157_14165.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14157_14165):map__14157_14165);
var binding_14167 = map__14157_14166__$1;
var init_14168 = cljs.core.get.call(null,map__14157_14166__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_14167)," = ",init_14168,";");

var G__14169 = seq__14153_14161;
var G__14170 = chunk__14154_14162;
var G__14171 = count__14155_14163;
var G__14172 = (i__14156_14164 + (1));
seq__14153_14161 = G__14169;
chunk__14154_14162 = G__14170;
count__14155_14163 = G__14171;
i__14156_14164 = G__14172;
continue;
} else {
var temp__4425__auto___14173 = cljs.core.seq.call(null,seq__14153_14161);
if(temp__4425__auto___14173){
var seq__14153_14174__$1 = temp__4425__auto___14173;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14153_14174__$1)){
var c__7256__auto___14175 = cljs.core.chunk_first.call(null,seq__14153_14174__$1);
var G__14176 = cljs.core.chunk_rest.call(null,seq__14153_14174__$1);
var G__14177 = c__7256__auto___14175;
var G__14178 = cljs.core.count.call(null,c__7256__auto___14175);
var G__14179 = (0);
seq__14153_14161 = G__14176;
chunk__14154_14162 = G__14177;
count__14155_14163 = G__14178;
i__14156_14164 = G__14179;
continue;
} else {
var map__14159_14180 = cljs.core.first.call(null,seq__14153_14174__$1);
var map__14159_14181__$1 = ((((!((map__14159_14180 == null)))?((((map__14159_14180.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14159_14180.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14159_14180):map__14159_14180);
var binding_14182 = map__14159_14181__$1;
var init_14183 = cljs.core.get.call(null,map__14159_14181__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_14182)," = ",init_14183,";");

var G__14184 = cljs.core.next.call(null,seq__14153_14174__$1);
var G__14185 = null;
var G__14186 = (0);
var G__14187 = (0);
seq__14153_14161 = G__14184;
chunk__14154_14162 = G__14185;
count__14155_14163 = G__14186;
i__14156_14164 = G__14187;
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__14190){
var map__14191 = p__14190;
var map__14191__$1 = ((((!((map__14191 == null)))?((((map__14191.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14191.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14191):map__14191);
var expr = map__14191__$1;
var f = cljs.core.get.call(null,map__14191__$1,new cljs.core.Keyword(null,"f","f",-1597136552));
var args = cljs.core.get.call(null,map__14191__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__14191__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
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
var vec__14193 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14191,map__14191__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$variadic")].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14191,map__14191__$1,expr,f,args,env){
return (function (p1__14188_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__14188_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14191,map__14191__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14191,map__14191__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([arity], true),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14191,map__14191__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14191,map__14191__$1,expr,f,args,env){
return (function (p1__14189_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__14189_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14191,map__14191__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14191,map__14191__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.call(null,vec__14193,(0),null);
var variadic_invoke = cljs.core.nth.call(null,vec__14193,(1),null);
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_14194 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_14194,"(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",cljs.core.rest.call(null,args))),")");
} else {
if(keyword_QMARK_){
cljs.compiler.emits.call(null,f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count.call(null,args),"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_14195 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_14195,args)),(((mfa_14195 === (0)))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_14195,args)),"], 0))");
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
var fprop_14196 = [cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_14196," ? ",f__$1,fprop_14196,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
} else {
cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}

}
}
}
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__14197){
var map__14198 = p__14197;
var map__14198__$1 = ((((!((map__14198 == null)))?((((map__14198.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14198.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14198):map__14198);
var ctor = cljs.core.get.call(null,map__14198__$1,new cljs.core.Keyword(null,"ctor","ctor",1750864802));
var args = cljs.core.get.call(null,map__14198__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__14198__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__14200){
var map__14201 = p__14200;
var map__14201__$1 = ((((!((map__14201 == null)))?((((map__14201.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14201.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14201):map__14201);
var target = cljs.core.get.call(null,map__14201__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.call(null,map__14201__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.call(null,map__14201__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,target," = ",val);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
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

var seq__14207_14211 = cljs.core.seq.call(null,cljs.core.remove.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,seen)),cljs.core.distinct.call(null,cljs.core.vals.call(null,libs))));
var chunk__14208_14212 = null;
var count__14209_14213 = (0);
var i__14210_14214 = (0);
while(true){
if((i__14210_14214 < count__14209_14213)){
var lib_14215 = cljs.core._nth.call(null,chunk__14208_14212,i__14210_14214);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_14215),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14215),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_14215),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14215),"', 'reload-all');");
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14215),"');");

}
}

var G__14216 = seq__14207_14211;
var G__14217 = chunk__14208_14212;
var G__14218 = count__14209_14213;
var G__14219 = (i__14210_14214 + (1));
seq__14207_14211 = G__14216;
chunk__14208_14212 = G__14217;
count__14209_14213 = G__14218;
i__14210_14214 = G__14219;
continue;
} else {
var temp__4425__auto___14220 = cljs.core.seq.call(null,seq__14207_14211);
if(temp__4425__auto___14220){
var seq__14207_14221__$1 = temp__4425__auto___14220;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14207_14221__$1)){
var c__7256__auto___14222 = cljs.core.chunk_first.call(null,seq__14207_14221__$1);
var G__14223 = cljs.core.chunk_rest.call(null,seq__14207_14221__$1);
var G__14224 = c__7256__auto___14222;
var G__14225 = cljs.core.count.call(null,c__7256__auto___14222);
var G__14226 = (0);
seq__14207_14211 = G__14223;
chunk__14208_14212 = G__14224;
count__14209_14213 = G__14225;
i__14210_14214 = G__14226;
continue;
} else {
var lib_14227 = cljs.core.first.call(null,seq__14207_14221__$1);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_14227),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14227),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_14227),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14227),"', 'reload-all');");
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14227),"');");

}
}

var G__14228 = cljs.core.next.call(null,seq__14207_14221__$1);
var G__14229 = null;
var G__14230 = (0);
var G__14231 = (0);
seq__14207_14211 = G__14228;
chunk__14208_14212 = G__14229;
count__14209_14213 = G__14230;
i__14210_14214 = G__14231;
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__14232){
var map__14233 = p__14232;
var map__14233__$1 = ((((!((map__14233 == null)))?((((map__14233.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14233.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14233):map__14233);
var name = cljs.core.get.call(null,map__14233__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__14233__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__14233__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__14233__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__14233__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__14233__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");

if(cljs.core._EQ_.call(null,name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}

cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads));

return cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"deftype*","deftype*",-677871637),(function (p__14235){
var map__14236 = p__14235;
var map__14236__$1 = ((((!((map__14236 == null)))?((((map__14236.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14236.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14236):map__14236);
var t = cljs.core.get.call(null,map__14236__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__14236__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__14236__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__14236__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__14236__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__14238_14252 = cljs.core.seq.call(null,protocols);
var chunk__14239_14253 = null;
var count__14240_14254 = (0);
var i__14241_14255 = (0);
while(true){
if((i__14241_14255 < count__14240_14254)){
var protocol_14256 = cljs.core._nth.call(null,chunk__14239_14253,i__14241_14255);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_14256)].join('')),"}");

var G__14257 = seq__14238_14252;
var G__14258 = chunk__14239_14253;
var G__14259 = count__14240_14254;
var G__14260 = (i__14241_14255 + (1));
seq__14238_14252 = G__14257;
chunk__14239_14253 = G__14258;
count__14240_14254 = G__14259;
i__14241_14255 = G__14260;
continue;
} else {
var temp__4425__auto___14261 = cljs.core.seq.call(null,seq__14238_14252);
if(temp__4425__auto___14261){
var seq__14238_14262__$1 = temp__4425__auto___14261;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14238_14262__$1)){
var c__7256__auto___14263 = cljs.core.chunk_first.call(null,seq__14238_14262__$1);
var G__14264 = cljs.core.chunk_rest.call(null,seq__14238_14262__$1);
var G__14265 = c__7256__auto___14263;
var G__14266 = cljs.core.count.call(null,c__7256__auto___14263);
var G__14267 = (0);
seq__14238_14252 = G__14264;
chunk__14239_14253 = G__14265;
count__14240_14254 = G__14266;
i__14241_14255 = G__14267;
continue;
} else {
var protocol_14268 = cljs.core.first.call(null,seq__14238_14262__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_14268)].join('')),"}");

var G__14269 = cljs.core.next.call(null,seq__14238_14262__$1);
var G__14270 = null;
var G__14271 = (0);
var G__14272 = (0);
seq__14238_14252 = G__14269;
chunk__14239_14253 = G__14270;
count__14240_14254 = G__14271;
i__14241_14255 = G__14272;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__14242_14273 = cljs.core.seq.call(null,fields__$1);
var chunk__14243_14274 = null;
var count__14244_14275 = (0);
var i__14245_14276 = (0);
while(true){
if((i__14245_14276 < count__14244_14275)){
var fld_14277 = cljs.core._nth.call(null,chunk__14243_14274,i__14245_14276);
cljs.compiler.emitln.call(null,"this.",fld_14277," = ",fld_14277,";");

var G__14278 = seq__14242_14273;
var G__14279 = chunk__14243_14274;
var G__14280 = count__14244_14275;
var G__14281 = (i__14245_14276 + (1));
seq__14242_14273 = G__14278;
chunk__14243_14274 = G__14279;
count__14244_14275 = G__14280;
i__14245_14276 = G__14281;
continue;
} else {
var temp__4425__auto___14282 = cljs.core.seq.call(null,seq__14242_14273);
if(temp__4425__auto___14282){
var seq__14242_14283__$1 = temp__4425__auto___14282;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14242_14283__$1)){
var c__7256__auto___14284 = cljs.core.chunk_first.call(null,seq__14242_14283__$1);
var G__14285 = cljs.core.chunk_rest.call(null,seq__14242_14283__$1);
var G__14286 = c__7256__auto___14284;
var G__14287 = cljs.core.count.call(null,c__7256__auto___14284);
var G__14288 = (0);
seq__14242_14273 = G__14285;
chunk__14243_14274 = G__14286;
count__14244_14275 = G__14287;
i__14245_14276 = G__14288;
continue;
} else {
var fld_14289 = cljs.core.first.call(null,seq__14242_14283__$1);
cljs.compiler.emitln.call(null,"this.",fld_14289," = ",fld_14289,";");

var G__14290 = cljs.core.next.call(null,seq__14242_14283__$1);
var G__14291 = null;
var G__14292 = (0);
var G__14293 = (0);
seq__14242_14273 = G__14290;
chunk__14243_14274 = G__14291;
count__14244_14275 = G__14292;
i__14245_14276 = G__14293;
continue;
}
} else {
}
}
break;
}

var seq__14246_14294 = cljs.core.seq.call(null,pmasks);
var chunk__14247_14295 = null;
var count__14248_14296 = (0);
var i__14249_14297 = (0);
while(true){
if((i__14249_14297 < count__14248_14296)){
var vec__14250_14298 = cljs.core._nth.call(null,chunk__14247_14295,i__14249_14297);
var pno_14299 = cljs.core.nth.call(null,vec__14250_14298,(0),null);
var pmask_14300 = cljs.core.nth.call(null,vec__14250_14298,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_14299,"$ = ",pmask_14300,";");

var G__14301 = seq__14246_14294;
var G__14302 = chunk__14247_14295;
var G__14303 = count__14248_14296;
var G__14304 = (i__14249_14297 + (1));
seq__14246_14294 = G__14301;
chunk__14247_14295 = G__14302;
count__14248_14296 = G__14303;
i__14249_14297 = G__14304;
continue;
} else {
var temp__4425__auto___14305 = cljs.core.seq.call(null,seq__14246_14294);
if(temp__4425__auto___14305){
var seq__14246_14306__$1 = temp__4425__auto___14305;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14246_14306__$1)){
var c__7256__auto___14307 = cljs.core.chunk_first.call(null,seq__14246_14306__$1);
var G__14308 = cljs.core.chunk_rest.call(null,seq__14246_14306__$1);
var G__14309 = c__7256__auto___14307;
var G__14310 = cljs.core.count.call(null,c__7256__auto___14307);
var G__14311 = (0);
seq__14246_14294 = G__14308;
chunk__14247_14295 = G__14309;
count__14248_14296 = G__14310;
i__14249_14297 = G__14311;
continue;
} else {
var vec__14251_14312 = cljs.core.first.call(null,seq__14246_14306__$1);
var pno_14313 = cljs.core.nth.call(null,vec__14251_14312,(0),null);
var pmask_14314 = cljs.core.nth.call(null,vec__14251_14312,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_14313,"$ = ",pmask_14314,";");

var G__14315 = cljs.core.next.call(null,seq__14246_14306__$1);
var G__14316 = null;
var G__14317 = (0);
var G__14318 = (0);
seq__14246_14294 = G__14315;
chunk__14247_14295 = G__14316;
count__14248_14296 = G__14317;
i__14249_14297 = G__14318;
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"defrecord*","defrecord*",718069562),(function (p__14319){
var map__14320 = p__14319;
var map__14320__$1 = ((((!((map__14320 == null)))?((((map__14320.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14320.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14320):map__14320);
var t = cljs.core.get.call(null,map__14320__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__14320__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__14320__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__14320__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__14320__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__14322_14336 = cljs.core.seq.call(null,protocols);
var chunk__14323_14337 = null;
var count__14324_14338 = (0);
var i__14325_14339 = (0);
while(true){
if((i__14325_14339 < count__14324_14338)){
var protocol_14340 = cljs.core._nth.call(null,chunk__14323_14337,i__14325_14339);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_14340)].join('')),"}");

var G__14341 = seq__14322_14336;
var G__14342 = chunk__14323_14337;
var G__14343 = count__14324_14338;
var G__14344 = (i__14325_14339 + (1));
seq__14322_14336 = G__14341;
chunk__14323_14337 = G__14342;
count__14324_14338 = G__14343;
i__14325_14339 = G__14344;
continue;
} else {
var temp__4425__auto___14345 = cljs.core.seq.call(null,seq__14322_14336);
if(temp__4425__auto___14345){
var seq__14322_14346__$1 = temp__4425__auto___14345;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14322_14346__$1)){
var c__7256__auto___14347 = cljs.core.chunk_first.call(null,seq__14322_14346__$1);
var G__14348 = cljs.core.chunk_rest.call(null,seq__14322_14346__$1);
var G__14349 = c__7256__auto___14347;
var G__14350 = cljs.core.count.call(null,c__7256__auto___14347);
var G__14351 = (0);
seq__14322_14336 = G__14348;
chunk__14323_14337 = G__14349;
count__14324_14338 = G__14350;
i__14325_14339 = G__14351;
continue;
} else {
var protocol_14352 = cljs.core.first.call(null,seq__14322_14346__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_14352)].join('')),"}");

var G__14353 = cljs.core.next.call(null,seq__14322_14346__$1);
var G__14354 = null;
var G__14355 = (0);
var G__14356 = (0);
seq__14322_14336 = G__14353;
chunk__14323_14337 = G__14354;
count__14324_14338 = G__14355;
i__14325_14339 = G__14356;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__14326_14357 = cljs.core.seq.call(null,fields__$1);
var chunk__14327_14358 = null;
var count__14328_14359 = (0);
var i__14329_14360 = (0);
while(true){
if((i__14329_14360 < count__14328_14359)){
var fld_14361 = cljs.core._nth.call(null,chunk__14327_14358,i__14329_14360);
cljs.compiler.emitln.call(null,"this.",fld_14361," = ",fld_14361,";");

var G__14362 = seq__14326_14357;
var G__14363 = chunk__14327_14358;
var G__14364 = count__14328_14359;
var G__14365 = (i__14329_14360 + (1));
seq__14326_14357 = G__14362;
chunk__14327_14358 = G__14363;
count__14328_14359 = G__14364;
i__14329_14360 = G__14365;
continue;
} else {
var temp__4425__auto___14366 = cljs.core.seq.call(null,seq__14326_14357);
if(temp__4425__auto___14366){
var seq__14326_14367__$1 = temp__4425__auto___14366;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14326_14367__$1)){
var c__7256__auto___14368 = cljs.core.chunk_first.call(null,seq__14326_14367__$1);
var G__14369 = cljs.core.chunk_rest.call(null,seq__14326_14367__$1);
var G__14370 = c__7256__auto___14368;
var G__14371 = cljs.core.count.call(null,c__7256__auto___14368);
var G__14372 = (0);
seq__14326_14357 = G__14369;
chunk__14327_14358 = G__14370;
count__14328_14359 = G__14371;
i__14329_14360 = G__14372;
continue;
} else {
var fld_14373 = cljs.core.first.call(null,seq__14326_14367__$1);
cljs.compiler.emitln.call(null,"this.",fld_14373," = ",fld_14373,";");

var G__14374 = cljs.core.next.call(null,seq__14326_14367__$1);
var G__14375 = null;
var G__14376 = (0);
var G__14377 = (0);
seq__14326_14357 = G__14374;
chunk__14327_14358 = G__14375;
count__14328_14359 = G__14376;
i__14329_14360 = G__14377;
continue;
}
} else {
}
}
break;
}

var seq__14330_14378 = cljs.core.seq.call(null,pmasks);
var chunk__14331_14379 = null;
var count__14332_14380 = (0);
var i__14333_14381 = (0);
while(true){
if((i__14333_14381 < count__14332_14380)){
var vec__14334_14382 = cljs.core._nth.call(null,chunk__14331_14379,i__14333_14381);
var pno_14383 = cljs.core.nth.call(null,vec__14334_14382,(0),null);
var pmask_14384 = cljs.core.nth.call(null,vec__14334_14382,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_14383,"$ = ",pmask_14384,";");

var G__14385 = seq__14330_14378;
var G__14386 = chunk__14331_14379;
var G__14387 = count__14332_14380;
var G__14388 = (i__14333_14381 + (1));
seq__14330_14378 = G__14385;
chunk__14331_14379 = G__14386;
count__14332_14380 = G__14387;
i__14333_14381 = G__14388;
continue;
} else {
var temp__4425__auto___14389 = cljs.core.seq.call(null,seq__14330_14378);
if(temp__4425__auto___14389){
var seq__14330_14390__$1 = temp__4425__auto___14389;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14330_14390__$1)){
var c__7256__auto___14391 = cljs.core.chunk_first.call(null,seq__14330_14390__$1);
var G__14392 = cljs.core.chunk_rest.call(null,seq__14330_14390__$1);
var G__14393 = c__7256__auto___14391;
var G__14394 = cljs.core.count.call(null,c__7256__auto___14391);
var G__14395 = (0);
seq__14330_14378 = G__14392;
chunk__14331_14379 = G__14393;
count__14332_14380 = G__14394;
i__14333_14381 = G__14395;
continue;
} else {
var vec__14335_14396 = cljs.core.first.call(null,seq__14330_14390__$1);
var pno_14397 = cljs.core.nth.call(null,vec__14335_14396,(0),null);
var pmask_14398 = cljs.core.nth.call(null,vec__14335_14396,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_14397,"$ = ",pmask_14398,";");

var G__14399 = cljs.core.next.call(null,seq__14330_14390__$1);
var G__14400 = null;
var G__14401 = (0);
var G__14402 = (0);
seq__14330_14378 = G__14399;
chunk__14331_14379 = G__14400;
count__14332_14380 = G__14401;
i__14333_14381 = G__14402;
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
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"dot","dot",1442709401),(function (p__14403){
var map__14404 = p__14403;
var map__14404__$1 = ((((!((map__14404 == null)))?((((map__14404.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14404.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14404):map__14404);
var target = cljs.core.get.call(null,map__14404__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.call(null,map__14404__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.call(null,map__14404__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.call(null,map__14404__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__14404__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__14406){
var map__14407 = p__14406;
var map__14407__$1 = ((((!((map__14407 == null)))?((((map__14407.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14407.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14407):map__14407);
var op = cljs.core.get.call(null,map__14407__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.call(null,map__14407__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.call(null,map__14407__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.call(null,map__14407__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.call(null,map__14407__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__6441__auto__ = code;
if(cljs.core.truth_(and__6441__auto__)){
return goog.string.startsWith(clojure.string.trim.call(null,code),"/*");
} else {
return and__6441__auto__;
}
})())){
return cljs.compiler.emits.call(null,code);
} else {
var env__13363__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.call(null,code);
} else {
cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__13363__auto__))){
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
var seq__14417 = cljs.core.seq.call(null,table);
var chunk__14418 = null;
var count__14419 = (0);
var i__14420 = (0);
while(true){
if((i__14420 < count__14419)){
var vec__14421 = cljs.core._nth.call(null,chunk__14418,i__14420);
var sym = cljs.core.nth.call(null,vec__14421,(0),null);
var value = cljs.core.nth.call(null,vec__14421,(1),null);
var ns_14423 = cljs.core.namespace.call(null,sym);
var name_14424 = cljs.core.name.call(null,sym);
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

var G__14425 = seq__14417;
var G__14426 = chunk__14418;
var G__14427 = count__14419;
var G__14428 = (i__14420 + (1));
seq__14417 = G__14425;
chunk__14418 = G__14426;
count__14419 = G__14427;
i__14420 = G__14428;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__14417);
if(temp__4425__auto__){
var seq__14417__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14417__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__14417__$1);
var G__14429 = cljs.core.chunk_rest.call(null,seq__14417__$1);
var G__14430 = c__7256__auto__;
var G__14431 = cljs.core.count.call(null,c__7256__auto__);
var G__14432 = (0);
seq__14417 = G__14429;
chunk__14418 = G__14430;
count__14419 = G__14431;
i__14420 = G__14432;
continue;
} else {
var vec__14422 = cljs.core.first.call(null,seq__14417__$1);
var sym = cljs.core.nth.call(null,vec__14422,(0),null);
var value = cljs.core.nth.call(null,vec__14422,(1),null);
var ns_14433 = cljs.core.namespace.call(null,sym);
var name_14434 = cljs.core.name.call(null,sym);
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

var G__14435 = cljs.core.next.call(null,seq__14417__$1);
var G__14436 = null;
var G__14437 = (0);
var G__14438 = (0);
seq__14417 = G__14435;
chunk__14418 = G__14436;
count__14419 = G__14437;
i__14420 = G__14438;
continue;
}
} else {
return null;
}
}
break;
}
});
