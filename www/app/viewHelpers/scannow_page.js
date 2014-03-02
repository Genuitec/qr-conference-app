(function(View, Router, QRscanner){
    
    var template, list;
    
    $(document).ready(function(){
        template = Handlebars.compile($("#recentscan-template").html());
        list = $('#scannow_page .recent-scans ul[data-role="listview"]');
        
        $("#scanner").on("tap", function(){
            QRscanner(function(vCard){
                console.log("QRscanner vCard");
                console.log(vCard);
                
                list.append(template({scans: [vCard]}));
                list.listview('refresh'); 
            });
        });
    });
    
    View.scannow_page = function(data, load){
        list.html(template({scans: data}));
        list.listview('refresh'); 
        if(is_set(load))load();
    };
    
}(App.viewHelpers, App.Router, App.Widgets.QRscanner));