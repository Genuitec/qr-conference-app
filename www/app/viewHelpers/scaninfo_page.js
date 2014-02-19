(function(View, attendeeNotesWidget, voteAttendeeForm, Router){
    
    View.scaninfo_page = function(_data){
        console.log(_data);
        var data = _data[0],
            template = Handlebars.compile($("#scaninfo_page-template").html());        
        $('#scaninfo_page').html(template(data)).trigger('create');
        
        
        attendeeNotesWidget(data.id, $("#scaninfo_page .notes"));
        voteAttendeeForm(data.id, $("#scaninfo_page form"));
    };
    
}(App.viewHelpers, App.Widgets.attendeeNotes, App.Widgets.voteAttendeeForm, App.Router));