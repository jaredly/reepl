// Compiled by ClojureScript 1.7.228 {}
goog.provide('devtools.prefs');
goog.require('cljs.core');
goog.require('clojure.string');
devtools.prefs.signature_color = "rgba(100, 255, 100, 1);";
devtools.prefs.signature_color_with_opacity = (function devtools$prefs$signature_color_with_opacity(opacity){
return clojure.string.replace.call(null,devtools.prefs.signature_color,"1);",[cljs.core.str(opacity),cljs.core.str(");")].join(''));
});
devtools.prefs.signature_background = devtools.prefs.signature_color_with_opacity.call(null,0.08);
devtools.prefs.default_prefs = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"max-number-body-items","max-number-body-items",299914624),new cljs.core.Keyword(null,"symbol-style","symbol-style",1022654848),new cljs.core.Keyword(null,"nil-style","nil-style",-1505044832),new cljs.core.Keyword(null,"body-pre-handler","body-pre-handler",1211926529),new cljs.core.Keyword(null,"install-sanity-hints","install-sanity-hints",72546145),new cljs.core.Keyword(null,"line-index-separator","line-index-separator",-1735989246),new cljs.core.Keyword(null,"new-line-string-replacer","new-line-string-replacer",-753206206),new cljs.core.Keyword(null,"header-style","header-style",-2122121341),new cljs.core.Keyword(null,"body-items-more-label","body-items-more-label",-1561152123),new cljs.core.Keyword(null,"has-body-pre-handler","has-body-pre-handler",1787020038),new cljs.core.Keyword(null,"surrogate-key","surrogate-key",391132006),new cljs.core.Keyword(null,"string-abbreviation-marker","string-abbreviation-marker",-347785112),new cljs.core.Keyword(null,"max-header-elements","max-header-elements",713629864),new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.Keyword(null,"sanity-hint-min-length","sanity-hint-min-length",104958154),new cljs.core.Keyword(null,"header-pre-handler","header-pre-handler",-1997722262),new cljs.core.Keyword(null,"standard-li-style","standard-li-style",413442955),new cljs.core.Keyword(null,"body-style","body-style",1462943820),new cljs.core.Keyword(null,"dq","dq",-1690275860),new cljs.core.Keyword(null,"nil-label","nil-label",-587789203),new cljs.core.Keyword(null,"standard-ol-no-margin-style","standard-ol-no-margin-style",-1701969586),new cljs.core.Keyword(null,"standard-ol-style","standard-ol-style",2143825615),new cljs.core.Keyword(null,"file-reader","file-reader",-450847664),new cljs.core.Keyword(null,"float-style","float-style",705926672),new cljs.core.Keyword(null,"body-post-handler","body-post-handler",-1040905424),new cljs.core.Keyword(null,"more-marker","more-marker",-14717935),new cljs.core.Keyword(null,"bool-style","bool-style",-1275737743),new cljs.core.Keyword(null,"seqables-always-expandable","seqables-always-expandable",-1995087215),new cljs.core.Keyword(null,"string-style","string-style",744195825),new cljs.core.Keyword(null,"min-sequable-count-for-expansion","min-sequable-count-for-expansion",1409206097),new cljs.core.Keyword(null,"integer-style","integer-style",1568434578),new cljs.core.Keyword(null,"ol","ol",932524051),new cljs.core.Keyword(null,"spacer","spacer",2067425139),new cljs.core.Keyword(null,"standard-li-no-margin-style","standard-li-no-margin-style",87138485),new cljs.core.Keyword(null,"string-postfix-limit","string-postfix-limit",-1282205963),new cljs.core.Keyword(null,"fn-style","fn-style",1330516917),new cljs.core.Keyword(null,"item-style","item-style",-188747722),new cljs.core.Keyword(null,"index-style","index-style",93813430),new cljs.core.Keyword(null,"has-body-post-handler","has-body-post-handler",-863451271),new cljs.core.Keyword(null,"body-items-more-label-style","body-items-more-label-style",-1440170470),new cljs.core.Keyword(null,"max-print-level","max-print-level",-462237413),new cljs.core.Keyword(null,"meta-wrapper-style","meta-wrapper-style",-1627075237),new cljs.core.Keyword(null,"header-post-handelr","header-post-handelr",1525935099),new cljs.core.Keyword(null,"meta-body-style","meta-body-style",-1858094980),new cljs.core.Keyword(null,"string-prefix-limit","string-prefix-limit",1256106332),new cljs.core.Keyword(null,"cljs-style","cljs-style",1984116061),new cljs.core.Keyword(null,"print-meta-data","print-meta-data",1409048509),new cljs.core.Keyword(null,"keyword-style","keyword-style",-780643937),new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.Keyword(null,"meta-style","meta-style",1528213407)],[(100),"color:#000000","color:#808080",null,false,":","\u21B5","","more\u2026",null,"$$this-is-cljs-devtools-surrogate"," \u2026 ",(5),"li",(128),null,"margin-left:12px",[cljs.core.str("display:inline-block;border: 1px dashed "),cljs.core.str(devtools.prefs.signature_color_with_opacity.call(null,0.4)),cljs.core.str(";border-top:none;border-radius:1px;margin: 0px 4px 2px 4px;background-color:"),cljs.core.str(devtools.prefs.signature_background)].join(''),"\"","nil","list-style-type:none; padding-left:0px; margin-top:0px; margin-bottom:0px; margin-left:0px","list-style-type:none; padding-left:0px; margin-top:0px; margin-bottom:0px; margin-left:12px",null,"color:#1C88CF",null,"\u2026","color:#099",true,"color:#C41A16",(3),"color:#1C00CF","ol"," ","margin-left:0px",(20),"color:#090","","color:#881391",null,"background-color:#999; color:#fff; padding:0px 2px 0px 2px;-webkit-user-select: none;",(2),"background-color:#efe; border:1px solid #ada; border-radius:2px;",null,"border:1px solid #ada; position:relative; left:1px; top:-1px; margin-left:-1px; padding:1px; border-bottom-left-radius:2px; border-bottom-right-radius:2px;",(20),[cljs.core.str("background-color:"),cljs.core.str(devtools.prefs.signature_background)].join(''),true,"color:#881391","span","background-color:#ada; color:#fff; padding:0px 2px 0px 4px;-webkit-user-select: none;"]);
devtools.prefs._STAR_prefs_STAR_ = devtools.prefs.default_prefs;
devtools.prefs.get_prefs = (function devtools$prefs$get_prefs(){
return devtools.prefs._STAR_prefs_STAR_;
});
devtools.prefs.pref = (function devtools$prefs$pref(key){
return key.call(null,devtools.prefs._STAR_prefs_STAR_);
});
devtools.prefs.set_prefs_BANG_ = (function devtools$prefs$set_prefs_BANG_(new_prefs){
return devtools.prefs._STAR_prefs_STAR_ = new_prefs;
});
devtools.prefs.set_pref_BANG_ = (function devtools$prefs$set_pref_BANG_(key,val){
return devtools.prefs.set_prefs_BANG_.call(null,cljs.core.assoc.call(null,devtools.prefs.get_prefs.call(null),key,val));
});
devtools.prefs.merge_prefs_BANG_ = (function devtools$prefs$merge_prefs_BANG_(m){
return devtools.prefs.set_prefs_BANG_.call(null,cljs.core.merge.call(null,devtools.prefs.get_prefs.call(null),m));
});
devtools.prefs.update_pref_BANG_ = (function devtools$prefs$update_pref_BANG_(var_args){
var args__7518__auto__ = [];
var len__7511__auto___16383 = arguments.length;
var i__7512__auto___16384 = (0);
while(true){
if((i__7512__auto___16384 < len__7511__auto___16383)){
args__7518__auto__.push((arguments[i__7512__auto___16384]));

var G__16385 = (i__7512__auto___16384 + (1));
i__7512__auto___16384 = G__16385;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((2) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((2)),(0))):null);
return devtools.prefs.update_pref_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7519__auto__);
});

devtools.prefs.update_pref_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (key,f,args){
var new_val = cljs.core.apply.call(null,f,devtools.prefs.pref.call(null,key),args);
return devtools.prefs.set_pref_BANG_.call(null,key,new_val);
});

devtools.prefs.update_pref_BANG_.cljs$lang$maxFixedArity = (2);

devtools.prefs.update_pref_BANG_.cljs$lang$applyTo = (function (seq16380){
var G__16381 = cljs.core.first.call(null,seq16380);
var seq16380__$1 = cljs.core.next.call(null,seq16380);
var G__16382 = cljs.core.first.call(null,seq16380__$1);
var seq16380__$2 = cljs.core.next.call(null,seq16380__$1);
return devtools.prefs.update_pref_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__16381,G__16382,seq16380__$2);
});
