var Async = (function(){
    
    var timeOutInterval = 30000,
    
    Interval = function(result, callback){
        this.callback = callback;
        this.done = false;
        
        var _self = this,  
        _interval = setInterval(function(){
            _self.done = true;
            console.log("interval worked");
            _self.callback(result);
        }, timeOutInterval);
        
        this.checkInterval = function(){return _self.done;};
        this.clearInterval = function(){clearInterval(_interval); };
    };
    
    
    return {
        //parallel
        parallel : function(funcs, callback){
            var result = {}, funcs_length = Object.keys(funcs).length, counter = 0, interval = new Interval(result, callback);
            for(var i in funcs)
                funcs[i](
                    (function(k){
                        return function(data){
                            result[k] = data;
                            ++counter;
                            if(counter === funcs_length){
                                interval.clearInterval();
                                
                                if(interval.checkInterval() === false)
                                    return callback(result);
                            }
                        };
                    }(i))
                );
        },//parallel
        
        forEach : function(data, func, callback){
            var result = [], data_length = data.length, counter = 0, interval = new Interval(result, callback);
            if(is_array(data))
                data.forEach(function(k, v){
                    func(k, v, function(res){
                        result.push(res);
                        ++counter;
                        if(counter === data_length){
                            interval.clearInterval();

                            if(interval.checkInterval() === false)
                                return callback(result);
                        }
                    });
                });
            else{
                for(var k in data){
                    func(data[k], k, function(res){
                        result.push(res);
                        ++counter;
                        if(counter === data_length){
                            interval.clearInterval();

                            if(interval.checkInterval() === false)
                                return callback(result);
                        }
                    });
                }
            }
        }
        
    };
    
}());
