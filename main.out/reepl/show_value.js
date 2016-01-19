// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.show_value');
goog.require('cljs.core');
goog.require('cljs.pprint');
goog.require('reepl.helpers');
goog.require('reagent.core');
goog.require('devtools.format');
goog.require('clojure.string');
reepl.show_value.styles = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"value-head","value-head",539403224),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521)], null),new cljs.core.Keyword(null,"inline-value","inline-value",-1653809558),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"inline-flex","inline-flex",245145136)], null),new cljs.core.Keyword(null,"value-toggle","value-toggle",-878424841),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(9),new cljs.core.Keyword(null,"padding","padding",1660304693),(4),new cljs.core.Keyword(null,"cursor","cursor",1011937484),new cljs.core.Keyword(null,"pointer","pointer",85071187)], null),new cljs.core.Keyword(null,"function","function",-2127255473),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"#00a"], null)], null);
reepl.show_value.view = cljs.core.partial.call(null,reepl.helpers.view,reepl.show_value.styles);
reepl.show_value.str_QMARK_ = (function reepl$show_value$str_QMARK_(val){
return cljs.core._EQ_.call(null,String,cljs.core.type.call(null,val));
});
reepl.show_value.pprint_str = (function reepl$show_value$pprint_str(val){
return cljs.pprint.write.call(null,val,new cljs.core.Keyword(null,"stream","stream",1534941648),null);
});
reepl.show_value.show_str = (function reepl$show_value$show_str(val){
if(cljs.core.truth_(reepl.show_value.str_QMARK_.call(null,val))){
return val;
} else {
return reepl.show_value.pprint_str.call(null,val);
}
});
reepl.show_value.show_value_ = (function reepl$show_value$show_value_(val,config,showers){
var shower_list = showers;
while(true){
if(cljs.core.empty_QMARK_.call(null,shower_list)){
throw (new Error([cljs.core.str("No shower for value "),cljs.core.str(val)].join('')));
} else {
var res = cljs.core.first.call(null,shower_list).call(null,val,config,((function (shower_list){
return (function (p1__16835_SHARP_,p2__16836_SHARP_){
return reepl$show_value$show_value_.call(null,p1__16835_SHARP_,p2__16836_SHARP_,showers);
});})(shower_list))
);
if(cljs.core.truth_(res)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_value.view,new cljs.core.Keyword(null,"inline-value","inline-value",-1653809558),res], null);
} else {
var G__16837 = cljs.core.rest.call(null,shower_list);
shower_list = G__16837;
continue;
}
}
break;
}
});
reepl.show_value.show_value = (function reepl$show_value$show_value(val,opts,show_opts){
return reepl.show_value.show_value_.call(null,val,opts,cljs.core.conj.call(null,cljs.core.vec.call(null,new cljs.core.Keyword(null,"showers","showers",1548575441).cljs$core$IFn$_invoke$arity$1(show_opts)),reepl.show_value.show_str));
});
