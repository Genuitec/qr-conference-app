(function(Router, Controller, Loader){
    
    // all specific routes goes here ---> F E app_page!==controller || hash !== controller
    var _routes = {
//        more_amazing_deals : {
//            app_page: "results_page",
//            controller: "more_amazing_deals"
//        },
//        home_page : {
//            app_page: "scannow_page",
//            controller: "scannow_page"
//        }
    },
    
    _last_hash = "#",
    
    _history = [],
    
    _passParams = false,
    
    _action = function(route, params, history_need, callback){
//        console.log(route)
//        console.log(params)
        if(route.controller in Controller){
            Controller[route.controller](params, callback);
            if(history_need)
                _history.push({
                    route: route,
                    params: params
                });
            return true;
        }
        return false;
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
//        console.log("params")
//        console.log("params")
//        console.log(params)
        $.mobile.changePage("#"+params.page);
        
//        params.hash = params.hash.replace(/^#/,"");

//        $(".app_page").hide();
//        window.scrollTo(0,0);
//        $("#"+params.page).show();
//        _last_hash = "#"+params.hash;
//        window.location.hash= "#"+params.hash;
//        Loader.stop();
    },
            
    _check_params = function(params){
        for(var i in params)
            if(is_array(params[i]) || typeof(params[i]) === "object" || typeof(params[i]) === "function")
                return false;
        return true;
    };
    
    
//    Router.redirect = function(page, params, history_need, callback){
    Router.redirect = function(page, prms){ 
        /**
         * 
         * var prms = {
         *      params: 
         *      history_need:
         *      callback:
         * }
         * 
         * */
//        Loader.start();
//        console.log(prms)
        if(!empty(prms)){
            if(is_set(prms.params))var params = prms.params.params;
            if(is_set(prms.history_need)) var history_need = prms.history_need;
            if(is_set(prms.callback)) var callback = prms.callback;
//            if(is_set(prms.history_need)) var history_need = prms.history_need;
        }
        if(history_need !== false)var history_need = true;
        
        page = page.replace(/^#/,"");
//        console.log(_passParams);
//        console.log(_get_page_params(page));
        var page_and_params = (!is_set(_passParams) ? _get_page_params(page) : _passParams),
            route = {
                app_page : page_and_params.app_page,
                controller : page_and_params.app_page
            };
                    
//            _passParams = false;
            
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
//            return _action(route, params, history_need, function(){
            
            return _action(route, params, history_need, function(){
//                SwitchPage({page: route.app_page, hash:page});
                if(is_set(prms) && is_set(prms.switchPage))
                    SwitchPage({page: route.app_page, hash:page});
            });
        }
        return Router.redirect("scannow_page");
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
//            _last_hash = back_el.route.hash;
            Router.redirect(back_el.route.hash, back_el.params, false, back_el.callback);
            _history = _history.slice(0, _history.length-1);
        }else return Router.redirect("scannow_page");
    };
    
    Router.back = function(){
        if(_history.length > 1){
            var back_el = _history[_history.length-2];
            SwitchPage({page: back_el.route.app_page, hash: back_el.route.hash});
            _history = _history.slice(0, _history.length-1);
        }else return Router.redirect("scannow_page");
    };
    
        
    $(document).ready(function(){
        $(document).on("click", 'a', function(){
            if(!$(this).attr("data-rel") && $(this).attr("data-rel") !== "back"){
                var page_name = $(this).attr("href").match(/^#(.[^\?]+)\?*/)[1];
                Router.redirect(page_name, {
                    params: _get_page_params( $(this).attr("href").replace("#", "") ),
                    switchPage: true
                });
                return false;
            }
        });
        
//        $(document).on("pagebeforeshow",function(data, ev){
//            data.delegateTarget.baseURI
//            console.log("data")
//            return false
//            console.log(data)
//            console.log(ev)
//        alert("pagebeforeshow event fired - pagetwo is about to be shown");
//        });
        
        
//        var hashset;
//        $(document).on("click", 'a', function(){
//            if($(this).attr("data-rel") && $(this).attr("data-rel") === "back")
//                return false;
//            hashset = $(this).attr("href").match(/^#(.[^\?]+)\?*/)[1];
//            _passParams = _get_page_params( ($(this).attr("href").replace("#", "")) );
//        });
//        
//        window.addEventListener("hashchange", function(h){
//            if(h.newURL.match(/#(.[^\?]+)\?*/) === null || h.newURL.match(/#(.[^\?]+)\?*/)[1] === "")
//                if(h.newURL.match(/#(.[^\?]+)\?*/)[1] === hashset)
//                    return routetogo("scannow_page", false, true);
//                else
//                    return routetogo("scannow_page", true, true);
//            else
//                if(h.newURL.match(/#(.[^\?]+)\?*/)[1] === hashset)
//                    return routetogo(h.newURL.match(/#(.*)/)[1], false, true);
//                else 
//                    return routetogo(h.newURL.match(/#(.*)/)[1], true, true);
//        }, false);
//        
        window.location.hash === "" ?
            Router.redirect("scannow_page") : 
            Router.redirect(window.location.hash.replace("#", ""),{switchPage: true}); //start the app
//        window.location.hash === "" ?
//            routetogo("scannow_page", true, true) : 
//            routetogo(window.location.hash.replace("#", ""),true,true); //start the app
//            
        function routetogo(r, params, go){
//            console.log("dasdas")
            if(params === true)
                _passParams = _get_page_params( (r.replace("#", "")) );
            if(go === true)
                return Router.redirect(r.match(/^#{0,1}(.[^\?]+)\?*/)[1]);
        }
       
    });
    
   
    
}(App.Router, App.Controller, App.Widgets.Loader));