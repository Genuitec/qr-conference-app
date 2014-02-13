(function(View, Router){
    
    View.scannow_page = function(data){
        $('#scanner .scan-inner').html5_qrcode(function(data){
            console.log(data);
            // do something when code is read
        },
        function(error){
            alert(error);
            //show read errors 
        }, function(videoError){
            alert(videoError);
            //the video stream could be opened
        });
    };
    
}(App.viewHelpers, App.Router));