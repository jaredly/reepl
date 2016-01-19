// Compiled by ClojureScript 1.7.228 {}
goog.provide('quil.middlewares.navigation_2d');
goog.require('cljs.core');
goog.require('quil.core');
quil.middlewares.navigation_2d.missing_navigation_key_error = [cljs.core.str("state map is missing :navigation-2d key. "),cljs.core.str("Did you accidentally removed it from the state in "),cljs.core.str(":update or any other handler?")].join('');
/**
 * Asserts that state map contains :navigation-2d object.
 */
quil.middlewares.navigation_2d.assert_state_has_navigation = (function quil$middlewares$navigation_2d$assert_state_has_navigation(state){
if(cljs.core.truth_(new cljs.core.Keyword(null,"navigation-2d","navigation-2d",-1924168611).cljs$core$IFn$_invoke$arity$1(state))){
return null;
} else {
throw (new Error(quil.middlewares.navigation_2d.missing_navigation_key_error));
}
});
/**
 * Default position configuration: zoom is neutral and central point is
 *   width/2, height/2.
 */
quil.middlewares.navigation_2d.default_position = (function quil$middlewares$navigation_2d$default_position(){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(quil.core.width.call(null) / 2.0),(quil.core.height.call(null) / 2.0)], null),new cljs.core.Keyword(null,"zoom","zoom",-1827487038),(1)], null);
});
/**
 * Custom 'setup' function which creates initial position
 *   configuration and puts it to the state map.
 */
quil.middlewares.navigation_2d.setup_2d_nav = (function quil$middlewares$navigation_2d$setup_2d_nav(user_setup,user_settings){
var initial_state = cljs.core.merge.call(null,quil.middlewares.navigation_2d.default_position.call(null),cljs.core.select_keys.call(null,user_settings,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"zoom","zoom",-1827487038)], null)));
return cljs.core.update_in.call(null,user_setup.call(null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"navigation-2d","navigation-2d",-1924168611)], null),((function (initial_state){
return (function (p1__19417_SHARP_){
return cljs.core.merge.call(null,initial_state,p1__19417_SHARP_);
});})(initial_state))
);
});
/**
 * Changes center of the sketch depending on the last mouse move. Takes
 *   zoom into account as well.
 */
quil.middlewares.navigation_2d.mouse_dragged = (function quil$middlewares$navigation_2d$mouse_dragged(state,event){
quil.middlewares.navigation_2d.assert_state_has_navigation.call(null,state);

var dx = (new cljs.core.Keyword(null,"p-x","p-x",-1721211211).cljs$core$IFn$_invoke$arity$1(event) - new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(event));
var dy = (new cljs.core.Keyword(null,"p-y","p-y",-530704830).cljs$core$IFn$_invoke$arity$1(event) - new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(event));
var zoom = new cljs.core.Keyword(null,"zoom","zoom",-1827487038).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"navigation-2d","navigation-2d",-1924168611).cljs$core$IFn$_invoke$arity$1(state));
return cljs.core.update_in.call(null,cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"navigation-2d","navigation-2d",-1924168611),new cljs.core.Keyword(null,"position","position",-2011731912),(0)], null),cljs.core._PLUS_,(dx / zoom)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"navigation-2d","navigation-2d",-1924168611),new cljs.core.Keyword(null,"position","position",-2011731912),(1)], null),cljs.core._PLUS_,(dy / zoom));
});
/**
 * Changes zoom settings based on scroll.
 */
quil.middlewares.navigation_2d.mouse_wheel = (function quil$middlewares$navigation_2d$mouse_wheel(state,event){
quil.middlewares.navigation_2d.assert_state_has_navigation.call(null,state);

return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"navigation-2d","navigation-2d",-1924168611),new cljs.core.Keyword(null,"zoom","zoom",-1827487038)], null),cljs.core._STAR_,((1) + (-0.1 * event)));
});
/**
 * Calls user draw function with necessary all transformations (position
 *   and zoom) applied.
 */
quil.middlewares.navigation_2d.draw = (function quil$middlewares$navigation_2d$draw(user_draw,state){
quil.middlewares.navigation_2d.assert_state_has_navigation.call(null,state);

quil.core.push_matrix.call(null);

var nav_2d_19418 = new cljs.core.Keyword(null,"navigation-2d","navigation-2d",-1924168611).cljs$core$IFn$_invoke$arity$1(state);
var zoom_19419 = new cljs.core.Keyword(null,"zoom","zoom",-1827487038).cljs$core$IFn$_invoke$arity$1(nav_2d_19418);
var pos_19420 = new cljs.core.Keyword(null,"position","position",-2011731912).cljs$core$IFn$_invoke$arity$1(nav_2d_19418);
quil.core.scale.call(null,zoom_19419);

var tr__19341__auto___19421 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((quil.core.width.call(null) / (2)) / zoom_19419) - cljs.core.first.call(null,pos_19420)),(((quil.core.height.call(null) / (2)) / zoom_19419) - cljs.core.second.call(null,pos_19420))], null);
quil.core.push_matrix.call(null);

try{quil.core.translate.call(null,tr__19341__auto___19421);

user_draw.call(null,state);
}finally {quil.core.pop_matrix.call(null);
}
return quil.core.pop_matrix.call(null);
});
/**
 * Enables navigation over 2D sketch. Dragging mouse will move center of the
 *   skecth and mouse wheel controls zoom.
 */
quil.middlewares.navigation_2d.navigation_2d = (function quil$middlewares$navigation_2d$navigation_2d(options){
var user_settings = new cljs.core.Keyword(null,"navigation-2d","navigation-2d",-1924168611).cljs$core$IFn$_invoke$arity$1(options);
var user_draw = new cljs.core.Keyword(null,"draw","draw",1358331674).cljs$core$IFn$_invoke$arity$2(options,((function (user_settings){
return (function (state){
return null;
});})(user_settings))
);
var user_mouse_dragged = new cljs.core.Keyword(null,"mouse-dragged","mouse-dragged",-1220073441).cljs$core$IFn$_invoke$arity$2(options,((function (user_settings,user_draw){
return (function (state,_){
return state;
});})(user_settings,user_draw))
);
var user_mouse_wheel = new cljs.core.Keyword(null,"mouse-wheel","mouse-wheel",1811662439).cljs$core$IFn$_invoke$arity$2(options,((function (user_settings,user_draw,user_mouse_dragged){
return (function (state,_){
return state;
});})(user_settings,user_draw,user_mouse_dragged))
);
var setup = new cljs.core.Keyword(null,"setup","setup",1987730512).cljs$core$IFn$_invoke$arity$2(options,((function (user_settings,user_draw,user_mouse_dragged,user_mouse_wheel){
return (function (){
return cljs.core.PersistentArrayMap.EMPTY;
});})(user_settings,user_draw,user_mouse_dragged,user_mouse_wheel))
);
return cljs.core.assoc.call(null,options,new cljs.core.Keyword(null,"setup","setup",1987730512),cljs.core.partial.call(null,quil.middlewares.navigation_2d.setup_2d_nav,setup,user_settings),new cljs.core.Keyword(null,"draw","draw",1358331674),cljs.core.partial.call(null,quil.middlewares.navigation_2d.draw,user_draw),new cljs.core.Keyword(null,"mouse-dragged","mouse-dragged",-1220073441),((function (user_settings,user_draw,user_mouse_dragged,user_mouse_wheel,setup){
return (function (state,event){
return user_mouse_dragged.call(null,quil.middlewares.navigation_2d.mouse_dragged.call(null,state,event),event);
});})(user_settings,user_draw,user_mouse_dragged,user_mouse_wheel,setup))
,new cljs.core.Keyword(null,"mouse-wheel","mouse-wheel",1811662439),((function (user_settings,user_draw,user_mouse_dragged,user_mouse_wheel,setup){
return (function (state,event){
return user_mouse_wheel.call(null,quil.middlewares.navigation_2d.mouse_wheel.call(null,state,event),event);
});})(user_settings,user_draw,user_mouse_dragged,user_mouse_wheel,setup))
);
});
