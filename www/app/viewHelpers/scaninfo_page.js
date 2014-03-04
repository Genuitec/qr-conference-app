(function(View, attendeeNotesWidget, voteAttendeeForm, Tags, Router){
    
    View.scaninfo_page = function(data){
        console.log(data);
        var template = Handlebars.compile($("#scaninfo_page-template").html());        
        $('#scaninfo_page').html(template(data)).trigger('create');

        attendeeNotesWidget(data.scan.id, $("#scaninfo_page .notes"));
        
        voteAttendeeForm(data.scan.id, $("#scaninfo_page form"));
        
        Tags({
            scan_id        : data.scan.id,
            tags_available : data.tags_available
        }, $("#scaninfo_page .tags"));
    };
    
}(App.viewHelpers, App.Widgets.attendeeNotes, App.Widgets.voteAttendeeForm, App.Widgets.tags, App.Router));