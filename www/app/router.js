(function(Router, Controller, Loader){
    
    // all specific routes goes here ---> F E app_page!==controller || hash !== controller
    var _routes = {
//        more_amazing_deals : {
//            app_page: "results_page",
//            controller: "more_amazing_deals"
//        },
//        more_last_minute_deals : {
//            app_page: "results_page",
//            controller: "more_last_minute_deals"
//        }
    },
    
    _last_hash = "#",
    
    _history = [],
    
    _action = function(route, params, history_need, callback){
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
        params.hash = params.hash.replace(/^#/,"");

//        $(".app_page").hide();
        window.scrollTo(0,0);
//        $("#"+params.page).show();
        _last_hash = "#"+params.hash;
//        window.location.hash= "#"+params.hash;
        Loader.stop();
    },
            
    _check_params = function(params){
        for(var i in params)
            if(is_array(params[i]) || typeof(params[i]) === "object" || typeof(params[i]) === "function")
                return false;
        return true;
    };
    
    
    Router.redirect = function(page, params, history_need, callback){
        console.log(page)
        Loader.start();
        
        if(history_need !== false)var history_need = true;
        page = page.replace(/^#/,"");
        
//        console.log(sessionStorage_helper.get("params"));
//        var page_and_params = _get_page_params(page),
        var page_and_params = sessionStorage_helper.get("params"),
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
                SwitchPage({page: route.app_page, hash:page});
            });
        }
//        console.log(route)
        return Router.redirect("scannowpage");
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
            _last_hash = back_el.route.hash;
            Router.redirect(back_el.route.hash, back_el.params, false, back_el.callback);
            _history = _history.slice(0, _history.length-1);
        }else return Router.redirect("scannowpage");
    };
    
    Router.back = function(){
        if(_history.length > 1){
            var back_el = _history[_history.length-2];
            SwitchPage({page: back_el.route.app_page, hash: back_el.route.hash});
            _history = _history.slice(0, _history.length-1);
        }else return Router.redirect("scannowpage");
    };
        
//    $(document).on("pagebeforeshow",function(event){
//        alert("pagebeforeshow event fired - the page is about to be shown");
//    });
        
    $(document).ready(function(){
        var hashset;
        $(document).on("click", 'a', function(){
//            console.log("aaaa click")
//            hashset = $(this).attr("href").match(/.*(#.*)/)[1];
            hashset = $(this).attr("href").match(/^#(.[^\?]+)\?*/)[1];
            sessionStorage_helper.set("params", _get_page_params( ($(this).attr("href").replace("#", "")) ));
        });
        
        window.addEventListener("hashchange", function(h){
            
            console.log(h.newURL);
            console.log(hashset);
            
//            if(h.newURL.match(/.*#(.*)/) === null || h.newURL.match(/.*#(.*)/)[1] === "")
//                if(h.newURL.match(/.*(#.*)/)[1] === hashset)
//                    return routetogo("scannowpage", false, true);
//                else
//                    return routetogo("scannowpage", true, true);
//            else
//                if(h.newURL.match(/.*(#.*)/)[1] === hashset)
//                    return routetogo(h.newURL.match(/.*#(.*)/)[1], false, true);
//                else 
//                    return routetogo(h.newURL.match(/.*#(.*)/)[1], true, true);
            if(h.newURL.match(/^#(.[^\?]+)\?*/) === null || h.newURL.match(/^#(.[^\?]+)\?*/)[1] === "")
                if(h.newURL.match(/^#(.[^\?]+)\?*/)[1] === hashset)
                    return routetogo("scannowpage", false, true);
                else
                    return routetogo("scannowpage", true, true);
            else
                if(h.newURL.match(/^#(.[^\?]+)\?*/)[1] === hashset)
                    return routetogo(h.newURL.match(/^#(.[^\?]+)\?*/)[1], false, true);
                else 
                    return routetogo(h.newURL.match(/^#(.[^\?]+)\?*/)[1], true, true);
        }, false);
//        
//        $(document).on("click", '[data-rel="back"]', function(e){
//            e.preventDefault();
//            return Router.back();
//        });
       
//        

        

//        window.location.hash === "" ?
//            Router.redirect("scannowpage") : 
//            Router.redirect(window.location.hash.replace("#", "")); //start the app
        window.location.hash === "" ?
            routetogo("scannowpage", true) : 
            routetogo(window.location.hash.replace("#", "")); //start the app
            
            
        function routetogo(r, params, go){
            if(go === true)
                sessionStorage_helper.set("params", _get_page_params( (r.replace("#", "")) ));
            if(go === true)
                return Router.redirect(r.replace("#", ""));
        }
//        $(document).on('pagebeforeshow', function (event, data) {
//
//            console.log("event");
//            console.log(event);
//            Router.redirect(event.delegateTarget.baseURI.match(/.*#(.*)/)[1]);
//        });
       
    });
    
   
    
}(App.Router, App.Controller, App.Widgets.Loader));