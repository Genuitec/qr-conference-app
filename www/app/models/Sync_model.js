(function(Models, DB, Session, getConfig, Router){
    
    var Sync = function(tablesToSync, callback){
        var tablesToSync = tablesToSync,
            callback = callback,

        __getSyncUrl = getConfig("sync_url"),

        __setServerTime = function(time){
            Session.set("serverTimeDifference", (time - (new Date()).getTime() )); //InMiliseconds
        },

        _syncClear = function(time, table, final) {
            if(is_array(table))
                Async.forEach(table, function(t, k, c){
                    DB.remove("sync", 'table_name = "' + t + '"', function(){
                        Session.set("sync_"+t, time);//last sync time
                        Session.set("lastSync", time);
                        __setServerTime(time);
                        c();
                    });
                }, function(){
                    if(final === true)
                        callback();
                });
            else
                DB.remove("sync", 'table_name = "' + table + '"', function(){
                    Session.set("sync_"+table, time);//last sync time
                    Session.set("lastSync", time);
                    __setServerTime(time);
                    if(final === true)
                        callback();
                });
        },
   
        applyChanges = function(serverResponse){
            if(is_set(serverResponse) && is_set(serverResponse.data) && is_set(serverResponse.info) && is_set(serverResponse.info.time))
                if(objectLenght(serverResponse.data) > 0)
                    Async.forEach(serverResponse.data, function(values, table, c){
                        DB.insert_batch_on_duplicate_update(table, values, function(){
                            _syncClear(serverResponse.info.time, table);
                            c();
                        });
                    }, function(){
                        _syncClear(serverResponse.info.time, tablesToSync, true);
                    }, false);
                else
                    _syncClear(serverResponse.info.time, tablesToSync, true);
        },
        
        preRequest = function(changes){
            var finalData = {};
            for(var tableName in changes){
                finalData[tableName] = {create:[], update:[], lastSyncTime : (empty(Session.get("sync_"+tableName)) ? 0 : Session.get("sync_"+tableName))};
                changes[tableName].forEach(function(v, k){
                    v.rowcreated === 1 ? finalData[tableName].create.push(v) : finalData[tableName].update.push(v);
                });
            }
            makeRequest(finalData);
        },
        
        makeRequest = function(changes){
            console.log("makeRequest");
            $.ajax({
                type: "POST",
                url: __getSyncUrl + ";jsessionid="+Session.get("session_id"),
                contentType: "application/json",
                success: function(s){
                    if(is_set(s.status) && s.status === 403) return Router.redirect("logout");
                    console.log("s");
                    console.log(s);
                    applyChanges(s);
                },  /// here
                error: function(e){
                    if(is_set(e.status) && e.status === 403) return Router.redirect("logout");
                    console.log("e");
                    console.log(e);
                },
//                success: applyChanges,  /// here
                data: JSON.stringify({
                    info:{
                        time: Session.get("lastSync")
                    },
                    data: changes
                })
            });
        },

        getChanges = function(tables){
            var obj = {};
            Async.forEach(tables, function(table, val, c){
                DB.select();
                DB.from("sync as s ");
                DB.join(table+" as t", "s.row_id = t.id");
                DB.where('s.table_name = "'+table+'"');
                DB.order_by("s.time");
                DB.query(function(changes){
                    obj[table]= changes;
                    c( objectKeyValue(table, changes) );
                });
            }, function(){
                preRequest(obj);
            }, false);
        };
        
        this.init = function(){
            console.log("init");
            if(is_array(tablesToSync) && is_set(callback))
                getChanges(tablesToSync);
            else return false;
        };

    };
    
    Models.Sync = {
        sync : function(tables, callback){
            var args = checkArgs(arguments);
            if(args === false)return false;
            (new Sync(args[0], args[1])).init();
        }
    };
    
    function checkArgs(args){
        if(args.length === 1)
            return [getConfig("dbTables"), args[0]];
        else if(args.length === 2 && is_array(args[0]))
            return [args[0], args[1]];
        else if(args.length === 2 && typeof(args[0]) === "string")
            return [args[0], args[1]];
        else return false;
    }
 
}(App.Models, App.DB, App.Session, App.Config.get, App.Router));