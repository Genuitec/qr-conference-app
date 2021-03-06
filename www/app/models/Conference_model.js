(function(Models, DB, getConfig, Session){
    
    Models.Conference = {
        
        create : function(data, callback){},
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
                scansOffline: function(c){
                    DB.select("sid");
                    DB.from("sync");
                    DB.where('table_name = "scans"');
                    DB.group_by("row_id");
                    DB.having('table_name = "scans"');
                    DB.query(function(offline){
                        c(offline.length);
                    });
                },
                stat: function(c){
                    Async.parallel({
                        hot       :     function(cc){
                            Models.Scan.read({rating: 2, conference_id: conference_id}, function(hot){
                                cc(hot.length);
                            });
                        },
                        warm      :     function(cc){
                            Models.Scan.read({rating: 1, conference_id: conference_id}, function(warm){
                                cc(warm.length);
                            });
                        },
                        followups :     function(cc){
                            DB.select();
                            DB.from("scans");
                            DB.where('followup = 1 AND conference_id = "'+conference_id+'"');
                            DB.query(function(res){
                                cc({
                                    needed : 0,
                                    done   : res.length
                                });
                            });
                        }
                    }, function(stres){
                        c({
                            top_leads: {
                                hot     :   stres.hot,
                                warm    :   stres.warm
                            },
                            followups: stres.followups
                        });
                    });
                }
            }, function(result){
                callback({
                    conference : result.conference,
                    scans      : result.scans.recent,
                    stat       : {
                        scans:{
                            total   :   result.scans.amount,
                            offline :   result.scansOffline
                        },
                        top_leads   : result.stat.top_leads,
                        followups   : result.stat.followups,
                        lastSync    : Math.floor( ( ( (new Date()).getTime() + parseInt(Session.get("serverTimeDifference"),10) ) - parseInt(Session.get("lastSync"),10) ) /1000 /60 )
                    }
                });
            });
        },
        update : function(callback){},
        remove : function(callback){}

    };
    
}(App.Models, App.DB, App.Config.get, App.Session));