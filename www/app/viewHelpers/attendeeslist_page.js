(function(View, Router){
    
    View.attendeeslist_page = function(data){
        console.log(data);
        var template = Handlebars.compile($("#attendeeslist-template").html());

        $('#attendeeslist_page [role="main"] .attendeeslist > [data-role="listview"]').html(template({attendees: data}));        
    };
    
}(App.viewHelpers, App.Router));