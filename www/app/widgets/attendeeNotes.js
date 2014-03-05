(function(Widgets, NoteModel, Session){

    var NoteEL = function(params, formEl){
        var _self = this;
        
        this.formEl = formEl;
//        this.id = params.id;
//        this.creator_id = params.creator_id;
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
//                id: _self.id,
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
    },
            
    AddNoteEL = function(params, formEl, addButtonEl){
        var _self = this;
        
        this.formEl = formEl;
        this.addButtonEl = addButtonEl;
        
        this.creator_id = Session.get("user_data").userid;
        this.scan_id = params.scan_id;
        this.conference_id = params.conference_id;

        this.textarea = $(this.formEl).find("textarea");
        this.p = $(this.formEl).find("p");
        this.submit = $(this.formEl).find('button[type="submit"]');
        this.reset = $(this.formEl).find('button[type="button"]');
        this.last_val = $(this.textarea).text();
        
        $(this.addButtonEl).ham("tap", function(e){
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
            NoteModel.add({
                scan_id: _self.scan_id,
                conference_id: _self.conference_id,
                creator_id: _self.creator_id,
                note: _self.last_val
            });
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
//            if($(v).attr("creatorid") == Session.get("user_data").userid)
            new NoteEL({
                scan_id         :    scan_id,
//                id              :    $(v).attr("noteid"),
//                creator_id      :    $(v).attr("creatorid"),
                conference_id   :    Session.get("conference_id")
            }, $(this));
        });
        
//        var addbutton = el.find('[data-role="addnote"]'),
//            addform = el.find('[data-role="addnote-form"]');
    
//        new AddNoteEL({
//            scan_id         :    scan_id,
//            creator_id      :    Session.get("user_data").userid,
//            conference_id   :    Session.get("conference_id")
//        }, el.find('[data-role="addnote-form"]'), el.find('[data-role="addnote"]'));

    };    
    
}(App.Widgets, App.Models.Note, App.Session));