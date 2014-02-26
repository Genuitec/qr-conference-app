(function(Models, DB, Session, getConfig){
    
    var Sync = function(tablesToSync, callback){
        var tablesToSync = tablesToSync,
            callback = callback,
            requestData = {info:{}, data:[]}, //data ==> table_name : [create:[],update:[]}

//        __getSyncUrl = Session.get("user_data").hosturl+"/sync.php",
        __getSyncUrl = Session.get("user_data").hosturl,

        _syncClear = function(table) {
            DB.remove(table, 'table_name = "' + table + '"', function(){
                Session.set("sync_"+table, (new Date).getTime());//last sync time
            });
        },
   
        applyChanges = function(serverResponse){
            serverResponse.data.forEach(function(values, table){
                DB.insert_batch_on_duplicate_update(table, values, function(){
                    _syncClear(table);
                });
            });
        },
        
        makeRequest = function(table, changes){
            requestData.data[table] = {create:[], update:[]};
            changes.forEach(function(v){
                v['rowcreated'] === 1 ? requestData.data[table].create.push(v) : requestData.data[table].update.push(v);
            });
            console.log(changes);
            $.post(__getSyncUrl, {sync: requestData}, applyChanges);
        },

        getChanges = function(tables){
            tables.forEach(function(table){
                DB.select();
                DB.from("sync as s ");
                DB.join(table+" as t", "s.row_id = t.id");
                DB.where('s.table_name = "'+table+'"');
                DB.query(function(res){
                    makeRequest(table, res);
                });
            });
        };
//                Async.parallel({
//                    create : function(c){
//                        createChanges(table, values.create, c);
//                    },
//                    update : function(c){
//                        updateChanges(table, values.update, c);
//                    }
//                }, function(){
//                    _syncClear(table);
//                });
//            });
//        },
        
//        updateChanges = function(table, data, callback){
//            data.forEach(function(v, k){
//                    
//            });
//        },
//                
//        createChanges = function(table, data, callback){
//            data.forEach(function(v, k){
//                    
//            });
//        };
        
        this.init = function(){
            console.log("init")
            if(is_array(tablesToSync) && is_set(callback))
                getChanges(tablesToSync);
            else return false;
        };

    };
    
    Models.Sync = {
        
        sync : function(tables, callback){
            console.log(checkArgs(arguments));
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