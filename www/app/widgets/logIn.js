(function(Widgets, User){
    
    Widgets.logIn = function(formEl, callback){
        
        formEl.submit(function(e){
           e.preventDefault();
           User.logIn( $(this).formData(), callback);
        });
        
    };
    
}(App.Widgets, App.Models.User));