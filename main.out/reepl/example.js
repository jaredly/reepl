// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.example');
goog.require('cljs.core');
goog.require('reepl.show_devtools');
goog.require('reepl.replumb');
goog.require('reepl.helpers');
goog.require('parinfer_codemirror.editor');
goog.require('reepl.core');
goog.require('cljs.tools.reader');
goog.require('quil.core');
goog.require('parinfer.codemirror.mode.clojure.clojure_parinfer');
goog.require('reagent.core');
goog.require('cljs.js');
goog.require('devtools.core');
goog.require('goog.net.XhrIo');
goog.require('reepl.show_function');
if(typeof reepl.example.repl_state !== 'undefined'){
} else {
reepl.example.repl_state = reagent.core.atom.call(null,reepl.core.initial_state);
}
reepl.example.styles = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"main","main",-2117802661),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"justify-content","justify-content",-1990475787),new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"align-items","align-items",-267946462),new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"align-self","align-self",1475936794),new cljs.core.Keyword(null,"stretch","stretch",-1888837380),new cljs.core.Keyword(null,"flex","flex",-1425124628),(1)], null),new cljs.core.Keyword(null,"box","box",1530920394),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"width","width",-384071477),(700),new cljs.core.Keyword(null,"margin-top","margin-top",392161226),(100),new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(100),new cljs.core.Keyword(null,"border-radius","border-radius",419594011),(5),new cljs.core.Keyword(null,"background-color","background-color",570434026),"white",new cljs.core.Keyword(null,"flex","flex",-1425124628),(1)], null)], null);
reepl.example.view = cljs.core.partial.call(null,reepl.helpers.view,reepl.example.styles);
reepl.example.maybe_fn_docs = (function reepl$example$maybe_fn_docs(fn){
var doc = reepl.replumb.doc_from_sym.call(null,fn);
if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(doc))){
var sb__7427__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15946_15948 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15947_15949 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_15946_15948,_STAR_print_fn_STAR_15947_15949,sb__7427__auto__,doc){
return (function (x__7428__auto__){
return sb__7427__auto__.append(x__7428__auto__);
});})(_STAR_print_newline_STAR_15946_15948,_STAR_print_fn_STAR_15947_15949,sb__7427__auto__,doc))
;

try{reepl.replumb.print_doc.call(null,doc);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15947_15949;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15946_15948;
}
return [cljs.core.str(sb__7427__auto__)].join('');
} else {
return null;
}
});
reepl.example.main_view = (function reepl$example$main_view(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.example.view,new cljs.core.Keyword(null,"main","main",-2117802661),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.example.view,new cljs.core.Keyword(null,"box","box",1530920394),new cljs.core.PersistentVector(null, 15, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.core.repl,new cljs.core.Keyword(null,"execute","execute",-129499188),reepl.replumb.run_repl,new cljs.core.Keyword(null,"complete-word","complete-word",1063206084),reepl.replumb.process_apropos,new cljs.core.Keyword(null,"get-docs","get-docs",-698720007),reepl.replumb.process_doc,new cljs.core.Keyword(null,"state","state",-1988618099),reepl.example.repl_state,new cljs.core.Keyword(null,"show-value-opts","show-value-opts",-412296519),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"showers","showers",1548575441),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.show_devtools.show_devtools,cljs.core.partial.call(null,reepl.show_function.show_fn_with_docs,reepl.example.maybe_fn_docs)], null)], null),new cljs.core.Keyword(null,"js-cm-opts","js-cm-opts",1231776640),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"mode","mode",654403691),"clojure-parinfer",new cljs.core.Keyword(null,"keyMap","keyMap",945500512),"vim",new cljs.core.Keyword(null,"showCursorWhenSelecting","showCursorWhenSelecting",169880137),true], null),new cljs.core.Keyword(null,"on-cm-init","on-cm-init",105207782),(function (p1__15950_SHARP_){
return parinfer_codemirror.editor.parinferize_BANG_.call(null,p1__15950_SHARP_,new cljs.core.Keyword(null,"repl-infer","repl-infer",24180246),new cljs.core.Keyword(null,"indent-mode","indent-mode",1737814542));
})], null)], null)], null);
});
reepl.example.main = (function reepl$example$main(){
console.log("reload!");

return reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reepl.example.main_view], null),document.getElementById("container"));
});
devtools.core.install_BANG_.call(null);
cljs.core.swap_BANG_.call(null,cljs.js._STAR_loaded_STAR_,cljs.core.conj,new cljs.core.Symbol(null,"quil.core","quil.core",1790300883,null),new cljs.core.Symbol(null,"reepl.core","reepl.core",1929888104,null),new cljs.core.Symbol(null,"reepl.show-value","reepl.show-value",-1655983851,null),new cljs.core.Symbol(null,"reepl.show-value","reepl.show-value",-1655983851,null),new cljs.core.Symbol(null,"clojure.string","clojure.string",-1415552165,null),new cljs.core.Symbol(null,"cljs.reader","cljs.reader",1327473948,null),new cljs.core.Symbol(null,"cljs.tools.reader","cljs.tools.reader",-831293977,null));
reepl.replumb.run_repl.call(null,"(require '[quil.core :as q])",cljs.core.identity);
reepl.replumb.run_repl.call(null,"(require '[clojure.string :as str])",cljs.core.identity);
reepl.replumb.run_repl.call(null,"(require '[reepl.core :as reepl])",cljs.core.identity);
reepl.replumb.run_repl.call(null,"(require '[reepl.show-value])",cljs.core.identity);
reepl.replumb.run_repl.call(null,"(require '[cljs.reader])",cljs.core.identity);
reepl.replumb.run_repl.call(null,"(require '[cljs.tools.reader])",cljs.core.identity);
reepl.example.main.call(null);
if(typeof reepl.example._initing !== 'undefined'){
} else {
reepl.example._initing = parinfer_codemirror.editor.start_editor_sync_BANG_.call(null);
}

//# sourceMappingURL=example.js.map