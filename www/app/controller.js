(function(Controller, viewHelpers, Models, Router, Session){

    Controller.scannow_page = function(params, load){
        Models.Scan.recent(params.conferenceid, viewHelpers.scannow_page);        
        if(is_set(load))load();
    };

    Controller.chooseconference_page = function(params, load){
        Models.Conference.read(viewHelpers.chooseconference_page);
        if(is_set(load))load();
    };
    
    Controller.conference_page = function(params, load){
        if(empty(params) || empty(params.id))return Router.redirect("chooseconference_page", {switchPage:true});
        
        Models.Conference.info(params.id, function(data){
            Session.set("conference_id", data.conference.id);
            viewHelpers.conference_page(data);
            if(is_set(load))load();
        });
    };
    
    Controller.attendees_page = function(params, load){        
        Models.Attendee.read(function(data){
            viewHelpers.attendees_page(data);
            if(is_set(load))load();
        });
    };
    
    Controller.scaninfo_page = function(params, load){
        if(empty(params) || empty(params.id))return Router.redirect("scannow_page", {switchPage:true});
        
//        Models.Scan.read({
        Models.Scan.info({
            id: params.id,
            conference_id: Session.get("conference_id")
        }, viewHelpers.scaninfo_page);
        
        if(is_set(load))load();
    };

}(App.Controller, App.viewHelpers, App.Models, App.Router, App.Session));
