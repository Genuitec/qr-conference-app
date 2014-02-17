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