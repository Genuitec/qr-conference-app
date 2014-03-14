(function(Router, Controller, Loader, getConfig){
    
    var _routes = {},
    
    _last_hash = "#",
    
    _history = [],
    
    _passParams = false,
    
    pageInited = false,
    
    _action = function(route, params, history_need, callback){
        try{
            if(route.controller in Controller){
                Controller[route.controller](params, callback);
                if(history_need !== false)
                    _history.push({
                        route: route,
                        params: params
                    });
                return true;
            }
            return false;
        }catch(error){
            console.log(error);
            console.log("_action error");
        }
    },
    
    _get_page_params = function(page){
        var page_name = page.split("?");
        if(page_name.length > 1){
            page_name = page_name[0];
            var params_str = page.match(/.+\?(.+)/)[1],
                params_parts = params_str.split("&"),
                params = {};
            params_parts.forEach(function(v){
                var els = v.split("=");
                if(els.length === 2)params[els[0]] = els[1];
            });
            return {
                app_page   : page_name,
                params : params
            };
        }else{
            return {
                app_page   : page,
                params : ""
            };
        }
    },
            
    SwitchPage = function(params){
        try{
            if(pageInited === false)
                $.mobile.initializePage();
            $.mobile.changePage("#"+params.page);
            pageInited = true;
        }catch(error){
            console.log(error);
            console.log("SwitchPage error");
        }
    },
            
    _check_params = function(params){
        for(var i in params)
            if(is_array(params[i]) || typeof(params[i]) === "object" || typeof(params[i]) === "function")
                return false;
        return true;
    };
    
    Router.redirect = function(page, prms){
        /* * var prms = {
         *      params: 
         *      history_need:
         *      callback:
         * }
         * */
        try{
            var history_need = true;
            if(!empty(prms)){
                if(is_set(prms.params))var params = prms.params.params;
                if(prms.history_need === false) history_need = prms.history_need;
                if(is_set(prms.callback)) var callback = prms.callback;
            }
            page = page.replace(/^#/,"");
            var page_and_params = (!is_set(_passParams) ? _get_page_params(page) : _passParams),
                route = {
                    app_page : page_and_params.app_page,
                    controller : page_and_params.app_page
                };
            if( !is_array(params) ){
                //adding params
                if(_check_params(params)){
                    var k = 0;
                    for(var i in params){
                        page += ((k===0 ? "?" : "&")+i+"="+params[i]);
                        ++k;
                    }
                }

                if(!is_set(params))var params = {};
                if(is_set(page_and_params.params))
                    for(var i in page_and_params.params)
                        params[i] = page_and_params.params[i];
                //adding params
            }
            if(route.app_page in _routes)
                route = _routes[route.app_page];

            if(route.controller in Controller){
                route.hash = "#"+page;
                return _action(route, params, history_need, function(){
                    if(is_set(prms) && is_set(prms.switchPage))
                        SwitchPage({page: route.app_page, hash:page});
                });
            }
            console.warn("NOT VALID URL");
            return Router.redirect(getConfig("home_page"), prms);
        }catch(error){
            console.log("Router.redirect");
            console.log(error);
        }
    };   
    
    Router.show_history = function(){
        console.log(_history);
    };
    
    Router.history_push = function(route){
        _history.push(route);
    };
    
    Router.redirect_back = function(){
        if(_history.length > 1){
            var back_el = _history[_history.length-2];
            Router.redirect(back_el.route.hash, {switchPage: true, history_need: false});
            _history = _history.slice(0, _history.length-1);
        }else return Router.redirect(getConfig("home_page"), {switchPage: true});
    };
    
    Router.back = function(){
        if(_history.length > 1){
            var back_el = _history[_history.length-2];
            SwitchPage({page: back_el.route.app_page, hash: back_el.route.hash});
            _history = _history.slice(0, _history.length-1);
        }else return Router.redirect(getConfig("home_page"));
    };
    
        
    $(document).ready(function(){
        $(document).on("click", 'a', function(e){
            try{
                if(!$(this).attr("data-rel") && $(this).attr("data-rel") !== "back"){
                    var page_name = $(this).attr("href").match(/^#(.[^\?]+)\?*/)[1];
                    Router.redirect(page_name, {
                        params: _get_page_params( $(this).attr("href").replace("#", "") ),
                        switchPage: true
                    });
                    return false;
                }else{
                    console.log("back");
                    Router.redirect_back();
                    return false;
                }
            }catch(error){
                console.log("error $(document).ready click");
                console.log(error);
            }
        });
        
        (window.location.hash === "" || window.location.hash === "#") ?
            Router.redirect(getConfig("home_page"), {
                switchPage: true
            }) : 
            Router.redirect(window.location.hash.replace("#", ""), {
                switchPage: true
            }); //start the app
       
    });
    
   
    
}(App.Router, App.Controller, App.Widgets.Loader, App.Config.get));