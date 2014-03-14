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
            data.conference_id = Session.get("conference_id");
            data.id = _self.md5+data.conference_id;
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
                        new ScanHandler(scanData.text, md5(scanData.text), function(QR){
                            saveQRtoDB(QR, callback);
                        });
                    }, 
                    function (error) {
                        callback({error:error});
                        alert("Scanning failed: " + error);
                    });
            }catch(e){
                alert("Scanning failed: " + e);
            }
        };
        
    }());
    
}(App.Widgets, App.Resources, App.Resources.QRparser, App.Models.Scan, App.Config.get, App.Session));