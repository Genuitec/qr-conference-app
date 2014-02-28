(function(View, attendeeNotesWidget, voteAttendeeForm, Router){
    
    View.scaninfo_page = function(data){
        console.log(data);
//        var data = _data[0],
        var template = Handlebars.compile($("#scaninfo_page-template").html());        
        $('#scaninfo_page').html(template(data)).trigger('create');
        
        
        attendeeNotesWidget(data.scan.id, $("#scaninfo_page .notes"));
        voteAttendeeForm(data.scan.id, $("#scaninfo_page form"));
    };
    
}(App.viewHelpers, App.Widgets.attendeeNotes, App.Widgets.voteAttendeeForm, App.Router));