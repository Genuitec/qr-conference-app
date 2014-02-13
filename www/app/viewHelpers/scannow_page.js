(function(View, Router, QRscanner){
    
    $(document).ready(function(){
        $("#scanner").on("tap", function(){
            QRscanner(function(vCard){
                console.log(vCard);
            });
        });
    });
    
    View.scannow_page = function(data, load){
        if(is_set(load))load();
    };
    
}(App.viewHelpers, App.Router, App.Widgets.QRscanner));