(function(View, Sync, Conference, Session, Template){
    
    var template;
    
    $(document).ready(function(){
        $("#chooseconference_page .refresh").ham("click", function(){
            if( ( (Math.floor( ( ( (new Date()).getTime() + parseInt(Session.get("serverTimeDifference"),10) ) - parseInt(Session.get("lastSync"),10) ) /1000 /60 ) ) > 0) )
                Sync(true, function(){
                    Conference.read(function(d){
                        $("#chooseconference_page .main").html(template.getHtml(d));
                    });
                });
        });
    });
    
    View.chooseconference_page = function(data){
        template = new Template($("#chooseconference_page-template"));
        $("#chooseconference_page .main").html(template.getHtml(data));
        
//        template = Handlebars.compile($("#chooseconference_page-template").html());
//        $("#chooseconference_page .main").html(template(data));
    };
    
}(App.viewHelpers, App.Widgets.sync, App.Models.Conference, App.Session, App.Resources.templateHandlebars));