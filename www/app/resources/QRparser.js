(function(Resources, vCardParser){
    
    Resources.QRparser = function(scanData, callback){
            console.log("QRparser");
        if(scanData.match("END:VCARD")){
            console.log("VCARD");
            //VCARD
//            vCardParser(scanData, callback);
            /*
            fn VARCHAR(255) NOT NULL,\n\
            lastname VARCHAR(255) NULL,\n\
            firstname VARCHAR(255) NULL,\n\
            title VARCHAR(255) NULL,\n\
            org VARCHAR(255) NULL,\n\
            email VARCHAR(255) NULL,\n\
            tel VARCHAR(255) NULL,\n\
            adr TEXT NULL,\n\
            postcode VARCHAR(255) NULL,\n\
            street VARCHAR(255) NULL,\n\
            city VARCHAR(255) NULL,\n\
            state VARCHAR(255) NULL,\n\
            postcode VARCHAR(255) NULL,\n\
            country VARCHAR(255) NULL,\n\
            type VARCHAR(255) NULL,\n\
            version VARCHAR(255) NULL,\n\
            */
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
    
            console.log("ar ar");
            console.log(ar);
            
            ar.forEach(function(v){
                console.log(parsedData);
                console.log(v);
                var v = v.trim();
                if(v.match(/^N.*:/)){
                    console.log("name");
                    console.log(v.match(/^N.*:(.*)/)[1]);
                    parsedData.fn = v.match(/^N.*:(.*)/)[1];
                    var fnAr = parsedData.fn.split(";");
                    fnAr.forEach(function(vv, k){
                        if(k === 0)
                            parsedData.lastname = vv;
                        if(k === 1)
                            parsedData.firstname = vv;
                    });
                    console.log(parsedData);
                }
                if(v.match(/^TITLE.*:/))
                    parsedData.title = v.match(/^TITLE.*:(.*)/)[1];
                if(v.match(/^ORG.*:/))
                    parsedData.title = v.match(/^ORG.*:(.*)/)[1];
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
                }
                if(v.match(/^TEL;/))
                    if(v.match(/CELL.*:/))
                        parsedData.cel = v.match(/^TEL;CELL.*:(.*)/)[1];
                    if(v.match(/WORK.*:/))
                        parsedData.tel = v.match(/^TEL;WORK.*:(.*)/)[1];
                if(v.match(/^URL.*:/))
                    parsedData.website = v.match(/^URL.*:(.*)/)[1];
                if(v.match(/^EMAIL.*:/))
                    parsedData.email = v.match(/^EMAIL.*:(.*)/)[1];
            });
            /*
              
            BEGIN:VCARD
            N;CHARSET=utf-8:Izraylevych;Igor;;;
            FN;CHARSET=utf-8:Igor Izraylevych
            ORG;CHARSET=utf-8:org
            TITLE;CHARSET=utf-8:developer
            TEL;WORK:343967
            TEL;CELL:0961155555
            TEL;WORK;FAX:2323
            EMAIL;INTERNET;WORK;CHARSET=utf-8:igorizr1@gmail.com
            ADR;WORK;CHARSET=utf-8:;;Prvdy 3;Zaporizhzhya;Zp;69000;Ukraine
            URL;WORK;CHARSET=utf-8:http://2727 Duke st
            VERSION:2.1
            END:VCARD
 
             
            'BEGIN:VCARD\n\
            VERSION:2.1\n\
            N:Izraylevych;Igor;S.;Mr;PHD\n\
            FN:Mr Igor S. Izraylevych PHD\n\
            TITLE:FOunder\n\
            ORG:Smartsolutions;coding\n\
            ADR;WORK:;Suite 1;Maykovskiy;Zaporizhzhya;ZP;69000;Ukraine\n\
            TEL;WORK;VOICE:31299999\n\
            TEL;WORK;FAX:232\n\
            TEL;CELL;VOICE:0961155555\n\
            URL;WORK:http://website.com\n\
            EMAIL;PREF;INTERNET:igorizr1@gmail.com\n\
            END:VCARD'.replace(re,"\n").split("\n");
            
            */
           console.log(parsedData);
           callback(parsedData);

        }else if(scanData.match("MECARD:")){
            console.log("MECARD");
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
                    console.log("match adr");
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
//                        if(k === 2)
//                            parsedData.pos = noteAr[2];
                    });   
                }
            });
            console.log("parsedData Mecard");
            console.log(parsedData);
            callback(parsedData);
        }
    };
    
}(App.Resources, App.Resources.vCardParser));
/*

MECARD:N:Izraylevych,Igor;TEL:0961155555;TEL:31299999;EMAIL:igorizr1@gmail.com;URL:http://website.com;ADR:Suite 1,Maykovskiy,Zaporizhzhya,ZP,69000,Ukraine;NOTE:FOunder,Smartsolutions,coding;;


BEGIN:VCARD
VERSION:2.1
N:Izraylevych;Igor;S.;Mr;PHD
FN:Mr Igor S. Izraylevych PHD
TITLE:FOunder
ORG:Smartsolutions;coding
ADR;WORK:;Suite 1;Maykovskiy;Zaporizhzhya;ZP;69000;Ukraine
TEL;WORK;VOICE:31299999
TEL;WORK;FAX:232
TEL;CELL;VOICE:0961155555
URL;WORK:http://website.com
EMAIL;PREF;INTERNET:igorizr1@gmail.com
END:VCARD

*/

//[05.03.14, 21:07:34] Timothy Webb: fn -> ‘first name’, ‘last name'
//adr -> ‘street’, ‘city’, ‘state’, ‘post code’, ‘country’.
//missing -> ‘website’, ‘cell’
//[05.03.14, 21:07:43] Timothy Webb: it's ok if you want to also have fn, i don't mind having duplicate data
//[05.03.14, 21:07:50] Timothy Webb: but we need to maintain first name and last name separately