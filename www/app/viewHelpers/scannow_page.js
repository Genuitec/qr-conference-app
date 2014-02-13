(function(View, Router){
    
    View.scannow_page = function(data){
//        $('#scanner .scan-inner').html5_qrcode(function(data){
//            console.log(data);
//            // do something when code is read
//        },
//        function(error){
//            alert(error);
//            //show read errors 
//        }, function(videoError){
//            alert(videoError);
//            //the video stream could be opened
//        });


        cordova.plugins.barcodeScanner.scan(
            function (result) {
                alert("We got a barcode\n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format + "\n" +
                      "Cancelled: " + result.cancelled);
            }, 
            function (error) {
                alert("Scanning failed: " + error);
            }
         );
    };
    
}(App.viewHelpers, App.Router));