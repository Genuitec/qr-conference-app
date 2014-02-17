(function(Models, DB, getConfig, Session){
    
    Models.Conference = {
        
        create : function(data, callback){
            DB.insert("conferences", data, callback);
        },
        read : function(where, callback){
            DB.select();
            DB.from("conferences");
            if(arguments.length === 2)
                for(var i in where)
                    DB.where(i+' = "'+where[i]+'"');
            else callback = where;
            DB.query(callback);
        },
        info: function(where, callback){
            Async.parallel({
                conference : function(c){
                    DB.select();
                    DB.from("conferences");
                    for(var i in where)
                        DB.where(i+' = "'+where[i]+'"');
                    if(arguments.length === 2)
                        for(var i in where)
                            DB.where(i+' = "'+where[i]+'"');
                    else callback = where;
                    DB.row(c);
                },
                scans: function(c){
                    Models.Scan.recent(where.id, c);
                },
                stat: function(c){
                    c([]);
                }
            }, callback);
//            DB.select();
//            DB.from("conferences");
//            if(arguments.length === 2)
//                for(var i in where)
//                    DB.where(i+' = "'+where[i]+'"');
//            else callback = where;
//            DB.query(function(data){
//                
//            });
        },
        update : function(callback){
            
        },
        remove : function(callback){
            
        }

    };
    
}(App.Models, App.DB, App.Config.get, App.Session));