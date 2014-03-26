(function(View, Template){
    
    View.attendeeslist_page = function(data){
        var template = new Template($("#attendeeslist-template"));
        $('#attendeeslist_page [role="main"] .attendeeslist > [data-role="listview"]').html(template.getHtml({attendees: data})); 
        
//        var template = Handlebars.compile($("#attendeeslist-template").html());
//        $('#attendeeslist_page [role="main"] .attendeeslist > [data-role="listview"]').html(template({attendees: data}));        
    };
    
}(App.viewHelpers, App.Resources.templateHandlebars));