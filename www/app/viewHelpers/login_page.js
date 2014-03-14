(function(View, LogInForm, Router, bgSync){
    
    var initLogIn = false;
    
    View.login_page = function(){
        if(initLogIn === false){
            LogInForm($("#login_page .form form"), function(logged){
                
                try{
                
                    if(logged.error)
                        return alert("login error");

                    console.log("Running initial sync");

                    bgSync.start(function(){
                        Router.redirect("chooseconference_page", {switchPage: true});
                    });

                }catch(error){
                    console.log("View.login_page error");
                    console.log(error);
                }
            });
            initLogIn = true;
        }
    };
    
}(App.viewHelpers, App.Widgets.logIn, App.Router, App.Widgets.bgSync));