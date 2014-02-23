(function(Models, Session){
    
    Models.User = {
        
        read : function(callback){
            callback(Session.get("user_data"));
        },
        
        logIn : function(data, callback){
            Session.set("user_data", data) ?
                callback({
                    success: {
                        isLogged: true,
                        userData: data
                    }
                })
            : callback({error: ""});
        },
        
        logOut : function(){
            Session.clear("user_data");
        },
        
        signUp : function(data, callback){},
                
        isLogged: function(callback){
            callback(empty(Session.get("user_data")) ? false : true);
        }
        
    };
    
}(App.Models, App.Session));