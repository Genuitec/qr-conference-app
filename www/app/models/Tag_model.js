(function(Models, DB, Session, getConfig){
    
    Models.Tag = {
        
        create : function(data, callback){},
                
        read : function(where, callback){
//            if(empty(where) || empty(where.scan_id) || empty(where.conference_id))callback(false);
            if(empty(where) || empty(where.conference_id))callback(false);
            DB.select("t.id, t.tag");
            DB.from("tags as t");
            DB.join("scan_tags as st", 't.id = st.tag_id');
//            DB.where('st.conference_id = '+ where.conference_id +' AND st.scan_id = "'+ where.scan_id+'"');
            DB.where('st.conference_id = "'+ where.conference_id +'"');
            if(is_set(where.scan_id))
                DB.where('st.scan_id = "'+ where.scan_id+'"');
            DB.query(callback);
        },
                
        available : function(where, callback){
            if(empty(where) || empty(where.scan_id) || empty(where.conference_id))callback(false);
            DB.select("t.id, t.tag");
            DB.from("tags as t");
            DB.join("scan_tags as st", 't.id = st.tag_id');
            DB.where('st.conference_id = '+ where.conference_id +' AND st.scan_id <> "'+ where.scan_id+'"');
            DB.query(callback);
        },
                
        add : function(data, callback){
            /** data = {tag_id, scan_id, conference_id} **/
            if(empty(data) || empty(data.tag_id, data.scan_id, data.conference_id))return false;

            data.creator_id = Session.get("user_data").userid;
            DB.insert("scan_tags", addGenId(data, data.creator_id), callback);
        },
                
        update : function(where, data, callback){}

    };
    
}(App.Models, App.DB, App.Session, App.Config.get));