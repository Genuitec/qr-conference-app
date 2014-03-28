(function(Models, DB, getConfig, Session){
    
    Models.Note = {

        update : function(where, data, callback){
            DB.update("scans", data, where, callback);
        }

    };
    
}(App.Models, App.DB, App.Config.get, App.Session));