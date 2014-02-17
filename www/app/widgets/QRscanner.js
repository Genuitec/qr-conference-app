(function(Widgets, vCardParser, Scan, getConfig, Session){
    
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
            /** final parse data **/
            console.log("vCard");
            console.log(vCard);
//            saveQrToDB(clone_object_array_fields_to_str(vCard, "value"));
            saveQrToDB( (function(o){
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
        saveQrToDB = function(data){
            /** save to db and call callback(last_parsed data) **/
            data.md5 = _self.md5;
            data.conference_id = Session.get("conference_id");
            console.log("saveQrToDB");
            console.log(data);
            Scan.read({
                md5           :    _self.md5,
                conference_id :    data.conference_id
            }, function(checkData){
                if(checkData.length > 0)
                    return alert(getConfig("scans", "error_already_exist"));
                
                Scan.create( filter_fields(data, getConfig("scans", "db_fields") ), function(insertId){
                    data.id = insertId;
                    
                    _self.callback(data);
                });
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
                        console.log("scanData.text");
                        console.log(scanData.text);
                        /**
                         * success
                         */
                        new ScanHandler(scanData.text, md5(scanData.text), callback);
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
                }, "123", callback, true);
                
                callback({error:e});
                console.log(e);
                alert("Scanning failed: " + e);
            }
        };
        
    }());
    
}(App.Widgets, App.Resources.vCardParser, App.Models.Scan, App.Config.get, App.Session));