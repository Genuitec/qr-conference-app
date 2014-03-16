(function(Controller, viewHelpers, Models, Router, Session, Widgets){

    Controller.login_page = function(params, load){
        console.log("login_page");
        Models.User.isLogged(function(userLogged){
            if(userLogged === true){
                Widgets.bgSync.start();
                Router.redirect("chooseconference_page", {switchPage: true});
            }else{
                viewHelpers.login_page();
                if(is_set(load))load();
            }
        });
    };
    
    Controller.logout = function(){
        Models.User.logOut();
        Router.redirect("login_page", {switchPage: true});
    };

    Controller.chooseconference_page = function(params, load){
        Models.Conference.read(viewHelpers.chooseconference_page);
        if(is_set(load))load();
    };
    
    Controller.conference_page = function(params, load){
        try{
            if(empty(params) || empty(params.id))
                return Router.redirect("chooseconference_page", {switchPage:true});
            Models.Conference.info(params.id, function(data){
                Session.set("conference_id", data.conference.id);
                viewHelpers.conference_page(data);
                if(is_set(load))load();
            });
        }catch(e){
            console.log("conference_page error");
            console.log(e);
        }
    };
    
    Controller.scaninfo_page = function(params, load){
        try{
            if(empty(params) || empty(params.id))return Router.redirect("chooseconference_page", {switchPage:true});
            Models.Scan.info({
                id: params.id,
                conference_id: Session.get("conference_id")
            }, viewHelpers.scaninfo_page);   
            if(is_set(load))load();
        }catch(e){
            console.log("scaninfo_page error");
            console.log(e);
        }
    };

    Controller.attendees_page = function(params, load){
        Models.Tag.conferenceTags({conference_id: Session.get("conference_id")}, viewHelpers.attendees_page);
        if(is_set(load))load();
    };
    
    Controller.attendeeslist_page = function(params, load){
        params.conference_id = Session.get("conference_id");
        Models.Scan.filter_read(params, function(data){
            viewHelpers.attendeeslist_page(data);
            if(is_set(load))load();
        });            
    };
    
}(App.Controller, App.viewHelpers, App.Models, App.Router, App.Session, App.Widgets));
