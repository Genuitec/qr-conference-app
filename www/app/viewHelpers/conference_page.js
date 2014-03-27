(function(View, Router, QRscanner, Template){
    
    View.conference_page = function(data){
        var template = new Template($("#conference_page-templateDoT")),
            listTemplate = new Template($("#recentscan-templateDoT"));
        $('#conference_page').html(template.getHtml(data)).trigger('create');
        var list = $('#conference_page .recent-scans ul[data-role="listview"]');

        $("#conference_page #scanner").on("tap", function(){
            QRscanner(function(vCard){
                console.log("QRscanner vCard");
                console.log(vCard);
                
                list.prepend(listTemplate.getHtml({scans: [vCard]}));
                list.listview('refresh'); 
            });
        });
    };
    
}(App.viewHelpers, App.Router, App.Widgets.QRscanner, App.Resources.templateDoT));