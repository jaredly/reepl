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
return cljs.core.reduce.call(null,(function (m,p__8780){
var vec__8781 = p__8780;
var i = cljs.core.nth.call(null,vec__8781,(0),null);
var v = cljs.core.nth.call(null,vec__8781,(1),null);
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
var vec__8783 = seg;
var gcol = cljs.core.nth.call(null,vec__8783,(0),null);
var source = cljs.core.nth.call(null,vec__8783,(1),null);
var line = cljs.core.nth.call(null,vec__8783,(2),null);
var col = cljs.core.nth.call(null,vec__8783,(3),null);
var name = cljs.core.nth.call(null,vec__8783,(4),null);
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
var vec__8786 = seg;
var gcol = cljs.core.nth.call(null,vec__8786,(0),null);
var source = cljs.core.nth.call(null,vec__8786,(1),null);
var line = cljs.core.nth.call(null,vec__8786,(2),null);
var col = cljs.core.nth.call(null,vec__8786,(3),null);
var name = cljs.core.nth.call(null,vec__8786,(4),null);
var vec__8787 = relseg;
var rgcol = cljs.core.nth.call(null,vec__8787,(0),null);
var rsource = cljs.core.nth.call(null,vec__8787,(1),null);
var rline = cljs.core.nth.call(null,vec__8787,(2),null);
var rcol = cljs.core.nth.call(null,vec__8787,(3),null);
var rname = cljs.core.nth.call(null,vec__8787,(4),null);
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
var map__8790 = segmap;
var map__8790__$1 = ((((!((map__8790 == null)))?((((map__8790.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8790.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8790):map__8790);
var gcol = cljs.core.get.call(null,map__8790__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__8790__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__8790__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__8790__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__8790__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.call(null,((function (map__8790,map__8790__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.call(null,((function (map__8790,map__8790__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.call(null,m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.call(null,((function (map__8790,map__8790__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.call(null,v,d__$1);
});})(map__8790,map__8790__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__8790,map__8790__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});})(map__8790,map__8790__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var args8792 = [];
var len__7511__auto___8796 = arguments.length;
var i__7512__auto___8797 = (0);
while(true){
if((i__7512__auto___8797 < len__7511__auto___8796)){
args8792.push((arguments[i__7512__auto___8797]));

var G__8798 = (i__7512__auto___8797 + (1));
i__7512__auto___8797 = G__8798;
continue;
} else {
}
break;
}

var G__8794 = args8792.length;
switch (G__8794) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8792.length)].join('')));

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
var vec__8795 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__8800 = cljs.core.next.call(null,segs__$1);
var G__8801 = nrelseg;
var G__8802 = cljs.source_map.update_reverse_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__8800;
relseg__$1 = G__8801;
result__$1 = G__8802;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__8795,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__8795,(1),null);
var G__8803 = (gline + (1));
var G__8804 = cljs.core.next.call(null,lines__$1);
var G__8805 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__8806 = result__$1;
gline = G__8803;
lines__$1 = G__8804;
relseg = G__8805;
result = G__8806;
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
var map__8810 = segmap;
var map__8810__$1 = ((((!((map__8810 == null)))?((((map__8810.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8810.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8810):map__8810);
var gcol = cljs.core.get.call(null,map__8810__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__8810__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__8810__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__8810__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__8810__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.call(null,((function (map__8810,map__8810__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.call(null,((function (map__8810,map__8810__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__8807_SHARP_){
return cljs.core.conj.call(null,p1__8807_SHARP_,d__$1);
});})(map__8810,map__8810__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__8810,map__8810__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var args8812 = [];
var len__7511__auto___8816 = arguments.length;
var i__7512__auto___8817 = (0);
while(true){
if((i__7512__auto___8817 < len__7511__auto___8816)){
args8812.push((arguments[i__7512__auto___8817]));

var G__8818 = (i__7512__auto___8817 + (1));
i__7512__auto___8817 = G__8818;
continue;
} else {
}
break;
}

var G__8814 = args8812.length;
switch (G__8814) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8812.length)].join('')));

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
var vec__8815 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__8820 = cljs.core.next.call(null,segs__$1);
var G__8821 = nrelseg;
var G__8822 = cljs.source_map.update_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__8820;
relseg__$1 = G__8821;
result__$1 = G__8822;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__8815,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__8815,(1),null);
var G__8823 = (gline + (1));
var G__8824 = cljs.core.next.call(null,lines__$1);
var G__8825 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__8826 = result__$1;
gline = G__8823;
lines__$1 = G__8824;
relseg = G__8825;
result = G__8826;
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
return (function (p__8833){
var vec__8834 = p__8833;
var _ = cljs.core.nth.call(null,vec__8834,(0),null);
var source = cljs.core.nth.call(null,vec__8834,(1),null);
var line = cljs.core.nth.call(null,vec__8834,(2),null);
var col = cljs.core.nth.call(null,vec__8834,(3),null);
var name = cljs.core.nth.call(null,vec__8834,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.call(null,segs,cljs.core.reduce.call(null,((function (relseg){
return (function (cols__$1,p__8835){
var vec__8836 = p__8835;
var gcol = cljs.core.nth.call(null,vec__8836,(0),null);
var sidx = cljs.core.nth.call(null,vec__8836,(1),null);
var line = cljs.core.nth.call(null,vec__8836,(2),null);
var col = cljs.core.nth.call(null,vec__8836,(3),null);
var name = cljs.core.nth.call(null,vec__8836,(4),null);
var seg = vec__8836;
var offset = cljs.core.map.call(null,cljs.core._,seg,cljs.core.deref.call(null,relseg));
cljs.core.swap_BANG_.call(null,relseg,((function (offset,vec__8836,gcol,sidx,line,col,name,seg,relseg){
return (function (p__8837){
var vec__8838 = p__8837;
var _ = cljs.core.nth.call(null,vec__8838,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__8838,(1),null);
var ___$2 = cljs.core.nth.call(null,vec__8838,(2),null);
var ___$3 = cljs.core.nth.call(null,vec__8838,(3),null);
var lname = cljs.core.nth.call(null,vec__8838,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__6453__auto__ = name;
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__8836,gcol,sidx,line,col,name,seg,relseg))
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
var seq__8892 = cljs.core.seq.call(null,infos);
var chunk__8893 = null;
var count__8894 = (0);
var i__8895 = (0);
while(true){
if((i__8895 < count__8894)){
var info = cljs.core._nth.call(null,chunk__8893,i__8895);
var segv_8942 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_8943 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_8944 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_8943 > (lc_8944 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__8892,chunk__8893,count__8894,i__8895,segv_8942,gline_8943,lc_8944,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_8943 - (lc_8944 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_8942], null));
});})(seq__8892,chunk__8893,count__8894,i__8895,segv_8942,gline_8943,lc_8944,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__8892,chunk__8893,count__8894,i__8895,segv_8942,gline_8943,lc_8944,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_8943], null),cljs.core.conj,segv_8942);
});})(seq__8892,chunk__8893,count__8894,i__8895,segv_8942,gline_8943,lc_8944,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__8945 = seq__8892;
var G__8946 = chunk__8893;
var G__8947 = count__8894;
var G__8948 = (i__8895 + (1));
seq__8892 = G__8945;
chunk__8893 = G__8946;
count__8894 = G__8947;
i__8895 = G__8948;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__8892);
if(temp__4425__auto__){
var seq__8892__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8892__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__8892__$1);
var G__8949 = cljs.core.chunk_rest.call(null,seq__8892__$1);
var G__8950 = c__7256__auto__;
var G__8951 = cljs.core.count.call(null,c__7256__auto__);
var G__8952 = (0);
seq__8892 = G__8949;
chunk__8893 = G__8950;
count__8894 = G__8951;
i__8895 = G__8952;
continue;
} else {
var info = cljs.core.first.call(null,seq__8892__$1);
var segv_8953 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_8954 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_8955 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_8954 > (lc_8955 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__8892,chunk__8893,count__8894,i__8895,segv_8953,gline_8954,lc_8955,info,seq__8892__$1,temp__4425__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_8954 - (lc_8955 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_8953], null));
});})(seq__8892,chunk__8893,count__8894,i__8895,segv_8953,gline_8954,lc_8955,info,seq__8892__$1,temp__4425__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__8892,chunk__8893,count__8894,i__8895,segv_8953,gline_8954,lc_8955,info,seq__8892__$1,temp__4425__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_8954], null),cljs.core.conj,segv_8953);
});})(seq__8892,chunk__8893,count__8894,i__8895,segv_8953,gline_8954,lc_8955,info,seq__8892__$1,temp__4425__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__8956 = cljs.core.next.call(null,seq__8892__$1);
var G__8957 = null;
var G__8958 = (0);
var G__8959 = (0);
seq__8892 = G__8956;
chunk__8893 = G__8957;
count__8894 = G__8958;
i__8895 = G__8959;
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
var seq__8896_8960 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__8897_8961 = null;
var count__8898_8962 = (0);
var i__8899_8963 = (0);
while(true){
if((i__8899_8963 < count__8898_8962)){
var vec__8900_8964 = cljs.core._nth.call(null,chunk__8897_8961,i__8899_8963);
var source_idx_8965 = cljs.core.nth.call(null,vec__8900_8964,(0),null);
var vec__8901_8966 = cljs.core.nth.call(null,vec__8900_8964,(1),null);
var __8967 = cljs.core.nth.call(null,vec__8901_8966,(0),null);
var lines_8968__$1 = cljs.core.nth.call(null,vec__8901_8966,(1),null);
var seq__8902_8969 = cljs.core.seq.call(null,lines_8968__$1);
var chunk__8903_8970 = null;
var count__8904_8971 = (0);
var i__8905_8972 = (0);
while(true){
if((i__8905_8972 < count__8904_8971)){
var vec__8906_8973 = cljs.core._nth.call(null,chunk__8903_8970,i__8905_8972);
var line_8974 = cljs.core.nth.call(null,vec__8906_8973,(0),null);
var cols_8975 = cljs.core.nth.call(null,vec__8906_8973,(1),null);
var seq__8907_8976 = cljs.core.seq.call(null,cols_8975);
var chunk__8908_8977 = null;
var count__8909_8978 = (0);
var i__8910_8979 = (0);
while(true){
if((i__8910_8979 < count__8909_8978)){
var vec__8911_8980 = cljs.core._nth.call(null,chunk__8908_8977,i__8910_8979);
var col_8981 = cljs.core.nth.call(null,vec__8911_8980,(0),null);
var infos_8982 = cljs.core.nth.call(null,vec__8911_8980,(1),null);
encode_cols.call(null,infos_8982,source_idx_8965,line_8974,col_8981);

var G__8983 = seq__8907_8976;
var G__8984 = chunk__8908_8977;
var G__8985 = count__8909_8978;
var G__8986 = (i__8910_8979 + (1));
seq__8907_8976 = G__8983;
chunk__8908_8977 = G__8984;
count__8909_8978 = G__8985;
i__8910_8979 = G__8986;
continue;
} else {
var temp__4425__auto___8987 = cljs.core.seq.call(null,seq__8907_8976);
if(temp__4425__auto___8987){
var seq__8907_8988__$1 = temp__4425__auto___8987;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8907_8988__$1)){
var c__7256__auto___8989 = cljs.core.chunk_first.call(null,seq__8907_8988__$1);
var G__8990 = cljs.core.chunk_rest.call(null,seq__8907_8988__$1);
var G__8991 = c__7256__auto___8989;
var G__8992 = cljs.core.count.call(null,c__7256__auto___8989);
var G__8993 = (0);
seq__8907_8976 = G__8990;
chunk__8908_8977 = G__8991;
count__8909_8978 = G__8992;
i__8910_8979 = G__8993;
continue;
} else {
var vec__8912_8994 = cljs.core.first.call(null,seq__8907_8988__$1);
var col_8995 = cljs.core.nth.call(null,vec__8912_8994,(0),null);
var infos_8996 = cljs.core.nth.call(null,vec__8912_8994,(1),null);
encode_cols.call(null,infos_8996,source_idx_8965,line_8974,col_8995);

var G__8997 = cljs.core.next.call(null,seq__8907_8988__$1);
var G__8998 = null;
var G__8999 = (0);
var G__9000 = (0);
seq__8907_8976 = G__8997;
chunk__8908_8977 = G__8998;
count__8909_8978 = G__8999;
i__8910_8979 = G__9000;
continue;
}
} else {
}
}
break;
}

var G__9001 = seq__8902_8969;
var G__9002 = chunk__8903_8970;
var G__9003 = count__8904_8971;
var G__9004 = (i__8905_8972 + (1));
seq__8902_8969 = G__9001;
chunk__8903_8970 = G__9002;
count__8904_8971 = G__9003;
i__8905_8972 = G__9004;
continue;
} else {
var temp__4425__auto___9005 = cljs.core.seq.call(null,seq__8902_8969);
if(temp__4425__auto___9005){
var seq__8902_9006__$1 = temp__4425__auto___9005;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8902_9006__$1)){
var c__7256__auto___9007 = cljs.core.chunk_first.call(null,seq__8902_9006__$1);
var G__9008 = cljs.core.chunk_rest.call(null,seq__8902_9006__$1);
var G__9009 = c__7256__auto___9007;
var G__9010 = cljs.core.count.call(null,c__7256__auto___9007);
var G__9011 = (0);
seq__8902_8969 = G__9008;
chunk__8903_8970 = G__9009;
count__8904_8971 = G__9010;
i__8905_8972 = G__9011;
continue;
} else {
var vec__8913_9012 = cljs.core.first.call(null,seq__8902_9006__$1);
var line_9013 = cljs.core.nth.call(null,vec__8913_9012,(0),null);
var cols_9014 = cljs.core.nth.call(null,vec__8913_9012,(1),null);
var seq__8914_9015 = cljs.core.seq.call(null,cols_9014);
var chunk__8915_9016 = null;
var count__8916_9017 = (0);
var i__8917_9018 = (0);
while(true){
if((i__8917_9018 < count__8916_9017)){
var vec__8918_9019 = cljs.core._nth.call(null,chunk__8915_9016,i__8917_9018);
var col_9020 = cljs.core.nth.call(null,vec__8918_9019,(0),null);
var infos_9021 = cljs.core.nth.call(null,vec__8918_9019,(1),null);
encode_cols.call(null,infos_9021,source_idx_8965,line_9013,col_9020);

var G__9022 = seq__8914_9015;
var G__9023 = chunk__8915_9016;
var G__9024 = count__8916_9017;
var G__9025 = (i__8917_9018 + (1));
seq__8914_9015 = G__9022;
chunk__8915_9016 = G__9023;
count__8916_9017 = G__9024;
i__8917_9018 = G__9025;
continue;
} else {
var temp__4425__auto___9026__$1 = cljs.core.seq.call(null,seq__8914_9015);
if(temp__4425__auto___9026__$1){
var seq__8914_9027__$1 = temp__4425__auto___9026__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8914_9027__$1)){
var c__7256__auto___9028 = cljs.core.chunk_first.call(null,seq__8914_9027__$1);
var G__9029 = cljs.core.chunk_rest.call(null,seq__8914_9027__$1);
var G__9030 = c__7256__auto___9028;
var G__9031 = cljs.core.count.call(null,c__7256__auto___9028);
var G__9032 = (0);
seq__8914_9015 = G__9029;
chunk__8915_9016 = G__9030;
count__8916_9017 = G__9031;
i__8917_9018 = G__9032;
continue;
} else {
var vec__8919_9033 = cljs.core.first.call(null,seq__8914_9027__$1);
var col_9034 = cljs.core.nth.call(null,vec__8919_9033,(0),null);
var infos_9035 = cljs.core.nth.call(null,vec__8919_9033,(1),null);
encode_cols.call(null,infos_9035,source_idx_8965,line_9013,col_9034);

var G__9036 = cljs.core.next.call(null,seq__8914_9027__$1);
var G__9037 = null;
var G__9038 = (0);
var G__9039 = (0);
seq__8914_9015 = G__9036;
chunk__8915_9016 = G__9037;
count__8916_9017 = G__9038;
i__8917_9018 = G__9039;
continue;
}
} else {
}
}
break;
}

var G__9040 = cljs.core.next.call(null,seq__8902_9006__$1);
var G__9041 = null;
var G__9042 = (0);
var G__9043 = (0);
seq__8902_8969 = G__9040;
chunk__8903_8970 = G__9041;
count__8904_8971 = G__9042;
i__8905_8972 = G__9043;
continue;
}
} else {
}
}
break;
}

var G__9044 = seq__8896_8960;
var G__9045 = chunk__8897_8961;
var G__9046 = count__8898_8962;
var G__9047 = (i__8899_8963 + (1));
seq__8896_8960 = G__9044;
chunk__8897_8961 = G__9045;
count__8898_8962 = G__9046;
i__8899_8963 = G__9047;
continue;
} else {
var temp__4425__auto___9048 = cljs.core.seq.call(null,seq__8896_8960);
if(temp__4425__auto___9048){
var seq__8896_9049__$1 = temp__4425__auto___9048;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8896_9049__$1)){
var c__7256__auto___9050 = cljs.core.chunk_first.call(null,seq__8896_9049__$1);
var G__9051 = cljs.core.chunk_rest.call(null,seq__8896_9049__$1);
var G__9052 = c__7256__auto___9050;
var G__9053 = cljs.core.count.call(null,c__7256__auto___9050);
var G__9054 = (0);
seq__8896_8960 = G__9051;
chunk__8897_8961 = G__9052;
count__8898_8962 = G__9053;
i__8899_8963 = G__9054;
continue;
} else {
var vec__8920_9055 = cljs.core.first.call(null,seq__8896_9049__$1);
var source_idx_9056 = cljs.core.nth.call(null,vec__8920_9055,(0),null);
var vec__8921_9057 = cljs.core.nth.call(null,vec__8920_9055,(1),null);
var __9058 = cljs.core.nth.call(null,vec__8921_9057,(0),null);
var lines_9059__$1 = cljs.core.nth.call(null,vec__8921_9057,(1),null);
var seq__8922_9060 = cljs.core.seq.call(null,lines_9059__$1);
var chunk__8923_9061 = null;
var count__8924_9062 = (0);
var i__8925_9063 = (0);
while(true){
if((i__8925_9063 < count__8924_9062)){
var vec__8926_9064 = cljs.core._nth.call(null,chunk__8923_9061,i__8925_9063);
var line_9065 = cljs.core.nth.call(null,vec__8926_9064,(0),null);
var cols_9066 = cljs.core.nth.call(null,vec__8926_9064,(1),null);
var seq__8927_9067 = cljs.core.seq.call(null,cols_9066);
var chunk__8928_9068 = null;
var count__8929_9069 = (0);
var i__8930_9070 = (0);
while(true){
if((i__8930_9070 < count__8929_9069)){
var vec__8931_9071 = cljs.core._nth.call(null,chunk__8928_9068,i__8930_9070);
var col_9072 = cljs.core.nth.call(null,vec__8931_9071,(0),null);
var infos_9073 = cljs.core.nth.call(null,vec__8931_9071,(1),null);
encode_cols.call(null,infos_9073,source_idx_9056,line_9065,col_9072);

var G__9074 = seq__8927_9067;
var G__9075 = chunk__8928_9068;
var G__9076 = count__8929_9069;
var G__9077 = (i__8930_9070 + (1));
seq__8927_9067 = G__9074;
chunk__8928_9068 = G__9075;
count__8929_9069 = G__9076;
i__8930_9070 = G__9077;
continue;
} else {
var temp__4425__auto___9078__$1 = cljs.core.seq.call(null,seq__8927_9067);
if(temp__4425__auto___9078__$1){
var seq__8927_9079__$1 = temp__4425__auto___9078__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8927_9079__$1)){
var c__7256__auto___9080 = cljs.core.chunk_first.call(null,seq__8927_9079__$1);
var G__9081 = cljs.core.chunk_rest.call(null,seq__8927_9079__$1);
var G__9082 = c__7256__auto___9080;
var G__9083 = cljs.core.count.call(null,c__7256__auto___9080);
var G__9084 = (0);
seq__8927_9067 = G__9081;
chunk__8928_9068 = G__9082;
count__8929_9069 = G__9083;
i__8930_9070 = G__9084;
continue;
} else {
var vec__8932_9085 = cljs.core.first.call(null,seq__8927_9079__$1);
var col_9086 = cljs.core.nth.call(null,vec__8932_9085,(0),null);
var infos_9087 = cljs.core.nth.call(null,vec__8932_9085,(1),null);
encode_cols.call(null,infos_9087,source_idx_9056,line_9065,col_9086);

var G__9088 = cljs.core.next.call(null,seq__8927_9079__$1);
var G__9089 = null;
var G__9090 = (0);
var G__9091 = (0);
seq__8927_9067 = G__9088;
chunk__8928_9068 = G__9089;
count__8929_9069 = G__9090;
i__8930_9070 = G__9091;
continue;
}
} else {
}
}
break;
}

var G__9092 = seq__8922_9060;
var G__9093 = chunk__8923_9061;
var G__9094 = count__8924_9062;
var G__9095 = (i__8925_9063 + (1));
seq__8922_9060 = G__9092;
chunk__8923_9061 = G__9093;
count__8924_9062 = G__9094;
i__8925_9063 = G__9095;
continue;
} else {
var temp__4425__auto___9096__$1 = cljs.core.seq.call(null,seq__8922_9060);
if(temp__4425__auto___9096__$1){
var seq__8922_9097__$1 = temp__4425__auto___9096__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8922_9097__$1)){
var c__7256__auto___9098 = cljs.core.chunk_first.call(null,seq__8922_9097__$1);
var G__9099 = cljs.core.chunk_rest.call(null,seq__8922_9097__$1);
var G__9100 = c__7256__auto___9098;
var G__9101 = cljs.core.count.call(null,c__7256__auto___9098);
var G__9102 = (0);
seq__8922_9060 = G__9099;
chunk__8923_9061 = G__9100;
count__8924_9062 = G__9101;
i__8925_9063 = G__9102;
continue;
} else {
var vec__8933_9103 = cljs.core.first.call(null,seq__8922_9097__$1);
var line_9104 = cljs.core.nth.call(null,vec__8933_9103,(0),null);
var cols_9105 = cljs.core.nth.call(null,vec__8933_9103,(1),null);
var seq__8934_9106 = cljs.core.seq.call(null,cols_9105);
var chunk__8935_9107 = null;
var count__8936_9108 = (0);
var i__8937_9109 = (0);
while(true){
if((i__8937_9109 < count__8936_9108)){
var vec__8938_9110 = cljs.core._nth.call(null,chunk__8935_9107,i__8937_9109);
var col_9111 = cljs.core.nth.call(null,vec__8938_9110,(0),null);
var infos_9112 = cljs.core.nth.call(null,vec__8938_9110,(1),null);
encode_cols.call(null,infos_9112,source_idx_9056,line_9104,col_9111);

var G__9113 = seq__8934_9106;
var G__9114 = chunk__8935_9107;
var G__9115 = count__8936_9108;
var G__9116 = (i__8937_9109 + (1));
seq__8934_9106 = G__9113;
chunk__8935_9107 = G__9114;
count__8936_9108 = G__9115;
i__8937_9109 = G__9116;
continue;
} else {
var temp__4425__auto___9117__$2 = cljs.core.seq.call(null,seq__8934_9106);
if(temp__4425__auto___9117__$2){
var seq__8934_9118__$1 = temp__4425__auto___9117__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8934_9118__$1)){
var c__7256__auto___9119 = cljs.core.chunk_first.call(null,seq__8934_9118__$1);
var G__9120 = cljs.core.chunk_rest.call(null,seq__8934_9118__$1);
var G__9121 = c__7256__auto___9119;
var G__9122 = cljs.core.count.call(null,c__7256__auto___9119);
var G__9123 = (0);
seq__8934_9106 = G__9120;
chunk__8935_9107 = G__9121;
count__8936_9108 = G__9122;
i__8937_9109 = G__9123;
continue;
} else {
var vec__8939_9124 = cljs.core.first.call(null,seq__8934_9118__$1);
var col_9125 = cljs.core.nth.call(null,vec__8939_9124,(0),null);
var infos_9126 = cljs.core.nth.call(null,vec__8939_9124,(1),null);
encode_cols.call(null,infos_9126,source_idx_9056,line_9104,col_9125);

var G__9127 = cljs.core.next.call(null,seq__8934_9118__$1);
var G__9128 = null;
var G__9129 = (0);
var G__9130 = (0);
seq__8934_9106 = G__9127;
chunk__8935_9107 = G__9128;
count__8936_9108 = G__9129;
i__8937_9109 = G__9130;
continue;
}
} else {
}
}
break;
}

var G__9131 = cljs.core.next.call(null,seq__8922_9097__$1);
var G__9132 = null;
var G__9133 = (0);
var G__9134 = (0);
seq__8922_9060 = G__9131;
chunk__8923_9061 = G__9132;
count__8924_9062 = G__9133;
i__8925_9063 = G__9134;
continue;
}
} else {
}
}
break;
}

var G__9135 = cljs.core.next.call(null,seq__8896_9049__$1);
var G__9136 = null;
var G__9137 = (0);
var G__9138 = (0);
seq__8896_8960 = G__9135;
chunk__8897_8961 = G__9136;
count__8898_8962 = G__9137;
i__8899_8963 = G__9138;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__8940 = {"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys.call(null,m);
var f = cljs.core.comp.call(null,((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__8839_SHARP_){
return [cljs.core.str(p1__8839_SHARP_),cljs.core.str("?rel="),cljs.core.str((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__8840_SHARP_){
return cljs.core.last.call(null,clojure.string.split.call(null,p1__8840_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.call(null,cljs.core.map.call(null,f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.call(null,";",cljs.core.map.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__8841_SHARP_){
return clojure.string.join.call(null,",",p1__8841_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs.call(null,cljs.core.concat.call(null,preamble_lines,cljs.core.deref.call(null,lines))))), "names": cljs.core.into_array.call(null,cljs.core.map.call(null,clojure.set.map_invert.call(null,cljs.core.deref.call(null,names__GT_idx)),cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,names__GT_idx)))))};
var G__8940__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))?(function (){var G__8941 = G__8940;
goog.object.set(G__8941,"sourcesContent",cljs.core.into_array.call(null,new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts)));

return G__8941;
})():G__8940);
return G__8940__$1;
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
var vec__9144 = cljs.core.first.call(null,line_map_seq);
var line = cljs.core.nth.call(null,vec__9144,(0),null);
var col_map = cljs.core.nth.call(null,vec__9144,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq.call(null,col_map);
var new_cols = cljs.core.sorted_map.call(null);
while(true){
if(col_map_seq){
var vec__9145 = cljs.core.first.call(null,col_map_seq);
var col = cljs.core.nth.call(null,vec__9145,(0),null);
var infos = cljs.core.nth.call(null,vec__9145,(1),null);
var G__9149 = cljs.core.next.call(null,col_map_seq);
var G__9150 = cljs.core.assoc.call(null,new_cols,col,cljs.core.reduce.call(null,((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__9145,col,infos,vec__9144,line,col_map){
return (function (v,p__9146){
var map__9147 = p__9146;
var map__9147__$1 = ((((!((map__9147 == null)))?((((map__9147.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9147.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9147):map__9147);
var gline = cljs.core.get.call(null,map__9147__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.call(null,map__9147__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.call(null,v,cljs.core.get_in.call(null,js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__9145,col,infos,vec__9144,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__9149;
new_cols = G__9150;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__9151 = cljs.core.next.call(null,line_map_seq);
var G__9152 = cljs.core.assoc.call(null,new_lines,line,new_cols);
line_map_seq = G__9151;
new_lines = G__9152;
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
var seq__9203_9253 = cljs.core.seq.call(null,reverse_map);
var chunk__9204_9254 = null;
var count__9205_9255 = (0);
var i__9206_9256 = (0);
while(true){
if((i__9206_9256 < count__9205_9255)){
var vec__9207_9257 = cljs.core._nth.call(null,chunk__9204_9254,i__9206_9256);
var line_9258 = cljs.core.nth.call(null,vec__9207_9257,(0),null);
var columns_9259 = cljs.core.nth.call(null,vec__9207_9257,(1),null);
var seq__9208_9260 = cljs.core.seq.call(null,columns_9259);
var chunk__9209_9261 = null;
var count__9210_9262 = (0);
var i__9211_9263 = (0);
while(true){
if((i__9211_9263 < count__9210_9262)){
var vec__9212_9264 = cljs.core._nth.call(null,chunk__9209_9261,i__9211_9263);
var column_9265 = cljs.core.nth.call(null,vec__9212_9264,(0),null);
var column_info_9266 = cljs.core.nth.call(null,vec__9212_9264,(1),null);
var seq__9213_9267 = cljs.core.seq.call(null,column_info_9266);
var chunk__9214_9268 = null;
var count__9215_9269 = (0);
var i__9216_9270 = (0);
while(true){
if((i__9216_9270 < count__9215_9269)){
var map__9217_9271 = cljs.core._nth.call(null,chunk__9214_9268,i__9216_9270);
var map__9217_9272__$1 = ((((!((map__9217_9271 == null)))?((((map__9217_9271.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9217_9271.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9217_9271):map__9217_9271);
var gline_9273 = cljs.core.get.call(null,map__9217_9272__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9274 = cljs.core.get.call(null,map__9217_9272__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9275 = cljs.core.get.call(null,map__9217_9272__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9273], null),cljs.core.fnil.call(null,((function (seq__9213_9267,chunk__9214_9268,count__9215_9269,i__9216_9270,seq__9208_9260,chunk__9209_9261,count__9210_9262,i__9211_9263,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9217_9271,map__9217_9272__$1,gline_9273,gcol_9274,name_9275,vec__9212_9264,column_9265,column_info_9266,vec__9207_9257,line_9258,columns_9259,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9265], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9258,new cljs.core.Keyword(null,"col","col",-1959363084),column_9265,new cljs.core.Keyword(null,"name","name",1843675177),name_9275], null));
});})(seq__9213_9267,chunk__9214_9268,count__9215_9269,i__9216_9270,seq__9208_9260,chunk__9209_9261,count__9210_9262,i__9211_9263,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9217_9271,map__9217_9272__$1,gline_9273,gcol_9274,name_9275,vec__9212_9264,column_9265,column_info_9266,vec__9207_9257,line_9258,columns_9259,inverted))
,cljs.core.sorted_map.call(null)));

var G__9276 = seq__9213_9267;
var G__9277 = chunk__9214_9268;
var G__9278 = count__9215_9269;
var G__9279 = (i__9216_9270 + (1));
seq__9213_9267 = G__9276;
chunk__9214_9268 = G__9277;
count__9215_9269 = G__9278;
i__9216_9270 = G__9279;
continue;
} else {
var temp__4425__auto___9280 = cljs.core.seq.call(null,seq__9213_9267);
if(temp__4425__auto___9280){
var seq__9213_9281__$1 = temp__4425__auto___9280;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9213_9281__$1)){
var c__7256__auto___9282 = cljs.core.chunk_first.call(null,seq__9213_9281__$1);
var G__9283 = cljs.core.chunk_rest.call(null,seq__9213_9281__$1);
var G__9284 = c__7256__auto___9282;
var G__9285 = cljs.core.count.call(null,c__7256__auto___9282);
var G__9286 = (0);
seq__9213_9267 = G__9283;
chunk__9214_9268 = G__9284;
count__9215_9269 = G__9285;
i__9216_9270 = G__9286;
continue;
} else {
var map__9219_9287 = cljs.core.first.call(null,seq__9213_9281__$1);
var map__9219_9288__$1 = ((((!((map__9219_9287 == null)))?((((map__9219_9287.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9219_9287.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9219_9287):map__9219_9287);
var gline_9289 = cljs.core.get.call(null,map__9219_9288__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9290 = cljs.core.get.call(null,map__9219_9288__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9291 = cljs.core.get.call(null,map__9219_9288__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9289], null),cljs.core.fnil.call(null,((function (seq__9213_9267,chunk__9214_9268,count__9215_9269,i__9216_9270,seq__9208_9260,chunk__9209_9261,count__9210_9262,i__9211_9263,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9219_9287,map__9219_9288__$1,gline_9289,gcol_9290,name_9291,seq__9213_9281__$1,temp__4425__auto___9280,vec__9212_9264,column_9265,column_info_9266,vec__9207_9257,line_9258,columns_9259,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9265], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9258,new cljs.core.Keyword(null,"col","col",-1959363084),column_9265,new cljs.core.Keyword(null,"name","name",1843675177),name_9291], null));
});})(seq__9213_9267,chunk__9214_9268,count__9215_9269,i__9216_9270,seq__9208_9260,chunk__9209_9261,count__9210_9262,i__9211_9263,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9219_9287,map__9219_9288__$1,gline_9289,gcol_9290,name_9291,seq__9213_9281__$1,temp__4425__auto___9280,vec__9212_9264,column_9265,column_info_9266,vec__9207_9257,line_9258,columns_9259,inverted))
,cljs.core.sorted_map.call(null)));

var G__9292 = cljs.core.next.call(null,seq__9213_9281__$1);
var G__9293 = null;
var G__9294 = (0);
var G__9295 = (0);
seq__9213_9267 = G__9292;
chunk__9214_9268 = G__9293;
count__9215_9269 = G__9294;
i__9216_9270 = G__9295;
continue;
}
} else {
}
}
break;
}

var G__9296 = seq__9208_9260;
var G__9297 = chunk__9209_9261;
var G__9298 = count__9210_9262;
var G__9299 = (i__9211_9263 + (1));
seq__9208_9260 = G__9296;
chunk__9209_9261 = G__9297;
count__9210_9262 = G__9298;
i__9211_9263 = G__9299;
continue;
} else {
var temp__4425__auto___9300 = cljs.core.seq.call(null,seq__9208_9260);
if(temp__4425__auto___9300){
var seq__9208_9301__$1 = temp__4425__auto___9300;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9208_9301__$1)){
var c__7256__auto___9302 = cljs.core.chunk_first.call(null,seq__9208_9301__$1);
var G__9303 = cljs.core.chunk_rest.call(null,seq__9208_9301__$1);
var G__9304 = c__7256__auto___9302;
var G__9305 = cljs.core.count.call(null,c__7256__auto___9302);
var G__9306 = (0);
seq__9208_9260 = G__9303;
chunk__9209_9261 = G__9304;
count__9210_9262 = G__9305;
i__9211_9263 = G__9306;
continue;
} else {
var vec__9221_9307 = cljs.core.first.call(null,seq__9208_9301__$1);
var column_9308 = cljs.core.nth.call(null,vec__9221_9307,(0),null);
var column_info_9309 = cljs.core.nth.call(null,vec__9221_9307,(1),null);
var seq__9222_9310 = cljs.core.seq.call(null,column_info_9309);
var chunk__9223_9311 = null;
var count__9224_9312 = (0);
var i__9225_9313 = (0);
while(true){
if((i__9225_9313 < count__9224_9312)){
var map__9226_9314 = cljs.core._nth.call(null,chunk__9223_9311,i__9225_9313);
var map__9226_9315__$1 = ((((!((map__9226_9314 == null)))?((((map__9226_9314.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9226_9314.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9226_9314):map__9226_9314);
var gline_9316 = cljs.core.get.call(null,map__9226_9315__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9317 = cljs.core.get.call(null,map__9226_9315__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9318 = cljs.core.get.call(null,map__9226_9315__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9316], null),cljs.core.fnil.call(null,((function (seq__9222_9310,chunk__9223_9311,count__9224_9312,i__9225_9313,seq__9208_9260,chunk__9209_9261,count__9210_9262,i__9211_9263,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9226_9314,map__9226_9315__$1,gline_9316,gcol_9317,name_9318,vec__9221_9307,column_9308,column_info_9309,seq__9208_9301__$1,temp__4425__auto___9300,vec__9207_9257,line_9258,columns_9259,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9308], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9258,new cljs.core.Keyword(null,"col","col",-1959363084),column_9308,new cljs.core.Keyword(null,"name","name",1843675177),name_9318], null));
});})(seq__9222_9310,chunk__9223_9311,count__9224_9312,i__9225_9313,seq__9208_9260,chunk__9209_9261,count__9210_9262,i__9211_9263,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9226_9314,map__9226_9315__$1,gline_9316,gcol_9317,name_9318,vec__9221_9307,column_9308,column_info_9309,seq__9208_9301__$1,temp__4425__auto___9300,vec__9207_9257,line_9258,columns_9259,inverted))
,cljs.core.sorted_map.call(null)));

var G__9319 = seq__9222_9310;
var G__9320 = chunk__9223_9311;
var G__9321 = count__9224_9312;
var G__9322 = (i__9225_9313 + (1));
seq__9222_9310 = G__9319;
chunk__9223_9311 = G__9320;
count__9224_9312 = G__9321;
i__9225_9313 = G__9322;
continue;
} else {
var temp__4425__auto___9323__$1 = cljs.core.seq.call(null,seq__9222_9310);
if(temp__4425__auto___9323__$1){
var seq__9222_9324__$1 = temp__4425__auto___9323__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9222_9324__$1)){
var c__7256__auto___9325 = cljs.core.chunk_first.call(null,seq__9222_9324__$1);
var G__9326 = cljs.core.chunk_rest.call(null,seq__9222_9324__$1);
var G__9327 = c__7256__auto___9325;
var G__9328 = cljs.core.count.call(null,c__7256__auto___9325);
var G__9329 = (0);
seq__9222_9310 = G__9326;
chunk__9223_9311 = G__9327;
count__9224_9312 = G__9328;
i__9225_9313 = G__9329;
continue;
} else {
var map__9228_9330 = cljs.core.first.call(null,seq__9222_9324__$1);
var map__9228_9331__$1 = ((((!((map__9228_9330 == null)))?((((map__9228_9330.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9228_9330.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9228_9330):map__9228_9330);
var gline_9332 = cljs.core.get.call(null,map__9228_9331__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9333 = cljs.core.get.call(null,map__9228_9331__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9334 = cljs.core.get.call(null,map__9228_9331__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9332], null),cljs.core.fnil.call(null,((function (seq__9222_9310,chunk__9223_9311,count__9224_9312,i__9225_9313,seq__9208_9260,chunk__9209_9261,count__9210_9262,i__9211_9263,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9228_9330,map__9228_9331__$1,gline_9332,gcol_9333,name_9334,seq__9222_9324__$1,temp__4425__auto___9323__$1,vec__9221_9307,column_9308,column_info_9309,seq__9208_9301__$1,temp__4425__auto___9300,vec__9207_9257,line_9258,columns_9259,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9308], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9258,new cljs.core.Keyword(null,"col","col",-1959363084),column_9308,new cljs.core.Keyword(null,"name","name",1843675177),name_9334], null));
});})(seq__9222_9310,chunk__9223_9311,count__9224_9312,i__9225_9313,seq__9208_9260,chunk__9209_9261,count__9210_9262,i__9211_9263,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9228_9330,map__9228_9331__$1,gline_9332,gcol_9333,name_9334,seq__9222_9324__$1,temp__4425__auto___9323__$1,vec__9221_9307,column_9308,column_info_9309,seq__9208_9301__$1,temp__4425__auto___9300,vec__9207_9257,line_9258,columns_9259,inverted))
,cljs.core.sorted_map.call(null)));

var G__9335 = cljs.core.next.call(null,seq__9222_9324__$1);
var G__9336 = null;
var G__9337 = (0);
var G__9338 = (0);
seq__9222_9310 = G__9335;
chunk__9223_9311 = G__9336;
count__9224_9312 = G__9337;
i__9225_9313 = G__9338;
continue;
}
} else {
}
}
break;
}

var G__9339 = cljs.core.next.call(null,seq__9208_9301__$1);
var G__9340 = null;
var G__9341 = (0);
var G__9342 = (0);
seq__9208_9260 = G__9339;
chunk__9209_9261 = G__9340;
count__9210_9262 = G__9341;
i__9211_9263 = G__9342;
continue;
}
} else {
}
}
break;
}

var G__9343 = seq__9203_9253;
var G__9344 = chunk__9204_9254;
var G__9345 = count__9205_9255;
var G__9346 = (i__9206_9256 + (1));
seq__9203_9253 = G__9343;
chunk__9204_9254 = G__9344;
count__9205_9255 = G__9345;
i__9206_9256 = G__9346;
continue;
} else {
var temp__4425__auto___9347 = cljs.core.seq.call(null,seq__9203_9253);
if(temp__4425__auto___9347){
var seq__9203_9348__$1 = temp__4425__auto___9347;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9203_9348__$1)){
var c__7256__auto___9349 = cljs.core.chunk_first.call(null,seq__9203_9348__$1);
var G__9350 = cljs.core.chunk_rest.call(null,seq__9203_9348__$1);
var G__9351 = c__7256__auto___9349;
var G__9352 = cljs.core.count.call(null,c__7256__auto___9349);
var G__9353 = (0);
seq__9203_9253 = G__9350;
chunk__9204_9254 = G__9351;
count__9205_9255 = G__9352;
i__9206_9256 = G__9353;
continue;
} else {
var vec__9230_9354 = cljs.core.first.call(null,seq__9203_9348__$1);
var line_9355 = cljs.core.nth.call(null,vec__9230_9354,(0),null);
var columns_9356 = cljs.core.nth.call(null,vec__9230_9354,(1),null);
var seq__9231_9357 = cljs.core.seq.call(null,columns_9356);
var chunk__9232_9358 = null;
var count__9233_9359 = (0);
var i__9234_9360 = (0);
while(true){
if((i__9234_9360 < count__9233_9359)){
var vec__9235_9361 = cljs.core._nth.call(null,chunk__9232_9358,i__9234_9360);
var column_9362 = cljs.core.nth.call(null,vec__9235_9361,(0),null);
var column_info_9363 = cljs.core.nth.call(null,vec__9235_9361,(1),null);
var seq__9236_9364 = cljs.core.seq.call(null,column_info_9363);
var chunk__9237_9365 = null;
var count__9238_9366 = (0);
var i__9239_9367 = (0);
while(true){
if((i__9239_9367 < count__9238_9366)){
var map__9240_9368 = cljs.core._nth.call(null,chunk__9237_9365,i__9239_9367);
var map__9240_9369__$1 = ((((!((map__9240_9368 == null)))?((((map__9240_9368.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9240_9368.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9240_9368):map__9240_9368);
var gline_9370 = cljs.core.get.call(null,map__9240_9369__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9371 = cljs.core.get.call(null,map__9240_9369__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9372 = cljs.core.get.call(null,map__9240_9369__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9370], null),cljs.core.fnil.call(null,((function (seq__9236_9364,chunk__9237_9365,count__9238_9366,i__9239_9367,seq__9231_9357,chunk__9232_9358,count__9233_9359,i__9234_9360,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9240_9368,map__9240_9369__$1,gline_9370,gcol_9371,name_9372,vec__9235_9361,column_9362,column_info_9363,vec__9230_9354,line_9355,columns_9356,seq__9203_9348__$1,temp__4425__auto___9347,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9362], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9355,new cljs.core.Keyword(null,"col","col",-1959363084),column_9362,new cljs.core.Keyword(null,"name","name",1843675177),name_9372], null));
});})(seq__9236_9364,chunk__9237_9365,count__9238_9366,i__9239_9367,seq__9231_9357,chunk__9232_9358,count__9233_9359,i__9234_9360,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9240_9368,map__9240_9369__$1,gline_9370,gcol_9371,name_9372,vec__9235_9361,column_9362,column_info_9363,vec__9230_9354,line_9355,columns_9356,seq__9203_9348__$1,temp__4425__auto___9347,inverted))
,cljs.core.sorted_map.call(null)));

var G__9373 = seq__9236_9364;
var G__9374 = chunk__9237_9365;
var G__9375 = count__9238_9366;
var G__9376 = (i__9239_9367 + (1));
seq__9236_9364 = G__9373;
chunk__9237_9365 = G__9374;
count__9238_9366 = G__9375;
i__9239_9367 = G__9376;
continue;
} else {
var temp__4425__auto___9377__$1 = cljs.core.seq.call(null,seq__9236_9364);
if(temp__4425__auto___9377__$1){
var seq__9236_9378__$1 = temp__4425__auto___9377__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9236_9378__$1)){
var c__7256__auto___9379 = cljs.core.chunk_first.call(null,seq__9236_9378__$1);
var G__9380 = cljs.core.chunk_rest.call(null,seq__9236_9378__$1);
var G__9381 = c__7256__auto___9379;
var G__9382 = cljs.core.count.call(null,c__7256__auto___9379);
var G__9383 = (0);
seq__9236_9364 = G__9380;
chunk__9237_9365 = G__9381;
count__9238_9366 = G__9382;
i__9239_9367 = G__9383;
continue;
} else {
var map__9242_9384 = cljs.core.first.call(null,seq__9236_9378__$1);
var map__9242_9385__$1 = ((((!((map__9242_9384 == null)))?((((map__9242_9384.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9242_9384.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9242_9384):map__9242_9384);
var gline_9386 = cljs.core.get.call(null,map__9242_9385__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9387 = cljs.core.get.call(null,map__9242_9385__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9388 = cljs.core.get.call(null,map__9242_9385__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9386], null),cljs.core.fnil.call(null,((function (seq__9236_9364,chunk__9237_9365,count__9238_9366,i__9239_9367,seq__9231_9357,chunk__9232_9358,count__9233_9359,i__9234_9360,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9242_9384,map__9242_9385__$1,gline_9386,gcol_9387,name_9388,seq__9236_9378__$1,temp__4425__auto___9377__$1,vec__9235_9361,column_9362,column_info_9363,vec__9230_9354,line_9355,columns_9356,seq__9203_9348__$1,temp__4425__auto___9347,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9362], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9355,new cljs.core.Keyword(null,"col","col",-1959363084),column_9362,new cljs.core.Keyword(null,"name","name",1843675177),name_9388], null));
});})(seq__9236_9364,chunk__9237_9365,count__9238_9366,i__9239_9367,seq__9231_9357,chunk__9232_9358,count__9233_9359,i__9234_9360,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9242_9384,map__9242_9385__$1,gline_9386,gcol_9387,name_9388,seq__9236_9378__$1,temp__4425__auto___9377__$1,vec__9235_9361,column_9362,column_info_9363,vec__9230_9354,line_9355,columns_9356,seq__9203_9348__$1,temp__4425__auto___9347,inverted))
,cljs.core.sorted_map.call(null)));

var G__9389 = cljs.core.next.call(null,seq__9236_9378__$1);
var G__9390 = null;
var G__9391 = (0);
var G__9392 = (0);
seq__9236_9364 = G__9389;
chunk__9237_9365 = G__9390;
count__9238_9366 = G__9391;
i__9239_9367 = G__9392;
continue;
}
} else {
}
}
break;
}

var G__9393 = seq__9231_9357;
var G__9394 = chunk__9232_9358;
var G__9395 = count__9233_9359;
var G__9396 = (i__9234_9360 + (1));
seq__9231_9357 = G__9393;
chunk__9232_9358 = G__9394;
count__9233_9359 = G__9395;
i__9234_9360 = G__9396;
continue;
} else {
var temp__4425__auto___9397__$1 = cljs.core.seq.call(null,seq__9231_9357);
if(temp__4425__auto___9397__$1){
var seq__9231_9398__$1 = temp__4425__auto___9397__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9231_9398__$1)){
var c__7256__auto___9399 = cljs.core.chunk_first.call(null,seq__9231_9398__$1);
var G__9400 = cljs.core.chunk_rest.call(null,seq__9231_9398__$1);
var G__9401 = c__7256__auto___9399;
var G__9402 = cljs.core.count.call(null,c__7256__auto___9399);
var G__9403 = (0);
seq__9231_9357 = G__9400;
chunk__9232_9358 = G__9401;
count__9233_9359 = G__9402;
i__9234_9360 = G__9403;
continue;
} else {
var vec__9244_9404 = cljs.core.first.call(null,seq__9231_9398__$1);
var column_9405 = cljs.core.nth.call(null,vec__9244_9404,(0),null);
var column_info_9406 = cljs.core.nth.call(null,vec__9244_9404,(1),null);
var seq__9245_9407 = cljs.core.seq.call(null,column_info_9406);
var chunk__9246_9408 = null;
var count__9247_9409 = (0);
var i__9248_9410 = (0);
while(true){
if((i__9248_9410 < count__9247_9409)){
var map__9249_9411 = cljs.core._nth.call(null,chunk__9246_9408,i__9248_9410);
var map__9249_9412__$1 = ((((!((map__9249_9411 == null)))?((((map__9249_9411.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9249_9411.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9249_9411):map__9249_9411);
var gline_9413 = cljs.core.get.call(null,map__9249_9412__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9414 = cljs.core.get.call(null,map__9249_9412__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9415 = cljs.core.get.call(null,map__9249_9412__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9413], null),cljs.core.fnil.call(null,((function (seq__9245_9407,chunk__9246_9408,count__9247_9409,i__9248_9410,seq__9231_9357,chunk__9232_9358,count__9233_9359,i__9234_9360,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9249_9411,map__9249_9412__$1,gline_9413,gcol_9414,name_9415,vec__9244_9404,column_9405,column_info_9406,seq__9231_9398__$1,temp__4425__auto___9397__$1,vec__9230_9354,line_9355,columns_9356,seq__9203_9348__$1,temp__4425__auto___9347,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9405], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9355,new cljs.core.Keyword(null,"col","col",-1959363084),column_9405,new cljs.core.Keyword(null,"name","name",1843675177),name_9415], null));
});})(seq__9245_9407,chunk__9246_9408,count__9247_9409,i__9248_9410,seq__9231_9357,chunk__9232_9358,count__9233_9359,i__9234_9360,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9249_9411,map__9249_9412__$1,gline_9413,gcol_9414,name_9415,vec__9244_9404,column_9405,column_info_9406,seq__9231_9398__$1,temp__4425__auto___9397__$1,vec__9230_9354,line_9355,columns_9356,seq__9203_9348__$1,temp__4425__auto___9347,inverted))
,cljs.core.sorted_map.call(null)));

var G__9416 = seq__9245_9407;
var G__9417 = chunk__9246_9408;
var G__9418 = count__9247_9409;
var G__9419 = (i__9248_9410 + (1));
seq__9245_9407 = G__9416;
chunk__9246_9408 = G__9417;
count__9247_9409 = G__9418;
i__9248_9410 = G__9419;
continue;
} else {
var temp__4425__auto___9420__$2 = cljs.core.seq.call(null,seq__9245_9407);
if(temp__4425__auto___9420__$2){
var seq__9245_9421__$1 = temp__4425__auto___9420__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9245_9421__$1)){
var c__7256__auto___9422 = cljs.core.chunk_first.call(null,seq__9245_9421__$1);
var G__9423 = cljs.core.chunk_rest.call(null,seq__9245_9421__$1);
var G__9424 = c__7256__auto___9422;
var G__9425 = cljs.core.count.call(null,c__7256__auto___9422);
var G__9426 = (0);
seq__9245_9407 = G__9423;
chunk__9246_9408 = G__9424;
count__9247_9409 = G__9425;
i__9248_9410 = G__9426;
continue;
} else {
var map__9251_9427 = cljs.core.first.call(null,seq__9245_9421__$1);
var map__9251_9428__$1 = ((((!((map__9251_9427 == null)))?((((map__9251_9427.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9251_9427.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9251_9427):map__9251_9427);
var gline_9429 = cljs.core.get.call(null,map__9251_9428__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9430 = cljs.core.get.call(null,map__9251_9428__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9431 = cljs.core.get.call(null,map__9251_9428__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9429], null),cljs.core.fnil.call(null,((function (seq__9245_9407,chunk__9246_9408,count__9247_9409,i__9248_9410,seq__9231_9357,chunk__9232_9358,count__9233_9359,i__9234_9360,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9251_9427,map__9251_9428__$1,gline_9429,gcol_9430,name_9431,seq__9245_9421__$1,temp__4425__auto___9420__$2,vec__9244_9404,column_9405,column_info_9406,seq__9231_9398__$1,temp__4425__auto___9397__$1,vec__9230_9354,line_9355,columns_9356,seq__9203_9348__$1,temp__4425__auto___9347,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9405], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9355,new cljs.core.Keyword(null,"col","col",-1959363084),column_9405,new cljs.core.Keyword(null,"name","name",1843675177),name_9431], null));
});})(seq__9245_9407,chunk__9246_9408,count__9247_9409,i__9248_9410,seq__9231_9357,chunk__9232_9358,count__9233_9359,i__9234_9360,seq__9203_9253,chunk__9204_9254,count__9205_9255,i__9206_9256,map__9251_9427,map__9251_9428__$1,gline_9429,gcol_9430,name_9431,seq__9245_9421__$1,temp__4425__auto___9420__$2,vec__9244_9404,column_9405,column_info_9406,seq__9231_9398__$1,temp__4425__auto___9397__$1,vec__9230_9354,line_9355,columns_9356,seq__9203_9348__$1,temp__4425__auto___9347,inverted))
,cljs.core.sorted_map.call(null)));

var G__9432 = cljs.core.next.call(null,seq__9245_9421__$1);
var G__9433 = null;
var G__9434 = (0);
var G__9435 = (0);
seq__9245_9407 = G__9432;
chunk__9246_9408 = G__9433;
count__9247_9409 = G__9434;
i__9248_9410 = G__9435;
continue;
}
} else {
}
}
break;
}

var G__9436 = cljs.core.next.call(null,seq__9231_9398__$1);
var G__9437 = null;
var G__9438 = (0);
var G__9439 = (0);
seq__9231_9357 = G__9436;
chunk__9232_9358 = G__9437;
count__9233_9359 = G__9438;
i__9234_9360 = G__9439;
continue;
}
} else {
}
}
break;
}

var G__9440 = cljs.core.next.call(null,seq__9203_9348__$1);
var G__9441 = null;
var G__9442 = (0);
var G__9443 = (0);
seq__9203_9253 = G__9440;
chunk__9204_9254 = G__9441;
count__9205_9255 = G__9442;
i__9206_9256 = G__9443;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref.call(null,inverted);
});

//# sourceMappingURL=source_map.js.map