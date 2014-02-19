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
                
        update : function(where, data, callback){
            DB.update("attendees", data, where, callback);
        }

    };
    
}(App.Models, App.DB, App.Config.get));