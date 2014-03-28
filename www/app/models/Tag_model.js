(function(Models, DB){
    
    Models.Tag = {
                
        update : function(data, where, callback){
            DB.update("scans", {
                tags: data.tags
            }, {
                conference_id : where.conference_id,
                id : where.scan_id
            }, callback);
        }

    };
    
}(App.Models, App.DB));