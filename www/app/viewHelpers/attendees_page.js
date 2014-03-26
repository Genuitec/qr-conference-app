(function(View, Template){
    
    View.attendees_page = function(data){
        var templateHtml = new Template($("#attendees-template"));
        $('#attendees_page .attend').html( templateHtml.getHtml({tags: data}) ).trigger('create');

//        var template = Handlebars.compile($("#attendees-template").html());
//        $('#attendees_page .attend').html(template({tags: data})).trigger('create');
    };
    
}(App.viewHelpers, App.Resources.templateHandlebars));