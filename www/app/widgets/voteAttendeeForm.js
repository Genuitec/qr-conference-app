(function(Widgets, Scan, Session){


    Widgets.voteAttendeeForm = function(scanId, formEl){
        formEl.find('input:radio').change(function(){
//            Attendee.update({scan_id: scanId}, {rating: $(this).val()});
            Scan.update({id: scanId}, {rating: $(this).val()});
        });
        formEl.find('input[type="checkbox"]').change(function(){
//            Attendee.update({scan_id: scanId}, {followup: ($(this).prop("checked") ? 1 : 0)});
            Scan.followup({
                scan_id: scanId,
                creator_id: Session.get("user_data").userid,
                conference_id: Session.get("conference_id"),
                followup: ($(this).prop("checked") ? 1 : 0)
            });
        }); 
    };    
    
}(App.Widgets, App.Models.Scan, App.Session));