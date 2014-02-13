(function(Controller, viewHelpers, Models, Router){
    
    Controller.scannow_page = function(params, load){
        viewHelpers.scannow_page();
        
        
        if(is_set(load))load();
    };
    
    Controller.scaninfo_page = function(params, load){
        if(empty(params))return Router.redirect("scannow_page", {switchPage:true});
        
        viewHelpers.scaninfo_page();
        
        if(is_set(load))load();
    };
    
    
}(App.Controller, App.viewHelpers, App.Models, App.Router));
