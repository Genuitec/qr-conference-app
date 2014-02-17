(function(View, Router){
    
    View.chooseconference_page = function(data){
        console.log(data);
        var template = Handlebars.compile($("#chooseconference_page-template").html());
        
        $("#chooseconference_page .main").html(template(data));
        
    };
    
}(App.viewHelpers, App.Router));