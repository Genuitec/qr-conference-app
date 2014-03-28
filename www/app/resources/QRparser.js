(function(Resources, vCardParser){
    
    Resources.QRparser = function(scanData, callback){
        if(scanData.match("END:VCARD")){
            var parsedData = {
                fn          : "",
                firstname   : "",
                lastname    : "",
                adr         : "",
                tel         : "",
                cel         : "",
                email       : "",
                website     : ""
            },
                    
            re = /\r\n|\n\r|\n|\r/g,

            ar = scanData.replace(re,"\n").split("\n");
            
            ar.forEach(function(v){
                var v = v.trim();
                if(v.match(/^N.*:/)){
                    parsedData.fn = v.match(/^N.*:(.*)/)[1];
                    var fnAr = parsedData.fn.split(";");
                    fnAr.forEach(function(vv, k){
                        if(k === 0)
                            parsedData.lastname = vv;
                        if(k === 1)
                            parsedData.firstname = vv;
                    });
                    parsedData.fn = parsedData.fn.replace(/;/g, " ");
                    parsedData.fn = parsedData.fn.trim();
                }else{
                    if(v.match(/^FN.*:/)){
                        parsedData.fn = v.match(/^FN.*:(.*)/)[1];
                        var fnAr = parsedData.fn.split(" ");
                        fnAr.forEach(function(vv, k){
                            if(k === 0)
                                parsedData.firstname = vv;
                            if(k === 1)
                                parsedData.lastname = vv;
                        });
                        parsedData.fn = parsedData.fn.replace(/;/g, " ");
                        parsedData.fn = parsedData.fn.trim();
                    }
                }
                if(v.match(/^TITLE.*:/))
                    parsedData.title = v.match(/^TITLE.*:(.*)/)[1];
                if(v.match(/^ORG.*:/))
                    parsedData.org = v.match(/^ORG.*:(.*)/)[1];
                if(v.match(/^ADR;/)){
                    parsedData.adr = v.match(/^ADR.*:;(.*)/)[1];
                    var adrAr = parsedData.adr.split(";");
                    adrAr.forEach(function(vv, k){
                        switch(k){
                            case 1:
                                parsedData.street = vv;
                                break;
                            case 2:
                                parsedData.city = vv;
                                break;
                            case 3:
                                parsedData.state = vv;
                                break;
                            case 4:
                                parsedData.postcode = vv;
                                break;
                            case 5:
                                parsedData.country = vv; 
                                break;
                        } 
                    });
                    parsedData.adr = parsedData.adr.replace(/;/g, " ");
                    parsedData.adr = parsedData.adr.trim();
                }
                if(v.match(/^TEL;/)){
                    if(v.match(/(CELL|cell).*:/))
                        parsedData.cel = v.match(/^TEL;(?:CELL|cell.*):(.*)/i)[1];
                    if(v.match(/(WORK|work).*:/))
                        parsedData.tel = v.match(/^TEL;(?:WORK|work.*):(.*)/i)[1];
                }
                if(v.match(/^URL.*:/))
                    parsedData.website = v.match(/^URL.*:(http:\/\/.*)/)[1];
                if(v.match(/^EMAIL.*:/))
                    parsedData.email = v.match(/^EMAIL.*:(.*)/)[1];
            });
           callback(parsedData);

        }else if(scanData.match("MECARD:")){
            //MECARD
            var parsedData = {
                fn          : "",
                firstname   : "",
                lastname    : "",
                adr         : "",
                tel         : "",
                cel         : "",
                email       : "",
                website     : ""
            };

            var ar = scanData.split(";");
            ar.forEach(function(v){
                if(v.match(/MECARD:N:/)){
                    parsedData.fn = v.match(/MECARD:N:(.*)/)[1];
                    var fnAr = parsedData.fn.split(",");
                    parsedData.firstname = fnAr[0];
                    if(fnAr.length > 1)
                        parsedData.lastname = fnAr[1];
                }
                if(v.match(/TEL:/)){
                    var telmatch = v.match(/TEL:(.*)/)[1];
                    parsedData.tel += (parsedData.tel === "" ? telmatch : (","+telmatch));
                }
                if(v.match(/EMAIL:/)){
                    var emailmatch = v.match(/EMAIL:(.*)/)[1];
                    parsedData.email += (parsedData.email === "" ? emailmatch : (","+emailmatch));
                }
                if(v.match(/URL:/)){
                    var URLmatch = v.match(/URL:(.*)/)[1];
                    parsedData.website += (parsedData.website === "" ? URLmatch : (","+URLmatch));
                }
                if(v.match(/ADR:/)){
                    var ADRmatch = v.match(/ADR:(.*)/)[1];
                    parsedData.adr += (parsedData.adr === "" ? ADRmatch : (","+ADRmatch));
                    var addrAR = parsedData.adr.split(",");
                    addrAR.forEach(function(vv, k){
                        if(k === 1)
                            parsedData.street = vv;
                        if(k === 2)
                            parsedData.city = vv;
                        if(k === 3)
                            parsedData.state = vv;
                        if(k === 4)
                            parsedData.postcode = vv;
                        if(k === 5)
                            parsedData.country = vv; 
                    });
                }
                if(v.match(/NOTE:/)){
                    var NOTEmatch = v.match(/NOTE:(.*)/)[1],
                        noteAr = NOTEmatch.split(",");
                    noteAr.forEach(function(vv, k){
                        if(k === 0)
                            parsedData.title = noteAr[0];
                        if(k === 1)
                            parsedData.org = noteAr[1];
                    });   
                }
            });
            callback(parsedData);
        }
    };
    
}(App.Resources, App.Resources.vCardParser));