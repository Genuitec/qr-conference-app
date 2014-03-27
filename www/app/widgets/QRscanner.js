(function(Widgets, Resources, QRparser, Scan, getConfig, Session){
    
    var ScanHandler = function(scanData, md5, callback, test){
        this.test = test;
        this.md5 = md5;
        this.scanData = scanData;
        this.callback = callback;
        
        var _self = this,
                
        MakeObjectFromText = function(scanData){
            if(_self.test)
                return returnCallback(scanData);
            QRparser(scanData, function(scannedQR){
//                var re = /\r\n|\n\r|\n|\r/g,
//                    parseScanData = scanData.replace(re,"\n");
                
                scannedQR.qrcodetext = "";
//                scannedQR.qrcodetext = parseScanData;
//                scannedQR.qrcodetext = scanData;
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
                id            :    QR.id,
                conference_id :    QR.conference_id
            }, function(checkData){
                if(checkData.length > 0)
                    return callback({
                        exist : true,
                        QR    : checkData[0]
                    });
                
                var _filteredQR = filter_fields(QR, getConfig("scans", "db_fields"));
                _filteredQR.scannedby_id = Session.get("user_data").userid;
                Scan.create( _filteredQR , function(insertId){
                    callback({
                        exist: false,
                        QR: _filteredQR
                    });
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
//                alert("Scanning failed: " + e);
                new ScanHandler({
                    adr: "1211312dsds",
                    cel: "",
                    city: null,
                    conference_id: 1,
                    country: null,
                    email: "first1@last1.com",
                    firstname: "testiiiimmm",
                    fn: "testiiiimmm Last1",
                    followup: 0,
                    id: "igo553dsd1128e8101c47d1fe090ce3e1",
                    lastname: "Last1",
                    notes: null,
                    org: null,
                    postcode: null,
//                    qrcodetext: "BEGIN:VCARD\r\nN;CHARSET=utf-8:LasnameIgortest;Igortest;;;\r\nFN;CHARSET=utf-8:Igortest LasnameIgortest\r\nTITLE;CHARSET=utf-8:atat\r\nTEL;WORK:345\r\nTEL;CELL:456\r\nTEL;WORK;FAX:66677\r\nEMAIL;INTERNET;WORK;CHARSET=utf-8:igor@mail.ru\r\nURL;WORK;CHARSET=utf-8:http://test@mail.ru\r\nVERSION:2.1\r\nEND:VCARD\r\n",
                    rating: 0,
                    scannedby_id: "jed",
                    scantime: "2014-03-14 19:54",
                    state: null,
                    street: null,
                    synctime: 1394826968120,
                    tags: null,
                    tel: "1234567890",
                    title: null,
                    type: null,
                    updatetime: "2014-03-14 19:54",
                    version: null,
                    website: ""
                }, md5("ig55wwwra63dsd1128e8101c47d1fe090ce"), function(QR){
                    saveQRtoDB(QR, callback);
                }, true);
            }
        };
        
    }());
    
}(App.Widgets, App.Resources, App.Resources.QRparser, App.Models.Scan, App.Config.get, App.Session));