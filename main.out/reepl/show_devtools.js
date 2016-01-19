// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.show_devtools');
goog.require('cljs.core');
goog.require('cljs.pprint');
goog.require('reepl.helpers');
goog.require('reagent.core');
goog.require('devtools.format');
goog.require('clojure.string');
reepl.show_devtools.styles = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value-head","value-head",539403224),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521)], null),new cljs.core.Keyword(null,"value-toggle","value-toggle",-878424841),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"font-size","font-size",-1847940346),(9),new cljs.core.Keyword(null,"padding","padding",1660304693),(4),new cljs.core.Keyword(null,"cursor","cursor",1011937484),new cljs.core.Keyword(null,"pointer","pointer",85071187)], null)], null);
reepl.show_devtools.view = cljs.core.partial.call(null,reepl.helpers.view,reepl.show_devtools.styles);
reepl.show_devtools.text = cljs.core.partial.call(null,reepl.helpers.text,reepl.show_devtools.styles);
reepl.show_devtools.button = cljs.core.partial.call(null,reepl.helpers.button,reepl.show_devtools.styles);
reepl.show_devtools.str_QMARK_ = (function reepl$show_devtools$str_QMARK_(val){
return cljs.core._EQ_.call(null,String,cljs.core.type.call(null,val));
});
reepl.show_devtools.pprint_str = (function reepl$show_devtools$pprint_str(val){
return cljs.pprint.write.call(null,val,new cljs.core.Keyword(null,"stream","stream",1534941648),null);
});
reepl.show_devtools.js_array_QMARK_ = (function reepl$show_devtools$js_array_QMARK_(val){
return cljs.core._EQ_.call(null,Array,cljs.core.type.call(null,val));
});
reepl.show_devtools.parse_style = (function reepl$show_devtools$parse_style(raw){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (line){
var vec__15938 = clojure.string.split.call(null,line,":");
var k = cljs.core.nth.call(null,vec__15938,(0),null);
var v = cljs.core.nth.call(null,vec__15938,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,k),v], null);
}),clojure.string.split.call(null,raw,";")));
});
reepl.show_devtools.show_el = (function reepl$show_devtools$show_el(val,show_value){
var type = cljs.core.first.call(null,val);
var opts = cljs.core.second.call(null,val);
var children = cljs.core.drop.call(null,(2),val);
if(cljs.core._EQ_.call(null,"object",type)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [show_value,opts.object,opts.config], null);
} else {
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,type),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),(cljs.core.truth_(opts)?reepl.show_devtools.parse_style.call(null,opts.style):null)], null)], null),cljs.core.map.call(null,((function (type,opts,children){
return (function (p1__15939_SHARP_){
if(cljs.core.not.call(null,reepl.show_devtools.js_array_QMARK_.call(null,p1__15939_SHARP_))){
return p1__15939_SHARP_;
} else {
return reepl$show_devtools$show_el.call(null,p1__15939_SHARP_,show_value);
}
});})(type,opts,children))
,children));
}
});
reepl.show_devtools.openable = (function reepl$show_devtools$openable(header,val,config,show_value){
var open = reagent.core.atom.call(null,false);
return ((function (open){
return (function (_,___$1){
var is_open = cljs.core.deref.call(null,open);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_devtools.view,new cljs.core.Keyword(null,"value-with-body","value-with-body",960245150),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_devtools.view,new cljs.core.Keyword(null,"value-head","value-head",539403224),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_devtools.view,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (is_open,open){
return (function (){
return cljs.core.swap_BANG_.call(null,open,cljs.core.not);
});})(is_open,open))
,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.Keyword(null,"value-toggle","value-toggle",-878424841)], null),(cljs.core.truth_(is_open)?"\u25BC":"\u25B6")], null),reepl.show_devtools.show_el.call(null,header,show_value)], null),(cljs.core.truth_(is_open)?reepl.show_devtools.show_el.call(null,devtools.format.body_api_call.call(null,val,config),show_value):null)], null);
});
;})(open))
});
reepl.show_devtools.show_devtools = (function reepl$show_devtools$show_devtools(val,config,show_value){
if(cljs.core.var_QMARK_.call(null,val)){
return null;
} else {
var header = (function (){try{return devtools.format.header_api_call.call(null,val,config);
}catch (e15941){if((e15941 instanceof Error)){
var e = e15941;
return e;
} else {
throw e15941;

}
}})();
if(cljs.core.not.call(null,header)){
return null;
} else {
if((header instanceof Error)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_devtools.view,new cljs.core.Keyword(null,"inline-value","inline-value",-1653809558),"Error expanding lazy value"], null);
} else {
if(cljs.core.not.call(null,devtools.format.has_body_api_call.call(null,val,config))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_devtools.view,new cljs.core.Keyword(null,"inline-value","inline-value",-1653809558),reepl.show_devtools.show_el.call(null,header,show_value)], null);
} else {
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_devtools.openable,header,val,config,show_value], null);
}

}
}
}
});

//# sourceMappingURL=show_devtools.js.map