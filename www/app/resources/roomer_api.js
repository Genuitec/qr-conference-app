(function(Resources, Router){
    
    var API = function(){

        var _Routes = {
            basic_url : 'http://sandbox-api.roomertravel.com/api/', //slash at the end
            register : {
                route : 'users',
                type  : "POST"
            },
            login : {
                route : "users/sign_in",
                type  : "POST"
            },
            facebook_login: {
                route :"users/auth/facebook/callback",
                type  : "POST"
            },
            user_info : {
                route : "dashboard/info",
                type  : "GET"
            },
            reset_password : {
                route : "users/password",
                type  : "POST"
            },
            search_by_city_and_dates : {
                route : "reservations", // no slash at the end
                type  : "GET" 
            },
            search_by_hotels_id : {
                route : "reservations_by_hotels", // no slash at the end
                type  : "GET" 
            },
            search_by_place : {
                route : "reservations_by_place", // no slash at the end
                type  : "GET" 
            },
            search_amazing_deals : {
                route : "amazing_deals", // no slash at the end
                type  : "GET" 
            },
            search_last_minute_deals : {
                route : "last_minute_deals", // no slash at the end
                type  : "GET" 
            },
            hotel_details : {
                route : "hotels", // no slash at the end
                type  : "GET" 
            },
            get_market_place : {
                route : "get_market_place", // no slash at the end
                type  : "GET" 
            },
            create_reservation : {
                route : "reservations/create", // no slash at the end
                type  : "POST" 
            },
            book_reservation : {
                route : "reservations", // no slash at the end
                type  : "POST" 
            },

            get_reservations_list : {
                route : "dashboard/listings", // no slash at the end
                type  : "GET" 
            },
            get_booked_reservations_list : {
                route : "dashboard/bookings", // no slash at the end
                type  : "GET" 
            },
            get_hotels_list : {
                route : "auto_complete_hotels", // no slash at the end
                type  : "GET" 
            },
            book_alert: {
                route: "alert_me",
                type: "POST"
            }
        },
        Configs = {
            headers: {
                'Authorization' : "Token token=weYMMGRfwsXyzXYKroaj",
                'partner' : "api-sandbox@everywhere.is",
                'API-Version' : "mobile"
            }
        },
        _getRoute = function(route){
            return ((route in _Routes) ? {
                route : _Routes["basic_url"]+_Routes[route].route,
                type  : _Routes[route].type
            } : false);
        },

        __apiRequest = function (route, url_part, data, headers, callback){
            if((route && data) || (route && data === "")){
    //            console.log("before_request");
    //            var _route = _getRoute(route);
                var _route;
                if(!(_route = _getRoute(route)))return callback(false);
                if(url_part !== "")_route.route+="/"+url_part;   
                _make_request(_route.route, _route.type, data, headers, callback);
            }else
                callback(false);
        },

        _make_request = function(url, type, data, headers, callback){
//            url = url.replace(/(http\:\/\/.*)\/\//, "$1/");
            var send_data = {
                url: url,
                headers: Configs.headers,
//                headers: {
//                    'Authorization' : "Token token=weYMMGRfwsXyzXYKroaj",
//                    'partner' : "api-sandbox@everywhere.is",
//                    'API-Version' : "mobile"
//                },
                type: type
            };
            if(headers && headers !== ""){
                for(var h in headers){
                    send_data.headers[h] = headers[h];
                }
            }
//            if(data !== "")send_data.data = data;
            if(!empty(data))send_data.data = data;
            console.log("before request");
            console.log(send_data);
            $.ajax(send_data)
            .done(callback)
            .fail(function(){
               // Router.redirect("error_page");
//                alert( "error" );
            });
        },

        _search = function(route, params, callback){
        
            if(typeof(route) === undefined) return callback(false);
            var part_url = "";
            if(typeof(callback) === "undefined")
                var callback = params;
            else{
                if(params.hotels){
                    (params.hotels).forEach(function(v, k){
                        part_url += (k===0 ? "/"+v : ","+v);
                    });
                    delete params.hotels;
                }
                if(params.destination){
                    part_url += "/"+params.destination;
                    delete params.destination;
                }
                if(params.checkin){
                    part_url += "/"+params.checkin;
                    delete params.checkin;
                }
                if(params.checkout){
                    part_url += "/"+params.checkout;
                    delete params.checkout;
                }
            }
            part_url = part_url.replace(/^\//, "");
            __apiRequest(route, part_url, params, "", callback);
        },

        search = function(url_type, params, callback){
    //        var data = {
    //            destination: "New-York--NY--USA",
    //            checkin: "2014-01-14",
    //            checkout: "2014-03-15",
    //            hotels:[1,2,3]
    //        }
    ////////////////////////////////////////
            if(url_type in _Routes){
//                arguments.length === 3 ? _search(url_type, params, callback): _search(url_type, params);
                _search(url_type, params, callback);
            }else{
                callback(false);
            }
        };

        register = function(params, callback){
    //        var data = {
    //            user: {
    //                email: "igorizr1@gmail.com",
    //                password: "qwerty123",
    //                first_name: "Igor",
    //                last_name : "Izr"
    //            }
    //        };
    //////////////////////////////////                    
            __apiRequest("register", "", {
                user: params
            }, "", callback);
        },

        login = function(params, callback){
//            var params = {
//                user: {
//                    email: "igorizr1@gmail.com",
//                    password: "qwerty123"
//                }
//            };
    ///////////////////////////////
            __apiRequest("login", "", {
                user: params
            }, "", callback);
        },

        facebook_login = function(params, callback) {
            /*
             * params = {
             *  signed_request: authResponse.signedRequest
             *  }
             */
            __apiRequest("facebook_login","", params, "", callback);
        },

        user_info = function(user_email, callback){
            console.log("user_info");
//            __apiRequest("user_info", "", {user: {email:user_email}}, "", callback);
            __apiRequest("user_info", "", "", {User:user_email}, callback);
        },

        reset_password = function(params, callback){
    //        var data = {
    //            user: {
    //                email: "igorizr1@gmail.com"
    //            }
    //        };
    ////////////////////////////////////////
            __apiRequest("reset_password", "", {
                user: params
            }, "", callback);
        },

        hotel_details = function(hotel_id, callback){
            __apiRequest("hotel_details", hotel_id, "", "", callback);
        },

        hotel_room_types = function(hotel_id, callback){
            __apiRequest("hotel_details", hotel_id+"/room_types", "", "", callback);
        },

        get_market_place = function(params, callback){
    //        var data = {
    //            roomer_hotel_id : 1,
    //            ean_room_type_id : 1,
    //            room_type_name: 1, 
    //            check_in: "2014-01-14" ,
    //            check_out: "2014-01-20" 
    //        };
            __apiRequest("get_market_place", "", params, "", callback);
        },

        create_reservation = function(user, params, callback){
       /*     headers:
                user - required
              parameters:
                hotel_id, (ean_room_type or room_type), check_in, check_out, adult_guest, book_from, guest_first_name,
                guest_last_name, guest_email, phone, confiramtion_code, asked_price, prepaid, payment_method -
                required, confirmation_code_2 - optional
        */
            __apiRequest("create_reservation", "", params, user, callback);
        },

        alert_me = function(user, params, callback) {
            /*
                parameters:
                    email, location
             */
            var headers = Configs.headers;
            headers.User = params.email;
            __apiRequest("book_alert", "", params, headers, callback);
        },

        review_reservation = function(user, params, callback){
       /*     headers:
                user - optional
              parameters:
                email, guest_first_name, guest_last_name, phone, ip - optional
        */
            var reservation_id = params.reservation_id;
            delete params.reservation_id;
            var headers = Configs.headers;
            headers.User = user;
            __apiRequest("book_reservation", reservation_id+"/review", params, headers, callback);
        },
        book_reservation = function(params, callback) {
            var reservation_id = params.reservation_id;
            var headers = Configs.headers;
            headers["Content-Type"] = "application/json";
            __apiRequest("book_reservation", reservation_id+"/book", JSON.stringify(params), headers, callback);
        },

//        get_reservations_list = function(user, params, callback){
        get_reservations_list = function(user_email, callback){
       /* In this request we require logged in user email in the header. */
//            var reservation_id = params.reservation_id;
//            delete params.reservation_id;
            __apiRequest("get_reservations_list", "", "", {User:user_email}, callback);
        },
                
        get_booked_reservations_list = function(user_email, callback){
       /* In this request we require logged in user email in the header. */
//            var reservation_id = params.reservation_id;
//            delete params.reservation_id;
            __apiRequest("get_booked_reservations_list", "", "", {User:user_email}, callback);
        },

        get_hotels_list = function(name, callback){
            __apiRequest("get_hotels_list", "", {name: name}, "", callback);
        },
                
        get_req_data = function(url){
            var result = _getRoute(url);
            result.headers = Configs.headers;
            return result;
        };

        return {
            register : register,
            login : login,
            user_info : user_info,
            reset_password : reset_password,
            search : search,
            hotel_details : hotel_details,
            hotel_room_types : hotel_room_types,
            get_market_place : get_market_place,
            create_reservation : create_reservation,
            review_reservation : review_reservation,
//            get_booked_reservations : get_booked_reservations,
            get_booked_reservations_list : get_booked_reservations_list,
            get_reservations_list : get_reservations_list,
            get_hotels_list : get_hotels_list,
            get_req_data : get_req_data,
            alert_me: alert_me,
            book_reservation: book_reservation,
            facebook_login: facebook_login
        };

    };
            
    Resources.RoomerApi = new API();

}(App.Resources, App.Router));






