(function(View, LogInForm, Router){
    
    var initLogIn = false;
    
    View.login_page = function(){
        if(initLogIn === false){
            LogInForm($("#login_page .form form"), function(logged){
                if(logged.error)
                    return alert("logIn error");

                Router.redirect("chooseconference_page", {switchPage: true});
            });
            initLogIn = true;
        }
    };
    
}(App.viewHelpers, App.Widgets.logIn, App.Router));