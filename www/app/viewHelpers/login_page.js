(function(View, LogInForm, Router){
    
    View.login_page = function(){
        LogInForm($("#login_page .form form"), function(logged){
            if(logged.error)
                return alert("logIn error");
            
            Router.redirect("chooseconference_page", {switchPage: true});
        });
    };
    
}(App.viewHelpers, App.Widgets.logIn, App.Router));