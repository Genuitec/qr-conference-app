(function(Widgets, Models, Config, Router){
    
    
    Widgets.Loader = (function(){
        var loader, body,
        initLoader = function(){
            if(empty(loader)){
                body = document.querySelector("body"),
                loader = body.appendChild(document.createElement('div'));
                loader.id = "loader";
            }
        };
        
        return {
            start: function(){
                initLoader();
                body.style.overflow = "hidden";
                loader.style.display = "block";
            },
            stop: function(){
                initLoader();
                body.style.overflow = "";
                loader.style.display = "none";
            }     
        }; 
    }());
    
    
    
    Widgets.liveSearch = (function(Place){
        
        return function(form_el, params){
            var selected_item_params;
            
            if(is_set(params, params.onSubmit) && typeof(params.onSubmit) === "function")
                form_el.submit(function( event ) {
                    event.preventDefault();        
                    var form_data = ($( this ).formData());
                    params.onSubmit({//callback
                        destination : selected_item_params.destination,
                        checkin : form_data.checkin,
                        checkout : form_data.checkout
                    });
                });

            form_el.find("input[data-role='livesearch']")
                .typeahead({
                    valueKey: "description",
                    template: '<span>{{description}}</span>',
                    computed: Place.read,
                    engine: {
                        compile : function (template) {
                            var compile = Handlebars.compile(template);
                            return {
                                render: function (ctx) {
                                    return compile(ctx);
                                }
                            };
                        }
                    }
                })
                .on('typeahead:selected', function (object, selected_item){
                    Place.details(selected_item.reference, function(details){
                        selected_item_params = Place.query_place_params(details);
                        if(is_set(params, params.onSelect) && typeof(params.onSelect) === "function")
                            params.onSelect(selected_item_params);//callback
                    });
                });
        };
        
    }(Models.Place));
    
    
    
    Widgets.paginator = function(el, data, params, callback){
        if(arguments.length < 3)return false;
        if(arguments.length === 3)var callback = params;
        
        var items_per_page = (arguments.length === 4 && params.items_per_page ? params.items_per_page : Config.get('paginator','items_per_page'))
          , items_length = data.length
          , template = Handlebars.compile($("#widget_paginator-template").html())
          , current_page = (arguments.length === 4 && params.current_page ? params.current_page : 1)
          , max_page = Math.ceil(items_length/items_per_page);
          
        render();
        switch_page(current_page);
        
        function render(){
            var _from = parseInt((function(){
                switch(current_page%3){
                    case 1:
                        return current_page;
                    case 2:
                        return (current_page-1);
                    case 0:
                        return (current_page-2);
                }
            }()),10)
              , _to = ((_from+2) <= max_page ? (_from+2) : (max_page%3))
              , pgs = Array.range(_from, _to);
            el.html(template({pages: pgs, ln: max_page - _to, after: _to+1, before: _from-1}));
            el.find("ul.page > li > a.current").removeClass("current");
            el.find("ul.page > li > a[data-page='"+current_page+"']").addClass("current");
            bind_buttons();
        }
        
        function switch_page(page){
//            console.log(page);
            var was_page = current_page;
            if(page > max_page || page < 1)
                return;
            current_page = page;
            if(Math.ceil(was_page/3) !== Math.ceil(page/3))
                render();
            el.find("ul.page > li > a.current").removeClass("current");
            el.find("ul.page > li > a[data-page='"+current_page+"']").addClass("current");
            callback(data, (current_page-1)*items_per_page, current_page*items_per_page);
        }
        
        //bind buttons
        function bind_buttons(){//bind buttons
            el.find("ul.page > li > a").click(function(e){
                e.preventDefault();
                if($(this).attr("data-page")){
                    switch_page($(this).attr("data-page"));
                }
            });
            
            el.find("ul.buttons > li > a").click(function(e){
                e.preventDefault();
                if($(this).attr("role") && $(this).attr("role") === "prev")
                    switch_page(current_page-1);
                if($(this).attr("role") && $(this).attr("role") === "next")
                    switch_page(current_page+1);
            });
        };//bind buttons
        //bind buttons
    };
    
    
    
    Widgets.menu = (function(){
        return {
            init : function(){
                //bind events
                (function(){//bind events
                    $('#mh .btn_menu').on('click', function(){//bind events
                        $('#wrapper, #mh').toggleClass('hide');
                        $('#hamburger').toggleClass('show');
//                        Router.redirect($(this).attr("href"));
                        return false;
                    });
                    // Load a new page
                    $('#hamburger a').on('click', function(){
                        $('#wrapper, #mh').toggleClass('hide');
                        $('#hamburger').toggleClass('show');
                        $('body,html').scrollTop(0);
//                        Router.redirect($(this).attr("href"));
//                        return false;
                    });
                    //logo click
                    $('#mh h1').on('click', function(){
                        Router.redirect("home_page");
                        $('body,html').scrollTop(0);
                        return false;
                    });
                }());//bind events
                //bind events
            }
        };
    }());
    
    
    
    Widgets.auth = (function(User, Loader){
            
        return function(el){    
            var template = Handlebars.compile($("#widget_auth-template").html());
            el.html(template());        
            bind_buttons();


            // Load the SDK asynchronously
            console.log("Loading facebook sdk");
            (function(d){
                var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement('script'); js.id = id; js.async = true;
                js.src = "http://connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            }(document));

            return {
                signUp : function(callback){

                    el.find(".register_form form").submit(function( event ) {
                        event.preventDefault();
                        if(! $(this).find('input[type="checkbox"]').is(":checked")) return alert("check please");
                        Loader.start();

                        User.signUp($( this ).formData(), function(resp){
                            Loader.stop();
                            if(resp === true)
                                return User.read(function(userData){
                                    return callback(true, userData);
                                });
                            if(resp === false)
                                callback(false, (function(){
                                    return alert("signUp Error");
                                }));
                        });
                    });

                },

                logIn : function(callback){

                    el.find(".login_form form").submit(function( event ) {
                        event.preventDefault();
                        Loader.start();
                        
                        User.logIn($( this ).formData(), function(resp){
                            Loader.stop();
                            if(resp === true)
                                return User.read(function(userData){
                                    return callback(true, userData);
                                });
                            if(resp === false)
                                callback(false, (function(){
                                    return alert("logIn Error");
                                }));
                        });
                    });

                },

                facebookLogin: function(callback) {
                    var facebookData = {
                        auth: {
                            provider: 'facebook',
                            uid: "",
                            info: {
                                nickname: "",
                                email: "",
                                name: "",
                                first_name: "",
                                last_name: "",
                                image: "",
                                urls:{
                                    Facebook: ""
                                },
                                verified: true

                            },
                            credentials: {
                                token: "",
                                expires_at: "",
                                expires: true
                            },
                            extra: {
                                raw_info: {}
                            }
                        },
                        friend_list: [],
                        events: []
                    };

                    window.fbAsyncInit = function() {
                        FB.init({
                            appId      : '180083335400082',
                            status     : true, // check login status
                            cookie     : true, // enable cookies to allow the server to access the session
                            xfbml      : true,  // parse XFBML,
                            app_url    : "http://localhost"

                        });

                        FB.Event.subscribe('auth.authResponseChange', function(response) {
                            console.log(response);
                            if (response.status === 'connected') {
                                facebookData.auth.uid = response.userID;
                                facebookData.auth.credentials = response;
                                FB.api("/me", function(data) {
                                    facebookData.auth.extra.raw_info = data;
                                    facebookData.auth.info.nickname = data.username;
                                    facebookData.auth.info.email = data.email;
                                    facebookData.auth.info.name = data.name;
                                    facebookData.auth.info.first_name = data.first_name;
                                    facebookData.auth.info.last_name = data.last_name;
                                    FB.api("/me/picture", function(picture) {
                                        facebookData.auth.info.image = picture.data.url;
                                        FB.api("/me/friends", function(friends) {
                                            facebookData.friend_list = friends.data;
                                            FB.api("/me/events", function(events) {
                                                facebookData.events = events.data;
                                                User.facebookLogin(facebookData, callback);
                                            });
                                        });
                                    });
                                });
                            }
                        });

                        el.find("#btn_facebook_login").click(function() {
                            FB.login(function(response) {
                                console.log("Login Event", response);
                            }, { scope: 'email, user_birthday, user_location, publish_actions, user_events, friends_events, publish_actions, publish_stream, read_friendlists'});
                        });
                    }
                }
            };

            //bind_buttons
            function bind_buttons(){//bind_buttons
                // Login / Register
                el.find('li.login').click(function(){ 
                    if ($(this).hasClass('open')) {
                        el.find('#filter li.login').removeClass('open');
                        el.find('#filter li.register').addClass('open');
                    } else {
                        el.find('#filter li').removeClass('open');
                        $(this).addClass('open');
                    }
                    el.find('.login_form, .register_form').slideToggle();
                    return false; 
                });
                el.find('li.register').click(function(){ 
                    if ($(this).hasClass('open')) {
                        el.find('#filter li.register').removeClass('open');
                        el.find('#filter li.login').addClass('open');
                    } else {
                        el.find('#filter li').removeClass('open');
                        $(this).addClass('open');
                    }
                    el.find('.login_form, .register_form').slideToggle();
                    return false; 
                });
            }//bind_buttons
            //bind_buttons
        }; 
    
    }(Models.User, Widgets.Loader));

    Widgets.review_reservation = (function(Deal, Router, Loader) {
        return function($el, reservation_id) {
            console.log("View registered");
            $el.submit(function(event) {
                console.log("Submit callled");
                var $form = $(this);
                Loader.start();
                //Disabling the submit button
                $form.find('button').prop('disabled', true);
                var formData = $form.formData();
                formData.reservation_id = reservation_id;
                console.log(formData);
                //Generating stripe token
                Stripe.card.createToken($form, function(stauts, stripeResponse) {
                    console.log(status, stripeResponse);
                    if(stauts === 200) {
                        Models.Deal.review_reservation(formData, function(res) {
                            Loader.stop();
                            console.log(res);
                            if(res.hasOwnProperty("roomer_token")) {
                                //Sending the stripe token
                                Models.Deal.book_reservation({
                                    stripe_token: stripeResponse,
                                    user_id: res.user_id,
                                    roomer_token: res.roomer_token,
                                    reservation_id:reservation_id
                                }, function(bookedRes) {
                                    if(!bookedRes.hasOwnProperty("success")) {
                                        Router.redirect('thanks_page');
                                    } else {
                                        alert("Room already booked");
                                    }

                                });
                            } else {
                                alert("False, Room is already booked");
                            }
                        });
                    } else {
                        alert("invalid credit card info: "+stripeResponse.error.message);
                        Loader.stop();
                        $form.find('button').prop('disabled', false);
                    }
                });

                return false;
            });
        };
    })(Models.Deal, Router, Widgets.Loader);

    Widgets.book_alert = (function(Place) {
        return function($el) {
            console.log("Event registered", $el);
            $el.submit(function(event) {
                console.log("Submit called");
               var $form = $(this);
                var data = $form.data();
                $form.find("button").prop('disabled', true);
                var formData = $form.formData();
                formData.location = data.location;
                Place.alert_me(formData, function(res) {
                    console.log(res);
                    if(res.success) {
                        alert("Alert added successfully");
                    }
                });
            });
        };
    })(Models.Place);

    Widgets.filterResults = (function(LiveSearch, Place, Deal, Loader){
        
        function filterBy_name_price_stars(dataToFilter, filterParams, callback){//filterParams.price MUST be array
            var new_arr = [];
            if(!empty(filterParams) && (!empty(filterParams.hotel) || !empty(filterParams.price) || !empty(filterParams.stars))){
                for(var i in dataToFilter){
                    var filter = 0,
                        a = dataToFilter[i];
                    if(!empty(filterParams.hotel))
                        if( a.reservation.hotel.name.match(filterParams.hotel) )
                            filter = 1;
                        else
                            continue;
                    if(!empty(filterParams.price))
                        if( filterParams.price >= 500 || a.reservation.price_per_night <= filterParams.price )
                            filter = 1;
                        else
                            continue;
                    if(!empty(filterParams.stars))
                        if(filterParams.stars.indexOf(a.reservation.hotel.rating) >= 0)
                            filter = 1;
                        else
                            continue;
                    if(filter === 1)
                        new_arr.push(a);
                };
            }
            return callback(empty(filterParams) ? dataToFilter : new_arr);
        }
        
        function sort_order(data, orderData, callback){
            switch(orderData){
                case "relevance":
                    break;//default data
                case "price":
                    data.sort(function(a,b){
                        if (a.reservation.price_per_night < b.reservation.price_per_night)
                            return -1;
                        if (a.reservation.price_per_night > b.reservation.price_per_night)
                            return 1;
                        return 0;
                    });
                    break;
                case "stars":
                    data.sort(function(a,b){
                        if (a.reservation.hotel.rating < b.reservation.hotel.rating)
                            return 1;
                        if (a.reservation.hotel.rating > b.reservation.hotel.rating)
                            return -1;
                        return 0;
                    });
                    break;
                case "discount":
                    data.sort(function(a,b){
                        if (a.reservation.discount < b.reservation.discount)
                            return -1;
                        if (a.reservation.discount > b.reservation.discount)
                            return 1;
                        return 0;
                    });
                    break
                default:
                    break;
            }
            callback(data);
        }
        
        return function(dealType, el, data, defaultData, callback){
            /* dealType --->  moreAmazingDeal || lastMinuteDeals || all */
            console.log(dealType);
            //sorter
            var current_data = data,
                search_form = el.find(".search_form"),
                filter_form = el.find(".filterby_form"),
                filter_form_data = {},
                selected_location = (is_set(defaultData) && is_set(defaultData.destination) ? {destination: defaultData.destination} : {}),
                filter_submit_button = el.find(".filterby_form .btn_apply_filter"),
                search_field = el.find('.search_form input[data-role="livesearch"]'),
                sort_form = el.find(".sort_form"),
                sort_data,
                sort_submit_button = el.find(".sort_form .btn_apply_sort"),
                sort_form_els = el.find(".sort_form .sorters a");

            callback(current_data);//return data first time on init
            
            //filter action
            filter_submit_button.on("click", function(){//submit action
                if(search_field.val() != ""){
                    Loader.start();
                    closeFilters();
                    filter_form_data = group_objects(search_form.formData(), filter_form.formData(), selected_location);
                    filter_form_data.price = 50 * filter_form_data.price;
                    var dataToSend = {};
                    if(!empty(filter_form_data.destination))dataToSend.destination = filter_form_data.destination;
                    if(!empty(filter_form_data.checkin))dataToSend.checkin = filter_form_data.checkin;
                    if(!empty(filter_form_data.checkout))dataToSend.checkout = filter_form_data.checkout;
                    filter_form_data.stars = [];
                    if(is_set(filter_form_data.rating1))filter_form_data.stars.push(1);
                    if(is_set(filter_form_data.rating2))filter_form_data.stars.push(2);
                    if(is_set(filter_form_data.rating3))filter_form_data.stars.push(3);
                    if(is_set(filter_form_data.rating4))filter_form_data.stars.push(4);
                    if(is_set(filter_form_data.rating5))filter_form_data.stars.push(5);
                    
                    if(!empty(dataToSend))
                        if(dealType === "last_minute_deals")
                            Deal.last_minute_deals(dataToSend, make_callback);
                        else if(dealType === "amazing_deals")
                            Deal.amazing_deals(dataToSend, make_callback);
                        else
                            Place.search(dataToSend, make_callback);
                    else Loader.stop();
                }
                
                function make_callback(result){
                    filterBy_name_price_stars(result, filter_form_data, function(res){
                        current_data = res;
                        sort_order(current_data, sort_data, function(rs){
                            callback(rs);
                            Loader.stop();
                        });
                    });
                }
                
            });//submit action
            //submit action
            
            //sort action
            sort_submit_button.on("click", function(){
                Loader.start();
                closeSorters();
                sort_order(current_data, sort_data, function(rs){
                    callback(rs);
                    Loader.stop();
                });
            });

            LiveSearch(search_form, {onSelect: function(destination_obj){
                selected_location = destination_obj;
            }});

            // bind events
            sort_form_els.on("click", function(e){// bind events
                e.preventDefault();
                if(!$(this).hasClass("checked")){
                    sort_form_els.removeClass("checked");
                    $(this).addClass("checked");
                    sort_data = $(this).attr("data-sort");
                }
            });
            // Sort
            $('li.sort').click(closeSorters);
            
            function closeSorters(e){
                if(is_set(e))e.preventDefault();
                $('#map, .filter_options, li.filter').removeClass('open');
                if ($('#filter .sort_options').hasClass('open'))
                    $('#filter, .sort_options, li.sort').removeClass('open');
                else
                    $('#filter, .sort_options, li.sort').addClass('open');
            }

            // Filter
            $('li.filter').click(closeFilters);
//            $('li.filter').click(function(e){
//                console.log("dasdas");
//                closeFilters(e);
//            });
            
            function closeFilters(e){//broken on back to page...need fix...little bit later
                // starnge error here
                //Uncaught TypeError: Cannot read property 'slideCount' of undefined cycle.js:7
                // Ross if you will have time may be you may take a look of it?
                if(is_set(e))e.preventDefault();
                $('#map, .sort_options, li.sort').removeClass('open');
                if ($('#filter .filter_options').hasClass('open'))
                    $('#filter, .filter_options, li.filter').removeClass('open');
                else
                    $('#filter, .filter_options, li.filter').addClass('open');
            }// bind events
            // bind events
        };
        
    }(Widgets.liveSearch, Models.Place, Models.Deal, Widgets.Loader));
    
    
    Widgets.sellWidget = (function(Hotel, Loader){
        return function(form_el, passedUserInfo){
            
            var selected_item_params,
                hotel_name = form_el.find('[data-role="hotelname"]'),
                hotel_id = form_el.find('[data-role="hotelid"]'),
                hotel_addr = form_el.find('[data-role="hoteladdr"]'),
                room_type = form_el.find('[data-role="roomtype"]'),
                check_in = form_el.find('[data-role="checkin"]'),
                checkout = form_el.find('[data-role="checkout"]'),
                reservation_form = form_el.find('[data-role="reservationdetails-form"]'),
                booking_form = form_el.find('[data-role="bookingdetails-form"]'),
                pricing_form = form_el.find('[data-role="paymentdetails-form"]');
            
            hotel_name.typeahead({
                valueKey: "name",
                template: '<span>{{name}}</span>',
                computed: Hotel.list,
                engine: {
                    compile : function (template) {
                        var compile = Handlebars.compile(template);
                        return {
                            render: function (ctx) {
                                return compile(ctx);
                            }
                        };
                    }
                }
            }).on('typeahead:selected', function (object, selected_item){
                selected_item_params = selected_item;
                hotel_addr.val(selected_item.address);
                hotel_id.val(selected_item.id);
                Hotel.get_room_types(selected_item.id, function(rooms){
                    var rooms_html = "";
                    rooms.forEach(function(v){
                        rooms_html+='<option value="'+(empty(v.value) ? v.id : v.value)+'">'+v.name+'</option>';
                    });
                    room_type.html(rooms_html);
                });
            });
            
            pricing_form.submit(function(e){
                e.preventDefault();
                var all_data = group_objects(pricing_form.formData(), booking_form.formData(), reservation_form.formData());
                checkForm(all_data, function(check_res){
                    console.log("passedUserInfo");
                    console.log(passedUserInfo);
                    if(check_res)
                        if(empty(passedUserInfo) || passedUserInfo.error)
                            return Router.redirect("login_page", {
                                callback: submit_sell
                            });
                        else
                            return submit_sell(passedUserInfo);
                    else
                        return;
                });
                
                function submit_sell(uData){
                    Loader.start();
                    Hotel.create_reservation(uData.email, all_data, function(resp){
                        Loader.stop();
                        console.log(resp);
                        if(resp.error){
                            alert("reservation error. Please try again later");
                            return Router.back();
                        }
                        return Router.redirect("sellthanks_page");
                    });
                }
                
            });
            
            /////////////////////////
            //checkForm
            
            function checkForm(form, callback){
                var checkData = (typeof(form) === "string" ? $("."+form+" form").formData() : form);
                console.log(checkData);
                switch(form){
                    case "reservationdetails":
                        return ( check_reservationdetails(checkData) === true ?
                                    return_res(true) :
                                    return_res("Please fill up the reservation details") );
                    case "bookingdetails":
                        return ( check_bookingdetails(checkData) === true ?
                                    return_res(true) :
                                    return_res("Please fill up the booking details") );
                    default:
                        if(check_reservationdetails(checkData) === false)
                            return return_res("Please fill up the reservation details");
                        if(check_bookingdetails(checkData) === false)
                            return return_res("Please fill up the booking details");
                        if(check_pricingdetails(checkData) === false)
                            return return_res("Please fill up the pricing details");

                        return return_res(true);
                }

                function return_res(el){
                    console.log(el);
                    if(el && el !== true)
                        return alert(el);
                    else
                        return callback(true);
                }

                function check_reservationdetails(formData){
                    return (!empty(formData) && !empty(formData.hotel_id, formData.check_in, formData.check_out, formData.hoteladdress, formData.hotelname, formData.ean_room_type, formData.adult_guests, formData.book_from ))
                        ? true : false;
                }
                function check_bookingdetails(formData){
                    return (!empty(formData) && !empty(formData.guest_first_name, formData.guest_last_name, formData.guest_email, formData.phone, formData.confirmation_code))
                        ? true : false;
                }
                function check_pricingdetails(formData){
                    return (!empty(formData) && !empty(form.asked_price, form.prepaid, form.payment_method))
                        ? true : false;
                }
            }
            
            /////////////////////////
            
            // bind events
            (function(){// bind events
                // Reservations
                
                function toReservation(){
                    $('.paymentdetails, .bookingdetails, .reservationdetails').slideUp();
                    $('#filter li').removeClass('open');
                    $('#filter li.navreservation').addClass('open');
                    $('.reservationdetails').slideDown(500);
                    $('body,html').scrollTop(0);
                }

                function toBooking(){
                    $('.paymentdetails, .bookingdetails, .reservationdetails').slideUp();
                    $('#filter li').removeClass('open');
                    $('#filter li.navbooking').addClass('open');
                    $('.bookingdetails').slideDown(500);
                    $('body,html').scrollTop(0);
                }

                function toPricing(){
                    $('.paymentdetails, .bookingdetails, .reservationdetails').slideUp();
                    $('#filter li').removeClass('open');
                    $('#filter li.navpricing').addClass('open');
                    $('.paymentdetails').slideDown(500);
                    $('body,html').scrollTop(0);
                }

                $('li.navreservation').click(function(e){
                    e.preventDefault();
                    checkForm("reservationdetails", toReservation);
                    console.log("navreservation");
                });
                
                // ToBookings
                $('li.navbooking, .btn_reservation_next').click(function(e){
                    e.preventDefault();
                    checkForm("reservationdetails", toBooking);
                });

                // ToPayment
                $('li.navpricing, .btn_booking_next').click(function(e){
                    e.preventDefault();
                    checkForm("bookingdetails", toPricing);
                });

            }());// bind events
            // bind events

        };
        
    }(Models.Hotel, Widgets.Loader));
    

}(App.Widgets, App.Models, App.Config, App.Router));