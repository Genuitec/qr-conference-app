(function(Models, DB, getConfig, Session){
    
    Models.Scan = {
        
        create : function(data, callback){
            DB.insert("scans", data, callback);
        },
        read : function(where, callback){
            DB.select();
            DB.from("scans");
            if(arguments.length === 2)
                for(var i in where)
                    DB.where(i+' = "'+where[i]+'"');
            else callback = where;
            DB.query(function(data){
                callback(strfield_to_array(["email", "tel"], data));
            });
        },
        info : function(where, callback){
            if(arguments.length !== 2 || empty(where) || empty(where.id))return false;
            Async.parallel({
                scan: function(c){
                    DB.select("s.id, s.conference_id, s.fn, s.title, s.org, s.email, s.tel, s.adr, s.type, s.version, s.scantime, s.rating, s.followup, s.notes");
                    DB.from("scans as s");
                    for(var i in where)
                        DB.where('s.'+i+' = "'+where[i]+'"');
                    DB.row(function(data){
                        c(strfield_to_array(["email", "tel"], data));
                    });
                },
//                notes: function(c){
//                    c({});
////                    Models.Note.read({scan_id: where.id}, c);
//                },
//                followup: function(c){
//                    DB.select("followup");
//                    DB.from("scans");
//                    DB.where('id = "'+where.id+'" AND conference_id = '+ where.conference_id);
//                    DB.col(c);
//                },
                tags: function(c){
                    Models.Tag.read({conference_id: where.conference_id, scan_id: where.id}, c);
                },
                tags_available: function(c){
                    Models.Tag.available({conference_id: where.conference_id, scan_id: where.id}, c);
                }
//            }, callback);
            }, function(data){
                var tags = [];
                data.tags_available.forEach(function(v){
                    tags.push({
                        tag: v,
                        selected : (data.tags.indexOf(v) >= 0 ? 1 : 0)
                    });
                });
                callback({
                    scan: data.scan,
                    tags: tags
                });
            });
        },
//        info : function(where, callback){
//            if(arguments.length !== 2 || empty(where) || empty(where.id))return false;
//            Async.parallel({
//                scan: function(c){
//                    DB.select("s.id, s.conference_id, s.fn, s.title, s.org, s.email, s.tel, s.adr, s.type, s.version, s.scantime, s.rating");
//                    DB.from("scans as s");
//                    for(var i in where)
//                        DB.where('s.'+i+' = "'+where[i]+'"');
//                    DB.row(function(data){
//                        c(strfield_to_array(["email", "tel"], data));
//                    });
//                },
//                notes: function(c){
//                    Models.Note.read({scan_id: where.id}, c);
//                },
//                followup: function(c){
//                    DB.select("followup");
//                    DB.from("followups");
//                    DB.where('scan_id = "'+where.id+'" AND creator_id = "'+ Session.get("user_data").userid +'" AND conference_id = '+ where.conference_id);
//                    DB.col(c);
//                },
//                tags: function(c){
//                    Models.Tag.read({conference_id: where.conference_id, scan_id: where.id}, c);
//                },
//                tags_available: function(c){
//                    Models.Tag.available({conference_id: where.conference_id, scan_id: where.id}, c);
//                }
//            }, callback);
//        },
        followup : function(data, callback){
            console.log("ffff");
            /** data = {
             *      scan_id: scan_id,
             *      creator_id: user_id,
             *      conference_id: conference_id
             *      followup: 1 | 0
             *  } **/
            DB.update("scans", {
                followup: data.followup
            }, {
                id: data.scan_id,
                conference_id: data.conference_id
            }, callback);
            
//            DB.select();
//            DB.from("followups");
//            DB.where('scan_id = "'+data.scan_id+'" AND creator_id = "'+data.creator_id+'" AND conference_id = "'+data.conference_id+'"');
//            DB.query(function(res){
//                if(res.length > 0)
//                    DB.update("followups", data, {id: res[0].id}, callback);
//                else
//                    DB.insert("followups", addGenId(data, data.creator_id), callback);
//            });
        },
        list : function(conference_id, callback){//*
            DB.select();
            DB.from("scans");
            DB.where('conference_id = "'+conference_id+'"');
            DB.order_by_desc("scantime");
            DB.query(callback);
        },
        update : function(where, data, callback){
            DB.update("scans", data, where, callback);
        },
        remove : function(callback){},
        recent: function(conference_id, callback){
            DB.select();
            DB.from("scans");
            DB.where('conference_id = "'+conference_id+'"');
            DB.order_by_desc("scantime");
            DB.limit(getConfig("recent_scans", "amount"));
            DB.query(callback);
        },    
        filter_read : function(params, callback){
            DB.select();
            DB.from("scans");
//            DB.left_join("followups as f", "s.id = f.scan_id");
//            DB.left_join("scan_tags as st", "st.scan_id = s.id");
//            DB.left_join("tags as t", "t.id = st.tag_id");
            DB.where('conference_id = '+params.conference_id);
            if(is_set(params.time) && params.time === "today")
                DB.where('scantime >= "'+(function(){
                    var year = new Date().getFullYear(),
                        month = new Date().getMonth(),
                        date = new Date().getDate();
                    if(month < 10)month = "0"+month;
                    if(date < 10)date = "0"+date;
                    
                    return ( year+"-"+month+"-"+date+" "+"00:00:00" );
                }())+'"');
            if(is_set(params.followup) && params.followup === "true")
                DB.where('followup = 1'); //*
            if(is_set(params.rating) && params.rating !== "top")
                DB.where('rating = '+params.rating+'');
            if(is_set(params.tags))
                DB.where('tags REGEXP "'+params.tags+'"');
            if(is_set(params.rating) && params.rating === "top")
                DB.where('rating > 1');
            DB.query(callback);
        }
//        filter_read : function(params, callback){
//            DB.select();
//            DB.from("scans as s");
//            DB.left_join("followups as f", "s.id = f.scan_id");
//            DB.left_join("scan_tags as st", "st.scan_id = s.id");
//            DB.left_join("tags as t", "t.id = st.tag_id");
//            DB.where('s.conference_id = '+params.conference_id);
//            if(is_set(params.time) && params.time === "today")
//                DB.where('s.scantime >= "'+params.time+'"');
//            if(is_set(params.followup) && params.followup === "true")
//                DB.where('f.creator_id = "'+ Session.get("user_data").userid +'"'); //*
//            if(is_set(params.rating) && params.rating !== "top")
//                DB.where('s.rating = '+params.rating+'');
//            if(is_set(params.tags))
//                DB.where('t.id = "'+params.tags+'"');
//            if(is_set(params.rating) && params.rating === "top")
//                DB.where('s.rating > 1');
//            DB.query(callback);
//        }

    };
    
}(App.Models, App.DB, App.Config.get, App.Session));