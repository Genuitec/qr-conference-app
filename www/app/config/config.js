(function(Config){
    
    var configs = {
        recent_scans : {
            amount : 5
        },
        scans : {
            db_fields : ["id", "type", "fn", "email", "tel", "changed", "version"]
        }
    };
    
    Config.get = function(){
        var val = configs;
        for(var i = 0; i<arguments.length; ++i)
            val = val[arguments[i]];
        return val;
    };
    
}(App.Config));