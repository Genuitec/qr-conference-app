(function(Models, RoomerApi, Storage){
    
    Models.Deal = {
        
        amazing_deals : function(params, callback){
            if(arguments.length === 1)
                var callback = params, params = "";
            RoomerApi.search("search_amazing_deals", params, callback);          
        },
        last_minute_deals : function(params, callback){
            if(arguments.length === 1)
                var callback = params, params = "";
            RoomerApi.search("search_last_minute_deals", params, callback);
        },
        review_reservation:function(params, callback) {
            RoomerApi.review_reservation(Storage.get("user_data")["email"], params, callback);
        },
        book_reservation: function(params, callback) {
            RoomerApi.book_reservation(params, callback);
        }
        
    };
    
}(App.Models, App.Resources.RoomerApi, localStorage_helper));