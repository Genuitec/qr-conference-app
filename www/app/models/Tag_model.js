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
                
        add : function(data, callback){
            /** data = {tag_id, scan_id, conference_id} **/
//            if(empty(data) || empty(data.tag_id, data.scan_id, data.conference_id))return false;
            DB.select("tags");
            DB.from("scans");
            DB.where('id = "'+data.scan_id+'" AND conference_id ="'+data.conference_id+'"');
            DB.col(function(tags){
                if( ( tags.split(",") ).indexOf(data.tag) === -1  )
                    DB.update("scans", {
                        tags: (tags+","+data.tag)
                    }, {
                        conference_id : data.conference_id,
                        id : data.scan_id
                    }, callback);
            });
        },
                
        remove : function(data, callback){
            DB.select("tags");
            DB.from("scans");
            DB.where('id = "'+data.scan_id+'" AND conference_id ="'+data.conference_id+'"');
            DB.col(function(tags){
                var exTags = tags.split(","),
                    newTags = "";
                exTags.forEach(function(v){
                    if(v !== data.tag)
                        newTags += (newTags === "" ? v : (","+v) );
                });
                if(newTags !== "")
                    DB.update("scans", {
                        tags: newTags
                    }, {
                        conference_id : data.conference_id,
                        id : data.scan_id
                    }, callback);
            });
        },
                
        update : function(where, data, callback){}

    };
    
}(App.Models, App.DB, App.Session, App.Config.get));