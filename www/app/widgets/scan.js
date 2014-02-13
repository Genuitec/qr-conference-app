(function(Widgets){
    
    Widgets.scanner = function(el, callback){
        
        el.on("tap", function(){
            try{
                
                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        callback(result);
                    }, 
                    function (error) {
                        callback({error:error});
                        console.log(error);
                        alert("Scanning failed: " + error);
                    });
                    
            }catch(e){
                callback({error:e});
                console.log(e);
                alert("Scanning failed: " + e);
            }
        });
        
    };
    
}(App.Widgets));