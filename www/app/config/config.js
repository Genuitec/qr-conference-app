(function(Config){
    
    var configs = {
        paginator: {
            items_per_page: 5
        },
        google: {
            APIkey: "AIzaSyA17N2WJzNFG6_Zn29TKf5h7E1QDhNsmvs",
            places: {
                sensor: true
            }
        }
    };
    
    Config.get = function(){
        var val = configs;
        for(var i = 0; i<arguments.length; ++i)
            val = val[arguments[i]];
        return val;
    };
    
}(App.Config));