//(function(DB){
   
//    APP.DB = 
//    DB.SQLite = 
    App.DB = 
        (new SQLite())
            .init("QRconference", // db name
                ["conferences", "attendees", "scans"], // tables listed here

                ['CREATE TABLE IF NOT EXISTS scans(\n\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NULL,\n\
                    conference_id INTEGER NOT NULL,\n\
                    md5 TEXT NULL,\n\
                    fn VARCHAR(255) NOT NULL,\n\
                    title VARCHAR(255) NULL,\n\
                    org VARCHAR(255) NULL,\n\
                    email VARCHAR(255) NULL,\n\
                    tel VARCHAR(255) NULL,\n\
                    adr TEXT NULL,\n\
                    type VARCHAR(255) NULL,\n\
                    version VARCHAR(255) NULL,\n\
                    time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP)',
        
                'CREATE TABLE IF NOT EXISTS attendees(\n\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NULL,\n\
                    rating VARCHAR(255) NULL,\n\
                    notes TEXT NULL,\n\
                    tags TEXT NULL,\n\
                    followup INTEGER NULL,\n\
                    scan_id INTEGER NOT NULL)',
        
                'CREATE TABLE IF NOT EXISTS conferences(\n\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NULL,\n\
                    name VARCHAR(255) NOT NULL,\n\
                    time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP)'],
                true);
    
    App.DB.insert("conferences", {name: "MyEclipse2014"});
    App.DB.insert("conferences", {name: "test"});
//    App.DB.SQLite.insert("conferences", {name: "MyEclipse2014"});
//    App.DB.SQLite.insert("conferences", {name: "test"});
    
//}(App.DB));