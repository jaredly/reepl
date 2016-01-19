// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.show_function');
goog.require('cljs.core');
goog.require('cljs.pprint');
goog.require('reepl.helpers');
goog.require('reagent.core');
goog.require('devtools.format');
goog.require('clojure.string');
reepl.show_function.styles = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"function","function",-2127255473),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),"#00a"], null)], null);
reepl.show_function.view = cljs.core.partial.call(null,reepl.helpers.view,reepl.show_function.styles);
reepl.show_function.text = cljs.core.partial.call(null,reepl.helpers.text,reepl.show_function.styles);
reepl.show_function.button = cljs.core.partial.call(null,reepl.helpers.button,reepl.show_function.styles);
reepl.show_function.cljs_fn_prefix = "cljs$core$IFn$_invoke$arity$";
reepl.show_function.recover_cljs_name = (function reepl$show_function$recover_cljs_name(parts){
return cljs.core.demunge.call(null,[cljs.core.str(clojure.string.join.call(null,".",cljs.core.butlast.call(null,parts))),cljs.core.str("/"),cljs.core.str(cljs.core.last.call(null,parts))].join(''));
});
reepl.show_function.get_cljs_arities = (function reepl$show_function$get_cljs_arities(fn){
return cljs.core.map.call(null,(function (p1__19665_SHARP_){
return (fn[p1__19665_SHARP_]);
}),cljs.core.filter.call(null,(function (p1__19666_SHARP_){
return p1__19666_SHARP_.startsWith(reepl.show_function.cljs_fn_prefix);
}),cljs.core.js__GT_clj.call(null,Object.keys(fn))));
});
reepl.show_function.get_fn_summary = (function reepl$show_function$get_fn_summary(fn){
var source = [cljs.core.str(fn)].join('');
var args = cljs.core.second.call(null,cljs.core.re_find.call(null,/\(([^\)]+)\)/,source));
return cljs.core.map.call(null,cljs.core.demunge,clojure.string.split.call(null,args,","));
});
reepl.show_function.get_function_forms = (function reepl$show_function$get_function_forms(fn){
var arities = reepl.show_function.get_cljs_arities.call(null,fn);
var arities__$1 = ((cljs.core.empty_QMARK_.call(null,arities))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [fn], null):arities);
return cljs.core.map.call(null,reepl.show_function.get_fn_summary,arities__$1);
});
reepl.show_function.get_fn_name = (function reepl$show_function$get_fn_name(fn){
var parts = fn.name.split("$");
if(cljs.core.empty_QMARK_.call(null,fn.name)){
return "*anonymous*";
} else {
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,parts))){
return fn.name;
} else {
return reepl.show_function.recover_cljs_name.call(null,parts);

}
}
});
reepl.show_function.str_fn_forms = (function reepl$show_function$str_fn_forms(forms){
return [cljs.core.str("["),cljs.core.str(clojure.string.join.call(null,"] [",cljs.core.map.call(null,cljs.core.partial.call(null,clojure.string.join," "),forms))),cljs.core.str("]")].join('');
});
reepl.show_function.show_fn_with_docs = (function reepl$show_function$show_fn_with_docs(get_doc,fn,_,___$1){
if(cljs.core._EQ_.call(null,Function,cljs.core.type.call(null,fn))){
var docs = get_doc.call(null,cljs.core.symbol.call(null,reepl.show_function.get_fn_name.call(null,fn)));
var is_native_fn = [cljs.core.str(fn)].join('').match(/\{ \[native code\] \}$/);
if(cljs.core.truth_(docs)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_function.view,new cljs.core.Keyword(null,"function","function",-2127255473),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_function.text,new cljs.core.Keyword(null,"function-docs","function-docs",1575036876),docs], null)], null);
} else {
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_function.view,new cljs.core.Keyword(null,"function","function",-2127255473),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_function.text,new cljs.core.Keyword(null,"function-head","function-head",-157631585),"fn ",reepl.show_function.get_fn_name.call(null,fn)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_function.text,new cljs.core.Keyword(null,"function-arities","function-arities",1634416184),reepl.show_function.str_fn_forms.call(null,reepl.show_function.get_function_forms.call(null,fn))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_function.text,new cljs.core.Keyword(null,"function-body","function-body",-439017929),(cljs.core.truth_(is_native_fn)?"[native code]":null)], null)], null);
}
} else {
return null;
}
});
reepl.show_function.show_fn = (function reepl$show_function$show_fn(f,config,show_value){
return reepl.show_function.show_fn_with_docs.call(null,(function (_){
return null;
}),f,config,show_value);
});
