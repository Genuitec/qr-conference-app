(function(View, Router, Sync, Conference, Session){
    
    var SyncScroll = (function(){
        var inited = false,
            lastTrigger = 0;
        
        return function(callback){
            if(inited === false){
                inited = true;
                $(document).on("scrollstop",function(e){
                    if( ( (Math.floor( ( ( (new Date()).getTime() + parseInt(Session.get("serverTimeDifference"),10) ) - parseInt(Session.get("lastSync"),10) ) /1000 /60 ) ) > 0) 
                        && ( (Math.floor( ( ( (new Date()).getTime() + parseInt(Session.get("serverTimeDifference"),10) ) - lastTrigger ) /1000 /60 ) ) > 0) ){
                        Sync(true, callback);
                        lastTrigger = (new Date()).getTime() + parseInt(Session.get("serverTimeDifference"),10);
                        console.log(lastTrigger);
                    }else
                        callback();
                });
            }
        };
    }()),
    
    template;
    
    $(document).ready(function(){
        $("#chooseconference_page .refresh").ham("click", function(){
            if( ( (Math.floor( ( ( (new Date()).getTime() + parseInt(Session.get("serverTimeDifference"),10) ) - parseInt(Session.get("lastSync"),10) ) /1000 /60 ) ) > 0) )
                Sync(true, function(){
                    Conference.read(function(d){
                        $("#chooseconference_page .main").html(template(d));
                    });
                });
        });
    });
    
    View.chooseconference_page = function(data){
        template = Handlebars.compile($("#chooseconference_page-template").html());
        $("#chooseconference_page .main").html(template(data));
        
//        $(document).ready(function(){
//            SyncScroll(function(){
//                Conference.read(function(d){
//                    $("#chooseconference_page .main").html(template(d));
//                });
//            });
//        });
    };
    
}(App.viewHelpers, App.Router, App.Widgets.sync, App.Models.Conference, App.Session));