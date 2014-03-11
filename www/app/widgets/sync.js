(function(Widgets, Sync, getConfig){
    
    Widgets.sync = function(now, callback){
        Sync.sync(function(rs){
            console.log("syncnow");
            if(callback)callback();
        });
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
//                                if(callback)callback();
                            });
                        }, (empty(params.interval) ? defaultInterval : params.interval));
                        autoInited = true;
                    }
                    Sync.sync(function(rs){
                        console.log("NOW sync from InBackground");
                        if(callback)callback();
                    });
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