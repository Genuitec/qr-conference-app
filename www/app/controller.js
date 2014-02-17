(function(Controller, viewHelpers, Models, Router, Session){

    Controller.scannow_page = function(params, load){
        Models.Scan.recent(Session.get("conference_id"), viewHelpers.scannow_page);        
        if(is_set(load))load();
    };

    Controller.chooseconference_page = function(params, load){
        Models.Conference.read(viewHelpers.chooseconference_page);
        if(is_set(load))load();
    };
    
    Controller.conference_page = function(params, load){
        if(empty(params) || empty(params.id))return Router.redirect("chooseconference_page", {switchPage:true});
        
        Models.Conference.info({
            id: params.id
        }, function(data){
            Session.set("conference_id", data.conference.id);
            viewHelpers.conference_page(data);
            if(is_set(load))load();
        });
    };
    
    Controller.scaninfo_page = function(params, load){
        if(empty(params) || empty(params.id))return Router.redirect("scannow_page", {switchPage:true});
        
        Models.Scan.read({
            id: params.id,
            conference_id: Session.get("conference_id")
        }, viewHelpers.scaninfo_page);
        
        if(is_set(load))load();
    };

}(App.Controller, App.viewHelpers, App.Models, App.Router, App.Session));
