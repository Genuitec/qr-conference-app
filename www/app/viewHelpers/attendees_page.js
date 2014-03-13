(function(View, Router){
    
    View.attendees_page = function(data){
        var template = Handlebars.compile($("#attendees-template").html());
        $('#attendees_page .attend').html(template({tags: data})).trigger('create');
    };
    
}(App.viewHelpers, App.Router));