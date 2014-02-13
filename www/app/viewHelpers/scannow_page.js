(function(View, Router, Scanner){
    
    $(document).ready(function(){
        Scanner($("#scanner"), function(scanData){
            console.log(scanData);
        });
        alert("hi");
    });
    
    View.scannow_page = function(data){
        
    };
    
}(App.viewHelpers, App.Router, App.Widgets.scanner));