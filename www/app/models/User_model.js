(function(Models, Session, getConfig){
    
    Models.User = {
        
        read : function(callback){
            callback(Session.get("user_data"));
        },
        
        serverLogIn : function(formdata, callback){
        	$.post(formdata.hosturl + getConfig("login_url"),
                {
                    j_username: formdata.userid,
                    j_password: formdata.password
                },
                function(responsedata){
                	if (responsedata.loggedIn == true) {
                		Session.set("session_id", responsedata.session);
                    	Session.set("server_url", formdata.hosturl);
                    	Session.set("user_data", formdata);
                        console.log("Finished logging in");
                    	callback({
                            success     :   true,
                            userdata    :   formdata
                        });
                	} else {
                        callback({
                            success     :   false,
                            error       :   "Invalid username or password."
                        });
                	}
                });
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
    
}(App.Models, App.Session, App.Config.get));