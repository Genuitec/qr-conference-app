(function(Models, Session){
    
    var _clearData = function(){
        Session.clear;
    };
    
    Models.User = {
        
        read : function(callback){},
        
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
        
        logOut : _clearData,
        
        signUp : function(data, callback){},
                
        isLogged: function(callback){
            callback(empty(Session.get("user_data")) ? false : true);
        }
        
    };
    
}(App.Models, App.Session));