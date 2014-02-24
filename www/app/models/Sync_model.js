(function(Models, DB, Session, getConfig){
    
    var Sync = function(tablesToSync, callback){
        var tablesToSync = tablesToSync,
            callback = callback,
           
        _syncClear = function(table) {
            DB.remove(table, 'table_name = "' + table + '"', function(){
                Session.set("sync_"+table, (new Date).getTime());//last sync time
            });
        },
        
        makeRequest = function(changes){
            applyChanges(changes);
        },
        
        getChanges = function(tables){
            tables.forEach(function(table){
                DB.select();
                DB.from("sync as s ");
                DB.join(table+" as t", "s.row_id = t.id");
                DB.where('s.table_name = "'+table+'"');
                DB.query(makeRequest);
            });
        },
        
        applyChanges = function(changes){
            changes.forEach(function(v){
                //update, remove, insert
//                _syncClear(TABLE NAME);
            });
        };
        
        this.init = function(){
            if(is_array(tablesToSync) && is_set(callback))
                getChanges(tablesToSync);
            else return false;
        };

    };
    
    Models.Sync = {
        
        sync : function(tables, callback){
            var tablesToSync = (function(){
                if(arguments.length === 1)
                    return getConfig("dbTables");
                else if(arguments.length === 2 && is_array(tables))
                    return tables;
                else if(arguments.length === 2 && typeof(tables) === "string")
                    return [tables];
                else return [];
            }());
            if(tables.length === 0)
                return callback(false);
            
            (new Sync(tablesToSync, callback)).init();
        }
        
    };
 
}(App.Models, App.DB, App.Session, App.Config.get));