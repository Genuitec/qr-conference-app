(function(View, attendeeNotesWidget, voteAttendeeForm, Tags, Router, Template){
    
    View.scaninfo_page = function(data){
        var template = new Template($("#scaninfo_page-templateDoT"));        
//        var template = new Template($("#scaninfo_page-template"));        
//        var template = Handlebars.compile($("#scaninfo_page-template").html());        
        $('#scaninfo_page').html(template.getHtml(data)).trigger('create');
//        $('#scaninfo_page').html(template(data)).trigger('create');

        attendeeNotesWidget(data.scan.id, $("#scaninfo_page .notes"));
        
        voteAttendeeForm(data.scan.id, $("#scaninfo_page form"));
        
        Tags({
            scan_id   : data.scan.id,
            tags      : data.tags
        }, $("#scaninfo_page .tags > ul > li"));
    };
    
}(App.viewHelpers, App.Widgets.attendeeNotes, App.Widgets.voteAttendeeForm, App.Widgets.tags, App.Router, App.Resources.templateDoT));
//}(App.viewHelpers, App.Widgets.attendeeNotes, App.Widgets.voteAttendeeForm, App.Widgets.tags, App.Router, App.Resources.templateHandlebars));