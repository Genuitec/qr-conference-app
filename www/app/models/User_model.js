(function(Models, RoomerApi, Storage){
    
    Models.User = {
        
        read : function(callback){//not in Use now --> instead AllData
            RoomerApi.user_info(Storage.get("user_data")["email"], callback);
        },
                
        allData : function(callback){
            var user_email = Storage.get("user_data")["email"];
            Async.parallel({
                user: function(c){
                    RoomerApi.user_info(user_email, c);
                },
                reservations: function(c){
                    RoomerApi.get_reservations_list(user_email, c);
                },
                bookings: function(c){
                    RoomerApi.get_booked_reservations_list(user_email, c);
                }
            }, callback);
        },
        
        logIn : function(data, callback){
            RoomerApi.login(data, function(resp){
                console.log(resp);
                if(resp.success && resp.success == true){
                    Storage.set("user_data", data);
                    Storage.set("loggedAt", new Date().getTime());
                    return callback(true);
                }
                return callback(false);
            });
        },
        
        signUp : function(data, callback){
//            var _this = this;
            RoomerApi.register(data, function(resp){
                console.log(resp);
                if(resp.success && resp.success == true){
                    Storage.set("user_data", data);
//                    _this.logIn(data, function(){
//                        
                        return callback(true);
//                    });
                }
                return callback(false);
            });
        },

        facebookLogin : function(data, callback) {
          RoomerApi.facebook_login(data, function(response) {
              console.log(response);
              Storage.set("user_data",data.auth.info);
              Storage.set("loggedAt", new Date().getTime());
              if(callback)
                  callback(response);
          });
        },
        isLogged: function(){
            return is_set(Storage.get("user_data")) ? true : false;
        },
        
        clear_saved_data: Storage.clear
        
    };
    
}(App.Models, App.Resources.RoomerApi, localStorage_helper));