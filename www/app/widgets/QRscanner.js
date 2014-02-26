(function(Widgets, vCardParser, BarcodeScanner, Scan, Attendee, getConfig, Session){
    
    var ScanHandler = function(scanData, md5, callback, test){
        this.test = test;
        this.md5 = md5;
        this.scanData = scanData;
        this.callback = callback;
        
        var _self = this,
                
        MakeObjectFromText = function(scanData){
            if(test)
                return handleQRdata(scanData);
            vCardParser(scanData, handleQRdata);
        },
        handleQRdata = function(vCard){
            console.log("parser");
            console.log(vCard);
            /** final parse data **/
            returnCallback( (function(o){
                var oo = {}, field = "";
                for(var i in o){
                    oo[i] = o[i];
                    if( (i === "email" || i === "tel") && is_array(o[i])){
                        o[i].forEach(function(arEl){
                            if(typeof(arEl) === "object")
                                for(var k in arEl)
                                    if(k === "value")
                                        field+= (field === "" ? arEl[k] : (","+arEl[k]));
                        });
                        oo[i] = field.trim();
                        field = "";
                    }
                    if(i === "org")
                        oo[i] = o[i][0]['organization-name'];
                    if(i === "adr")
                        oo[i] = o[i]['value'];
                    if(i === "title")
                        oo[i] = o[i][0];
                    if(i === "fn")
                        oo[i] = o[i];
                }
                return oo;
            }(vCard)) );        
        },
        returnCallback = function(data){
            /** save to db and call callback(last_parsed data) **/
            data.md5 = _self.md5;
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
                md5           :    QR.md5,
                conference_id :    QR.conference_id
            }, function(checkData){
                if(checkData.length > 0)
                    return alert(getConfig("scans", "error_already_exist"));
                
                var _filteredQR = filter_fields(QR, getConfig("scans", "db_fields"));
                Scan.create( _filteredQR , function(insertId){
                    _filteredQR.id = insertId;
                    Attendee.create({scan_id: insertId});
                    callback(_filteredQR);
                });
            });
        };
        
        return function(callback){
            try{
//                cordova.plugins.barcodeScanner.scan(
                BarcodeScanner.scan(
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
                return new ScanHandler({
                    fn : "dsadsa",
                    email: [{value: "igig@mail.ru"},
                            {value: "2222@mail.ru"}],
                    tel: [{value: "23213213231"},
                            {value: "2222@mail.ru"}],
                }, "123", function(QR){
                    saveQRtoDB(QR, callback);
                }, true);
                
                callback({error:e});
                console.log(e);
                alert("Scanning failed: " + e);
                /**
                 * TEST MODE
                 **/
            }
        };
        
    }());
    
}(App.Widgets, App.Resources.vCardParser, App.Resources.barcodeScanner, App.Models.Scan, App.Models.Attendee, App.Config.get, App.Session));