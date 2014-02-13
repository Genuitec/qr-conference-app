(function(Widgets, vCardParser){
    
    var ScanHandler = function(scanData, callback){
        
        this.scanData = scanData;
        
        var scan_Text_To_Object_Data = function(scanData){
            vCardParser(scanData, function(vCard){
                checkQRdata(vCard);
            });
        },
        checkQRdata = function(vCard){
            /*
             * final parse data
             **/
            saveQrToDB(vCard);
        },
        saveQrToDB = function(data){
            /*
             * save to db and call callback(last_parsed data) 
             **/
            callback(data);
        },
        _self = this;
            
        return scan_Text_To_Object_Data(this.scanData);
    };
    
    
    
    Widgets.QRscanner = (function(){
        
        return function(callback){
            try{
                cordova.plugins.barcodeScanner.scan(
                    function (scanData) {
                        /**
                         * success
                         */
                        new ScanHandler(scanData.text, callback);
                        /**
                         * success
                         */
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
        };
        
    }());
    
}(App.Widgets, App.Resources.vCardParser));