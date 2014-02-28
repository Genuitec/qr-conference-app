(function(Widgets, User){
    
    function validate(data){
        if(empty(data.hosturl))
            return false;
        if(empty(data.userid))
            return false;
        if(empty(data.password))
            return false;
        return true;
    };
    
    function serverLogIn(data, callback){
        User.serverLogIn(data, callback);
    }
    
    Widgets.logIn = function(formEl, callback){
        
        formEl.submit(function(e){
            e.preventDefault();
            var formData = $(this).formData();
            if(validate(formData))
                serverLogIn(formData, function(result){
                    if(result.success == true)
                        User.logIn(formData , callback);
                    else
                        alert("LogIn error! Check internet connection");
                });
            else
                alert("Please fillUp the form");
        });
        
    };
    
}(App.Widgets, App.Models.User));