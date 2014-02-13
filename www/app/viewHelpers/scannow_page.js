(function(View, Router){
    
    View.scannow_page = function(data){
        $('#scanner .scan-inner').html5_qrcode(function(data){
            // do something when code is read
        },
        function(error){
            //show read errors 
        }, function(videoError){
            //the video stream could be opened
        });
    };
    
}(App.viewHelpers, App.Router));