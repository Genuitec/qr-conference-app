(function(View, Template){
    
    View.attendeeslist_page = function(data){
        var template = new Template($("#attendeeslist-templateDoT"));
        $('#attendeeslist_page [role="main"] .attendeeslist > [data-role="listview"]').html(template.getHtml({attendees: data}));       
    };
    
}(App.viewHelpers, App.Resources.templateDoT));
