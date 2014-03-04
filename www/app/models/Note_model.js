(function(Models, DB, getConfig, Session){
    
    Models.Note = {
        
        create : function(data, callback){
//            DB.insert("attendees", data, callback);
        },
                
        read : function(where, callback){
            DB.select();
            DB.from("notes");
            if(arguments.length === 2)
                for(var i in where)
                    DB.where(i+' = "'+where[i]+'"');
            else callback = where;
            DB.query(callback);
        },
                
        update : function(where, data, callback){
            DB.update("notes", data, where, callback);
        },

        add : function(data, callback){
            if(empty(data) || empty(data.scan_id, data.conference_id))return false;

            data.creator_id = Session.get("user_data").userid;
            DB.insert("notes", addGenId(data, data.creator_id), callback);    
        }

    };
    
}(App.Models, App.DB, App.Config.get, App.Session));

//id TEXT NOT NULL,\n\
//                scan_id TEXT NOT NULL,\n\
//                conference_id INTEGER NOT NULL,\n\
//                creator_id TEXT NOT NULL,\n\
//                note TEXT NULL)',