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
                tagText = $(_this).text(),
                selected = $(_this).hasClass("selected");

            if(selected === true){
                Tag.remove({
                    tag : tagText,
                    scan_id: scan_id,
                    conference_id: Session.get("conference_id")
                });
                $(_this).removeClass("selected");
            }else{
                Tag.add({
                    tag : tagText,
                    scan_id: scan_id,
                    conference_id: Session.get("conference_id")
                });
                $(_this).addClass("selected");
            }
        });
        
    };
    
}(App.Widgets, App.Models.Tag, App.Session));