(function(Resources, vCardParser){
    
    Resources.QRparser = function(scanData, callback){
            console.log("QRparser");
        if(scanData.match("END:VCARD")){
            console.log("VCARD");
            //VCARD
            vCardParser(scanData, callback);
        }else if(scanData.match("MECARD:")){
            console.log("MECARD");
            //MECARD
            var parsedData = {
                fn: "",
                firstName: "",
                lastName: "",
                address: "",
                tel: "",
                email: "",
                website: ""
            };
//            parsedData.fn = scanData.match(/N:(.+);ADR:/);
//            var nameAr = parsedData.fn.split(" ");
//            parsedData.firstName = nameAr[0];
//            parsedData.lastName = nameAr[1];
//            var addrTelAr = ((scanData.match(/ADR:(.+);TEL:/i)[1]).split(";TEL:"));
//            parsedData.address = addrTelAr[0];
//            addrTelAr.splice(0,1);
//            parsedData.tel = addrTelAr.join();
//            parsedData.email = scanData.match(/EMAIL:(.+);URL/)[1];
//            parsedData.website = scanData.match(/URL:(.+);;/)[1];
//            callback(parsedData);

            var ar = scanData.split(";");
            ar.forEach(function(v){
                if(v.match(/MECARD:N:/)){
                    parsedData.fn = v.match(/MECARD:N:(.*)/)[1];
                    var fnAr = parsedData.fn.split(",");
                    parsedData.firstName = fnAr[0];
                    if(fnAr.length > 1)
                        parsedData.lastName = fnAr[1];
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
                    parsedData.address += (parsedData.address === "" ? ADRmatch : (","+ADRmatch));
                }
                if(v.match(/NOTE:/)){
                    var NOTEmatch = v.match(/NOTE:(.*)/)[1],
                        noteAr = NOTEmatch.split(",");
                    noteAr.forEach(function(v, k){
                        if(k === 0)
                            parsedData.title = noteAr[0];
                        if(k === 1)
                            parsedData.org = noteAr[1];
//                        if(k === 2)
//                            parsedData.pos = noteAr[2];
                    });   
                }
            });
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