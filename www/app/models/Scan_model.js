(function(Models, DB, getConfig){
    
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
//                var _data = strfield_to_array("email", data);
//                _data = strfield_to_array("tel", _data);
//                callback(_data);
                callback(strfield_to_array(["email", "tel"], data));
            });
        },
        info : function(where, callback){
            DB.select("s.id, s.conference_id, s.md5, s.fn, s.title, s.org, s.email, s.tel, s.adr, s.type, s.version, s.time, a.rating, a.notes, a.tags, a.followup");
            DB.from("scans as s");
            DB.left_join("attendees as a", "a.scan_id = s.id");
            if(arguments.length === 2)
                for(var i in where)
                    DB.where('s.'+i+' = "'+where[i]+'"');
            else callback = where;
            DB.query(function(data){
//                console.log(data);
//                console.log(strfield_to_array(["email", "tel"], data));
                callback(strfield_to_array(["email", "tel"], data));
            });
        },
        list : function(conference_id, callback){
            DB.select();
            DB.from("scans");
            DB.where('conference_id = "'+conference_id+'"');
            DB.order_by_desc("time");
            DB.query(callback);
        },
        update : function(callback){
            
        },
        remove : function(callback){
            
        },
        recent: function(conference_id, callback){
            DB.select();
            DB.from("scans");
            DB.where('conference_id = "'+conference_id+'"');
            DB.order_by_desc("time");
            DB.limit(getConfig("recent_scans", "amount"));
            DB.query(callback);
        }

    };
    
}(App.Models, App.DB, App.Config.get));