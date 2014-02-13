(function(View, Router, Scanner){
    
    View.scannow_page = function(data){
        Scanner($("#scanner"), function(scanData){
            console.log(scanData);
        });
    };
    
}(App.viewHelpers, App.Router, App.Widgets.scanner));