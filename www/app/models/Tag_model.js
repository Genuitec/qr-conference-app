(function(Models, DB, Session, getConfig){
    
    Models.Tag = {
        
        create : function(data, callback){},
                
        read : function(where, callback){
            if(empty(where) || empty(where.conference_id))callback(false);
            DB.select("tags");
            DB.from("scans");
            DB.where('conference_id = "'+ where.conference_id +'"');
            if(is_set(where.scan_id))
                DB.where('id = "'+ where.scan_id+'"');
            DB.col(function(data){
                callback( empty(data) ? [] : data.split(",") );
            });
        },
        conferenceTags : function(where, callback){
            if(empty(where) || empty(where.conference_id)) return false;
            DB.select("tags");
            DB.from("conferences");
            DB.where('id = "'+ where.conference_id +'"');
            DB.col(function(data){
                callback( empty(data) ? [] : data.split(",") );
            });
        },
                
        available : function(where, callback){
            if(empty(where) || empty(where.scan_id) || empty(where.conference_id))callback(false);
            DB.select("tags");
            DB.from("conferences");
            DB.where('id = '+ where.conference_id);
            DB.col(function(data){
                callback( empty(data) ? [] : data.split(",") );
            });
        },
                
        update : function(data, where, callback){
            DB.update("scans", {
                tags: data.tags
            }, {
                conference_id : where.conference_id,
                id : where.scan_id
            }, callback);
        }

    };
    
}(App.Models, App.DB, App.Session, App.Config.get));