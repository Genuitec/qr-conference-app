(function(Widgets, vCardParser, Scan, getConfig){
    
    var ScanHandler = function(scanData, callback, test){
        this.test = test;
        this.scanData = scanData;
        this.callback = callback;
        
        var _self = this,
                
        MakeObjectFromText = function(scanData){
            if(test)
                return handleQRdata(scanData);
            vCardParser(scanData, handleQRdata);
        },
        handleQRdata = function(vCard){
            /** final parse data **/
            saveQrToDB(clone_object_array_fields_to_str(vCard, "value"));
        },
        saveQrToDB = function(data){
            /** save to db and call callback(last_parsed data) **/
            Scan.create( filter_fields(data, getConfig("scans", "db_fields") ), function(insertId){
                data.id = insertId;
                _self.callback(data);
            });
        };
            
        return MakeObjectFromText(_self.scanData);
    };
    
    
    
    Widgets.QRscanner = (function(){
        
        return function(callback){
            try{
                cordova.plugins.barcodeScanner.scan(
                    function (scanData) {
                        console.log(scanData);
                        console.log(scanData.text);
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
                
                return new ScanHandler({
                    fn : "dsadsa",
                    email: [{value: "igig@mail.ru"},
                            {value: "2222@mail.ru"}],
                    tel: [{value: "23213213231"},
                            {value: "2222@mail.ru"}],
                }, callback, true);
                
                callback({error:e});
                console.log(e);
                alert("Scanning failed: " + e);
            }
        };
        
    }());
    
}(App.Widgets, App.Resources.vCardParser, App.Models.Scan, App.Config.get));