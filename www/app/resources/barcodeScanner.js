(function(Resources){
    
    var cordovaQR = function(){
        
        var cordovaPlugin = cordova.plugins.barcodeScanner;
        
        this.scan = function(success, error){
            cordovaPlugin.scan(success, error);
        };
    };
    
    document.addEventListener("deviceready", function(){
        
        Resources.barcodeScanner = new cordovaQR();
        
    }, false);

    
}(App.Resources));