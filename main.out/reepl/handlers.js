// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.handlers');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('reepl.helpers');
reepl.handlers.clear_items = (function reepl$handlers$clear_items(db){
return cljs.core.assoc.call(null,db,new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.PersistentVector.EMPTY);
});
reepl.handlers.init = (function reepl$handlers$init(db,data){
return cljs.core.merge.call(null,db,data);
});
reepl.handlers.add_item = (function reepl$handlers$add_item(db,item){
return cljs.core.update.call(null,db,new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.conj,item);
});
reepl.handlers.add_items = (function reepl$handlers$add_items(db,items){
return cljs.core.update.call(null,db,new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.concat,items);
});
reepl.handlers.add_input = (function reepl$handlers$add_input(db,input){
var inum = cljs.core.count.call(null,new cljs.core.Keyword(null,"history","history",-247395220).cljs$core$IFn$_invoke$arity$1(db));
return cljs.core.update.call(null,cljs.core.update.call(null,cljs.core.assoc.call(null,db,new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178),(0)),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.conj,""),new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.Keyword(null,"text","text",-1790561697),input,new cljs.core.Keyword(null,"num","num",1985240673),inum], null));
});
reepl.handlers.add_result = (function reepl$handlers$add_result(db,error_QMARK_,value){
return cljs.core.update.call(null,db,new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),(cljs.core.truth_(error_QMARK_)?new cljs.core.Keyword(null,"error","error",-978969032):new cljs.core.Keyword(null,"output","output",-1105869043)),new cljs.core.Keyword(null,"value","value",305978217),value], null));
});
reepl.handlers.add_log = (function reepl$handlers$add_log(db,val){
return cljs.core.update.call(null,db,new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"log","log",-1595516004),new cljs.core.Keyword(null,"value","value",305978217),val], null));
});
reepl.handlers.set_text = (function reepl$handlers$set_text(db,text){
var history = new cljs.core.Keyword(null,"history","history",-247395220).cljs$core$IFn$_invoke$arity$1(db);
var pos = new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178).cljs$core$IFn$_invoke$arity$1(db);
var idx = ((cljs.core.count.call(null,history) - pos) - (1));
return cljs.core.assoc.call(null,cljs.core.assoc.call(null,db,new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178),(0)),new cljs.core.Keyword(null,"history","history",-247395220),((cljs.core._EQ_.call(null,pos,(0)))?cljs.core.assoc.call(null,history,idx,text):((cljs.core._EQ_.call(null,"",cljs.core.last.call(null,history)))?cljs.core.assoc.call(null,history,(cljs.core.count.call(null,history) - (1)),text):cljs.core.conj.call(null,history,text))));
});
reepl.handlers.go_up = (function reepl$handlers$go_up(db){
var pos = new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178).cljs$core$IFn$_invoke$arity$1(db);
var len = cljs.core.count.call(null,new cljs.core.Keyword(null,"history","history",-247395220).cljs$core$IFn$_invoke$arity$1(db));
var new_pos = (((pos >= (len - (1))))?pos:(pos + (1)));
return cljs.core.assoc.call(null,db,new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178),new_pos);
});
reepl.handlers.go_down = (function reepl$handlers$go_down(db){
var pos = new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178).cljs$core$IFn$_invoke$arity$1(db);
var new_pos = (((pos <= (0)))?(0):(pos - (1)));
return cljs.core.assoc.call(null,db,new cljs.core.Keyword(null,"hist-pos","hist-pos",64251178),new_pos);
});
