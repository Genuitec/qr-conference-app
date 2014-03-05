(function(Models, DB, getConfig, Session){
    
    Models.Conference = {
        
        create : function(data, callback){
//            DB.insert("conferences", data, callback);
        },
        read : function(where, callback){ //*
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
                    Async.parallel({
                        hot       :     function(cc){
                            Models.Scan.read({rating: 3, conference_id: conference_id}, function(hot){
                                cc(hot.length);
                            });
                        },
                        warm      :     function(cc){
                            Models.Scan.read({rating: 2, conference_id: conference_id}, function(warm){
                                cc(warm.length);
                            });
                        },
                        followups :     function(cc){
                            DB.select();
                            DB.from("scans");
                            DB.where('followup = 1 AND conference_id = "'+conference_id+'"');
//                            DB.where('creator_id = "'+Session.get("user_data").userid+'" AND conference_id = "'+conference_id+'"');
                            DB.query(function(res){
                                cc({
                                    needed : 0,
                                    done   : res.length
                                });
                            });
//                            DB.select();
//                            DB.from("followups");
//                            DB.where('creator_id = "'+Session.get("user_data").userid+'" AND conference_id = "'+conference_id+'"');
//                            DB.query(function(res){
//                                cc({
//                                    needed : 99,
//                                    done   : res.length
//                                });
//                            });
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
                            offline :   result.scans.amount
                        },
                        top_leads   : result.stat.top_leads,
                        followups   : result.stat.followups,
                        lastSync    : Math.floor( ( (new Date()).getTime() - Session.get("lastSync") ) / 1000 / 60 )
                    }
                });
            });
        },
//        info: function(conference_id, callback){//*
//            Async.parallel({
//                conference : function(c){
//                    DB.select();
//                    DB.from("conferences");
//                    DB.where('id = "'+conference_id+'"');
//                    DB.row(c);
//                },
//                scans: function(c){
//                    Models.Scan.list(conference_id, function(list){
//                        c({recent:list.slice(0, getConfig("recent_scans", "amount")), amount:list.length});
//                    });
//                },
//                stat: function(c){
//                    Async.parallel({
//                        hot       :     function(cc){
//                            Models.Scan.read({rating: 3, conference_id: conference_id}, function(hot){
//                                cc(hot.length);
//                            });
//                        },
//                        warm      :     function(cc){
//                            Models.Scan.read({rating: 2, conference_id: conference_id}, function(warm){
//                                cc(warm.length);
//                            });
//                        },
//                        followups :     function(cc){
//                            DB.select();
//                            DB.from("followups");
//                            DB.where('creator_id = "'+Session.get("user_data").userid+'" AND conference_id = "'+conference_id+'"');
//                            DB.query(function(res){
//                                cc({
//                                    needed : 99,
//                                    done   : res.length
//                                });
//                            });
//                        }
//                    }, function(stres){
//                        c({
//                            top_leads: {
//                                hot     :   stres.hot,
//                                warm    :   stres.warm
//                            },
//                            followups: stres.followups
//                        });
//                    });
//                }
//            }, function(result){
//                callback({
//                    conference : result.conference,
//                    scans      : result.scans.recent,
//                    stat       : {
//                        scans:{
//                            total   :   result.scans.amount,
//                            offline :   result.scans.amount
//                        },
//                        top_leads   : result.stat.top_leads,
//                        followups   : result.stat.followups,
//                        lastSync    : Math.floor( ( (new Date()).getTime() - Session.get("lastSync") ) / 1000 / 60 )
//                    }
//                });
//            });
//        },
        update : function(callback){},
        remove : function(callback){}

    };
    
}(App.Models, App.DB, App.Config.get, App.Session));