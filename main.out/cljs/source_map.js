// Compiled by ClojureScript 1.7.228 {}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.call(null,(function (m,p__12689){
var vec__12690 = p__12689;
var i = cljs.core.nth.call(null,vec__12690,(0),null);
var v = cljs.core.nth.call(null,vec__12690,(1),null);
return cljs.core.assoc.call(null,m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.call(null,(function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources.call(null,sources);
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare.call(null,sources__$1.call(null,a),sources__$1.call(null,b));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__12692 = seg;
var gcol = cljs.core.nth.call(null,vec__12692,(0),null);
var source = cljs.core.nth.call(null,vec__12692,(1),null);
var line = cljs.core.nth.call(null,vec__12692,(2),null);
var col = cljs.core.nth.call(null,vec__12692,(3),null);
var name = cljs.core.nth.call(null,vec__12692,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(goog.object.get(source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__4425__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,seg));
if(cljs.core.truth_(temp__4425__auto__)){
var name__$1 = temp__4425__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__12695 = seg;
var gcol = cljs.core.nth.call(null,vec__12695,(0),null);
var source = cljs.core.nth.call(null,vec__12695,(1),null);
var line = cljs.core.nth.call(null,vec__12695,(2),null);
var col = cljs.core.nth.call(null,vec__12695,(3),null);
var name = cljs.core.nth.call(null,vec__12695,(4),null);
var vec__12696 = relseg;
var rgcol = cljs.core.nth.call(null,vec__12696,(0),null);
var rsource = cljs.core.nth.call(null,vec__12696,(1),null);
var rline = cljs.core.nth.call(null,vec__12696,(2),null);
var rcol = cljs.core.nth.call(null,vec__12696,(3),null);
var rname = cljs.core.nth.call(null,vec__12696,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__6453__auto__ = source;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__6453__auto__ = line;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__6453__auto__ = col;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__6453__auto__ = name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta.call(null,nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__12699 = segmap;
var map__12699__$1 = ((((!((map__12699 == null)))?((((map__12699.cljs$lang$protocol_mask$partition0$ & (64))) || (map__12699.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__12699):map__12699);
var gcol = cljs.core.get.call(null,map__12699__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__12699__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__12699__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__12699__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__12699__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.call(null,((function (map__12699,map__12699__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.call(null,((function (map__12699,map__12699__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.call(null,m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.call(null,((function (map__12699,map__12699__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.call(null,v,d__$1);
});})(map__12699,map__12699__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__12699,map__12699__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});})(map__12699,map__12699__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var args12701 = [];
var len__7511__auto___12705 = arguments.length;
var i__7512__auto___12706 = (0);
while(true){
if((i__7512__auto___12706 < len__7511__auto___12705)){
args12701.push((arguments[i__7512__auto___12706]));

var G__12707 = (i__7512__auto___12706 + (1));
i__7512__auto___12706 = G__12707;
continue;
} else {
}
break;
}

var G__12703 = args12701.length;
switch (G__12703) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12701.length)].join('')));

}
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by.call(null,cljs.source_map.source_compare.call(null,sources));
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__12704 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__12709 = cljs.core.next.call(null,segs__$1);
var G__12710 = nrelseg;
var G__12711 = cljs.source_map.update_reverse_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__12709;
relseg__$1 = G__12710;
result__$1 = G__12711;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__12704,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__12704,(1),null);
var G__12712 = (gline + (1));
var G__12713 = cljs.core.next.call(null,lines__$1);
var G__12714 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__12715 = result__$1;
gline = G__12712;
lines__$1 = G__12713;
relseg = G__12714;
result = G__12715;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;
/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__12719 = segmap;
var map__12719__$1 = ((((!((map__12719 == null)))?((((map__12719.cljs$lang$protocol_mask$partition0$ & (64))) || (map__12719.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__12719):map__12719);
var gcol = cljs.core.get.call(null,map__12719__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__12719__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__12719__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__12719__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__12719__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.call(null,((function (map__12719,map__12719__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.call(null,((function (map__12719,map__12719__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__12716_SHARP_){
return cljs.core.conj.call(null,p1__12716_SHARP_,d__$1);
});})(map__12719,map__12719__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__12719,map__12719__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var args12721 = [];
var len__7511__auto___12725 = arguments.length;
var i__7512__auto___12726 = (0);
while(true){
if((i__7512__auto___12726 < len__7511__auto___12725)){
args12721.push((arguments[i__7512__auto___12726]));

var G__12727 = (i__7512__auto___12726 + (1));
i__7512__auto___12726 = G__12727;
continue;
} else {
}
break;
}

var G__12723 = args12721.length;
switch (G__12723) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12721.length)].join('')));

}
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__12724 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__12729 = cljs.core.next.call(null,segs__$1);
var G__12730 = nrelseg;
var G__12731 = cljs.source_map.update_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__12729;
relseg__$1 = G__12730;
result__$1 = G__12731;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__12724,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__12724,(1),null);
var G__12732 = (gline + (1));
var G__12733 = cljs.core.next.call(null,lines__$1);
var G__12734 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__12735 = result__$1;
gline = G__12732;
lines__$1 = G__12733;
relseg = G__12734;
result = G__12735;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;
/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.call(null,((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.call(null,relseg,((function (relseg){
return (function (p__12742){
var vec__12743 = p__12742;
var _ = cljs.core.nth.call(null,vec__12743,(0),null);
var source = cljs.core.nth.call(null,vec__12743,(1),null);
var line = cljs.core.nth.call(null,vec__12743,(2),null);
var col = cljs.core.nth.call(null,vec__12743,(3),null);
var name = cljs.core.nth.call(null,vec__12743,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.call(null,segs,cljs.core.reduce.call(null,((function (relseg){
return (function (cols__$1,p__12744){
var vec__12745 = p__12744;
var gcol = cljs.core.nth.call(null,vec__12745,(0),null);
var sidx = cljs.core.nth.call(null,vec__12745,(1),null);
var line = cljs.core.nth.call(null,vec__12745,(2),null);
var col = cljs.core.nth.call(null,vec__12745,(3),null);
var name = cljs.core.nth.call(null,vec__12745,(4),null);
var seg = vec__12745;
var offset = cljs.core.map.call(null,cljs.core._,seg,cljs.core.deref.call(null,relseg));
cljs.core.swap_BANG_.call(null,relseg,((function (offset,vec__12745,gcol,sidx,line,col,name,seg,relseg){
return (function (p__12746){
var vec__12747 = p__12746;
var _ = cljs.core.nth.call(null,vec__12747,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__12747,(1),null);
var ___$2 = cljs.core.nth.call(null,vec__12747,(2),null);
var ___$3 = cljs.core.nth.call(null,vec__12747,(3),null);
var lname = cljs.core.nth.call(null,vec__12747,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__6453__auto__ = name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__12745,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.call(null,cols__$1,cljs.source_map.base64_vlq.encode.call(null,offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null));
var names__GT_idx = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var name_idx = cljs.core.atom.call(null,(0));
var preamble_lines = cljs.core.take.call(null,(function (){var or__6453__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.call(null,cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__4423__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__4423__auto__)){
var name = temp__4423__auto__;
var idx = (function (){var temp__4423__auto____$1 = cljs.core.get.call(null,cljs.core.deref.call(null,names__GT_idx),name);
if(cljs.core.truth_(temp__4423__auto____$1)){
var idx = temp__4423__auto____$1;
return idx;
} else {
var cidx = cljs.core.deref.call(null,name_idx);
cljs.core.swap_BANG_.call(null,names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.call(null,name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.call(null,segv,idx);
} else {
return segv;
}
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__12801 = cljs.core.seq.call(null,infos);
var chunk__12802 = null;
var count__12803 = (0);
var i__12804 = (0);
while(true){
if((i__12804 < count__12803)){
var info = cljs.core._nth.call(null,chunk__12802,i__12804);
var segv_12851 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_12852 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_12853 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_12852 > (lc_12853 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__12801,chunk__12802,count__12803,i__12804,segv_12851,gline_12852,lc_12853,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_12852 - (lc_12853 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_12851], null));
});})(seq__12801,chunk__12802,count__12803,i__12804,segv_12851,gline_12852,lc_12853,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__12801,chunk__12802,count__12803,i__12804,segv_12851,gline_12852,lc_12853,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_12852], null),cljs.core.conj,segv_12851);
});})(seq__12801,chunk__12802,count__12803,i__12804,segv_12851,gline_12852,lc_12853,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__12854 = seq__12801;
var G__12855 = chunk__12802;
var G__12856 = count__12803;
var G__12857 = (i__12804 + (1));
seq__12801 = G__12854;
chunk__12802 = G__12855;
count__12803 = G__12856;
i__12804 = G__12857;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__12801);
if(temp__4425__auto__){
var seq__12801__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12801__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__12801__$1);
var G__12858 = cljs.core.chunk_rest.call(null,seq__12801__$1);
var G__12859 = c__7256__auto__;
var G__12860 = cljs.core.count.call(null,c__7256__auto__);
var G__12861 = (0);
seq__12801 = G__12858;
chunk__12802 = G__12859;
count__12803 = G__12860;
i__12804 = G__12861;
continue;
} else {
var info = cljs.core.first.call(null,seq__12801__$1);
var segv_12862 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_12863 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_12864 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_12863 > (lc_12864 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__12801,chunk__12802,count__12803,i__12804,segv_12862,gline_12863,lc_12864,info,seq__12801__$1,temp__4425__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_12863 - (lc_12864 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_12862], null));
});})(seq__12801,chunk__12802,count__12803,i__12804,segv_12862,gline_12863,lc_12864,info,seq__12801__$1,temp__4425__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__12801,chunk__12802,count__12803,i__12804,segv_12862,gline_12863,lc_12864,info,seq__12801__$1,temp__4425__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_12863], null),cljs.core.conj,segv_12862);
});})(seq__12801,chunk__12802,count__12803,i__12804,segv_12862,gline_12863,lc_12864,info,seq__12801__$1,temp__4425__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__12865 = cljs.core.next.call(null,seq__12801__$1);
var G__12866 = null;
var G__12867 = (0);
var G__12868 = (0);
seq__12801 = G__12865;
chunk__12802 = G__12866;
count__12803 = G__12867;
i__12804 = G__12868;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__12805_12869 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__12806_12870 = null;
var count__12807_12871 = (0);
var i__12808_12872 = (0);
while(true){
if((i__12808_12872 < count__12807_12871)){
var vec__12809_12873 = cljs.core._nth.call(null,chunk__12806_12870,i__12808_12872);
var source_idx_12874 = cljs.core.nth.call(null,vec__12809_12873,(0),null);
var vec__12810_12875 = cljs.core.nth.call(null,vec__12809_12873,(1),null);
var __12876 = cljs.core.nth.call(null,vec__12810_12875,(0),null);
var lines_12877__$1 = cljs.core.nth.call(null,vec__12810_12875,(1),null);
var seq__12811_12878 = cljs.core.seq.call(null,lines_12877__$1);
var chunk__12812_12879 = null;
var count__12813_12880 = (0);
var i__12814_12881 = (0);
while(true){
if((i__12814_12881 < count__12813_12880)){
var vec__12815_12882 = cljs.core._nth.call(null,chunk__12812_12879,i__12814_12881);
var line_12883 = cljs.core.nth.call(null,vec__12815_12882,(0),null);
var cols_12884 = cljs.core.nth.call(null,vec__12815_12882,(1),null);
var seq__12816_12885 = cljs.core.seq.call(null,cols_12884);
var chunk__12817_12886 = null;
var count__12818_12887 = (0);
var i__12819_12888 = (0);
while(true){
if((i__12819_12888 < count__12818_12887)){
var vec__12820_12889 = cljs.core._nth.call(null,chunk__12817_12886,i__12819_12888);
var col_12890 = cljs.core.nth.call(null,vec__12820_12889,(0),null);
var infos_12891 = cljs.core.nth.call(null,vec__12820_12889,(1),null);
encode_cols.call(null,infos_12891,source_idx_12874,line_12883,col_12890);

var G__12892 = seq__12816_12885;
var G__12893 = chunk__12817_12886;
var G__12894 = count__12818_12887;
var G__12895 = (i__12819_12888 + (1));
seq__12816_12885 = G__12892;
chunk__12817_12886 = G__12893;
count__12818_12887 = G__12894;
i__12819_12888 = G__12895;
continue;
} else {
var temp__4425__auto___12896 = cljs.core.seq.call(null,seq__12816_12885);
if(temp__4425__auto___12896){
var seq__12816_12897__$1 = temp__4425__auto___12896;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12816_12897__$1)){
var c__7256__auto___12898 = cljs.core.chunk_first.call(null,seq__12816_12897__$1);
var G__12899 = cljs.core.chunk_rest.call(null,seq__12816_12897__$1);
var G__12900 = c__7256__auto___12898;
var G__12901 = cljs.core.count.call(null,c__7256__auto___12898);
var G__12902 = (0);
seq__12816_12885 = G__12899;
chunk__12817_12886 = G__12900;
count__12818_12887 = G__12901;
i__12819_12888 = G__12902;
continue;
} else {
var vec__12821_12903 = cljs.core.first.call(null,seq__12816_12897__$1);
var col_12904 = cljs.core.nth.call(null,vec__12821_12903,(0),null);
var infos_12905 = cljs.core.nth.call(null,vec__12821_12903,(1),null);
encode_cols.call(null,infos_12905,source_idx_12874,line_12883,col_12904);

var G__12906 = cljs.core.next.call(null,seq__12816_12897__$1);
var G__12907 = null;
var G__12908 = (0);
var G__12909 = (0);
seq__12816_12885 = G__12906;
chunk__12817_12886 = G__12907;
count__12818_12887 = G__12908;
i__12819_12888 = G__12909;
continue;
}
} else {
}
}
break;
}

var G__12910 = seq__12811_12878;
var G__12911 = chunk__12812_12879;
var G__12912 = count__12813_12880;
var G__12913 = (i__12814_12881 + (1));
seq__12811_12878 = G__12910;
chunk__12812_12879 = G__12911;
count__12813_12880 = G__12912;
i__12814_12881 = G__12913;
continue;
} else {
var temp__4425__auto___12914 = cljs.core.seq.call(null,seq__12811_12878);
if(temp__4425__auto___12914){
var seq__12811_12915__$1 = temp__4425__auto___12914;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12811_12915__$1)){
var c__7256__auto___12916 = cljs.core.chunk_first.call(null,seq__12811_12915__$1);
var G__12917 = cljs.core.chunk_rest.call(null,seq__12811_12915__$1);
var G__12918 = c__7256__auto___12916;
var G__12919 = cljs.core.count.call(null,c__7256__auto___12916);
var G__12920 = (0);
seq__12811_12878 = G__12917;
chunk__12812_12879 = G__12918;
count__12813_12880 = G__12919;
i__12814_12881 = G__12920;
continue;
} else {
var vec__12822_12921 = cljs.core.first.call(null,seq__12811_12915__$1);
var line_12922 = cljs.core.nth.call(null,vec__12822_12921,(0),null);
var cols_12923 = cljs.core.nth.call(null,vec__12822_12921,(1),null);
var seq__12823_12924 = cljs.core.seq.call(null,cols_12923);
var chunk__12824_12925 = null;
var count__12825_12926 = (0);
var i__12826_12927 = (0);
while(true){
if((i__12826_12927 < count__12825_12926)){
var vec__12827_12928 = cljs.core._nth.call(null,chunk__12824_12925,i__12826_12927);
var col_12929 = cljs.core.nth.call(null,vec__12827_12928,(0),null);
var infos_12930 = cljs.core.nth.call(null,vec__12827_12928,(1),null);
encode_cols.call(null,infos_12930,source_idx_12874,line_12922,col_12929);

var G__12931 = seq__12823_12924;
var G__12932 = chunk__12824_12925;
var G__12933 = count__12825_12926;
var G__12934 = (i__12826_12927 + (1));
seq__12823_12924 = G__12931;
chunk__12824_12925 = G__12932;
count__12825_12926 = G__12933;
i__12826_12927 = G__12934;
continue;
} else {
var temp__4425__auto___12935__$1 = cljs.core.seq.call(null,seq__12823_12924);
if(temp__4425__auto___12935__$1){
var seq__12823_12936__$1 = temp__4425__auto___12935__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12823_12936__$1)){
var c__7256__auto___12937 = cljs.core.chunk_first.call(null,seq__12823_12936__$1);
var G__12938 = cljs.core.chunk_rest.call(null,seq__12823_12936__$1);
var G__12939 = c__7256__auto___12937;
var G__12940 = cljs.core.count.call(null,c__7256__auto___12937);
var G__12941 = (0);
seq__12823_12924 = G__12938;
chunk__12824_12925 = G__12939;
count__12825_12926 = G__12940;
i__12826_12927 = G__12941;
continue;
} else {
var vec__12828_12942 = cljs.core.first.call(null,seq__12823_12936__$1);
var col_12943 = cljs.core.nth.call(null,vec__12828_12942,(0),null);
var infos_12944 = cljs.core.nth.call(null,vec__12828_12942,(1),null);
encode_cols.call(null,infos_12944,source_idx_12874,line_12922,col_12943);

var G__12945 = cljs.core.next.call(null,seq__12823_12936__$1);
var G__12946 = null;
var G__12947 = (0);
var G__12948 = (0);
seq__12823_12924 = G__12945;
chunk__12824_12925 = G__12946;
count__12825_12926 = G__12947;
i__12826_12927 = G__12948;
continue;
}
} else {
}
}
break;
}

var G__12949 = cljs.core.next.call(null,seq__12811_12915__$1);
var G__12950 = null;
var G__12951 = (0);
var G__12952 = (0);
seq__12811_12878 = G__12949;
chunk__12812_12879 = G__12950;
count__12813_12880 = G__12951;
i__12814_12881 = G__12952;
continue;
}
} else {
}
}
break;
}

var G__12953 = seq__12805_12869;
var G__12954 = chunk__12806_12870;
var G__12955 = count__12807_12871;
var G__12956 = (i__12808_12872 + (1));
seq__12805_12869 = G__12953;
chunk__12806_12870 = G__12954;
count__12807_12871 = G__12955;
i__12808_12872 = G__12956;
continue;
} else {
var temp__4425__auto___12957 = cljs.core.seq.call(null,seq__12805_12869);
if(temp__4425__auto___12957){
var seq__12805_12958__$1 = temp__4425__auto___12957;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12805_12958__$1)){
var c__7256__auto___12959 = cljs.core.chunk_first.call(null,seq__12805_12958__$1);
var G__12960 = cljs.core.chunk_rest.call(null,seq__12805_12958__$1);
var G__12961 = c__7256__auto___12959;
var G__12962 = cljs.core.count.call(null,c__7256__auto___12959);
var G__12963 = (0);
seq__12805_12869 = G__12960;
chunk__12806_12870 = G__12961;
count__12807_12871 = G__12962;
i__12808_12872 = G__12963;
continue;
} else {
var vec__12829_12964 = cljs.core.first.call(null,seq__12805_12958__$1);
var source_idx_12965 = cljs.core.nth.call(null,vec__12829_12964,(0),null);
var vec__12830_12966 = cljs.core.nth.call(null,vec__12829_12964,(1),null);
var __12967 = cljs.core.nth.call(null,vec__12830_12966,(0),null);
var lines_12968__$1 = cljs.core.nth.call(null,vec__12830_12966,(1),null);
var seq__12831_12969 = cljs.core.seq.call(null,lines_12968__$1);
var chunk__12832_12970 = null;
var count__12833_12971 = (0);
var i__12834_12972 = (0);
while(true){
if((i__12834_12972 < count__12833_12971)){
var vec__12835_12973 = cljs.core._nth.call(null,chunk__12832_12970,i__12834_12972);
var line_12974 = cljs.core.nth.call(null,vec__12835_12973,(0),null);
var cols_12975 = cljs.core.nth.call(null,vec__12835_12973,(1),null);
var seq__12836_12976 = cljs.core.seq.call(null,cols_12975);
var chunk__12837_12977 = null;
var count__12838_12978 = (0);
var i__12839_12979 = (0);
while(true){
if((i__12839_12979 < count__12838_12978)){
var vec__12840_12980 = cljs.core._nth.call(null,chunk__12837_12977,i__12839_12979);
var col_12981 = cljs.core.nth.call(null,vec__12840_12980,(0),null);
var infos_12982 = cljs.core.nth.call(null,vec__12840_12980,(1),null);
encode_cols.call(null,infos_12982,source_idx_12965,line_12974,col_12981);

var G__12983 = seq__12836_12976;
var G__12984 = chunk__12837_12977;
var G__12985 = count__12838_12978;
var G__12986 = (i__12839_12979 + (1));
seq__12836_12976 = G__12983;
chunk__12837_12977 = G__12984;
count__12838_12978 = G__12985;
i__12839_12979 = G__12986;
continue;
} else {
var temp__4425__auto___12987__$1 = cljs.core.seq.call(null,seq__12836_12976);
if(temp__4425__auto___12987__$1){
var seq__12836_12988__$1 = temp__4425__auto___12987__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12836_12988__$1)){
var c__7256__auto___12989 = cljs.core.chunk_first.call(null,seq__12836_12988__$1);
var G__12990 = cljs.core.chunk_rest.call(null,seq__12836_12988__$1);
var G__12991 = c__7256__auto___12989;
var G__12992 = cljs.core.count.call(null,c__7256__auto___12989);
var G__12993 = (0);
seq__12836_12976 = G__12990;
chunk__12837_12977 = G__12991;
count__12838_12978 = G__12992;
i__12839_12979 = G__12993;
continue;
} else {
var vec__12841_12994 = cljs.core.first.call(null,seq__12836_12988__$1);
var col_12995 = cljs.core.nth.call(null,vec__12841_12994,(0),null);
var infos_12996 = cljs.core.nth.call(null,vec__12841_12994,(1),null);
encode_cols.call(null,infos_12996,source_idx_12965,line_12974,col_12995);

var G__12997 = cljs.core.next.call(null,seq__12836_12988__$1);
var G__12998 = null;
var G__12999 = (0);
var G__13000 = (0);
seq__12836_12976 = G__12997;
chunk__12837_12977 = G__12998;
count__12838_12978 = G__12999;
i__12839_12979 = G__13000;
continue;
}
} else {
}
}
break;
}

var G__13001 = seq__12831_12969;
var G__13002 = chunk__12832_12970;
var G__13003 = count__12833_12971;
var G__13004 = (i__12834_12972 + (1));
seq__12831_12969 = G__13001;
chunk__12832_12970 = G__13002;
count__12833_12971 = G__13003;
i__12834_12972 = G__13004;
continue;
} else {
var temp__4425__auto___13005__$1 = cljs.core.seq.call(null,seq__12831_12969);
if(temp__4425__auto___13005__$1){
var seq__12831_13006__$1 = temp__4425__auto___13005__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12831_13006__$1)){
var c__7256__auto___13007 = cljs.core.chunk_first.call(null,seq__12831_13006__$1);
var G__13008 = cljs.core.chunk_rest.call(null,seq__12831_13006__$1);
var G__13009 = c__7256__auto___13007;
var G__13010 = cljs.core.count.call(null,c__7256__auto___13007);
var G__13011 = (0);
seq__12831_12969 = G__13008;
chunk__12832_12970 = G__13009;
count__12833_12971 = G__13010;
i__12834_12972 = G__13011;
continue;
} else {
var vec__12842_13012 = cljs.core.first.call(null,seq__12831_13006__$1);
var line_13013 = cljs.core.nth.call(null,vec__12842_13012,(0),null);
var cols_13014 = cljs.core.nth.call(null,vec__12842_13012,(1),null);
var seq__12843_13015 = cljs.core.seq.call(null,cols_13014);
var chunk__12844_13016 = null;
var count__12845_13017 = (0);
var i__12846_13018 = (0);
while(true){
if((i__12846_13018 < count__12845_13017)){
var vec__12847_13019 = cljs.core._nth.call(null,chunk__12844_13016,i__12846_13018);
var col_13020 = cljs.core.nth.call(null,vec__12847_13019,(0),null);
var infos_13021 = cljs.core.nth.call(null,vec__12847_13019,(1),null);
encode_cols.call(null,infos_13021,source_idx_12965,line_13013,col_13020);

var G__13022 = seq__12843_13015;
var G__13023 = chunk__12844_13016;
var G__13024 = count__12845_13017;
var G__13025 = (i__12846_13018 + (1));
seq__12843_13015 = G__13022;
chunk__12844_13016 = G__13023;
count__12845_13017 = G__13024;
i__12846_13018 = G__13025;
continue;
} else {
var temp__4425__auto___13026__$2 = cljs.core.seq.call(null,seq__12843_13015);
if(temp__4425__auto___13026__$2){
var seq__12843_13027__$1 = temp__4425__auto___13026__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__12843_13027__$1)){
var c__7256__auto___13028 = cljs.core.chunk_first.call(null,seq__12843_13027__$1);
var G__13029 = cljs.core.chunk_rest.call(null,seq__12843_13027__$1);
var G__13030 = c__7256__auto___13028;
var G__13031 = cljs.core.count.call(null,c__7256__auto___13028);
var G__13032 = (0);
seq__12843_13015 = G__13029;
chunk__12844_13016 = G__13030;
count__12845_13017 = G__13031;
i__12846_13018 = G__13032;
continue;
} else {
var vec__12848_13033 = cljs.core.first.call(null,seq__12843_13027__$1);
var col_13034 = cljs.core.nth.call(null,vec__12848_13033,(0),null);
var infos_13035 = cljs.core.nth.call(null,vec__12848_13033,(1),null);
encode_cols.call(null,infos_13035,source_idx_12965,line_13013,col_13034);

var G__13036 = cljs.core.next.call(null,seq__12843_13027__$1);
var G__13037 = null;
var G__13038 = (0);
var G__13039 = (0);
seq__12843_13015 = G__13036;
chunk__12844_13016 = G__13037;
count__12845_13017 = G__13038;
i__12846_13018 = G__13039;
continue;
}
} else {
}
}
break;
}

var G__13040 = cljs.core.next.call(null,seq__12831_13006__$1);
var G__13041 = null;
var G__13042 = (0);
var G__13043 = (0);
seq__12831_12969 = G__13040;
chunk__12832_12970 = G__13041;
count__12833_12971 = G__13042;
i__12834_12972 = G__13043;
continue;
}
} else {
}
}
break;
}

var G__13044 = cljs.core.next.call(null,seq__12805_12958__$1);
var G__13045 = null;
var G__13046 = (0);
var G__13047 = (0);
seq__12805_12869 = G__13044;
chunk__12806_12870 = G__13045;
count__12807_12871 = G__13046;
i__12808_12872 = G__13047;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__12849 = {"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys.call(null,m);
var f = cljs.core.comp.call(null,((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__12748_SHARP_){
return [cljs.core.str(p1__12748_SHARP_),cljs.core.str("?rel="),cljs.core.str((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__12749_SHARP_){
return cljs.core.last.call(null,clojure.string.split.call(null,p1__12749_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.call(null,cljs.core.map.call(null,f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.call(null,";",cljs.core.map.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__12750_SHARP_){
return clojure.string.join.call(null,",",p1__12750_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs.call(null,cljs.core.concat.call(null,preamble_lines,cljs.core.deref.call(null,lines))))), "names": cljs.core.into_array.call(null,cljs.core.map.call(null,clojure.set.map_invert.call(null,cljs.core.deref.call(null,names__GT_idx)),cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,names__GT_idx)))))};
var G__12849__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))?(function (){var G__12850 = G__12849;
goog.object.set(G__12850,"sourcesContent",cljs.core.into_array.call(null,new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts)));

return G__12850;
})():G__12849);
return G__12849__$1;
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq.call(null,cljs_map);
var new_lines = cljs.core.sorted_map.call(null);
while(true){
if(line_map_seq){
var vec__13053 = cljs.core.first.call(null,line_map_seq);
var line = cljs.core.nth.call(null,vec__13053,(0),null);
var col_map = cljs.core.nth.call(null,vec__13053,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq.call(null,col_map);
var new_cols = cljs.core.sorted_map.call(null);
while(true){
if(col_map_seq){
var vec__13054 = cljs.core.first.call(null,col_map_seq);
var col = cljs.core.nth.call(null,vec__13054,(0),null);
var infos = cljs.core.nth.call(null,vec__13054,(1),null);
var G__13058 = cljs.core.next.call(null,col_map_seq);
var G__13059 = cljs.core.assoc.call(null,new_cols,col,cljs.core.reduce.call(null,((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__13054,col,infos,vec__13053,line,col_map){
return (function (v,p__13055){
var map__13056 = p__13055;
var map__13056__$1 = ((((!((map__13056 == null)))?((((map__13056.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13056.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13056):map__13056);
var gline = cljs.core.get.call(null,map__13056__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.call(null,map__13056__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.call(null,v,cljs.core.get_in.call(null,js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__13054,col,infos,vec__13053,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__13058;
new_cols = G__13059;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__13060 = cljs.core.next.call(null,line_map_seq);
var G__13061 = cljs.core.assoc.call(null,new_lines,line,new_cols);
line_map_seq = G__13060;
new_lines = G__13061;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
var seq__13112_13162 = cljs.core.seq.call(null,reverse_map);
var chunk__13113_13163 = null;
var count__13114_13164 = (0);
var i__13115_13165 = (0);
while(true){
if((i__13115_13165 < count__13114_13164)){
var vec__13116_13166 = cljs.core._nth.call(null,chunk__13113_13163,i__13115_13165);
var line_13167 = cljs.core.nth.call(null,vec__13116_13166,(0),null);
var columns_13168 = cljs.core.nth.call(null,vec__13116_13166,(1),null);
var seq__13117_13169 = cljs.core.seq.call(null,columns_13168);
var chunk__13118_13170 = null;
var count__13119_13171 = (0);
var i__13120_13172 = (0);
while(true){
if((i__13120_13172 < count__13119_13171)){
var vec__13121_13173 = cljs.core._nth.call(null,chunk__13118_13170,i__13120_13172);
var column_13174 = cljs.core.nth.call(null,vec__13121_13173,(0),null);
var column_info_13175 = cljs.core.nth.call(null,vec__13121_13173,(1),null);
var seq__13122_13176 = cljs.core.seq.call(null,column_info_13175);
var chunk__13123_13177 = null;
var count__13124_13178 = (0);
var i__13125_13179 = (0);
while(true){
if((i__13125_13179 < count__13124_13178)){
var map__13126_13180 = cljs.core._nth.call(null,chunk__13123_13177,i__13125_13179);
var map__13126_13181__$1 = ((((!((map__13126_13180 == null)))?((((map__13126_13180.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13126_13180.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13126_13180):map__13126_13180);
var gline_13182 = cljs.core.get.call(null,map__13126_13181__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13183 = cljs.core.get.call(null,map__13126_13181__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13184 = cljs.core.get.call(null,map__13126_13181__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13182], null),cljs.core.fnil.call(null,((function (seq__13122_13176,chunk__13123_13177,count__13124_13178,i__13125_13179,seq__13117_13169,chunk__13118_13170,count__13119_13171,i__13120_13172,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13126_13180,map__13126_13181__$1,gline_13182,gcol_13183,name_13184,vec__13121_13173,column_13174,column_info_13175,vec__13116_13166,line_13167,columns_13168,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_13174], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13167,new cljs.core.Keyword(null,"col","col",-1959363084),column_13174,new cljs.core.Keyword(null,"name","name",1843675177),name_13184], null));
});})(seq__13122_13176,chunk__13123_13177,count__13124_13178,i__13125_13179,seq__13117_13169,chunk__13118_13170,count__13119_13171,i__13120_13172,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13126_13180,map__13126_13181__$1,gline_13182,gcol_13183,name_13184,vec__13121_13173,column_13174,column_info_13175,vec__13116_13166,line_13167,columns_13168,inverted))
,cljs.core.sorted_map.call(null)));

var G__13185 = seq__13122_13176;
var G__13186 = chunk__13123_13177;
var G__13187 = count__13124_13178;
var G__13188 = (i__13125_13179 + (1));
seq__13122_13176 = G__13185;
chunk__13123_13177 = G__13186;
count__13124_13178 = G__13187;
i__13125_13179 = G__13188;
continue;
} else {
var temp__4425__auto___13189 = cljs.core.seq.call(null,seq__13122_13176);
if(temp__4425__auto___13189){
var seq__13122_13190__$1 = temp__4425__auto___13189;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13122_13190__$1)){
var c__7256__auto___13191 = cljs.core.chunk_first.call(null,seq__13122_13190__$1);
var G__13192 = cljs.core.chunk_rest.call(null,seq__13122_13190__$1);
var G__13193 = c__7256__auto___13191;
var G__13194 = cljs.core.count.call(null,c__7256__auto___13191);
var G__13195 = (0);
seq__13122_13176 = G__13192;
chunk__13123_13177 = G__13193;
count__13124_13178 = G__13194;
i__13125_13179 = G__13195;
continue;
} else {
var map__13128_13196 = cljs.core.first.call(null,seq__13122_13190__$1);
var map__13128_13197__$1 = ((((!((map__13128_13196 == null)))?((((map__13128_13196.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13128_13196.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13128_13196):map__13128_13196);
var gline_13198 = cljs.core.get.call(null,map__13128_13197__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13199 = cljs.core.get.call(null,map__13128_13197__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13200 = cljs.core.get.call(null,map__13128_13197__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13198], null),cljs.core.fnil.call(null,((function (seq__13122_13176,chunk__13123_13177,count__13124_13178,i__13125_13179,seq__13117_13169,chunk__13118_13170,count__13119_13171,i__13120_13172,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13128_13196,map__13128_13197__$1,gline_13198,gcol_13199,name_13200,seq__13122_13190__$1,temp__4425__auto___13189,vec__13121_13173,column_13174,column_info_13175,vec__13116_13166,line_13167,columns_13168,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_13174], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13167,new cljs.core.Keyword(null,"col","col",-1959363084),column_13174,new cljs.core.Keyword(null,"name","name",1843675177),name_13200], null));
});})(seq__13122_13176,chunk__13123_13177,count__13124_13178,i__13125_13179,seq__13117_13169,chunk__13118_13170,count__13119_13171,i__13120_13172,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13128_13196,map__13128_13197__$1,gline_13198,gcol_13199,name_13200,seq__13122_13190__$1,temp__4425__auto___13189,vec__13121_13173,column_13174,column_info_13175,vec__13116_13166,line_13167,columns_13168,inverted))
,cljs.core.sorted_map.call(null)));

var G__13201 = cljs.core.next.call(null,seq__13122_13190__$1);
var G__13202 = null;
var G__13203 = (0);
var G__13204 = (0);
seq__13122_13176 = G__13201;
chunk__13123_13177 = G__13202;
count__13124_13178 = G__13203;
i__13125_13179 = G__13204;
continue;
}
} else {
}
}
break;
}

var G__13205 = seq__13117_13169;
var G__13206 = chunk__13118_13170;
var G__13207 = count__13119_13171;
var G__13208 = (i__13120_13172 + (1));
seq__13117_13169 = G__13205;
chunk__13118_13170 = G__13206;
count__13119_13171 = G__13207;
i__13120_13172 = G__13208;
continue;
} else {
var temp__4425__auto___13209 = cljs.core.seq.call(null,seq__13117_13169);
if(temp__4425__auto___13209){
var seq__13117_13210__$1 = temp__4425__auto___13209;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13117_13210__$1)){
var c__7256__auto___13211 = cljs.core.chunk_first.call(null,seq__13117_13210__$1);
var G__13212 = cljs.core.chunk_rest.call(null,seq__13117_13210__$1);
var G__13213 = c__7256__auto___13211;
var G__13214 = cljs.core.count.call(null,c__7256__auto___13211);
var G__13215 = (0);
seq__13117_13169 = G__13212;
chunk__13118_13170 = G__13213;
count__13119_13171 = G__13214;
i__13120_13172 = G__13215;
continue;
} else {
var vec__13130_13216 = cljs.core.first.call(null,seq__13117_13210__$1);
var column_13217 = cljs.core.nth.call(null,vec__13130_13216,(0),null);
var column_info_13218 = cljs.core.nth.call(null,vec__13130_13216,(1),null);
var seq__13131_13219 = cljs.core.seq.call(null,column_info_13218);
var chunk__13132_13220 = null;
var count__13133_13221 = (0);
var i__13134_13222 = (0);
while(true){
if((i__13134_13222 < count__13133_13221)){
var map__13135_13223 = cljs.core._nth.call(null,chunk__13132_13220,i__13134_13222);
var map__13135_13224__$1 = ((((!((map__13135_13223 == null)))?((((map__13135_13223.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13135_13223.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13135_13223):map__13135_13223);
var gline_13225 = cljs.core.get.call(null,map__13135_13224__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13226 = cljs.core.get.call(null,map__13135_13224__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13227 = cljs.core.get.call(null,map__13135_13224__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13225], null),cljs.core.fnil.call(null,((function (seq__13131_13219,chunk__13132_13220,count__13133_13221,i__13134_13222,seq__13117_13169,chunk__13118_13170,count__13119_13171,i__13120_13172,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13135_13223,map__13135_13224__$1,gline_13225,gcol_13226,name_13227,vec__13130_13216,column_13217,column_info_13218,seq__13117_13210__$1,temp__4425__auto___13209,vec__13116_13166,line_13167,columns_13168,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_13217], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13167,new cljs.core.Keyword(null,"col","col",-1959363084),column_13217,new cljs.core.Keyword(null,"name","name",1843675177),name_13227], null));
});})(seq__13131_13219,chunk__13132_13220,count__13133_13221,i__13134_13222,seq__13117_13169,chunk__13118_13170,count__13119_13171,i__13120_13172,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13135_13223,map__13135_13224__$1,gline_13225,gcol_13226,name_13227,vec__13130_13216,column_13217,column_info_13218,seq__13117_13210__$1,temp__4425__auto___13209,vec__13116_13166,line_13167,columns_13168,inverted))
,cljs.core.sorted_map.call(null)));

var G__13228 = seq__13131_13219;
var G__13229 = chunk__13132_13220;
var G__13230 = count__13133_13221;
var G__13231 = (i__13134_13222 + (1));
seq__13131_13219 = G__13228;
chunk__13132_13220 = G__13229;
count__13133_13221 = G__13230;
i__13134_13222 = G__13231;
continue;
} else {
var temp__4425__auto___13232__$1 = cljs.core.seq.call(null,seq__13131_13219);
if(temp__4425__auto___13232__$1){
var seq__13131_13233__$1 = temp__4425__auto___13232__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13131_13233__$1)){
var c__7256__auto___13234 = cljs.core.chunk_first.call(null,seq__13131_13233__$1);
var G__13235 = cljs.core.chunk_rest.call(null,seq__13131_13233__$1);
var G__13236 = c__7256__auto___13234;
var G__13237 = cljs.core.count.call(null,c__7256__auto___13234);
var G__13238 = (0);
seq__13131_13219 = G__13235;
chunk__13132_13220 = G__13236;
count__13133_13221 = G__13237;
i__13134_13222 = G__13238;
continue;
} else {
var map__13137_13239 = cljs.core.first.call(null,seq__13131_13233__$1);
var map__13137_13240__$1 = ((((!((map__13137_13239 == null)))?((((map__13137_13239.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13137_13239.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13137_13239):map__13137_13239);
var gline_13241 = cljs.core.get.call(null,map__13137_13240__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13242 = cljs.core.get.call(null,map__13137_13240__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13243 = cljs.core.get.call(null,map__13137_13240__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13241], null),cljs.core.fnil.call(null,((function (seq__13131_13219,chunk__13132_13220,count__13133_13221,i__13134_13222,seq__13117_13169,chunk__13118_13170,count__13119_13171,i__13120_13172,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13137_13239,map__13137_13240__$1,gline_13241,gcol_13242,name_13243,seq__13131_13233__$1,temp__4425__auto___13232__$1,vec__13130_13216,column_13217,column_info_13218,seq__13117_13210__$1,temp__4425__auto___13209,vec__13116_13166,line_13167,columns_13168,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_13217], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13167,new cljs.core.Keyword(null,"col","col",-1959363084),column_13217,new cljs.core.Keyword(null,"name","name",1843675177),name_13243], null));
});})(seq__13131_13219,chunk__13132_13220,count__13133_13221,i__13134_13222,seq__13117_13169,chunk__13118_13170,count__13119_13171,i__13120_13172,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13137_13239,map__13137_13240__$1,gline_13241,gcol_13242,name_13243,seq__13131_13233__$1,temp__4425__auto___13232__$1,vec__13130_13216,column_13217,column_info_13218,seq__13117_13210__$1,temp__4425__auto___13209,vec__13116_13166,line_13167,columns_13168,inverted))
,cljs.core.sorted_map.call(null)));

var G__13244 = cljs.core.next.call(null,seq__13131_13233__$1);
var G__13245 = null;
var G__13246 = (0);
var G__13247 = (0);
seq__13131_13219 = G__13244;
chunk__13132_13220 = G__13245;
count__13133_13221 = G__13246;
i__13134_13222 = G__13247;
continue;
}
} else {
}
}
break;
}

var G__13248 = cljs.core.next.call(null,seq__13117_13210__$1);
var G__13249 = null;
var G__13250 = (0);
var G__13251 = (0);
seq__13117_13169 = G__13248;
chunk__13118_13170 = G__13249;
count__13119_13171 = G__13250;
i__13120_13172 = G__13251;
continue;
}
} else {
}
}
break;
}

var G__13252 = seq__13112_13162;
var G__13253 = chunk__13113_13163;
var G__13254 = count__13114_13164;
var G__13255 = (i__13115_13165 + (1));
seq__13112_13162 = G__13252;
chunk__13113_13163 = G__13253;
count__13114_13164 = G__13254;
i__13115_13165 = G__13255;
continue;
} else {
var temp__4425__auto___13256 = cljs.core.seq.call(null,seq__13112_13162);
if(temp__4425__auto___13256){
var seq__13112_13257__$1 = temp__4425__auto___13256;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13112_13257__$1)){
var c__7256__auto___13258 = cljs.core.chunk_first.call(null,seq__13112_13257__$1);
var G__13259 = cljs.core.chunk_rest.call(null,seq__13112_13257__$1);
var G__13260 = c__7256__auto___13258;
var G__13261 = cljs.core.count.call(null,c__7256__auto___13258);
var G__13262 = (0);
seq__13112_13162 = G__13259;
chunk__13113_13163 = G__13260;
count__13114_13164 = G__13261;
i__13115_13165 = G__13262;
continue;
} else {
var vec__13139_13263 = cljs.core.first.call(null,seq__13112_13257__$1);
var line_13264 = cljs.core.nth.call(null,vec__13139_13263,(0),null);
var columns_13265 = cljs.core.nth.call(null,vec__13139_13263,(1),null);
var seq__13140_13266 = cljs.core.seq.call(null,columns_13265);
var chunk__13141_13267 = null;
var count__13142_13268 = (0);
var i__13143_13269 = (0);
while(true){
if((i__13143_13269 < count__13142_13268)){
var vec__13144_13270 = cljs.core._nth.call(null,chunk__13141_13267,i__13143_13269);
var column_13271 = cljs.core.nth.call(null,vec__13144_13270,(0),null);
var column_info_13272 = cljs.core.nth.call(null,vec__13144_13270,(1),null);
var seq__13145_13273 = cljs.core.seq.call(null,column_info_13272);
var chunk__13146_13274 = null;
var count__13147_13275 = (0);
var i__13148_13276 = (0);
while(true){
if((i__13148_13276 < count__13147_13275)){
var map__13149_13277 = cljs.core._nth.call(null,chunk__13146_13274,i__13148_13276);
var map__13149_13278__$1 = ((((!((map__13149_13277 == null)))?((((map__13149_13277.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13149_13277.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13149_13277):map__13149_13277);
var gline_13279 = cljs.core.get.call(null,map__13149_13278__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13280 = cljs.core.get.call(null,map__13149_13278__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13281 = cljs.core.get.call(null,map__13149_13278__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13279], null),cljs.core.fnil.call(null,((function (seq__13145_13273,chunk__13146_13274,count__13147_13275,i__13148_13276,seq__13140_13266,chunk__13141_13267,count__13142_13268,i__13143_13269,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13149_13277,map__13149_13278__$1,gline_13279,gcol_13280,name_13281,vec__13144_13270,column_13271,column_info_13272,vec__13139_13263,line_13264,columns_13265,seq__13112_13257__$1,temp__4425__auto___13256,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_13271], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13264,new cljs.core.Keyword(null,"col","col",-1959363084),column_13271,new cljs.core.Keyword(null,"name","name",1843675177),name_13281], null));
});})(seq__13145_13273,chunk__13146_13274,count__13147_13275,i__13148_13276,seq__13140_13266,chunk__13141_13267,count__13142_13268,i__13143_13269,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13149_13277,map__13149_13278__$1,gline_13279,gcol_13280,name_13281,vec__13144_13270,column_13271,column_info_13272,vec__13139_13263,line_13264,columns_13265,seq__13112_13257__$1,temp__4425__auto___13256,inverted))
,cljs.core.sorted_map.call(null)));

var G__13282 = seq__13145_13273;
var G__13283 = chunk__13146_13274;
var G__13284 = count__13147_13275;
var G__13285 = (i__13148_13276 + (1));
seq__13145_13273 = G__13282;
chunk__13146_13274 = G__13283;
count__13147_13275 = G__13284;
i__13148_13276 = G__13285;
continue;
} else {
var temp__4425__auto___13286__$1 = cljs.core.seq.call(null,seq__13145_13273);
if(temp__4425__auto___13286__$1){
var seq__13145_13287__$1 = temp__4425__auto___13286__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13145_13287__$1)){
var c__7256__auto___13288 = cljs.core.chunk_first.call(null,seq__13145_13287__$1);
var G__13289 = cljs.core.chunk_rest.call(null,seq__13145_13287__$1);
var G__13290 = c__7256__auto___13288;
var G__13291 = cljs.core.count.call(null,c__7256__auto___13288);
var G__13292 = (0);
seq__13145_13273 = G__13289;
chunk__13146_13274 = G__13290;
count__13147_13275 = G__13291;
i__13148_13276 = G__13292;
continue;
} else {
var map__13151_13293 = cljs.core.first.call(null,seq__13145_13287__$1);
var map__13151_13294__$1 = ((((!((map__13151_13293 == null)))?((((map__13151_13293.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13151_13293.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13151_13293):map__13151_13293);
var gline_13295 = cljs.core.get.call(null,map__13151_13294__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13296 = cljs.core.get.call(null,map__13151_13294__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13297 = cljs.core.get.call(null,map__13151_13294__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13295], null),cljs.core.fnil.call(null,((function (seq__13145_13273,chunk__13146_13274,count__13147_13275,i__13148_13276,seq__13140_13266,chunk__13141_13267,count__13142_13268,i__13143_13269,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13151_13293,map__13151_13294__$1,gline_13295,gcol_13296,name_13297,seq__13145_13287__$1,temp__4425__auto___13286__$1,vec__13144_13270,column_13271,column_info_13272,vec__13139_13263,line_13264,columns_13265,seq__13112_13257__$1,temp__4425__auto___13256,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_13271], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13264,new cljs.core.Keyword(null,"col","col",-1959363084),column_13271,new cljs.core.Keyword(null,"name","name",1843675177),name_13297], null));
});})(seq__13145_13273,chunk__13146_13274,count__13147_13275,i__13148_13276,seq__13140_13266,chunk__13141_13267,count__13142_13268,i__13143_13269,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13151_13293,map__13151_13294__$1,gline_13295,gcol_13296,name_13297,seq__13145_13287__$1,temp__4425__auto___13286__$1,vec__13144_13270,column_13271,column_info_13272,vec__13139_13263,line_13264,columns_13265,seq__13112_13257__$1,temp__4425__auto___13256,inverted))
,cljs.core.sorted_map.call(null)));

var G__13298 = cljs.core.next.call(null,seq__13145_13287__$1);
var G__13299 = null;
var G__13300 = (0);
var G__13301 = (0);
seq__13145_13273 = G__13298;
chunk__13146_13274 = G__13299;
count__13147_13275 = G__13300;
i__13148_13276 = G__13301;
continue;
}
} else {
}
}
break;
}

var G__13302 = seq__13140_13266;
var G__13303 = chunk__13141_13267;
var G__13304 = count__13142_13268;
var G__13305 = (i__13143_13269 + (1));
seq__13140_13266 = G__13302;
chunk__13141_13267 = G__13303;
count__13142_13268 = G__13304;
i__13143_13269 = G__13305;
continue;
} else {
var temp__4425__auto___13306__$1 = cljs.core.seq.call(null,seq__13140_13266);
if(temp__4425__auto___13306__$1){
var seq__13140_13307__$1 = temp__4425__auto___13306__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13140_13307__$1)){
var c__7256__auto___13308 = cljs.core.chunk_first.call(null,seq__13140_13307__$1);
var G__13309 = cljs.core.chunk_rest.call(null,seq__13140_13307__$1);
var G__13310 = c__7256__auto___13308;
var G__13311 = cljs.core.count.call(null,c__7256__auto___13308);
var G__13312 = (0);
seq__13140_13266 = G__13309;
chunk__13141_13267 = G__13310;
count__13142_13268 = G__13311;
i__13143_13269 = G__13312;
continue;
} else {
var vec__13153_13313 = cljs.core.first.call(null,seq__13140_13307__$1);
var column_13314 = cljs.core.nth.call(null,vec__13153_13313,(0),null);
var column_info_13315 = cljs.core.nth.call(null,vec__13153_13313,(1),null);
var seq__13154_13316 = cljs.core.seq.call(null,column_info_13315);
var chunk__13155_13317 = null;
var count__13156_13318 = (0);
var i__13157_13319 = (0);
while(true){
if((i__13157_13319 < count__13156_13318)){
var map__13158_13320 = cljs.core._nth.call(null,chunk__13155_13317,i__13157_13319);
var map__13158_13321__$1 = ((((!((map__13158_13320 == null)))?((((map__13158_13320.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13158_13320.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13158_13320):map__13158_13320);
var gline_13322 = cljs.core.get.call(null,map__13158_13321__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13323 = cljs.core.get.call(null,map__13158_13321__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13324 = cljs.core.get.call(null,map__13158_13321__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13322], null),cljs.core.fnil.call(null,((function (seq__13154_13316,chunk__13155_13317,count__13156_13318,i__13157_13319,seq__13140_13266,chunk__13141_13267,count__13142_13268,i__13143_13269,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13158_13320,map__13158_13321__$1,gline_13322,gcol_13323,name_13324,vec__13153_13313,column_13314,column_info_13315,seq__13140_13307__$1,temp__4425__auto___13306__$1,vec__13139_13263,line_13264,columns_13265,seq__13112_13257__$1,temp__4425__auto___13256,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_13314], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13264,new cljs.core.Keyword(null,"col","col",-1959363084),column_13314,new cljs.core.Keyword(null,"name","name",1843675177),name_13324], null));
});})(seq__13154_13316,chunk__13155_13317,count__13156_13318,i__13157_13319,seq__13140_13266,chunk__13141_13267,count__13142_13268,i__13143_13269,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13158_13320,map__13158_13321__$1,gline_13322,gcol_13323,name_13324,vec__13153_13313,column_13314,column_info_13315,seq__13140_13307__$1,temp__4425__auto___13306__$1,vec__13139_13263,line_13264,columns_13265,seq__13112_13257__$1,temp__4425__auto___13256,inverted))
,cljs.core.sorted_map.call(null)));

var G__13325 = seq__13154_13316;
var G__13326 = chunk__13155_13317;
var G__13327 = count__13156_13318;
var G__13328 = (i__13157_13319 + (1));
seq__13154_13316 = G__13325;
chunk__13155_13317 = G__13326;
count__13156_13318 = G__13327;
i__13157_13319 = G__13328;
continue;
} else {
var temp__4425__auto___13329__$2 = cljs.core.seq.call(null,seq__13154_13316);
if(temp__4425__auto___13329__$2){
var seq__13154_13330__$1 = temp__4425__auto___13329__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13154_13330__$1)){
var c__7256__auto___13331 = cljs.core.chunk_first.call(null,seq__13154_13330__$1);
var G__13332 = cljs.core.chunk_rest.call(null,seq__13154_13330__$1);
var G__13333 = c__7256__auto___13331;
var G__13334 = cljs.core.count.call(null,c__7256__auto___13331);
var G__13335 = (0);
seq__13154_13316 = G__13332;
chunk__13155_13317 = G__13333;
count__13156_13318 = G__13334;
i__13157_13319 = G__13335;
continue;
} else {
var map__13160_13336 = cljs.core.first.call(null,seq__13154_13330__$1);
var map__13160_13337__$1 = ((((!((map__13160_13336 == null)))?((((map__13160_13336.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13160_13336.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13160_13336):map__13160_13336);
var gline_13338 = cljs.core.get.call(null,map__13160_13337__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13339 = cljs.core.get.call(null,map__13160_13337__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13340 = cljs.core.get.call(null,map__13160_13337__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13338], null),cljs.core.fnil.call(null,((function (seq__13154_13316,chunk__13155_13317,count__13156_13318,i__13157_13319,seq__13140_13266,chunk__13141_13267,count__13142_13268,i__13143_13269,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13160_13336,map__13160_13337__$1,gline_13338,gcol_13339,name_13340,seq__13154_13330__$1,temp__4425__auto___13329__$2,vec__13153_13313,column_13314,column_info_13315,seq__13140_13307__$1,temp__4425__auto___13306__$1,vec__13139_13263,line_13264,columns_13265,seq__13112_13257__$1,temp__4425__auto___13256,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_13314], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13264,new cljs.core.Keyword(null,"col","col",-1959363084),column_13314,new cljs.core.Keyword(null,"name","name",1843675177),name_13340], null));
});})(seq__13154_13316,chunk__13155_13317,count__13156_13318,i__13157_13319,seq__13140_13266,chunk__13141_13267,count__13142_13268,i__13143_13269,seq__13112_13162,chunk__13113_13163,count__13114_13164,i__13115_13165,map__13160_13336,map__13160_13337__$1,gline_13338,gcol_13339,name_13340,seq__13154_13330__$1,temp__4425__auto___13329__$2,vec__13153_13313,column_13314,column_info_13315,seq__13140_13307__$1,temp__4425__auto___13306__$1,vec__13139_13263,line_13264,columns_13265,seq__13112_13257__$1,temp__4425__auto___13256,inverted))
,cljs.core.sorted_map.call(null)));

var G__13341 = cljs.core.next.call(null,seq__13154_13330__$1);
var G__13342 = null;
var G__13343 = (0);
var G__13344 = (0);
seq__13154_13316 = G__13341;
chunk__13155_13317 = G__13342;
count__13156_13318 = G__13343;
i__13157_13319 = G__13344;
continue;
}
} else {
}
}
break;
}

var G__13345 = cljs.core.next.call(null,seq__13140_13307__$1);
var G__13346 = null;
var G__13347 = (0);
var G__13348 = (0);
seq__13140_13266 = G__13345;
chunk__13141_13267 = G__13346;
count__13142_13268 = G__13347;
i__13143_13269 = G__13348;
continue;
}
} else {
}
}
break;
}

var G__13349 = cljs.core.next.call(null,seq__13112_13257__$1);
var G__13350 = null;
var G__13351 = (0);
var G__13352 = (0);
seq__13112_13162 = G__13349;
chunk__13113_13163 = G__13350;
count__13114_13164 = G__13351;
i__13115_13165 = G__13352;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref.call(null,inverted);
});
