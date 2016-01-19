// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.replumb');
goog.require('cljs.core');
goog.require('replumb.core');
goog.require('cljs.pprint');
goog.require('reepl.helpers');
goog.require('parinfer_codemirror.editor');
goog.require('reepl.core');
goog.require('cljs.tools.reader');
goog.require('quil.core');
goog.require('reagent.core');
goog.require('cljs.js');
goog.require('cljs.analyzer');
goog.require('quil.middleware');
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
}catch (e19601){var e = e19601;
return src_cb.call(null,null);
}});
reepl.replumb.replumb_opts = cljs.core.merge.call(null,replumb.core.browser_options.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/main.out","/main.out"], null),reepl.replumb.fetch_file_BANG_),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warning-as-error","warning-as-error",1347418166),true,new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),true], null));
reepl.replumb.run_repl = (function reepl$replumb$run_repl(text,cb){
return replumb.core.read_eval_call.call(null,reepl.replumb.replumb_opts,(function (p1__19602_SHARP_){
return cb.call(null,replumb.core.success_QMARK_.call(null,p1__19602_SHARP_),replumb.core.unwrap_result.call(null,p1__19602_SHARP_));
}),((!(cljs.core._EQ_.call(null,(-1),text.indexOf("\n"))))?[cljs.core.str("(do "),cljs.core.str(text),cljs.core.str(")")].join(''):text));
});
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
return cljs.core.map.call(null,cljs.core.demunge,Object.keys(cljs.core.reduce.call(null,cljs.core.aget,window,parts)));
});
/**
 * Takes a map of {require-name ns-name} and dedups multiple keys that have the
 *   same ns-name value.
 */
reepl.replumb.dedup_requires = (function reepl$replumb$dedup_requires(requires){
return cljs.core.first.call(null,cljs.core.reduce.call(null,(function (p__19607,p__19608){
var vec__19609 = p__19607;
var result = cljs.core.nth.call(null,vec__19609,(0),null);
var seen = cljs.core.nth.call(null,vec__19609,(1),null);
var vec__19610 = p__19608;
var k = cljs.core.nth.call(null,vec__19610,(0),null);
var v = cljs.core.nth.call(null,vec__19610,(1),null);
if(cljs.core.truth_(seen.call(null,v))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,seen], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,result,k,v),cljs.core.conj.call(null,seen,v)], null);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentHashSet.EMPTY], null),requires));
});
reepl.replumb.get_matching_ns_interns = (function reepl$replumb$get_matching_ns_interns(p__19612,matches_QMARK_,only_ns){
var vec__19614 = p__19612;
var name = cljs.core.nth.call(null,vec__19614,(0),null);
var ns = cljs.core.nth.call(null,vec__19614,(1),null);
var ns_name = [cljs.core.str(ns)].join('');
var publics = cljs.core.keys.call(null,replumb.ast.ns_publics.call(null,cljs.core.deref.call(null,replumb.repl.st),ns));
var publics__$1 = ((cljs.core.empty_QMARK_.call(null,publics))?reepl.replumb.get_from_js_ns.call(null,ns):publics);
if(!(((only_ns == null)) || (cljs.core._EQ_.call(null,only_ns,ns_name)))){
return cljs.core.PersistentVector.EMPTY;
} else {
return cljs.core.sort.call(null,cljs.core.map.call(null,((function (ns_name,publics,publics__$1,vec__19614,name,ns){
return (function (p1__19611_SHARP_){
return cljs.core.symbol.call(null,name,[cljs.core.str(p1__19611_SHARP_)].join(''));
});})(ns_name,publics,publics__$1,vec__19614,name,ns))
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
return (function (p1__19615_SHARP_){
return [cljs.core.str("js/"),cljs.core.str(clojure.string.join.call(null,".",cljs.core.conj.call(null,cljs.core.vec.call(null,cljs.core.butlast.call(null,parts)),p1__19615_SHARP_)))].join('');
});})(parts,completing))
;
var possibles = reepl.replumb.js_attrs.call(null,cljs.core.reduce.call(null,cljs.core.aget,window,cljs.core.butlast.call(null,parts)));
return cljs.core.map.call(null,((function (parts,completing,prefix,possibles){
return (function (p1__19617_SHARP_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,prefix.call(null,p1__19617_SHARP_),prefix.call(null,p1__19617_SHARP_)], null);
});})(parts,completing,prefix,possibles))
,cljs.core.sort.call(null,cljs.core.partial.call(null,reepl.replumb.compare_completion,text),cljs.core.filter.call(null,((function (parts,completing,prefix,possibles){
return (function (p1__19616_SHARP_){
return !(cljs.core._EQ_.call(null,(-1),p1__19616_SHARP_.indexOf(completing)));
});})(parts,completing,prefix,possibles))
,possibles)));
});
/**
 * Tab completion. Copied w/ extensive modifications from replumb.repl/process-apropos.
 */
reepl.replumb.cljs_completion = (function reepl$replumb$cljs_completion(text){
var vec__19624 = ((!(cljs.core._EQ_.call(null,(-1),text.indexOf("/"))))?text.split("/"):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,text], null));
var only_ns = cljs.core.nth.call(null,vec__19624,(0),null);
var text__$1 = cljs.core.nth.call(null,vec__19624,(1),null);
var matches_QMARK_ = ((function (vec__19624,only_ns,text__$1){
return (function (p1__19618_SHARP_){
return (cljs.core._EQ_.call(null,(-1),[cljs.core.str(p1__19618_SHARP_)].join('').indexOf("t_cljs$core"))) && (((-1) < [cljs.core.str(p1__19618_SHARP_)].join('').indexOf(text__$1)));
});})(vec__19624,only_ns,text__$1))
;
var current_ns = replumb.repl.current_ns.call(null);
var replace_name = ((function (vec__19624,only_ns,text__$1,matches_QMARK_,current_ns){
return (function (sym){
if((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,sym),"cljs.core")) || (cljs.core._EQ_.call(null,cljs.core.namespace.call(null,sym),[cljs.core.str(current_ns)].join('')))){
return cljs.core.name.call(null,sym);
} else {
return [cljs.core.str(sym)].join('');
}
});})(vec__19624,only_ns,text__$1,matches_QMARK_,current_ns))
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
var defs = cljs.core.sort_by.call(null,((function (vec__19624,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names){
return (function (p1__19621_SHARP_){
return cljs.core.get.call(null,p1__19621_SHARP_,(3));
});})(vec__19624,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names))
,cljs.core.partial.call(null,reepl.replumb.compare_completion,text__$1),cljs.core.map.call(null,((function (vec__19624,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names){
return (function (p1__19620_SHARP_){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__19620_SHARP_,[cljs.core.str(p1__19620_SHARP_)].join(''),replace_name.call(null,p1__19620_SHARP_),cljs.core.name.call(null,p1__19620_SHARP_)], null);
});})(vec__19624,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names))
,cljs.core.mapcat.call(null,((function (vec__19624,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names){
return (function (p1__19619_SHARP_){
return reepl.replumb.get_matching_ns_interns.call(null,p1__19619_SHARP_,matches_QMARK_,only_ns__$1);
});})(vec__19624,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names))
,cljs.core.sort_by.call(null,cljs.core.second,cljs.core.partial.call(null,reepl.replumb.compare_ns,current_ns),requires__$1))));
return cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.take.call(null,(75),defs),cljs.core.map.call(null,((function (vec__19624,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names,defs){
return (function (p1__19622_SHARP_){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__19622_SHARP_,[cljs.core.str(p1__19622_SHARP_)].join(''),[cljs.core.str(p1__19622_SHARP_)].join('')], null);
});})(vec__19624,only_ns,text__$1,matches_QMARK_,current_ns,replace_name,requires,only_ns__$1,requires__$1,names,defs))
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
var seq__19635 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(doc));
var chunk__19636 = null;
var count__19637 = (0);
var i__19638 = (0);
while(true){
if((i__19638 < count__19637)){
var vec__19639 = cljs.core._nth.call(null,chunk__19636,i__19638);
var name = cljs.core.nth.call(null,vec__19639,(0),null);
var map__19640 = cljs.core.nth.call(null,vec__19639,(1),null);
var map__19640__$1 = ((((!((map__19640 == null)))?((((map__19640.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19640.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19640):map__19640);
var doc__$1 = cljs.core.get.call(null,map__19640__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__19640__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc__$1)){
cljs.core.println.call(null," ",doc__$1);
} else {
}

var G__19645 = seq__19635;
var G__19646 = chunk__19636;
var G__19647 = count__19637;
var G__19648 = (i__19638 + (1));
seq__19635 = G__19645;
chunk__19636 = G__19646;
count__19637 = G__19647;
i__19638 = G__19648;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__19635);
if(temp__4425__auto__){
var seq__19635__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19635__$1)){
var c__7256__auto__ = cljs.core.chunk_first.call(null,seq__19635__$1);
var G__19649 = cljs.core.chunk_rest.call(null,seq__19635__$1);
var G__19650 = c__7256__auto__;
var G__19651 = cljs.core.count.call(null,c__7256__auto__);
var G__19652 = (0);
seq__19635 = G__19649;
chunk__19636 = G__19650;
count__19637 = G__19651;
i__19638 = G__19652;
continue;
} else {
var vec__19642 = cljs.core.first.call(null,seq__19635__$1);
var name = cljs.core.nth.call(null,vec__19642,(0),null);
var map__19643 = cljs.core.nth.call(null,vec__19642,(1),null);
var map__19643__$1 = ((((!((map__19643 == null)))?((((map__19643.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19643.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19643):map__19643);
var doc__$1 = cljs.core.get.call(null,map__19643__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__19643__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc__$1)){
cljs.core.println.call(null," ",doc__$1);
} else {
}

var G__19653 = cljs.core.next.call(null,seq__19635__$1);
var G__19654 = null;
var G__19655 = (0);
var G__19656 = (0);
seq__19635 = G__19653;
chunk__19636 = G__19654;
count__19637 = G__19655;
i__19638 = G__19656;
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
var _STAR_print_newline_STAR_19659_19661 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_19660_19662 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_19659_19661,_STAR_print_fn_STAR_19660_19662,sb__7427__auto__){
return (function (x__7428__auto__){
return sb__7427__auto__.append(x__7428__auto__);
});})(_STAR_print_newline_STAR_19659_19661,_STAR_print_fn_STAR_19660_19662,sb__7427__auto__))
;

try{reepl.replumb.print_doc.call(null,reepl.replumb.doc_from_sym.call(null,sym));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_19660_19662;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_19659_19661;
}
return [cljs.core.str(sb__7427__auto__)].join('');
} else {
return null;
}
});
