// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.replumb');
goog.require('cljs.core');
goog.require('replumb.core');
goog.require('cljs.pprint');
goog.require('reepl.helpers');
goog.require('parinfer_codemirror.editor');
goog.require('reepl.core');
goog.require('cljs.tools.reader');
goog.require('cljs.tagged_literals');
goog.require('reagent.core');
goog.require('cljs.js');
goog.require('cljs.tools.reader.reader_types');
goog.require('cljs.analyzer');
goog.require('replumb.doc_maps');
goog.require('devtools.core');
goog.require('replumb.ast');
goog.require('goog.net.XhrIo');
goog.require('replumb.repl');
goog.require('cljs.repl');
goog.require('clojure.string');
/**
 * Very simple implementation of XMLHttpRequests that given a file path
 *   calls src-cb with the string fetched of nil in case of error.
 *   See doc at https://developers.google.com/closure/library/docs/xhrio
 */
reepl.replumb.fetch_file_BANG_ = (function reepl$replumb$fetch_file_BANG_(file_url,src_cb){
try{return goog.net.XhrIo.send(file_url,(function (e){
if(cljs.core.truth_(e.target.isSuccess())){
return src_cb.call(null,e.target.getResponseText());
} else {
return src_cb.call(null,null);
}
}));
}catch (e19824){var e = e19824;
return src_cb.call(null,null);
}});
reepl.replumb.replumb_opts = cljs.core.merge.call(null,replumb.core.browser_options.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/main.out","/main.out"], null),reepl.replumb.fetch_file_BANG_),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warning-as-error","warning-as-error",1347418166),true,new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),true], null));
reepl.replumb.find_last_expr_pos = (function reepl$replumb$find_last_expr_pos(text){
var _STAR_data_readers_STAR_19828 = cljs.tools.reader._STAR_data_readers_STAR_;
cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

try{var rr = cljs.tools.reader.reader_types.string_push_back_reader.call(null,text);
var eof = {};
var read = ((function (rr,eof,_STAR_data_readers_STAR_19828){
return (function (){
return cljs.tools.reader.read.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eof","eof",-489063237),eof], null),rr);
});})(rr,eof,_STAR_data_readers_STAR_19828))
;
var last_pos = (0);
var second_pos = (0);
var last_form = null;
var second_form = null;
while(true){
var form = read.call(null);
var new_pos = rr.rdr.s_pos;
if((eof === form)){
return second_pos;
} else {
var G__19831 = new_pos;
var G__19832 = last_pos;
var G__19833 = form;
var G__19834 = last_form;
last_pos = G__19831;
second_pos = G__19832;
last_form = G__19833;
second_form = G__19834;
continue;
}
break;
}
}finally {cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_19828;
}});
reepl.replumb.make_last_expr_set_val = (function reepl$replumb$make_last_expr_set_val(text,js_name){
var last_pos = reepl.replumb.find_last_expr_pos.call(null,text);
console.log(last_pos,text);

if(cljs.core._EQ_.call(null,last_pos,(0))){
return null;
} else {
return [cljs.core.str(text.slice((0),last_pos)),cljs.core.str("(aset js/window \""),cljs.core.str(js_name),cljs.core.str("\" "),cljs.core.str(text.slice(last_pos)),cljs.core.str(")")].join('');
}
});
reepl.replumb.jsc_run = (function reepl$replumb$jsc_run(source,cb){
return cljs.js.eval_str.call(null,replumb.repl.st,source,new cljs.core.Symbol(null,"stuff","stuff",-411032116,null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"eval","eval",-1103567905),(function() { 
var reepl$replumb$jsc_run_$_a__delegate = function (b){
console.log("eval source",b);

return cljs.core.apply.call(null,cljs.js.js_eval,b);
};
var reepl$replumb$jsc_run_$_a = function (var_args){
var b = null;
if (arguments.length > 0) {
var G__19835__i = 0, G__19835__a = new Array(arguments.length -  0);
while (G__19835__i < G__19835__a.length) {G__19835__a[G__19835__i] = arguments[G__19835__i + 0]; ++G__19835__i;}
  b = new cljs.core.IndexedSeq(G__19835__a,0);
} 
return reepl$replumb$jsc_run_$_a__delegate.call(this,b);};
reepl$replumb$jsc_run_$_a.cljs$lang$maxFixedArity = 0;
reepl$replumb$jsc_run_$_a.cljs$lang$applyTo = (function (arglist__19836){
var b = cljs.core.seq(arglist__19836);
return reepl$replumb$jsc_run_$_a__delegate(b);
});
reepl$replumb$jsc_run_$_a.cljs$core$IFn$_invoke$arity$variadic = reepl$replumb$jsc_run_$_a__delegate;
return reepl$replumb$jsc_run_$_a;
})()
,new cljs.core.Keyword(null,"ns","ns",441598760),replumb.repl.current_ns.call(null),new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true], null),(function (result){
cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"current-ns","current-ns",1661653428),new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(result));

if(cljs.core.contains_QMARK_.call(null,result,new cljs.core.Keyword(null,"error","error",-978969032))){
return cb.call(null,false,new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(result));
} else {
return cb.call(null,true,(window["last_repl_value"]));
}
}));
});
reepl.replumb.get_first_form = (function reepl$replumb$get_first_form(text){
var _STAR_data_readers_STAR_19838 = cljs.tools.reader._STAR_data_readers_STAR_;
cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

try{var rr = cljs.tools.reader.reader_types.string_push_back_reader.call(null,text);
var form = cljs.tools.reader.read.call(null,rr);
var s_pos = rr.rdr.s_pos;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [form,s_pos], null);
}finally {cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_19838;
}});
reepl.replumb.run_repl_multi = (function reepl$replumb$run_repl_multi(text,opts,cb){
var text__$1 = text.trim();
var vec__19841 = reepl.replumb.get_first_form.call(null,text__$1);
var form = cljs.core.nth.call(null,vec__19841,(0),null);
var pos = cljs.core.nth.call(null,vec__19841,(1),null);
var source = text__$1.slice((0),pos);
var remainder = text__$1.slice(pos).trim();
var has_more_QMARK_ = !(cljs.core.empty_QMARK_.call(null,remainder));
console.log(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [text__$1,form,pos,source,remainder,has_more_QMARK_], null));

return replumb.core.read_eval_call.call(null,opts,((function (text__$1,vec__19841,form,pos,source,remainder,has_more_QMARK_){
return (function (p1__19839_SHARP_){
var success_QMARK_ = replumb.core.success_QMARK_.call(null,p1__19839_SHARP_);
var result = replumb.core.unwrap_result.call(null,p1__19839_SHARP_);
console.log("evaled",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [success_QMARK_,result,has_more_QMARK_], null));

if(cljs.core.not.call(null,success_QMARK_)){
return cb.call(null,success_QMARK_,result);
} else {
if(has_more_QMARK_){
return reepl$replumb$run_repl_multi.call(null,remainder,opts,cb);
} else {
return cb.call(null,success_QMARK_,result);
}
}
});})(text__$1,vec__19841,form,pos,source,remainder,has_more_QMARK_))
,source);
});
reepl.replumb.run_repl_experimental_STAR_ = (function reepl$replumb$run_repl_experimental_STAR_(text,opts,cb){
var fixed = reepl.replumb.make_last_expr_set_val.call(null,text,"last_repl_value");
if(cljs.core.truth_(fixed)){
return reepl.replumb.jsc_run.call(null,fixed,cb);
} else {
return replumb.core.read_eval_call.call(null,opts,((function (fixed){
return (function (p1__19842_SHARP_){
return cb.call(null,replumb.core.success_QMARK_.call(null,p1__19842_SHARP_),replumb.core.unwrap_result.call(null,p1__19842_SHARP_));
});})(fixed))
,text);
}
});
reepl.replumb.fix_ns_do = (function reepl$replumb$fix_ns_do(text){
var _STAR_data_readers_STAR_19844 = cljs.tools.reader._STAR_data_readers_STAR_;
cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

try{var rr = cljs.tools.reader.reader_types.string_push_back_reader.call(null,text);
var form = cljs.tools.reader.read.call(null,rr);
var is_ns = (cljs.core.sequential_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"ns","ns",2082130287,null),cljs.core.first.call(null,form)));
var s_pos = rr.rdr.s_pos;
console.log(is_ns,form,s_pos);

if(!(is_ns)){
return [cljs.core.str("(do "),cljs.core.str(text),cljs.core.str(")")].join('');
} else {
return [cljs.core.str(text.slice((0),s_pos)),cljs.core.str("(do "),cljs.core.str(text.slice(s_pos)),cljs.core.str(")")].join('');
}
}finally {cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_19844;
}});
reepl.replumb.run_repl_STAR_ = (function reepl$replumb$run_repl_STAR_(text,opts,cb){
return replumb.core.read_eval_call.call(null,opts,(function (p1__19845_SHARP_){
return cb.call(null,replumb.core.success_QMARK_.call(null,p1__19845_SHARP_),replumb.core.unwrap_result.call(null,p1__19845_SHARP_));
}),reepl.replumb.fix_ns_do.call(null,text));
});
reepl.replumb.run_repl = (function reepl$replumb$run_repl(var_args){
var args19846 = [];
var len__7511__auto___19849 = arguments.length;
var i__7512__auto___19850 = (0);
while(true){
if((i__7512__auto___19850 < len__7511__auto___19849)){
args19846.push((arguments[i__7512__auto___19850]));

var G__19851 = (i__7512__auto___19850 + (1));
i__7512__auto___19850 = G__19851;
continue;
} else {
}
break;
}

var G__19848 = args19846.length;
switch (G__19848) {
case 2:
return reepl.replumb.run_repl.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reepl.replumb.run_repl.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19846.length)].join('')));

}
});

reepl.replumb.run_repl.cljs$core$IFn$_invoke$arity$2 = (function (text,cb){
return reepl.replumb.run_repl_multi.call(null,text,reepl.replumb.replumb_opts,cb);
});

reepl.replumb.run_repl.cljs$core$IFn$_invoke$arity$3 = (function (text,opts,cb){
return reepl.replumb.run_repl_multi.call(null,text,cljs.core.merge.call(null,reepl.replumb.replumb_opts,opts),cb);
});

reepl.replumb.run_repl.cljs$lang$maxFixedArity = 3;
/**
 * The comparison algo for completions
 * 
 *   1. if one is exactly the text, then it goes first
 *   2. if one *starts* with the text, then it goes first
 *   3. otherwise leave in current order
 */
reepl.replumb.compare_completion = (function reepl$replumb$compare_completion(text,a,b){
if((cljs.core._EQ_.call(null,text,a)) && (cljs.core._EQ_.call(null,text,b))){
return (0);
} else {
if(cljs.core._EQ_.call(null,text,a)){
return (-1);
} else {
if(cljs.core._EQ_.call(null,text,b)){
return (1);
} else {
var a_starts = cljs.core._EQ_.call(null,(0),a.indexOf(text));
var b_starts = cljs.core._EQ_.call(null,(0),b.indexOf(text));
if((a_starts) && (b_starts)){
return (0);
} else {
if(a_starts){
return (-1);
} else {
if(b_starts){
return (1);
} else {
return (0);

}
}
}

}
}
}
});
/**
 * Sorting algo for namespaces
 * 
 *   The current ns comes first, then cljs.core, then anything else
 *   alphabetically
 */
reepl.replumb.compare_ns = (function reepl$replumb$compare_ns(current,ns1,ns2){
if(cljs.core._EQ_.call(null,ns1,current)){
return (-1);
} else {
if(cljs.core._EQ_.call(null,ns2,current)){
return (1);
} else {
if(cljs.core._EQ_.call(null,ns1,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
return (-1);
} else {
if(cljs.core._EQ_.call(null,ns2,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
return (1);
} else {
return cljs.core.compare.call(null,ns1,ns2);

}
}
}
}
});
/**
 * Use js introspection to get a list of interns in a namespaces
 * 
 *   This is pretty dependent on cljs runtime internals, so it may break in the
 *   future (although I think it's fairly unlikely). It takes advantage of the fact
 *   that the ns `something.other.thing' is available as an object on
 *   `window.something.other.thing', and Object.keys gets all the variables in that
 *   namespace.
 */
reepl.replumb.get_from_js_ns = (function reepl$replumb$get_from_js_ns(ns){
var parts = cljs.core.map.call(null,cljs.core.munge,[cljs.core.str(ns)].join('').split("."));
var ns__$1 = cljs.core.reduce.call(null,cljs.core.aget,window,parts);
if(cljs.core.not.call(null,ns__$1)){
return cljs.core.PersistentVector.EMPTY;
} else {
return cljs.core.map.call(null,cljs.core.demunge,Object.keys(ns__$1));
}
});
/**
 * Takes a map of {require-name ns-name} and dedups multiple keys that have the
 *   same ns-name value.
 */
reepl.replumb.dedup_requires = (function reepl$replumb$dedup_requires(requires){
return cljs.core.first.call(null,cljs.core.reduce.call(null,(function (p__19857,p__19858){
var vec__19859 = p__19857;
var result = cljs.core.nth.call(null,vec__19859,(0),null);
var seen = cljs.core.nth.call(null,vec__19859,(1),null);
var vec__19860 = p__19858;
var k = cljs.core.nth.call(null,vec__19860,(0),null);
var v = cljs.core.nth.call(null,vec__19860,(1),null);
if(cljs.core.truth_(seen.call(null,v))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,seen], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,result,k,v),cljs.core.conj.call(null,seen,v)], null);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentHashSet.EMPTY], null),requires));
});
reepl.replumb.get_matching_ns_interns = (function reepl$replumb$get_matching_ns_interns(p__19862,matches_QMARK_,only_ns){
var vec__19864 = p__19862;
var name = cljs.core.nth.call(null,vec__19864,(0),null);
var ns = cljs.core.nth.call(null,vec__19864,(1),null);
var ns_name = [cljs.core.str(ns)].join('');
var publics = cljs.core.keys.call(null,replumb.ast.ns_publics.call(null,cljs.core.deref.call(null,replumb.repl.st),ns));
var publics__$1 = ((cljs.core.empty_QMARK_.call(null,publics))?reepl.replumb.get_from_js_ns.call(null,ns):publics);
if(!(((only_ns == null)) || (cljs.core._EQ_.call(null,only_ns,ns_name)))){
return cljs.core.PersistentVector.EMPTY;
} else {
return cljs.core.sort.call(null,cljs.core.map.call(null,((function (ns_name,publics,publics__$1,vec__19864,name,ns){
return (function (p1__19861_SHARP_){
return cljs.core.symbol.call(null,name,[cljs.core.str(p1__19861_SHARP_)].join(''));
});})(ns_name,publics,publics__$1,vec__19864,name,ns))
,cljs.core.filter.call(null,matches_QMARK_,publics__$1)));
}
});
reepl.replumb.js_attrs = (function reepl$replumb$js_attrs(obj){
if(cljs.core.not.call(null,obj)){
return cljs.core.PersistentVector.EMPTY;
} else {
var constructor$ = obj.constructor;
var proto = Object.getPrototypeOf(obj);
return cljs.core.concat.call(null,Object.keys(obj),((cljs.core._EQ_.call(null,proto,obj))?null:reepl$replumb$js_attrs.call(null,proto)));
}
});
reepl.replumb.js_completion = (function reepl$replumb$js_completion(text){
var parts = cljs.core.vec.call(null,text.split("."));
var completing = (function (){var or__6453__auto__ = cljs.core.last.call(null,parts);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return "";
}
})();
var prefix = ((function (parts,completing){
return (function (p1__19865_SHARP_){
return [cljs.core.str("js/"),cljs.core.str(clojure.string.join.call(null,".",cljs.core.conj.call(null,cljs.core.vec.call(null,cljs.core.butlast.call(null,parts)),p1__19865_SHARP_)))].join('');
});})(parts,completing))
;
var possibles = reepl.replumb.js_attrs.call(null,cljs.core.reduce.call(null,cljs.core.aget,window,cljs.core.butlast.call(null,parts)));
return cljs.core.map.call(null,((function (parts,completing,prefix,possibles){
return (function (p1__19867_SHARP_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,prefix.call(null,p1__19867_SHARP_),prefix.call(null,p1__19867_SHARP_)], null);
});})(parts,completing,prefix,possibles))
,cljs.core.sort.call(null,cljs.core.partial.call(null,reepl.replumb.compare_completion,text),cljs.core.filter.call(null,((function (parts,completing,prefix,possibles){
return (function (p1__19866_SHARP_){
return !(cljs.core._EQ_.call(null,(-1),p1__19866_SHARP_.indexOf(completing)));
});})(parts,completing,prefix,possibles))
,possibles)));
});
/**
 * Tab completion. Copied w/ extensive modifications from replumb.repl/process-apropos.
 */
reepl.replumb.cljs_completion = (function reepl$replumb$cljs_completion(text){
var vec__19874 = ((!(cljs.core._EQ_.call(null,(-1),text.indexOf("/"))))?text.split("/"):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,text], null));
var only_ns = cljs.core.nth.call(null,vec__19874,(0),null);
var text__$1 = cljs.core.nth.call(null,vec__19874,(1),null);
var matches_QMARK_ = ((function (vec__19874,only_ns,text__$1){
return (function (p1__19868_SHARP_){
return (cljs.core._EQ_.call(null,(-1),[cljs.core.str(p1__19868_SHARP_)].join('').indexOf("t_cljs$core"))) && (((-1) < [cljs.core.str(p1__19868_SHARP_)].join('').indexOf(text__$1)));
});})(vec__19874,only_ns,text__$1))
;
var current_ns = replumb.repl.current_ns.call(null);
var replace_name = ((function (vec__19874,only_ns,text__$1,matches_QMARK_,current_ns){
return (function (sym){
if((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,sym),"cljs.core")) || (cljs.core._EQ_.call(null,cljs.core.namespace.call(null,sym),[cljs.core.str(current_ns)].join('')))){
return cljs.core.name.call(null,sym);
} else {
return [cljs.core.str(sym)].join('');
}
});})(vec__19874,only_ns,text__$1,matches_QMARK_,current_ns))
;
var requires = new cljs.core.Keyword(null,"requires","requires",-1201390927).cljs$core$IFn$_invoke$arity$1(replumb.ast.namespace.call(null,cljs.core.deref.call(null,replumb.repl.st),current_ns));
var only_ns__$1 = (cljs.core.truth_(only_ns)?(function (){var or__6453__auto__ = [cljs.core.str(cljs.core.get.call(null,requires,cljs.core.symbol.call(null,only_ns)))].join('');
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return only_ns;
}
})():null);
var requires__$1 = cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,current_ns], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null)], null)], null),reepl.replumb.dedup_requires.call(null,cljs.core.vec.call(null,requires)));
var names = cljs.core.set.call(null,cljs.core.apply.call(null,cljs.core.concat,requires__$1));
var defs = cljs.core.sort_by.call(null,((function (vec__19874,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names){
return (function (p1__19871_SHARP_){
return cljs.core.get.call(null,p1__19871_SHARP_,(3));
});})(vec__19874,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names))
,cljs.core.partial.call(null,reepl.replumb.compare_completion,text__$1),cljs.core.map.call(null,((function (vec__19874,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names){
return (function (p1__19870_SHARP_){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__19870_SHARP_,[cljs.core.str(p1__19870_SHARP_)].join(''),replace_name.call(null,p1__19870_SHARP_),cljs.core.name.call(null,p1__19870_SHARP_)], null);
});})(vec__19874,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names))
,cljs.core.mapcat.call(null,((function (vec__19874,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names){
return (function (p1__19869_SHARP_){
return reepl.replumb.get_matching_ns_interns.call(null,p1__19869_SHARP_,matches_QMARK_,only_ns__$1);
});})(vec__19874,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names))
,cljs.core.sort_by.call(null,cljs.core.second,cljs.core.partial.call(null,reepl.replumb.compare_ns,current_ns),requires__$1))));
return cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.take.call(null,(75),defs),cljs.core.map.call(null,((function (vec__19874,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names,defs){
return (function (p1__19872_SHARP_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__19872_SHARP_,[cljs.core.str(p1__19872_SHARP_)].join(''),[cljs.core.str(p1__19872_SHARP_)].join('')], null);
});})(vec__19874,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names,defs))
,cljs.core.filter.call(null,matches_QMARK_,names))));
});
reepl.replumb.process_apropos = (function reepl$replumb$process_apropos(text){
if(cljs.core._EQ_.call(null,(0),text.indexOf("js/"))){
return reepl.replumb.js_completion.call(null,text.slice((3)));
} else {
return reepl.replumb.cljs_completion.call(null,text);
}
});
reepl.replumb.get_forms = (function reepl$replumb$get_forms(m){
if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
return new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m);
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__6453__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
return arglists;
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists))){
return cljs.core.second.call(null,arglists);
} else {
return arglists;
}
}
} else {
return null;
}
}
});
reepl.replumb.get_doc = (function reepl$replumb$get_doc(m){
return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),[cljs.core.str((function (){var temp__4425__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4425__auto__)){
var ns = temp__4425__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''),new cljs.core.Keyword(null,"type","type",1174270348),(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))?new cljs.core.Keyword(null,"protocol","protocol",652470118):(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))?new cljs.core.Keyword(null,"special-form","special-form",-1326536374):(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))?new cljs.core.Keyword(null,"macro","macro",-867863404):(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))?new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725):new cljs.core.Keyword(null,"normal","normal",-1519123858)
)))),new cljs.core.Keyword(null,"forms","forms",2045992350),reepl.replumb.get_forms.call(null,m),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"please-see","please-see",1016790316),((cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046)))?(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))?[cljs.core.str("http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''):null):[cljs.core.str("http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''))], null):(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"protocol-methods","protocol-methods",1797535120),new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m)], null):null)));
});
reepl.replumb.doc_from_sym = (function reepl$replumb$doc_from_sym(sym){
if(cljs.core.truth_(replumb.doc_maps.special_doc_map.call(null,sym))){
return reepl.replumb.get_doc.call(null,replumb.doc_maps.special_doc.call(null,sym));
} else {
if(cljs.core.truth_(replumb.doc_maps.repl_special_doc_map.call(null,sym))){
return reepl.replumb.get_doc.call(null,replumb.doc_maps.repl_special_doc.call(null,sym));
} else {
if(cljs.core.truth_(replumb.ast.namespace.call(null,cljs.core.deref.call(null,replumb.repl.st),sym))){
return reepl.replumb.get_doc.call(null,cljs.core.select_keys.call(null,replumb.ast.namespace.call(null,cljs.core.deref.call(null,replumb.repl.st),sym),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"doc","doc",1913296891)], null)));
} else {
return reepl.replumb.get_doc.call(null,replumb.repl.get_var.call(null,null,replumb.repl.empty_analyzer_env.call(null),sym));

}
}
}
});
reepl.replumb.type_name = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"protocol","protocol",652470118),"Protocol",new cljs.core.Keyword(null,"special-form","special-form",-1326536374),"Special Form",new cljs.core.Keyword(null,"macro","macro",-867863404),"Macro",new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725),"REPL Special Function"], null);
reepl.replumb.print_doc = (function reepl$replumb$print_doc(doc){
cljs.core.println.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(doc));

if(!(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"normal","normal",-1519123858),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(doc)))){
cljs.core.println.call(null,reepl.replumb.type_name.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(doc)));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(doc))){
cljs.core.prn.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(doc));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"please-see","please-see",1016790316).cljs$core$IFn$_invoke$arity$1(doc))){
cljs.core.println.call(null,[cljs.core.str("\n  Please see "),cljs.core.str(new cljs.core.Keyword(null,"please-see","please-see",1016790316).cljs$core$IFn$_invoke$arity$1(doc))].join(''));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(doc))){
cljs.core.println.call(null,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(doc));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(doc))){
var seq__19885 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(doc));
var chunk__19886 = null;
var count__19887 = (0);
var i__19888 = (0);
while(true){
if((i__19888 < count__19887)){
var vec__19889 = cljs.core._nth.call(null,chunk__19886,i__19888);
var name = cljs.core.nth.call(null,vec__19889,(0),null);
var map__19890 = cljs.core.nth.call(null,vec__19889,(1),null);
var map__19890__$1 = ((((!((map__19890 == null)))?((((map__19890.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19890.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19890):map__19890);
var doc__$1 = cljs.core.get.call(null,map__19890__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__19890__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc__$1)){
cljs.core.println.call(null," ",doc__$1);
} else {
}

var G__19895 = seq__19885;
var G__19896 = chunk__19886;
var G__19897 = count__19887;
var G__19898 = (i__19888 + (1));
seq__19885 = G__19895;
chunk__19886 = G__19896;
count__19887 = G__19897;
i__19888 = G__19898;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__19885);
if(temp__4425__auto__){
var seq__19885__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19885__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__19885__$1);
var G__19899 = cljs.core.chunk_rest.call(null,seq__19885__$1);
var G__19900 = c__7256__auto__;
var G__19901 = cljs.core.count.call(null,c__7256__auto__);
var G__19902 = (0);
seq__19885 = G__19899;
chunk__19886 = G__19900;
count__19887 = G__19901;
i__19888 = G__19902;
continue;
} else {
var vec__19892 = cljs.core.first.call(null,seq__19885__$1);
var name = cljs.core.nth.call(null,vec__19892,(0),null);
var map__19893 = cljs.core.nth.call(null,vec__19892,(1),null);
var map__19893__$1 = ((((!((map__19893 == null)))?((((map__19893.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19893.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19893):map__19893);
var doc__$1 = cljs.core.get.call(null,map__19893__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__19893__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc__$1)){
cljs.core.println.call(null," ",doc__$1);
} else {
}

var G__19903 = cljs.core.next.call(null,seq__19885__$1);
var G__19904 = null;
var G__19905 = (0);
var G__19906 = (0);
seq__19885 = G__19903;
chunk__19886 = G__19904;
count__19887 = G__19905;
i__19888 = G__19906;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
/**
 * Get the documentation for a symbol. Copied & modified from replumb.
 */
reepl.replumb.process_doc = (function reepl$replumb$process_doc(sym){
if(cljs.core.truth_(sym)){
var sb__7427__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_19909_19911 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19910_19912 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19909_19911,_STAR_print_fn_STAR_19910_19912,sb__7427__auto__){
return (function (x__7428__auto__){
return sb__7427__auto__.append(x__7428__auto__);
});})(_STAR_print_newline_STAR_19909_19911,_STAR_print_fn_STAR_19910_19912,sb__7427__auto__))
;

try{reepl.replumb.print_doc.call(null,reepl.replumb.doc_from_sym.call(null,sym));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19910_19912;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19909_19911;
}
return [cljs.core.str(sb__7427__auto__)].join('');
} else {
return null;
}
});
