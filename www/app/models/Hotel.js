(function(Models, RoomerApi){
    
    Models.Hotel = {
        
        read : function(id, callback){
            RoomerApi.hotel_details(id, callback);
        },
        
        list : function(name, callback){
            RoomerApi.get_hotels_list(name, callback);
        },
                
        get_room_types : function(hotel_id, calllback){
            RoomerApi.hotel_room_types(hotel_id, calllback);
        },
                
        create_reservation : function(user, params, callback){
            RoomerApi.create_reservation(user, params, callback);
        }
//                
//        list_RouteParams : function(){
//            return RoomerApi.get_req_data("get_hotels_list");
//        }
        
    };
    
}(App.Models, App.Resources.RoomerApi));