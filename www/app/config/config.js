(function(Config){
    
    var configs = {
        recent_scans : {
            amount : 5
        },
        scans : {
            db_fields : ["id", "md5", "conference_id", "fn", "title", "org" , "email", "tel", "adr", "type", "version"],
            error_already_exist : "Already Scanned"
        },
        home_page : "chooseconference_page"
    };
    
    Config.get = function(){
        var val = configs;
        for(var i = 0; i<arguments.length; ++i)
            val = val[arguments[i]];
        return val;
    };
    
}(App.Config));