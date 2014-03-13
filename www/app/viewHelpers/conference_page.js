(function(View, Router, QRscanner){
    
    View.conference_page = function(data){
        var template = Handlebars.compile($("#conference_page-template").html()),
            listTemplate = Handlebars.compile($("#recentscan-template").html());
    
        $('#conference_page').html(template(data)).trigger('create');
        var list = $('#conference_page .recent-scans ul[data-role="listview"]');

        $("#conference_page #scanner").on("tap", function(){
            QRscanner(function(vCard){
                console.log("QRscanner vCard");
                console.log(vCard);
                
                list.prepend(listTemplate({scans: [vCard]}));
                list.listview('refresh'); 
            });
        });
    };
    
}(App.viewHelpers, App.Router, App.Widgets.QRscanner));