// Compiled by ClojureScript 1.7.228 {}
goog.provide('replumb.core');
goog.require('cljs.core');
goog.require('cljs.js');
goog.require('replumb.repl');
goog.require('replumb.common');
/**
 * Reads, evaluates and calls back with the evaluation result.
 * 
 *   The first parameter is a map of configuration options, currently
 *   supporting:
 * 
 *   * `:verbose` will enable the the evaluation logging, defaults to false
 *   * `:warning-as-error` will consider a compiler warning as error
 *   * `:target` `:nodejs` and `:browser` supported, the latter is used if
 *   missing
 *   * `:init-fn!` user provided initialization function, it will be passed a
 *   map:
 * 
 *        :form   ;; the form to evaluate, as data
 *        :ns     ;; the current namespace, as symbol
 *        :target ;; the current target
 * 
 *   * `:load-fn!` will override replumb's default `cljs.js/*load-fn*`.
 *   It rules out `:read-file-fn!`, losing any perk of using `replumb.load`
 *   helpers. Use it if you know what you are doing and follow this
 *   protocol:
 * 
 *    ```
 *    Each runtime environment provides a different way to load a library.
 *    Whatever function `*load-fn*` is bound to will be passed two arguments
 *    - a map and a callback function: The map will have the following keys:
 * 
 *        :name   - the name of the library (a symbol)
 *        :macros - modifier signaling a macros namespace load
 *        :path   - munged relative library path (a string)
 * 
 *    The callback cb, upon resolution, will need to pass the same map:
 * 
 *        :lang       - the language, :clj or :js
 *        :source     - the source of the library (a string)
 *        :cache      - optional, if a :clj namespace has been precompiled to
 *                      :js, can give an analysis cache for faster loads.
 *        :source-map - optional, if a :clj namespace has been precompiled
 *                      to :js, can give a V3 source map JSON
 * 
 *    If the resource could not be resolved, the callback should be invoked with
 *    nil.
 *    ```
 * 
 *   * `:read-file-fn!` an asynchronous 2-arity function with signature
 *   `[file-path src-cb]` where src-cb is itself a function `(fn [source]
 *   ...)` that needs to be called with the file content as string (`nil`
 *   if no file is found). It is mutually exclusive with `:load-fn!` and
 *   will be ignored in case both are present
 * 
 *   * `:src-paths`  a vector of paths containing source files
 *   * `:no-pr-str-on-value`  in case of `:success?` avoid converting the
 *   result map `:value` to string
 * 
 *   The second parameter, `callback`, should be a 1-arity function which receives
 *   the result map, whose result keys will be:
 * 
 *   ```
 *   :success?  a boolean indicating if everything went alright
 *   :value     (if (:success? result)), this key contains the yielded value as
 *           string, unless :no-pr-str-on-value is true, in which case it
 *           returns the bare value.
 *   :error     (if-not (:success? result)) will contain a js/Error
 *   :warning   in case a warning was thrown and :warning-as-error is falsey
 *   :form      the evaluated form as data structure (not string)}
 *   ```
 * 
 *   The third parameter is the source string to be read and evaluated.
 * 
 *   It initializes the repl harness either on first execution or if an
 *   option in `#{:src-paths :init-fn!}` changes from the previous
 *   `read-eval-call`.
 */
replumb.core.read_eval_call = (function replumb$core$read_eval_call(var_args){
var args15143 = [];
var len__7511__auto___15146 = arguments.length;
var i__7512__auto___15147 = (0);
while(true){
if((i__7512__auto___15147 < len__7511__auto___15146)){
args15143.push((arguments[i__7512__auto___15147]));

var G__15148 = (i__7512__auto___15147 + (1));
i__7512__auto___15147 = G__15148;
continue;
} else {
}
break;
}

var G__15145 = args15143.length;
switch (G__15145) {
case 2:
return replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15143.length)].join('')));

}
});
goog.exportSymbol('replumb.core.read_eval_call', replumb.core.read_eval_call);

replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$2 = (function (callback,source){
return replumb.repl.read_eval_call.call(null,cljs.core.PersistentArrayMap.EMPTY,callback,source);
});

replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$3 = (function (opts,callback,source){
return replumb.repl.read_eval_call.call(null,opts,callback,source);
});

replumb.core.read_eval_call.cljs$lang$maxFixedArity = 3;
/**
 * Retrieves the REPL prompt to display, according to the current
 *   namespace. Returns a string.
 */
replumb.core.get_prompt = (function replumb$core$get_prompt(){
return [cljs.core.str(replumb.repl.current_ns.call(null)),cljs.core.str("=> ")].join('');
});
goog.exportSymbol('replumb.core.get_prompt', replumb.core.get_prompt);
/**
 * Return the message string of the input `js/Error`.
 */
replumb.core.error__GT_str = (function replumb$core$error__GT_str(var_args){
var args15150 = [];
var len__7511__auto___15153 = arguments.length;
var i__7512__auto___15154 = (0);
while(true){
if((i__7512__auto___15154 < len__7511__auto___15153)){
args15150.push((arguments[i__7512__auto___15154]));

var G__15155 = (i__7512__auto___15154 + (1));
i__7512__auto___15154 = G__15155;
continue;
} else {
}
break;
}

var G__15152 = args15150.length;
switch (G__15152) {
case 1:
return replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15150.length)].join('')));

}
});
goog.exportSymbol('replumb.core.error__GT_str', replumb.core.error__GT_str);

replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$1 = (function (error){
return replumb.common.extract_message.call(null,error);
});

replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$2 = (function (error,print_stack_QMARK_){
return replumb.common.extract_message.call(null,error,print_stack_QMARK_);
});

replumb.core.error__GT_str.cljs$lang$maxFixedArity = 2;
/**
 * Unwraps the result of an evaluation.
 * 
 *   It returns the content of `:value` in case of success and the content
 *   of `:error` (a `js/Error`) in case of failure.
 * 
 *   When `include-warning?` is true, then the value yields from, in order,
 *   `:error`, then `:warning` and then eventually `:value`.
 */
replumb.core.unwrap_result = (function replumb$core$unwrap_result(var_args){
var args15157 = [];
var len__7511__auto___15162 = arguments.length;
var i__7512__auto___15163 = (0);
while(true){
if((i__7512__auto___15163 < len__7511__auto___15162)){
args15157.push((arguments[i__7512__auto___15163]));

var G__15164 = (i__7512__auto___15163 + (1));
i__7512__auto___15163 = G__15164;
continue;
} else {
}
break;
}

var G__15159 = args15157.length;
switch (G__15159) {
case 1:
return replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15157.length)].join('')));

}
});
goog.exportSymbol('replumb.core.unwrap_result', replumb.core.unwrap_result);

replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$1 = (function (result_map){
return replumb.core.unwrap_result.call(null,result_map,false);
});

replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$2 = (function (result_map,include_warning_QMARK_){
var map__15160 = result_map;
var map__15160__$1 = ((((!((map__15160 == null)))?((((map__15160.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15160.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15160):map__15160);
var error = cljs.core.get.call(null,map__15160__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.call(null,map__15160__$1,new cljs.core.Keyword(null,"value","value",305978217));
var warning = cljs.core.get.call(null,map__15160__$1,new cljs.core.Keyword(null,"warning","warning",-1685650671));
if(cljs.core.truth_(error)){
return error;
} else {
if(cljs.core.truth_((function (){var and__6441__auto__ = include_warning_QMARK_;
if(cljs.core.truth_(and__6441__auto__)){
return warning;
} else {
return and__6441__auto__;
}
})())){
return warning;
} else {
return value;
}
}
});

replumb.core.unwrap_result.cljs$lang$maxFixedArity = 2;
/**
 * Given a `result-map`, tells whether the evaluation was successful.
 */
replumb.core.success_QMARK_ = (function replumb$core$success_QMARK_(result_map){
return new cljs.core.Keyword(null,"success?","success?",-122854052).cljs$core$IFn$_invoke$arity$1(result_map);
});
goog.exportSymbol('replumb.core.success_QMARK_', replumb.core.success_QMARK_);
/**
 * Given a `result-map`, returns the result of the evaluation as string.
 * 
 *   - When `include-warning?` is true, then the string yields from, in
 *   order, `:error`, then `:warning` and then eventually `:value`.
 *   - When `print-stack?` is true, the error string will include the stack
 *   trace.
 */
replumb.core.result__GT_string = (function replumb$core$result__GT_string(var_args){
var args15166 = [];
var len__7511__auto___15171 = arguments.length;
var i__7512__auto___15172 = (0);
while(true){
if((i__7512__auto___15172 < len__7511__auto___15171)){
args15166.push((arguments[i__7512__auto___15172]));

var G__15173 = (i__7512__auto___15172 + (1));
i__7512__auto___15172 = G__15173;
continue;
} else {
}
break;
}

var G__15168 = args15166.length;
switch (G__15168) {
case 1:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15166.length)].join('')));

}
});
goog.exportSymbol('replumb.core.result__GT_string', replumb.core.result__GT_string);

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$1 = (function (result_map){
return replumb.core.result__GT_string.call(null,result_map,false,false);
});

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$2 = (function (result_map,print_stack_QMARK_){
return replumb.core.result__GT_string.call(null,result_map,print_stack_QMARK_,false);
});

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$3 = (function (result_map,print_stack_QMARK_,include_warning_QMARK_){
var map__15169 = result_map;
var map__15169__$1 = ((((!((map__15169 == null)))?((((map__15169.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15169.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15169):map__15169);
var error = cljs.core.get.call(null,map__15169__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.call(null,map__15169__$1,new cljs.core.Keyword(null,"value","value",305978217));
var warning = cljs.core.get.call(null,map__15169__$1,new cljs.core.Keyword(null,"warning","warning",-1685650671));
if(cljs.core.truth_(error)){
return replumb.common.extract_message.call(null,error,false,print_stack_QMARK_);
} else {
if(cljs.core.truth_((function (){var and__6441__auto__ = include_warning_QMARK_;
if(cljs.core.truth_(and__6441__auto__)){
return warning;
} else {
return and__6441__auto__;
}
})())){
return warning;
} else {
return value;
}
}
});

replumb.core.result__GT_string.cljs$lang$maxFixedArity = 3;
/**
 * Creates the browser option map for read-eval-call.
 * 
 *   The 1-arity function requires a `load-fn!` compatible with
 *   ClojureScript `cljs.js/*load-fn*`. Use it if you know what you are
 *   doing and follow this protocol:
 * 
 *    Each runtime environment provides a different way to load a library.
 *    Whatever function `*load-fn*` is bound to will be passed two arguments
 *    - a map and a callback function: The map will have the following keys:
 * 
 *        :name   - the name of the library (a symbol)
 *        :macros - modifier signaling a macros namespace load
 *        :path   - munged relative library path (a string)
 * 
 *    The callback cb, upon resolution, will need to pass the same map:
 * 
 *        :lang       - the language, :clj or :js
 *        :source     - the source of the library (a string)
 *        :cache      - optional, if a :clj namespace has been precompiled to
 *                      :js, can give an analysis cache for faster loads.
 *        :source-map - optional, if a :clj namespace has been precompiled
 *                      to :js, can give a V3 source map JSON
 * 
 *    If the resource could not be resolved, the callback should be invoked with
 *    nil.
 * 
 *   The 2-arity function accepts a sequence of source path strings and
 *   `read-file-fn!`, an asynchronous 2-arity function with signature
 *   `[file-path src-cb]` where src-cb is itself a function `(fn [source]
 *   ...)` that needs to be called with the file content as string (`nil`
 *   if no file is found).
 */
replumb.core.browser_options = (function replumb$core$browser_options(var_args){
var args15175 = [];
var len__7511__auto___15178 = arguments.length;
var i__7512__auto___15179 = (0);
while(true){
if((i__7512__auto___15179 < len__7511__auto___15178)){
args15175.push((arguments[i__7512__auto___15179]));

var G__15180 = (i__7512__auto___15179 + (1));
i__7512__auto___15179 = G__15180;
continue;
} else {
}
break;
}

var G__15177 = args15175.length;
switch (G__15177) {
case 1:
return replumb.core.browser_options.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.browser_options.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15175.length)].join('')));

}
});
goog.exportSymbol('replumb.core.browser_options', replumb.core.browser_options);

replumb.core.browser_options.cljs$core$IFn$_invoke$arity$1 = (function (load_fn_BANG_){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword(null,"load-fn!","load-fn!",-896695751),load_fn_BANG_], null);
});

replumb.core.browser_options.cljs$core$IFn$_invoke$arity$2 = (function (src_paths,read_file_fn_BANG_){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191),read_file_fn_BANG_,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603),src_paths], null);
});

replumb.core.browser_options.cljs$lang$maxFixedArity = 2;
/**
 * Creates the Node.js option map for read-eval-call.
 * 
 *   The 1-arity function requires a `load-fn!` compatible with
 *   ClojureScript `cljs.js/*load-fn*`. Use it if you know what you are
 *   doing and follow this protocol:
 * 
 *    Each runtime environment provides a different way to load a library.
 *    Whatever function `*load-fn*` is bound to will be passed two arguments
 *    - a map and a callback function: The map will have the following keys:
 * 
 *        :name   - the name of the library (a symbol)
 *        :macros - modifier signaling a macros namespace load
 *        :path   - munged relative library path (a string)
 * 
 *    The callback cb, upon resolution, will need to pass the same map:
 * 
 *        :lang       - the language, :clj or :js
 *        :source     - the source of the library (a string)
 *        :cache      - optional, if a :clj namespace has been precompiled to
 *                      :js, can give an analysis cache for faster loads.
 *        :source-map - optional, if a :clj namespace has been precompiled
 *                      to :js, can give a V3 source map JSON
 * 
 *    If the resource could not be resolved, the callback should be invoked with
 *    nil.
 * 
 *   The 2-arity function accepts a sequence of source path strings and
 *   `read-file-fn!`, an asynchronous 2-arity function with signature
 *   `[file-path src-cb]` where src-cb is itself a function `(fn [source]
 *   ...)` that needs to be called with the file content as string (`nil`
 *   if no file is found).
 */
replumb.core.nodejs_options = (function replumb$core$nodejs_options(var_args){
var args15182 = [];
var len__7511__auto___15185 = arguments.length;
var i__7512__auto___15186 = (0);
while(true){
if((i__7512__auto___15186 < len__7511__auto___15185)){
args15182.push((arguments[i__7512__auto___15186]));

var G__15187 = (i__7512__auto___15186 + (1));
i__7512__auto___15186 = G__15187;
continue;
} else {
}
break;
}

var G__15184 = args15182.length;
switch (G__15184) {
case 1:
return replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15182.length)].join('')));

}
});
goog.exportSymbol('replumb.core.nodejs_options', replumb.core.nodejs_options);

replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$1 = (function (load_fn_BANG_){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"nodejs","nodejs",321212524),new cljs.core.Keyword(null,"load-fn!","load-fn!",-896695751),load_fn_BANG_], null);
});

replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$2 = (function (src_paths,read_file_fn_BANG_){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"nodejs","nodejs",321212524),new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191),read_file_fn_BANG_,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603),src_paths], null);
});

replumb.core.nodejs_options.cljs$lang$maxFixedArity = 2;

//# sourceMappingURL=core.js.map