(function(Widgets, Sync, getConfig){
    
    Widgets.sync = function(now, callback){
        var params = getConfig("sync");
        if(is_set(params) && params.active === true)
            Sync.sync(function(rs){
                console.log("syncnow");
                if(typeof(callback) !== "undefined")callback();
            });
        else callback();
    };
    
    Widgets.bgSync = (function(){
        
        var BackgroundSync = (function(){
            var params = getConfig("sync"),
                autoInited = false,
                defaultInterval = 5000,
                interval;

            return {
                start: function(callback){
                    if(params.auto && autoInited === false){
                        console.log("init BG SYNC");
                        clearInterval(interval);
                        interval = setInterval(function(){
                            Sync.sync(function(rs){
                                console.log("syncInBackground");
                            });
                        }, (empty(params.interval) ? defaultInterval : params.interval));
                        autoInited = true;
                    }
                    if(is_set(params) && params.active === true){
                        console.log("sync bbb")
                        Sync.sync(function(rs){
                            console.log("NOW sync from InBackground");
                            if(typeof(callback) !== "undefined")callback();
                        });
                    }else callback();
                },
                stop: function(){
                    clearInterval(interval);
                    autoInited = false;
                }
            };

        }());
        
        return {
            start : BackgroundSync.start,
            stop  : BackgroundSync.stop
        };
        
    }());
    
}(App.Widgets, App.Models.Sync, App.Config.get));