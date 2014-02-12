(function(Controller, viewHelpers, Models, Router){
    
    Controller.scannowpage = function(params, load){
//        Async.parallel({
//            amazing_deals: Models.Deal.amazing_deals,
//            last_minute_deals: Models.Deal.last_minute_deals
//        }, function(data){
            console.log("111");
            viewHelpers.scannowpage();
            if(is_set(load))load();
//        });
    };
    Controller.scaninfopage = function(params, load){
//        console.log(sessionStorage_helper.get("params"))
        console.log("222");
        console.log(params);
    };
    
    
}(App.Controller, App.viewHelpers, App.Models, App.Router));
