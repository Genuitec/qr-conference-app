(function(Widgets, Sync, getConfig){
    
    Widgets.sync = (function(){
        
        var autoInited = false;
        
        return function(now, callback){
            var params = getConfig("sync"),
                defaultInterval = 5000;
            if(empty(params.interval)) params.interval = defaultInterval;
            if(params.auto && autoInited === false){
                setInterval(function(){
                    Sync.sync(function(rs){
                        console.log("syncInBackground");
                        if(callback)callback();
                    });
                }, params.interval);
                autoInited = true;
            }

            if(now)
                Sync.sync(function(rs){
                    console.log("syncnow");
                    if(callback)callback();
                });
        };
        
    }());
    
}(App.Widgets, App.Models.Sync, App.Config.get));