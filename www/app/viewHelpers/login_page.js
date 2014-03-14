(function(View, LogInForm, Router, bgSync, Session){
    
    var initLogIn = false;
    
    View.login_page = function(){
        if(is_set(Session.get("user_data").hosturl))
            $("#login_page form #hosturl").val(Session.get("user_data").hosturl);
        if(is_set(Session.get("user_data").userid))
            $("#login_page form #userid").val(Session.get("user_data").userid);
        if(is_set(Session.get("user_data").password))
            $("#login_page form #password").val(Session.get("user_data").password);

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
    
}(App.viewHelpers, App.Widgets.logIn, App.Router, App.Widgets.bgSync, App.Session));