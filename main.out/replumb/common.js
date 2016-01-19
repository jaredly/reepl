// Compiled by ClojureScript 1.7.228 {}
goog.provide('replumb.common');
goog.require('cljs.core');
goog.require('clojure.string');
replumb.common.error_branch_QMARK_ = (function replumb$common$error_branch_QMARK_(error){
return (error instanceof Error);
});
replumb.common.error_children = (function replumb$common$error_children(error){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [error.cause], null);
});
replumb.common.error_seq = (function replumb$common$error_seq(error){
return cljs.core.tree_seq.call(null,replumb.common.error_branch_QMARK_,replumb.common.error_children,error);
});
/**
 * Iteratively extracts messages inside (nested #error objects), returns
 *   a string. If the boolean `exclude-error-msg?` is true, only the
 *   message marked with "ERROR" will be included in the final string. If
 *   the boolean `print-stack?` is true, the stack will be added to the
 *   final string. They both default to false.
 * 
 *   ** Be sure to pass a js/Error object here **
 */
replumb.common.extract_message = (function replumb$common$extract_message(var_args){
var args17807 = [];
var len__7511__auto___17811 = arguments.length;
var i__7512__auto___17812 = (0);
while(true){
if((i__7512__auto___17812 < len__7511__auto___17811)){
args17807.push((arguments[i__7512__auto___17812]));

var G__17813 = (i__7512__auto___17812 + (1));
i__7512__auto___17812 = G__17813;
continue;
} else {
}
break;
}

var G__17809 = args17807.length;
switch (G__17809) {
case 1:
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.common.extract_message.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17807.length)].join('')));

}
});

replumb.common.extract_message.cljs$core$IFn$_invoke$arity$1 = (function (err){
return replumb.common.extract_message.call(null,err,false,false);
});

replumb.common.extract_message.cljs$core$IFn$_invoke$arity$2 = (function (err,exclude_error_msg_QMARK_){
return replumb.common.extract_message.call(null,err,exclude_error_msg_QMARK_,false);
});

replumb.common.extract_message.cljs$core$IFn$_invoke$arity$3 = (function (err,exclude_error_msg_QMARK_,print_stack_QMARK_){
return [cljs.core.str((function (){var strings = (function (){var G__17810 = cljs.core.keep.call(null,cljs.core.identity,replumb.common.error_seq.call(null,err));
var G__17810__$1 = (cljs.core.truth_(exclude_error_msg_QMARK_)?cljs.core.filter.call(null,((function (G__17810){
return (function (p1__17805_SHARP_){
return cljs.core.not_EQ_.call(null,"ERROR",p1__17805_SHARP_.message);
});})(G__17810))
,G__17810):G__17810);
var G__17810__$2 = cljs.core.map.call(null,((function (G__17810,G__17810__$1){
return (function (p1__17806_SHARP_){
return p1__17806_SHARP_.message;
});})(G__17810,G__17810__$1))
,G__17810__$1)
;
var G__17810__$3 = cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.empty_QMARK_),G__17810__$2)
;
return G__17810__$3;
})();
if(cljs.core.seq.call(null,strings)){
return clojure.string.join.call(null," - ",strings);
} else {
return "Error";
}
})()),cljs.core.str((cljs.core.truth_(print_stack_QMARK_)?[cljs.core.str("\n"),cljs.core.str(err.stack)].join(''):null))].join('');
});

replumb.common.extract_message.cljs$lang$maxFixedArity = 3;
/**
 * Callback that just echoes the result map. It also asserts the correct
 *   result format in its post condition. Useful for debugging and
 *   testing.
 */
replumb.common.echo_callback = (function replumb$common$echo_callback(result_map){
return result_map;
});
/**
 * Wraps the message in a success map.
 */
replumb.common.wrap_success = (function replumb$common$wrap_success(message){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),message], null);
});
/**
 * Wraps the message in a error map.
 */
replumb.common.wrap_error = (function replumb$common$wrap_error(message){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),message], null);
});
/**
 * Returns true if the string contains the newline \\n or \\r as
 *   characters.
 */
replumb.common.inline_newline_QMARK_ = (function replumb$common$inline_newline_QMARK_(s){
return cljs.core.re_matches.call(null,/\\{2,}n|\\{2,}r/,s);
});
/**
 * Is the string returned from an evaluation valid?
 */
replumb.common.valid_eval_result_QMARK_ = (function replumb$common$valid_eval_result_QMARK_(var_args){
var args17815 = [];
var len__7511__auto___17818 = arguments.length;
var i__7512__auto___17819 = (0);
while(true){
if((i__7512__auto___17819 < len__7511__auto___17818)){
args17815.push((arguments[i__7512__auto___17819]));

var G__17820 = (i__7512__auto___17819 + (1));
i__7512__auto___17819 = G__17820;
continue;
} else {
}
break;
}

var G__17817 = args17815.length;
switch (G__17817) {
case 1:
return replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17815.length)].join('')));

}
});

replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (result){
return replumb.common.valid_eval_result_QMARK_.call(null,cljs.core.PersistentArrayMap.EMPTY,result);
});

replumb.common.valid_eval_result_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (opts,result){
var or__6453__auto__ = (cljs.core.not.call(null,new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546).cljs$core$IFn$_invoke$arity$1(opts))) && (typeof result === 'string') && (cljs.core.not.call(null,replumb.common.inline_newline_QMARK_.call(null,result)));
if(or__6453__auto__){
return or__6453__auto__;
} else {
var and__6441__auto__ = new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(and__6441__auto__)){
return !((result == null));
} else {
return and__6441__auto__;
}
}
});

replumb.common.valid_eval_result_QMARK_.cljs$lang$maxFixedArity = 2;
/**
 * Is the string returned from an evaluation valid?
 */
replumb.common.valid_eval_error_QMARK_ = (function replumb$common$valid_eval_error_QMARK_(error){
return (error instanceof Error);
});
/**
 * Is the string returned from an evaluation valid?
 */
replumb.common.valid_eval_warning_QMARK_ = (function replumb$common$valid_eval_warning_QMARK_(warning){
return typeof warning === 'string';
});
replumb.common.has_valid_warning_QMARK_ = (function replumb$common$has_valid_warning_QMARK_(result){
var G__17823 = new cljs.core.Keyword(null,"warning","warning",-1685650671).cljs$core$IFn$_invoke$arity$1(result);
var G__17823__$1 = (((G__17823 == null))?null:replumb.common.valid_eval_warning_QMARK_.call(null,G__17823));
return G__17823__$1;
});
/**
 * Yields a "keyword not supported" error map. Receives the
 *   symbol/keyword printed in the message and ex-info data.
 */
replumb.common.error_keyword_not_supported = (function replumb$common$error_keyword_not_supported(keyword,ex_info_data){
return replumb.common.wrap_error.call(null,cljs.core.ex_info.call(null,[cljs.core.str("The "),cljs.core.str(keyword),cljs.core.str(" keyword is not supported at the moment")].join(''),ex_info_data));
});
/**
 * Yields a "Argument must a be a symbol" error map. Receives the
 *   symbol/fn name printed in the message and ex-info data.
 */
replumb.common.error_argument_must_be_symbol = (function replumb$common$error_argument_must_be_symbol(symbol,ex_info_data){
return replumb.common.wrap_error.call(null,cljs.core.ex_info.call(null,[cljs.core.str("Argument to "),cljs.core.str(symbol),cljs.core.str(" must be a symbol")].join(''),ex_info_data));
});
/**
 * Filter out the option map keys that have -fn in it.
 */
replumb.common.filter_fn_keys = (function replumb$common$filter_fn_keys(opts){
if(cljs.core.map_QMARK_.call(null,opts)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"map?","map?",-1780568534,null),new cljs.core.Symbol(null,"opts","opts",1795607228,null))))].join('')));
}

var new_fn_entries = cljs.core.map.call(null,(function (p1__17824_SHARP_){
return cljs.core.assoc.call(null,p1__17824_SHARP_,(1),"<hidden function>");
}),cljs.core.filter.call(null,(function (p1__17825_SHARP_){
return cljs.core.re_find.call(null,/-fn/,cljs.core.name.call(null,cljs.core.first.call(null,p1__17825_SHARP_)));
}),cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,opts)));
return cljs.core.into.call(null,opts,new_fn_entries);
});
replumb.common.debug_prn = (function replumb$common$debug_prn(var_args){
var args__7518__auto__ = [];
var len__7511__auto___17828 = arguments.length;
var i__7512__auto___17829 = (0);
while(true){
if((i__7512__auto___17829 < len__7511__auto___17828)){
args__7518__auto__.push((arguments[i__7512__auto___17829]));

var G__17830 = (i__7512__auto___17829 + (1));
i__7512__auto___17829 = G__17830;
continue;
} else {
}
break;
}

var argseq__7519__auto__ = ((((0) < args__7518__auto__.length))?(new cljs.core.IndexedSeq(args__7518__auto__.slice((0)),(0))):null);
return replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(argseq__7519__auto__);
});

replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var _STAR_print_fn_STAR_17827 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_fn_STAR_ = cljs.core._STAR_print_err_fn_STAR_;

try{return cljs.core.apply.call(null,cljs.core.println,args);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_17827;
}});

replumb.common.debug_prn.cljs$lang$maxFixedArity = (0);

replumb.common.debug_prn.cljs$lang$applyTo = (function (seq17826){
return replumb.common.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17826));
});
/**
 * Adds a / if missing at the end of the path.
 */
replumb.common.normalize_path = (function replumb$common$normalize_path(path){
return [cljs.core.str(path),cljs.core.str(((cljs.core._EQ_.call(null,"/",cljs.core.last.call(null,path)))?null:"/"))].join('');
});
