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
//        info : function(where, callback){ 
//            DB.select("s.id, s.conference_id, s.md5, s.fn, s.title, s.org, s.email, s.tel, s.adr, s.type, s.version, s.scantime, a.rating, a.notes, a.tags, a.followup");
//            DB.from("scans as s");
//            DB.left_join("attendees as a", "a.scan_id = s.id");
//            if(arguments.length === 2)
//                for(var i in where)
//                    DB.where('s.'+i+' = "'+where[i]+'"');
//            else callback = where;
//            DB.query(function(data){
//                callback(strfield_to_array(["email", "tel"], data));
//            });
//        },
        info : function(where, callback){ //*
            if(arguments.length !== 2 || empty(where) || empty(where.id))return false;
            Async.parallel({
                scan: function(c){
                    DB.select("s.id, s.conference_id, s.fn, s.title, s.org, s.email, s.tel, s.adr, s.type, s.version, s.scantime, s.rating, s.tags, a.followup");
                    DB.from("scans as s");
                    for(var i in where)
                        DB.where('s.'+i+' = "'+where[i]+'"');
                    DB.row(function(data){
                        c(strfield_to_array(["email", "tel"], data));
                    });
                },
                notes: function(c){
                    Models.Note.read({scan_id: where.id}, c);
                },
                followup: function(c){
                    DB.select("followup");
                    DB.from("followups");
                    DB.where('scan_id = "'+where.id+'" AND creator_id = "'+ Session.get("user_data").userid +'" AND conference_id = '+ where.conference_id);
                    DB.col(c);
                },
                tags: function(c){
                    DB.select("t.tag");
                    DB.from("tags as t");
                    DB.join("scan_tags as st", 't.id = st.tag_id');
                    DB.where('st.conference_id = '+ where.conference_id +' AND st.scan_id = "'+ where.id+'"');
                    DB.query(c);
                }
            }, callback);
            
//            DB.select("s.id, s.conference_id, s.fn, s.title, s.org, s.email, s.tel, s.adr, s.type, s.version, s.scantime, s.rating, s.tags, a.followup, a.notes");
//            DB.from("scans as s");
//            DB.left_join("notes as n", "a.scan_id = s.id");
////            DB.left_join("attendees as a", "a.scan_id = s.id");
//            if(arguments.length === 2)
//                for(var i in where)
//                    DB.where('s.'+i+' = "'+where[i]+'"');
//            else callback = where;
//            DB.query(function(data){
//                callback(strfield_to_array(["email", "tel"], data));
//            });
        },
        followup : function(scanId, callback){
            
        },
        list : function(conference_id, callback){//*
            DB.select();
            DB.from("scans");
            DB.where('conference_id = "'+conference_id+'"');
            DB.order_by_desc("scantime");
            DB.query(callback);
        },
        update : function(callback){},
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
//            DB.from("attendees as a");
//            DB.left_join("scans as s", "s.id = a.scan_id");
            DB.from("scans as s");
            DB.left_join("followups as f", "s.id = f.scan_id");
            DB.where('f.conference_id = '+params.conference_id);
//            DB.left_join("scans as s", "s.id = a.scan_id");

            if(is_set(params.time) && params.time === "today")
                DB.where('s.scantime >= "'+params.time+'"');
            if(is_set(params.followup) && params.followup === "true")
                DB.where('f.creator_id = "'+ Session.get("user_data").userid +'"'); //*
            if(is_set(params.rating) && params.rating !== "top")
                DB.where('s.rating = '+params.rating+'');
            if(is_set(params.tags))
                DB.where('s.rating = "'+params.tags+'"');
            if(is_set(params.rating) && params.rating === "top")
                DB.where('s.rating > 1');

            DB.query(callback);
        }

    };
    
}(App.Models, App.DB, App.Config.get, App.Session));