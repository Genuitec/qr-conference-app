(function(Models, DB, Session, getConfig){
    
    var Sync = function(tablesToSync, callback){
        var tablesToSync = tablesToSync,
            callback = callback,
            
//        __getSyncUrl = Session.get("user_data").hosturl+"/sync.php",
        __getSyncUrl = Session.get("user_data").hosturl,

        _syncClear = function(time, table) {
            if(is_array(table))
                table.forEach(function(t){
                    DB.remove("sync", 'table_name = "' + t + '"', function(){
                        Session.set("sync_"+t, time);//last sync time
                    });
                });
            else
        },
   
        applyChanges = function(_serverResponse){
            var serverResponse = JSON.parse(_serverResponse);
            if(is_set(serverResponse) && is_set(serverResponse.data) && is_set(serverResponse.info) && is_set(serverResponse.info.time))
                if(objectLenght(serverResponse.data) > 0)
                    Async.forEach(serverResponse.data, function(values, table, c){
                        DB.insert_batch_on_duplicate_update(table, values, function(){
                            _syncClear(serverResponse.info.time, table);
                            c();
                        });
                    }, function(){
                        _syncClear(serverResponse.info.time, tablesToSync);
                    });
                else
                    _syncClear(serverResponse.info.time, tablesToSync);
        },
        
        preRequest = function(changes){
            var finalData = {};
            for(var tableName in changes){
                finalData[tableName] = {create:[], update:[]};
                changes[tableName].forEach(function(v, k){
                    finalData[tableName].lastSyncTime = (empty(Session.get("sync_"+tableName)) ? 0 : Session.get("sync_"+tableName));
                    v.rowcreated === 1 ? finalData[tableName].create.push(v) : finalData[tableName].update.push(v);
                });
            }
            makeRequest(finalData);
        },
        
        makeRequest = function(changes){
            $.post(__getSyncUrl, {
                sync: JSON.stringify({
                    info:{
                        time: (new Date).getTime()
                    },
                    data: changes
                })
            }, applyChanges);
        },

        getChanges = function(tables){
            var obj = {};
            Async.forEach(tables, function(table, val, c){
                DB.select();
                DB.from("sync as s ");
                DB.join(table+" as t", "s.row_id = t.id");
                DB.where('s.table_name = "'+table+'"');
                DB.query(function(changes){
                    obj[table]= changes;
                    c( objectKeyValue(table, changes) );
                });
            }, function(){
                preRequest(obj);
            });
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
 
}(App.Models, App.DB, App.Session, App.Config.get));