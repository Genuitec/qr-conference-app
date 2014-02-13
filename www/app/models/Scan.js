(function(Models, DB){
    
    Models.Scan = {
        
        create : function(data, callback){
            DB.insert("scans", data, callback);
        },
        read : function(callback){
            
        },
        update : function(callback){
            
        },
        remove : function(callback){
            
        }

    };
    
}(App.Models, App.DB));