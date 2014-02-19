(function(Widgets, Attendee){

    Widgets.attendeeNotes = function(attendeeId, el){
        console.log(attendeeId);
        
        var notes = el.find('[data-role="notes"]'),
//            car_id = notes.attr("el-id"),
            note_textarea = el.find('[data-role="notes"] textarea'),
            note_p = el.find('[data-role="notes"] p'),
            note_button = el.find('[data-role="notes"] button[type="submit"]'),
            note_form = el.find('[data-role="note-form"]'),
            note_reset = el.find('[data-role="note-reset"]'),
            last_val = note_textarea.val(),
            send = false;

        notes.ham("doubletap", function(e){
//            e.stopPropagation();
            note_textarea.val(last_val);
            if(notes.hasClass("active")){
                notes.removeClass("active");
            }else{
                notes.addClass("active");
                note_textarea.focus();
            }
        });

        note_reset.ham("tap", function(e){
            e.stopPropagation();
            notes.removeClass("active");
            note_textarea.val(last_val);
        });

//        note_textarea.focusout(function(){
//            notes.removeClass("active");
//            note_textarea.val(last_val);
//        });

        note_form.submit(function(e){
            e.preventDefault();
            notes.removeClass("active");
            last_val = note_textarea.val();
            note_p.text(last_val);
            Attendee.update({scan_id: attendeeId}, {notes:last_val});
            return false;
        });

        note_textarea.ham("doubletap", function(e){
            e.stopPropagation();
        });

        note_button.ham("doubletap", function(e){
            e.stopPropagation();
        });
        
        note_reset.ham("doubletap", function(e){
            e.stopPropagation();
        });
        
    };    
    
}(App.Widgets, App.Models.Attendee));