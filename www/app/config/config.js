(function(Config){
    
    var configs = {
        recent_scans : {
            amount : 5
        },
        scans : {
            db_fields : ["id", "type", "md5", "n", "fn", "title","org" , "email", "tel", "note", "categories", "changed", "version"],
            error_already_exist : "Already Scanned"
        }
    };
    
    Config.get = function(){
        var val = configs;
        for(var i = 0; i<arguments.length; ++i)
            val = val[arguments[i]];
        return val;
    };
    
}(App.Config));