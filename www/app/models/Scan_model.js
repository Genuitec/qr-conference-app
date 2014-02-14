(function(Models, DB, getConfig){
    
    Models.Scan = {
        
        create : function(data, callback){
            DB.insert("scans", data, callback);
        },
        read : function(callback){
            
        },
        update : function(callback){
            
        },
        remove : function(callback){
            
        },
        recent: function(callback){
            DB.select();
            DB.from("scans");
            DB.order_by_desc("time");
            DB.limit(getConfig("recent_scans", "amount"));
            DB.query(callback);
        }

    };
    
}(App.Models, App.DB, App.Config.get));