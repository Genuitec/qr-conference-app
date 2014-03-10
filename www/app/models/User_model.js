(function(Models, Session, getConfig, DB, Widgets){
    
    Models.User = {
        
        read : function(callback){
            callback(Session.get("user_data"));
        },
        
        serverLogIn : function(formdata, callback){
            if(!empty(Session.get("server_url")) && Session.get("server_url") !== formdata.hosturl){
                this.clearLocalData();
                alert("You are accessing another server. All local data will be removed");
            }
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
                (function(){
                    callback({
                        success: {
                            isLogged: true,
                            userData: data
                        }
                    });
                    Session.set("islogged", true);
                }())
            : callback({error: ""});
        },
        
        logOut : function(){
            Widgets.bgSync.stop();
            Session.clear("islogged");
        },
        
        clearLocalData : function(){
            Session.clear();
            DB.recreate_db();
        },
        
        signUp : function(data, callback){},
                
        isLogged: function(callback){
            callback(empty(Session.get("islogged")) ? false : true);
//            callback(empty(Session.get("user_data")) ? false : true);
        }
        
    };
    
}(App.Models, App.Session, App.Config.get, App.DB, App.Widgets));