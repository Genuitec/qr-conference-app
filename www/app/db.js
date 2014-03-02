(function(_App, Config, Session){
    
    var DBconfig = {
        
        DBname : "QRconference",
        
        tables : ["conferences", "scans", "scan_tags", "notes", "followups", "tags"],
        
        createSQL : [
            'CREATE TABLE IF NOT EXISTS scans(\n\
                id TEXT NOT NULL,\n\
                conference_id INTEGER NOT NULL,\n\
                fn VARCHAR(255) NOT NULL,\n\
                title VARCHAR(255) NULL,\n\
                org VARCHAR(255) NULL,\n\
                email VARCHAR(255) NULL,\n\
                tel VARCHAR(255) NULL,\n\
                adr TEXT NULL,\n\
                type VARCHAR(255) NULL,\n\
                version VARCHAR(255) NULL,\n\
                scantime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n\
                rating INTEGER NULL,\n\
                scannedby_id TEXT NULL,\n\
                scannedby_name VARCHAR(255) NULL,\n\
                UNIQUE(id, conference_id))',

            'CREATE TABLE IF NOT EXISTS scan_tags(\n\
                id TEXT NOT NULL,\n\
                scan_id TEXT NOT NULL,\n\
                conference_id INTEGER NOT NULL,\n\
                creator_id TEXT NOT NULL,\n\
                tag_id INTEGER NOT NULL)',

            'CREATE TABLE IF NOT EXISTS notes(\n\
                id TEXT NOT NULL,\n\
                scan_id TEXT NOT NULL,\n\
                conference_id INTEGER NOT NULL,\n\
                creator_id TEXT NOT NULL,\n\
                note TEXT NULL)',

            'CREATE TABLE IF NOT EXISTS followups(\n\
                id TEXT NOT NULL,\n\
                scan_id TEXT NOT NULL,\n\
                creator_id TEXT NOT NULL,\n\
                conference_id INTEGER NOT NULL,\n\
                followup INTEGER NULL DEFAULT 0,\n\
                UNIQUE(scan_id, creator_id, conference_id))',

            'CREATE TABLE IF NOT EXISTS conferences(\n\
                id INTEGER PRIMARY KEY AUTOINCREMENT NULL,\n\
                name VARCHAR(255) NOT NULL,\n\
                time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP)',

            'CREATE TABLE IF NOT EXISTS tags(\n\
                id INTEGER PRIMARY KEY AUTOINCREMENT NULL,\n\
                tag VARCHAR(255) NOT NULL)',

            'CREATE TABLE IF NOT EXISTS sync (\n\
                sid INTEGER NOT NULL PRIMARY KEY,\n\
                table_name VARCHAR( 255 ) NOT NULL,\n\
                time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n\
                rowcreated INTEGER DEFAULT 0,\n\
                row_id varchar(255) NOT NULL)'],

        recreateDB : true
    };

    Config.set("dbTables", clone_array(DBconfig.tables));
        
    DBconfig.tables.forEach(function(tb){
            DBconfig.createSQL.push('CREATE TRIGGER update_' + tb + ' AFTER UPDATE ON ' + tb + ' FOR EACH ROW BEGIN INSERT INTO sync(table_name, row_id, rowcreated) VALUES("' + tb + '", NEW.id, 1); END; ');
            DBconfig.createSQL.push('CREATE TRIGGER insert_' + tb + ' AFTER INSERT ON ' + tb + ' FOR EACH ROW BEGIN INSERT INTO sync(table_name, row_id) VALUES("' + tb + '", NEW.id); END; ');
        Session.set("sync_"+tb, 0);
    });

    DBconfig.tables.push('sync');
        
    _App.DB = (new SQLite())
        .init( DBconfig.DBname, DBconfig.tables, DBconfig.createSQL, DBconfig.recreateDB );
    
    Session.set("lastSync", (new Date().getTime()));

    _App.DB.insert("conferences", {name: "MyEclipse2014"});
    _App.DB.insert("conferences", {name: "test"});
    
}(App, App.Config, App.Session));