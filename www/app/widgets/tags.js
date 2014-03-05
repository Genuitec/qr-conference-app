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
//    Widgets.tags = function(params, tagEl){
//        /**
//         * params = {
//         *      scan_id        : data.scan.id,
//         *      tags_available : data.tags_available
//         * }
//         */
//        var prependEl = tagEl.find(".addtag"),
//            addButton = tagEl.find(".addtagbut"),
//            tagSelect = tagEl.find(".addtag > div"),
//            selectItSelf = tagEl.find("select.addtagselect"),
//            saveButon = tagEl.find(".addtag .savetagbut"),
//            cancelButon = tagEl.find(".addtag .canceltagbut"),
//            scan_id = params.scan_id,
//            tags_available = params.tags_available;
//        
//        
//        addButton.on("click", function(){
//            if(tags_available.length > 0){
//                tagSelect.css("display", "inline-block");
//                saveButon.css("display", "inline-block");
//                cancelButon.css("display", "inline-block");
//                addButton.hide();
//            }
//        });
//        
//        cancelButon.on("click", function(){
//            tagSelect.hide();
//            saveButon.hide();
//            cancelButon.hide();
//            addButton.css("display", "inline-block");
//        });
//        
//        saveButon.on("click", function(){
//            var selectedOption = selectItSelf.find("option:selected"),
//                sel = {
//                    name: selectedOption.text(),
//                    id: selectedOption.attr("value")
//                };
//            Tag.add({
//                tag_id: sel.id,
//                scan_id: scan_id,
//                conference_id: Session.get("conference_id")
//            }, function(){
//                selectedOption.remove();
//                prependEl.before('<li tagid="'+sel.id+'">'+sel.name+'</li>');
//                removeFromTags(parseInt(sel.id, 10));
//                if(tags_available.length === 0)
//                    addButton.hide();
//            });
//
//            tagSelect.hide();
//            saveButon.hide();
//            cancelButon.hide();
//            addButton.css("display", "inline-block");
//        });
//        
//        function removeFromTags(id){
//            tags_available.forEach(function(v, k){
//                if(v.id === id)
//                    tags_available.splice(k, 1);
//            });
//        }
//    };    
    
}(App.Widgets, App.Models.Tag, App.Session));