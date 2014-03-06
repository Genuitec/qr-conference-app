(function(Widgets, NoteModel, Session){

    var NoteEL = function(params, formEl){
        var _self = this;
        
        this.formEl = formEl;
        this.scan_id = params.scan_id;
        this.conference_id = params.conference_id;

        this.user_id = Session.get("user_data").userid;
        this.textarea = $(this.formEl).find("textarea");
        this.p = $(this.formEl).find("p");
        this.submit = $(this.formEl).find('button[type="submit"]');
        this.reset = $(this.formEl).find('button[type="button"]');
        this.last_val = $(this.textarea).text();
        
        $(this.formEl).ham("doubletap", function(e){
            $(_self.textarea).val(_self.last_val);
            $('[data-role="notes"] > [data-role="note-form"]').removeClass("active");
            $(this).addClass("active");
            $(_self.textarea).focus();
        });
        
        $(this.formEl).submit(function(e){
            e.preventDefault();
            $('[data-role="notes"] > [data-role="note-form"]').removeClass("active");
            _self.last_val = $(_self.textarea).val();
            $(_self.p).text(_self.last_val);
            
            NoteModel.update({
                id: _self.scan_id,
                conference_id: _self.conference_id
            }, {notes:_self.last_val});
            return false;
        });
        
        $(this.reset).ham("tap", function(e){
            e.stopPropagation();
            $(_self.formEl).removeClass("active");
            $(_self.textarea).val(_self.last_val);
        });

        $(this.textarea).ham("doubletap", function(e){
            e.stopPropagation();
        });
        $(this.submit).ham("doubletap", function(e){
            e.stopPropagation();
        });
        $(this.reset).ham("doubletap", function(e){
            e.stopPropagation();
        });
    };

    Widgets.attendeeNotes = function(scan_id, el){
        el.find('form[data-role="note-form"]').each(function(k, v){
            new NoteEL({
                scan_id         :    scan_id,
                conference_id   :    Session.get("conference_id")
            }, $(this));
        });
    };    
    
}(App.Widgets, App.Models.Note, App.Session));