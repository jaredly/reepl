// Compiled by ClojureScript 1.7.228 {}
goog.provide('reepl.timers');
goog.require('cljs.core');
reepl.timers.num_timers = (function reepl$timers$num_timers(state){
return cljs.core.count.call(null,new cljs.core.Keyword("reepl.timers","timers","reepl.timers/timers",-461893927).cljs$core$IFn$_invoke$arity$1(state));
});
reepl.timers.new_timer = (function reepl$timers$new_timer(time,handler){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"start","start",-355208981),Date.now(),new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"handler","handler",-195596612),handler], null);
});
reepl.timers.add_timer = (function reepl$timers$add_timer(state,time,handler){
return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("reepl.timers","timers","reepl.timers/timers",-461893927)], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),reepl.timers.new_timer.call(null,time,handler));
});
reepl.timers.add_ival = (function reepl$timers$add_ival(state,name,time,handler){
return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("reepl.timers","ivals","reepl.timers/ivals",-1059668258)], null),cljs.core.assoc,name,reepl.timers.new_timer.call(null,time,handler));
});
reepl.timers.remove_ival = (function reepl$timers$remove_ival(state,name){
return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("reepl.timers","ivals","reepl.timers/ivals",-1059668258)], null),cljs.core.dissoc,name);
});
reepl.timers.timer_ready = (function reepl$timers$timer_ready(timer){
return ((Date.now() - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(timer)) >= new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(timer));
});
reepl.timers.check_timer = (function reepl$timers$check_timer(state,timer){
if(cljs.core.not.call(null,reepl.timers.timer_ready.call(null,timer))){
return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("reepl.timers","timers","reepl.timers/timers",-461893927)], null),cljs.core.conj,timer);
} else {
var or__6453__auto__ = new cljs.core.Keyword(null,"handler","handler",-195596612).cljs$core$IFn$_invoke$arity$1(timer).call(null,state);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return state;
}
}
});
reepl.timers.check_ival = (function reepl$timers$check_ival(state,p__19959){
var vec__19961 = p__19959;
var name = cljs.core.nth.call(null,vec__19961,(0),null);
var timer = cljs.core.nth.call(null,vec__19961,(1),null);
if(cljs.core.not.call(null,reepl.timers.timer_ready.call(null,timer))){
return state;
} else {
var or__6453__auto__ = new cljs.core.Keyword(null,"handler","handler",-195596612).cljs$core$IFn$_invoke$arity$1(timer).call(null,state);
if(cljs.core.truth_(or__6453__auto__)){
return or__6453__auto__;
} else {
return state;
}
}
});
reepl.timers.update_timers = (function reepl$timers$update_timers(state){
if(cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword("reepl.timers","timers","reepl.timers/timers",-461893927).cljs$core$IFn$_invoke$arity$1(state))){
return state;
} else {
return cljs.core.reduce.call(null,reepl.timers.check_timer,cljs.core.assoc.call(null,state,new cljs.core.Keyword("reepl.timers","timers","reepl.timers/timers",-461893927),cljs.core.PersistentVector.EMPTY),new cljs.core.Keyword("reepl.timers","timers","reepl.timers/timers",-461893927).cljs$core$IFn$_invoke$arity$1(state));
}
});
reepl.timers.update_ivals = (function reepl$timers$update_ivals(state){
if(cljs.core.empty_QMARK_.call(null,new cljs.core.Keyword("reepl.timers","ivals","reepl.timers/ivals",-1059668258).cljs$core$IFn$_invoke$arity$1(state))){
return state;
} else {
return cljs.core.reduce.call(null,reepl.timers.check_ival,state,new cljs.core.Keyword("reepl.timers","ivals","reepl.timers/ivals",-1059668258).cljs$core$IFn$_invoke$arity$1(state));
}
});
reepl.timers.update_fn = (function reepl$timers$update_fn(orig,state){
return reepl.timers.update_ivals.call(null,reepl.timers.update_timers.call(null,orig.call(null,state)));
});
reepl.timers.middleware = (function reepl$timers$middleware(options){
return cljs.core.assoc.call(null,options,new cljs.core.Keyword(null,"update","update",1045576396),(function (p1__19962_SHARP_){
return reepl.timers.update_fn.call(null,new cljs.core.Keyword(null,"update","update",1045576396).cljs$core$IFn$_invoke$arity$1(options),p1__19962_SHARP_);
}));
});
