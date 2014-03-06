(function(View, LogInForm, Router, Sync){
    
    var initLogIn = false;
    
    View.login_page = function(){
        if(initLogIn === false){
            LogInForm($("#login_page .form form"), function(logged){
                if(logged.error)
                    return alert("logIn error");

                Sync(true, function(){
                    Router.redirect("chooseconference_page", {switchPage: true});
                });
            });
            initLogIn = true;
        }
    };
    
}(App.viewHelpers, App.Widgets.logIn, App.Router, App.Widgets.sync));