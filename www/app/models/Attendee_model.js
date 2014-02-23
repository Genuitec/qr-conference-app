(function(Models, DB, getConfig){
    
    Models.Attendee = {
        
        create : function(data, callback){
            DB.insert("attendees", data, callback);
        },
                
        read : function(where, callback){
            DB.select();
            DB.from("attendees");
            if(arguments.length === 2)
                for(var i in where)
                    DB.where(i+' = "'+where[i]+'"');
            else callback = where;
            DB.query(callback);
        },
                
        filter_read : function(params, callback){
            DB.select();
            DB.from("attendees as a");
            DB.left_join("scans as s", "s.id = a.scan_id");

            if(is_set(params.time) && params.time === "today")
                DB.where('s.scantime >= "'+params.time+'"');
            if(is_set(params.followup) && params.followup === "true")
                DB.where('a.followup = 1');
            if(is_set(params.rating) && params.rating !== "top")
                DB.where('a.rating = '+params.rating+'');
            if(is_set(params.tags))
                DB.where('a.rating = "'+params.tags+'"');
            if(is_set(params.rating) && params.rating === "top")
                DB.where('a.rating > 1');

            DB.query(callback);
        },
                
        update : function(where, data, callback){
            DB.update("attendees", data, where, callback);
        }

    };
    
}(App.Models, App.DB, App.Config.get));