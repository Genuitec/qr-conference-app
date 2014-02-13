(function(APP){
    
    APP.DB = 
        (new SQLite())
            .init("QRconference", // db name
                ["cars", "users", "scans"], // tables listed here

                ['CREATE TABLE IF NOT EXISTS scans(\n\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NULL,\n\
                    name VARCHAR(255) NOT NULL,\n\
                    price VARCHAR(255) NULL,\n\
                    images TEXT NULL,\n\
                    fuel_city VARCHAR(255) NULL,\n\
                    fuel_highway VARCHAR(255) NULL,\n\
                    mpg_city VARCHAR(255) NULL,\n\
                    mpg_highway VARCHAR(255) NULL,\n\
                    housepower VARCHAR(255) NULL,\n\
                    torque VARCHAR(255) NULL,\n\
                    engine VARCHAR(255) NULL,\n\
                    transmission1 VARCHAR(255) NULL,\n\
                    transmission2 VARCHAR(255) NULL,\n\
                    descr TEXT NULL,\n\
                    recommended_cars TEXT NULL,\n\
                    time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n\
                    favourite INTEGER DEFAULT 0,\n\
                    testdrive INTEGER DEFAULT 0,\n\
                    voted INTEGER DEFAULT 0,\n\
                    notes TEXT NULL,\n\
                    category_id INTEGER NOT NULL)',
        
                'CREATE TABLE IF NOT EXISTS users(\n\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NULL,\n\
                    name VARCHAR(255) NOT NULL,\n\
                    price VARCHAR(255) NULL,\n\
                    images TEXT NULL,\n\
                    fuel_city VARCHAR(255) NULL,\n\
                    fuel_highway VARCHAR(255) NULL,\n\
                    mpg_city VARCHAR(255) NULL,\n\
                    mpg_highway VARCHAR(255) NULL,\n\
                    housepower VARCHAR(255) NULL,\n\
                    torque VARCHAR(255) NULL,\n\
                    engine VARCHAR(255) NULL,\n\
                    transmission1 VARCHAR(255) NULL,\n\
                    transmission2 VARCHAR(255) NULL,\n\
                    descr TEXT NULL,\n\
                    recommended_cars TEXT NULL,\n\
                    time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n\
                    favourite INTEGER DEFAULT 0,\n\
                    testdrive INTEGER DEFAULT 0,\n\
                    voted INTEGER DEFAULT 0,\n\
                    notes TEXT NULL,\n\
                    category_id INTEGER NOT NULL)',
        
                'CREATE TABLE IF NOT EXISTS cars(\n\
                    id INTEGER PRIMARY KEY AUTOINCREMENT NULL,\n\
                    name VARCHAR(255) NOT NULL,\n\
                    price VARCHAR(255) NULL,\n\
                    images TEXT NULL,\n\
                    fuel_city VARCHAR(255) NULL,\n\
                    fuel_highway VARCHAR(255) NULL,\n\
                    mpg_city VARCHAR(255) NULL,\n\
                    mpg_highway VARCHAR(255) NULL,\n\
                    housepower VARCHAR(255) NULL,\n\
                    torque VARCHAR(255) NULL,\n\
                    engine VARCHAR(255) NULL,\n\
                    transmission1 VARCHAR(255) NULL,\n\
                    transmission2 VARCHAR(255) NULL,\n\
                    descr TEXT NULL,\n\
                    recommended_cars TEXT NULL,\n\
                    time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,\n\
                    favourite INTEGER DEFAULT 0,\n\
                    testdrive INTEGER DEFAULT 0,\n\
                    voted INTEGER DEFAULT 0,\n\
                    notes TEXT NULL,\n\
                    category_id INTEGER NOT NULL)'],
                true);

}(App));