(function(Widgets, Resources, QRparser, Scan, getConfig, Session){
    
    var ScanHandler = function(scanData, md5, callback, test){
        this.test = test;
        this.md5 = md5;
        this.scanData = scanData;
        this.callback = callback;
        
        var _self = this,
                
        MakeObjectFromText = function(scanData){
            if(test)
                return returnCallback(scanData);
            QRparser(scanData, function(scannedQR){
                scannedQR.qrcodetext = scanData;
                returnCallback(scannedQR);
            });
        },
        returnCallback = function(data){
            /** save to db and call callback(last_parsed data) **/
            data.id = _self.md5;
            data.conference_id = Session.get("conference_id");
            console.log("returnCallback");
            console.log(data);
            _self.callback(data);
        };
            
        return MakeObjectFromText(_self.scanData);
    };
    
    
    
    Widgets.QRscanner = (function(){
        
        var saveQRtoDB = function(QR, callback){
            Scan.read({
                id           :    QR.id,
                conference_id :    QR.conference_id
            }, function(checkData){
                if(checkData.length > 0)
                    return alert(getConfig("scans", "error_already_exist"));
                
                var _filteredQR = filter_fields(QR, getConfig("scans", "db_fields"));
                _filteredQR.scannedby_id = Session.get("user_data").userid;
                Scan.create( _filteredQR , function(insertId){
                    callback(_filteredQR);
                });
            });
        };
        
        return function(callback){
            try{
                Resources.barcodeScanner.scan(
                    function (scanData) {
                        console.log(scanData);
                        console.log("scanData.text");
                        console.log(scanData.text);
                        /**
                         * success
                         */
                        new ScanHandler(scanData.text, md5(scanData.text), function(QR){
                            saveQRtoDB(QR, callback);
                        });
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
                /**
                 * TEST MODE
                 **/
//                return new ScanHandler({
//                    fn : "Test User",
//                    email: [{value: "test@gmail.com"},
//                            {value: "other@gmail.com"}],
//                    tel: [{value: "555-1212"},
//                            {value: "555-3952"}],
//                }, "1234", function(QR){
//                    saveQRtoDB(QR, callback);
//                }, true);
                
//                callback({error:e});
//                console.log(e);
                alert("Scanning failed: " + e);
                /**
                 * TEST MODE
                 **/
            }
        };
        
    }());
    
}(App.Widgets, App.Resources, App.Resources.QRparser, App.Models.Scan, App.Config.get, App.Session));