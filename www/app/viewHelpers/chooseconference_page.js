(function(View, Router, Sync, Conference, Session){
    
    var SyncScroll = (function(){
        var inited = false;
        
        return function(callback){
            if(inited === false){
                inited = true;
                $(document).on("scrollstop",function(e){
                    if( (Math.floor( ( ( (new Date()).getTime() + parseInt(App.Session.get("serverTimeDifference"),10) ) - parseInt(App.Session.get("lastSync"),10) ) /1000 /60 ) ) > 0)
                        Sync(true, callback);
                    else
                        callback();
                });
            }
        };
    }());
    
    View.chooseconference_page = function(data){
        var template = Handlebars.compile($("#chooseconference_page-template").html());
        $("#chooseconference_page .main").html(template(data));
        $(document).ready(function(){
            SyncScroll(function(){
                Conference.read(function(d){
                    $("#chooseconference_page .main").html(template(d));
                });
            });
        });
    };
    
}(App.viewHelpers, App.Router, App.Widgets.sync, App.Models.Conference, App.Session));