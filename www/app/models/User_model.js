(function(Models, Session, getConfig){
    
    Models.User = {
        
        read : function(callback){
            callback(Session.get("user_data"));
        },
        
        serverLogIn : function(formdata, callback){
        	$.ajax({
                type: "GET",
                url: formdata.hosturl + getConfig("prepare_login_url"),
                dataType: "text",
                success: function(responsedata){
                	if (responsedata.indexOf("already-logged-in") != -1) {
                		// success indicated by already-logged-in instead of login form
                    	Session.set("server_url", formdata.hosturl);
                        callback({
                            success     :   true,
                            userdata    :   formdata
                        });
                	} else {
	                	$.ajax({
	                        type: "POST",
	                        url: formdata.hosturl + getConfig("login_url"),
	                        dataType: "text",
	                        data: {
	                            j_username: formdata.userid,
	                            j_password: formdata.password
	                        },
	                        success: function(loginresponse){
	                        	// on success, we get redirected back to prepare_login_url
	                        	if (loginresponse.indexOf("already-logged-in") != -1) {
	                        		// success indicated by redirect
	                            	Session.set("server_url", formdata.hosturl);
	                                callback({
	                                    success     :   true,
	                                    userdata    :   formdata
	                                });
	                        	} else {
		                        	// html response indicates not logged in
		                            callback({
		                                success     :   false,
		                                error       :   "Invalid username or password."
		                            });
	                        	}
	                        },
	                        error: function(error){
	                            callback({
	                                success     :   false,
	                                error       :   error
	                            });
	                        }
	                    });
                	}
                },
                error: function(error){
                    callback({
                        success     :   false,
                        error       :   error
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