(function(local, session){
    
    var l_Storage = function(Storage){
        return {
            set: function(k, v){
                if(arguments.length !== 2)return false;
                if(v && typeof(v) !== "string"){
                    var v = JSON.stringify(v);
                }
                return Storage.setItem(k, v);
            },

            get: function(k){
                if(arguments.length !== 1)return false;
                var result = Storage.getItem(k);
    //            console.log(result);
                if(result === null)return false;
                if(result.match(/\[.*\]|\{.*\}/)){
                    return JSON.parse(result);
                }else{
                    return result;
                }
                return false;
            },

            clear: function(){
                Storage.clear();
            }
        };
    };
    
    localStorage_helper = new l_Storage(local);
    sessionStorage_helper = new l_Storage(session);
    
}(localStorage, sessionStorage));


