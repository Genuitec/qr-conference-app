(function(Resources){
    
    var cordovaQR = function(){
        
        var cordovaPlugin = cordova.plugins.barcodeScanner;
        
        this.scan = function(success, error){
            cordovaPlugin.scan(success, error);
        };
    };
    
    Resources.barcodeScanner = new cordovaQR();
    
}(App.Resources));