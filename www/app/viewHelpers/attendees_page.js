(function(View, Template){
    
    View.attendees_page = function(data){
        var templateHtml = new Template($("#attendees-templateDoT"));
        $('#attendees_page .attend').html( templateHtml.getHtml({tags: data}) ).trigger('create');
    };
    
}(App.viewHelpers, App.Resources.templateDoT));
