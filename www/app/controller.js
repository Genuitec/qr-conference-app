(function(Controller, viewHelpers, Models, Router){

    Controller.scannow_page = function(params, load){
        Models.Scan.recent(viewHelpers.scannow_page);        
        if(is_set(load))load();
    };

    Controller.scaninfo_page = function(params, load){
        if(empty(params) || empty(params.id))return Router.redirect("scannow_page", {switchPage:true});
        
        Models.Scan.read({id: params.id}, viewHelpers.scaninfo_page);
        
        if(is_set(load))load();
    };

}(App.Controller, App.viewHelpers, App.Models, App.Router));
