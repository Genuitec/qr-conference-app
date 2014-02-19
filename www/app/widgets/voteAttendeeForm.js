(function(Widgets, Attendee){


    Widgets.voteAttendeeForm = function(scanId, formEl){
        formEl.find('input:radio').change(function(){
            Attendee.update({scan_id: scanId}, {rating: $(this).val()});
        });
        formEl.find('input[type="checkbox"]').change(function(){
            Attendee.update({scan_id: scanId}, {followup: ($(this).prop("checked") ? 1 : 0)});
        }); 
    };    
    
}(App.Widgets, App.Models.Attendee));