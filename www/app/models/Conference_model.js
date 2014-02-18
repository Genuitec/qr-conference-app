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
        info: function(conference_id, callback){
            Async.parallel({
                conference : function(c){
                    DB.select();
                    DB.from("conferences");
                    DB.where('id = "'+conference_id+'"');
                    DB.row(c);
                },
                scans: function(c){
                    Models.Scan.list(conference_id, function(list){
                        c({recent:list.slice(0, getConfig("recent_scans", "amount")), amount:list.length});
                    });
                },
                stat: function(c){
                    c([]);
                }
            }, function(result){
                callback({
                    conference : result.conference,
                    scans      : result.scans.recent,
                    stat       : {
                        scans:{
                            total   :   result.scans.amount,
                            offline :   result.scans.amount
                        },
                        top_leads       : {
                            hot     : 1,
                            warm    : 1
                        },
                        followups       : {
                            needed  : 3,
                            done    : 3
                        },
                        lastSync        : 5
                    }
                });
            });
        },
        update : function(callback){
            
        },
        remove : function(callback){
            
        }

    };
    
}(App.Models, App.DB, App.Config.get, App.Session));