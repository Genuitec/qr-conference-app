(function(View, Router, getConfig, QRscanner, Sync, Template){
    
    View.conference_page = function(data){
        var template = new Template($("#conference_page-templateDoT")),
            listTemplate = new Template($("#recentscan-templateDoT"));
        $('#conference_page').html(template.getHtml(data)).trigger('create');
        var list = $('#conference_page .recent-scans ul[data-role="listview"]');

        $("#conference_page #scanner").on("tap", function(){
            QRscanner(function(qrscan){
                if(qrscan.exist === true)
                    alert(getConfig("scans", "error_already_exist"));
                else
                    Sync(true, function(){});

                Router.redirect("scaninfo_page", {
                    switchPage:true,
                    params:{
                        id: qrscan.QR.id
                    }
                });
                console.log("QRscanner vCard");
                console.log(qrscan);
                
//                list.prepend(listTemplate.getHtml({scans: [vCard]}));
//                list.listview('refresh'); 
            });
        });
    };
    
}(App.viewHelpers, App.Router, App.Config.get, App.Widgets.QRscanner, App.Widgets.sync, App.Resources.templateDoT));