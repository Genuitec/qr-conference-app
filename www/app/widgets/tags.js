(function(Widgets, Tag, Session){

    Widgets.tags = function(params, tagsEl){
        /**
         * params = {
         *      scan_id        : data.scan.id,
         *      tags_available : data.tags_available
         * }
         */
        var scan_id = params.scan_id,
            tags = params.tags,
            tagsEl = tagsEl;
        $(tagsEl).ham("click", function(e){
            var _this = this,
                tags = [],
                selected = $(_this).hasClass("selected");

            if(selected === true)
                $(_this).removeClass("selected");
            else
                $(_this).addClass("selected");
            
            $(tagsEl).each(function(k, v){
                if($(v).hasClass("selected"))
                    tags.push($(v).text());
            });
            Tag.update({
                tags: tags.join()
            }, {
                scan_id: scan_id,
                conference_id: Session.get("conference_id")
            });
        });
        
    };
    
}(App.Widgets, App.Models.Tag, App.Session));