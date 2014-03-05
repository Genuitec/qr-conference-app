(function(Widgets, Sync, getConfig){
    
    Widgets.sync = function(now){
        var params = getConfig("sync"),
            defaultInterval = 5000;
        if(empty(params.interval)) params.interval = defaultInterval;
        if(params.auto)
            setInterval(function(){
                Sync.sync(function(rs){
                    console.log("sync");
                });
            }, params.interval);
        
        if(now)
            Sync.sync(function(rs){
                console.log("sync");
            });
    };
    
}(App.Widgets, App.Models.Sync, App.Config.get));