(function(Models, GoogleApi, RoomerApi, Storage){
    
    Models.Place = {
        
        read : GoogleApi.autocomplete,
        
        details : GoogleApi.details,
        
        search : function(params, callback){
            console.log(params);
//            RoomerApi.search("search_by_place", params, callback);
            RoomerApi.search("search_by_city_and_dates", params, callback);
        },
        
        query_place_params: function(details){
            var res = {}, state, city, country;
            console.log(details);
            details.address_components.forEach(function(el){
                if(el['types'][0] === 'country'){
                    country = el['long_name'];
                    if(['United States', 'US'].indexOf(country) >= 0)
                        country = 'USA';
                    else
                        country = country.replace(/\ /g,'-');
                }else if(el['types'][0] === 'administrative_area_level_1')
                    state = el['short_name'].replace(/\ /g,'-');
                else if(el['types'][0] === 'locality')
                    city = el['long_name'].replace(/\ /g,'-');
            });
            
            state = is_set(state) ? (state + '--') : ("");
            city = is_set(city) ? (city + '--') : ("");
            
//            res.type  = details.types[details.types.length-1];
//            res.destination = details.name.replace(/\ /g,'-')+( (details.types[0] === "sublocality" || details.types[0] ===  "lodging") ? '/' : '---')+city+state+country;
            res.destination = city+state+country;
//            
//            res.lat = details.geometry.location.d;
//            res.lng = details.geometry.location.e;
//            if(is_set(details.geometry.viewport)){
//                res.ne_lat = details.geometry.viewport.ia.b;
//                res.ne_lng = details.geometry.viewport.ta.d;
//                res.sw_lat = details.geometry.viewport.ia.d;
//                res.sw_lng = details.geometry.viewport.ta.b;
//            }
            
            return res;    
        },

        alert_me: function(params, callback) {
            RoomerApi.alert_me(Storage.get("user_data")["email"], params, callback);
        }
    };
    
}(App.Models, App.Resources.GoogleApi, App.Resources.RoomerApi, localStorage_helper));