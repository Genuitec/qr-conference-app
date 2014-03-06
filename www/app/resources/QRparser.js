(function(Resources, vCardParser){
    
    Resources.QRparser = function(scanData, callback){
        if(scanData.match("END:VCARD")){
            //VCARD
            vCardParser(scanData, callback);
        }else if(scanData.match("END:MECARD")){
            //MECARD
            var parsedData = {};
            parsedData.fn = scanData.match(/N:(.+);ADR:/);
            var nameAr = parsedData.fn.split(" ");
            parsedData.firstName = nameAr[0];
            parsedData.lastName = nameAr[1];
            var addrTelAr = ((scanData.match(/ADR:(.+);TEL:/i)[1]).split(";TEL:"));
            parsedData.address = addrTelAr[0];
            addrTelAr.splice(0,1);
            parsedData.tel = addrTelAr.join();
            parsedData.email = scanData.match(/EMAIL:(.+);URL/)[1];
            parsedData.website = scanData.match(/URL:(.+);;/)[1];
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