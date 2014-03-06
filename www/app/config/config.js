(function(Config, Session){

    var configs = {
        
        sync_url : function(){ return (Session.get("user_data").hosturl+"/php/sync.php"); },
        
        sync : {
            auto     :  true,
            interval :  120000 //in miliseconds
        },
        
        login_url : "/php/login.php",
        
        recent_scans : {
            amount : 5
        },
        scans : {
            db_fields : ["id", "conference_id", "fn", "title", "org" , "email", "tel", "adr", "type", "version", "scantime",
                "rating", "scannedby_id", "scannedby_name"],
            error_already_exist : "Already Scanned"
        },
        home_page : "login_page"
    };
    
    Config.get = function(){
        var val = configs;
        for(var i = 0; i<arguments.length; ++i)
            val = (typeof(val[arguments[i]]) === "function" ? val[arguments[i]]() : val[arguments[i]] );
        return val;
    };
    
    Config.set = function(k, v){
        return configs[k] = v;
    };
    
}(App.Config, App.Session));