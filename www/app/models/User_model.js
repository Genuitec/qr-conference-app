(function(Models, Session, getConfig, DB, Widgets){
    
    Models.User = {
        
        read : function(callback){
            callback(Session.get("user_data"));
        },
        
        serverLogIn : function(formdata, callback){
            if(is_set(Session.get("server_url"))){
                if(is_set(Session.get("server_url")) && Session.get("server_url") !== formdata.hosturl){
                    this.clearLocalData();
                    alert("You are accessing another server. All local data will be removed");
                }
            }
            var urlToPost = ((formdata.hosturl.trim())+(getConfig("login_url").trim())).trim();

            $.ajax({
                type: "POST",
                url: urlToPost,
//                contentType: "application/json",
                success: function(responsedata){
                    if(responsedata.loggedIn === true){
                        Session.set("session_id", responsedata.session);
                        Session.set("server_url", formdata.hosturl);
                        Session.set("user_data", formdata);
                        console.log("Finished logging in");
                        console.log(responsedata);
                        callback({
                            success     :   true,
                            userdata    :   formdata
                        });
                    }else
                        callback({
                            success     :   false,
                            error       :   "Invalid username or password."
                        });
                },
                error: function(e){
                    alert("server unavailable");
                },
                data: {
                    j_username: formdata.userid,
                    j_password: formdata.password
                }
            });
            
        },
        
        logIn : function(data, callback){
            Session.set("user_data", data);
            Session.set("islogged", true);
            callback({
                success: {
                    isLogged: true,
                    userData: data
                }
            });
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
        }
        
    };
    
}(App.Models, App.Session, App.Config.get, App.DB, App.Widgets));