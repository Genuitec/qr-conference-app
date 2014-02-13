(function(View, Router, Scanner){
    
    $(document).ready(function(){
        Scanner($("#scanner"), function(scanData){
            console.log(scanData.text);
            console.log("hi");
//            console.log(scanData.text.match(/FN(.*)$/));
//            var res = (scanData.text.replace(/\r\n/g,'')).match(/FN:(.+)/);
//            console.log(res);
//            "BEGIN:VCARD\n\
//            VERSION:2.1\n\
//            FN:Matthias Zimmermann\n\
//            TEL;work:-\n\
//            EMAIL;INTERNET;work:matthias.zimmermann@bsiag.com\n\
//            END:VCARD".toString
            VCF.parse(scanData.text, function(vcard) {
                // this function is called with a VCard instance.
                // If the input contains more than one vCard, it is called multiple times.
                console.log("Formatted name", vcard.fn);
                console.log("Names", JSON.stringify(vcard.n));
            });
            
        });
    });
    
    View.scannow_page = function(data){
        
    };
    
}(App.viewHelpers, App.Router, App.Widgets.scanner));