(function(View, Router){
    
    View.conference_page = function(data){
        console.log(data)
        var template = Handlebars.compile($("#conference_page-template").html());
        $('#conference_page').html(template(data)).trigger('create');
    };
    
}(App.viewHelpers, App.Router));