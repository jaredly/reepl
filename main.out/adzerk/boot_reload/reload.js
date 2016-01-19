// Compiled by ClojureScript 1.7.228 {}
goog.provide('adzerk.boot_reload.reload');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('goog.Uri');
goog.require('goog.async.DeferredList');
goog.require('goog.net.jsloader');
adzerk.boot_reload.reload.page_uri = (new goog.Uri(window.location.href));
adzerk.boot_reload.reload.ends_with_QMARK_ = (function adzerk$boot_reload$reload$ends_with_QMARK_(s,pat){
return cljs.core._EQ_.call(null,pat,cljs.core.subs.call(null,s,(cljs.core.count.call(null,s) - cljs.core.count.call(null,pat))));
});
adzerk.boot_reload.reload.reload_page_BANG_ = (function adzerk$boot_reload$reload$reload_page_BANG_(){
return window.location.reload();
});
adzerk.boot_reload.reload.normalize_href_or_uri = (function adzerk$boot_reload$reload$normalize_href_or_uri(href_or_uri){
var uri = (new goog.Uri(href_or_uri));
return adzerk.boot_reload.reload.page_uri.resolve(uri).getPath();
});
adzerk.boot_reload.reload.changed_href_QMARK_ = (function adzerk$boot_reload$reload$changed_href_QMARK_(href_or_uri,changed){
if(cljs.core.truth_(href_or_uri)){
var path = adzerk.boot_reload.reload.normalize_href_or_uri.call(null,href_or_uri);
if(cljs.core.truth_(cljs.core.not_empty.call(null,cljs.core.filter.call(null,((function (path){
return (function (p1__11323_SHARP_){
return adzerk.boot_reload.reload.ends_with_QMARK_.call(null,adzerk.boot_reload.reload.normalize_href_or_uri.call(null,p1__11323_SHARP_),path);
});})(path))
,changed)))){
return goog.Uri.parse(path);
} else {
return null;
}
} else {
return null;
}
});
adzerk.boot_reload.reload.reload_css = (function adzerk$boot_reload$reload$reload_css(changed){
var sheets = document.styleSheets;
var seq__11328 = cljs.core.seq.call(null,cljs.core.range.call(null,(0),sheets.length));
var chunk__11329 = null;
var count__11330 = (0);
var i__11331 = (0);
while(true){
if((i__11331 < count__11330)){
var s = cljs.core._nth.call(null,chunk__11329,i__11331);
var temp__4425__auto___11332 = (sheets[s]);
if(cljs.core.truth_(temp__4425__auto___11332)){
var sheet_11333 = temp__4425__auto___11332;
var temp__4425__auto___11334__$1 = adzerk.boot_reload.reload.changed_href_QMARK_.call(null,sheet_11333.href,changed);
if(cljs.core.truth_(temp__4425__auto___11334__$1)){
var href_uri_11335 = temp__4425__auto___11334__$1;
sheet_11333.ownerNode.href = href_uri_11335.makeUnique().toString();
} else {
}
} else {
}

var G__11336 = seq__11328;
var G__11337 = chunk__11329;
var G__11338 = count__11330;
var G__11339 = (i__11331 + (1));
seq__11328 = G__11336;
chunk__11329 = G__11337;
count__11330 = G__11338;
i__11331 = G__11339;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__11328);
if(temp__4425__auto__){
var seq__11328__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11328__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__11328__$1);
var G__11340 = cljs.core.chunk_rest.call(null,seq__11328__$1);
var G__11341 = c__7256__auto__;
var G__11342 = cljs.core.count.call(null,c__7256__auto__);
var G__11343 = (0);
seq__11328 = G__11340;
chunk__11329 = G__11341;
count__11330 = G__11342;
i__11331 = G__11343;
continue;
} else {
var s = cljs.core.first.call(null,seq__11328__$1);
var temp__4425__auto___11344__$1 = (sheets[s]);
if(cljs.core.truth_(temp__4425__auto___11344__$1)){
var sheet_11345 = temp__4425__auto___11344__$1;
var temp__4425__auto___11346__$2 = adzerk.boot_reload.reload.changed_href_QMARK_.call(null,sheet_11345.href,changed);
if(cljs.core.truth_(temp__4425__auto___11346__$2)){
var href_uri_11347 = temp__4425__auto___11346__$2;
sheet_11345.ownerNode.href = href_uri_11347.makeUnique().toString();
} else {
}
} else {
}

var G__11348 = cljs.core.next.call(null,seq__11328__$1);
var G__11349 = null;
var G__11350 = (0);
var G__11351 = (0);
seq__11328 = G__11348;
chunk__11329 = G__11349;
count__11330 = G__11350;
i__11331 = G__11351;
continue;
}
} else {
return null;
}
}
break;
}
});
adzerk.boot_reload.reload.reload_img = (function adzerk$boot_reload$reload$reload_img(changed){
var images = document.images;
var seq__11356 = cljs.core.seq.call(null,cljs.core.range.call(null,(0),images.length));
var chunk__11357 = null;
var count__11358 = (0);
var i__11359 = (0);
while(true){
if((i__11359 < count__11358)){
var s = cljs.core._nth.call(null,chunk__11357,i__11359);
var temp__4425__auto___11360 = (images[s]);
if(cljs.core.truth_(temp__4425__auto___11360)){
var image_11361 = temp__4425__auto___11360;
var temp__4425__auto___11362__$1 = adzerk.boot_reload.reload.changed_href_QMARK_.call(null,image_11361.src,changed);
if(cljs.core.truth_(temp__4425__auto___11362__$1)){
var href_uri_11363 = temp__4425__auto___11362__$1;
image_11361.src = href_uri_11363.makeUnique().toString();
} else {
}
} else {
}

var G__11364 = seq__11356;
var G__11365 = chunk__11357;
var G__11366 = count__11358;
var G__11367 = (i__11359 + (1));
seq__11356 = G__11364;
chunk__11357 = G__11365;
count__11358 = G__11366;
i__11359 = G__11367;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__11356);
if(temp__4425__auto__){
var seq__11356__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11356__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__11356__$1);
var G__11368 = cljs.core.chunk_rest.call(null,seq__11356__$1);
var G__11369 = c__7256__auto__;
var G__11370 = cljs.core.count.call(null,c__7256__auto__);
var G__11371 = (0);
seq__11356 = G__11368;
chunk__11357 = G__11369;
count__11358 = G__11370;
i__11359 = G__11371;
continue;
} else {
var s = cljs.core.first.call(null,seq__11356__$1);
var temp__4425__auto___11372__$1 = (images[s]);
if(cljs.core.truth_(temp__4425__auto___11372__$1)){
var image_11373 = temp__4425__auto___11372__$1;
var temp__4425__auto___11374__$2 = adzerk.boot_reload.reload.changed_href_QMARK_.call(null,image_11373.src,changed);
if(cljs.core.truth_(temp__4425__auto___11374__$2)){
var href_uri_11375 = temp__4425__auto___11374__$2;
image_11373.src = href_uri_11375.makeUnique().toString();
} else {
}
} else {
}

var G__11376 = cljs.core.next.call(null,seq__11356__$1);
var G__11377 = null;
var G__11378 = (0);
var G__11379 = (0);
seq__11356 = G__11376;
chunk__11357 = G__11377;
count__11358 = G__11378;
i__11359 = G__11379;
continue;
}
} else {
return null;
}
}
break;
}
});
adzerk.boot_reload.reload.reload_js = (function adzerk$boot_reload$reload$reload_js(changed,p__11382){
var map__11385 = p__11382;
var map__11385__$1 = ((((!((map__11385 == null)))?((((map__11385.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11385.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11385):map__11385);
var on_jsload = cljs.core.get.call(null,map__11385__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),cljs.core.identity);
var js_files = cljs.core.filter.call(null,((function (map__11385,map__11385__$1,on_jsload){
return (function (p1__11380_SHARP_){
return adzerk.boot_reload.reload.ends_with_QMARK_.call(null,p1__11380_SHARP_,".js");
});})(map__11385,map__11385__$1,on_jsload))
,changed);
if(cljs.core.seq.call(null,js_files)){
goog.async.DeferredList.gatherResults(cljs.core.clj__GT_js.call(null,cljs.core.map.call(null,((function (js_files,map__11385,map__11385__$1,on_jsload){
return (function (p1__11381_SHARP_){
return goog.net.jsloader.load(goog.Uri.parse(p1__11381_SHARP_).makeUnique());
});})(js_files,map__11385,map__11385__$1,on_jsload))
,js_files))).addCallbacks(((function (js_files,map__11385,map__11385__$1,on_jsload){
return (function() { 
var G__11387__delegate = function (_){
return on_jsload.call(null);
};
var G__11387 = function (var_args){
var _ = null;
if (arguments.length > 0) {
var G__11388__i = 0, G__11388__a = new Array(arguments.length -  0);
while (G__11388__i < G__11388__a.length) {G__11388__a[G__11388__i] = arguments[G__11388__i + 0]; ++G__11388__i;}
  _ = new cljs.core.IndexedSeq(G__11388__a,0);
} 
return G__11387__delegate.call(this,_);};
G__11387.cljs$lang$maxFixedArity = 0;
G__11387.cljs$lang$applyTo = (function (arglist__11389){
var _ = cljs.core.seq(arglist__11389);
return G__11387__delegate(_);
});
G__11387.cljs$core$IFn$_invoke$arity$variadic = G__11387__delegate;
return G__11387;
})()
;})(js_files,map__11385,map__11385__$1,on_jsload))
,((function (js_files,map__11385,map__11385__$1,on_jsload){
return (function (e){
return console.error("Load failed:",e.message);
});})(js_files,map__11385,map__11385__$1,on_jsload))
);

if(cljs.core.truth_((window["jQuery"]))){
return jQuery(document).trigger("page-load");
} else {
return null;
}
} else {
return null;
}
});
adzerk.boot_reload.reload.reload_html = (function adzerk$boot_reload$reload$reload_html(changed){
var page_path = adzerk.boot_reload.reload.page_uri.getPath();
var html_path = (cljs.core.truth_(adzerk.boot_reload.reload.ends_with_QMARK_.call(null,page_path,"/"))?[cljs.core.str(page_path),cljs.core.str("index.html")].join(''):page_path);
if(cljs.core.truth_(adzerk.boot_reload.reload.changed_href_QMARK_.call(null,html_path,changed))){
return adzerk.boot_reload.reload.reload_page_BANG_.call(null);
} else {
return null;
}
});
adzerk.boot_reload.reload.group_log = (function adzerk$boot_reload$reload$group_log(title,things_to_log){
console.groupCollapsed(title);

var seq__11394_11398 = cljs.core.seq.call(null,things_to_log);
var chunk__11395_11399 = null;
var count__11396_11400 = (0);
var i__11397_11401 = (0);
while(true){
if((i__11397_11401 < count__11396_11400)){
var t_11402 = cljs.core._nth.call(null,chunk__11395_11399,i__11397_11401);
console.log(t_11402);

var G__11403 = seq__11394_11398;
var G__11404 = chunk__11395_11399;
var G__11405 = count__11396_11400;
var G__11406 = (i__11397_11401 + (1));
seq__11394_11398 = G__11403;
chunk__11395_11399 = G__11404;
count__11396_11400 = G__11405;
i__11397_11401 = G__11406;
continue;
} else {
var temp__4425__auto___11407 = cljs.core.seq.call(null,seq__11394_11398);
if(temp__4425__auto___11407){
var seq__11394_11408__$1 = temp__4425__auto___11407;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11394_11408__$1)){
var c__7256__auto___11409 = cljs.core.chunk_first.call(null,seq__11394_11408__$1);
var G__11410 = cljs.core.chunk_rest.call(null,seq__11394_11408__$1);
var G__11411 = c__7256__auto___11409;
var G__11412 = cljs.core.count.call(null,c__7256__auto___11409);
var G__11413 = (0);
seq__11394_11398 = G__11410;
chunk__11395_11399 = G__11411;
count__11396_11400 = G__11412;
i__11397_11401 = G__11413;
continue;
} else {
var t_11414 = cljs.core.first.call(null,seq__11394_11408__$1);
console.log(t_11414);

var G__11415 = cljs.core.next.call(null,seq__11394_11408__$1);
var G__11416 = null;
var G__11417 = (0);
var G__11418 = (0);
seq__11394_11398 = G__11415;
chunk__11395_11399 = G__11416;
count__11396_11400 = G__11417;
i__11397_11401 = G__11418;
continue;
}
} else {
}
}
break;
}

return console.groupEnd();
});
adzerk.boot_reload.reload.reload = (function adzerk$boot_reload$reload$reload(changed,opts){
var changed_STAR_ = cljs.core.map.call(null,(function (p1__11419_SHARP_){
return [cljs.core.str(new cljs.core.Keyword(null,"asset-host","asset-host",-899289050).cljs$core$IFn$_invoke$arity$1(opts)),cljs.core.str(p1__11419_SHARP_)].join('');
}),changed);
adzerk.boot_reload.reload.group_log.call(null,"Reload",changed_STAR_);

var G__11421 = changed_STAR_;
adzerk.boot_reload.reload.reload_js.call(null,G__11421,opts);

adzerk.boot_reload.reload.reload_html.call(null,G__11421);

adzerk.boot_reload.reload.reload_css.call(null,G__11421);

adzerk.boot_reload.reload.reload_img.call(null,G__11421);

return G__11421;
});

//# sourceMappingURL=reload.js.map