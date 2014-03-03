<?php     
    if($_POST['sync']){
        $sync_data = json_decode($_POST['sync']);
//        var_dump($sync_data);
        //save to db
        // $sync_data['data']
        
        /*
         * you get the data in format
         * 
         * {
         *  info:{},
         *  data:{
         *      'tableName' : {
         *          update: [],
         *          create: [],
         *          lastSyncTine: 12321321321
         *      },
         *      'tableName' : {
         *          update: [],
         *          create: [],
         *          lastSyncTine: 12321321321
         *      },
         *  }
         * }
         * 
         */
        
        
        //then get from db
        // for sync_data
        //      SELECT * FROM 'table' WHETE sync_time < $sync_data['time']
        
        echo json_encode(
            array(
                "info"  =>  array(
                    "time"  => 1231
                ),
                "data"  =>  array(
                    //dbObjects just dump the data after last sync time
                    "conferences"   =>  array(
                        array("id"    =>  1, "name"   =>  "MyEclipse2014"),
                        array("id"    =>  2, "name"   =>  "testNumber Two")
                    ),
                    "tags"   =>  array(
                        array("id"    =>  1, "tag"   =>  "RCP"),
                        array("id"    =>  2, "tag"   =>  "Eclipse IDE"),
                        array("id"    =>  3, "tag"   =>  "Large Op"),
                        array("id"    =>  4, "tag"   =>  "Cool"),
                        array("id"    =>  5, "tag"   =>  "Friendly"),
                        array("id"    =>  6, "tag"   =>  "RCP"),
                        array("id"    =>  7, "tag"   =>  "Call"),
                        array("id"    =>  8, "tag"   =>  "RCP"),
                        array("id"    =>  9, "tag"   =>  "Eclipse IDE"),
                        array("id"    =>  10, "tag"   =>  "Large Op"),
                        array("id"    =>  11, "tag"   =>  "Cool"),
                        array("id"    =>  12, "tag"   =>  "Friendly"),
                        array("id"    =>  13, "tag"   =>  "RCP"),
                        array("id"    =>  14, "tag"   =>  "Call")
                    ),
                    "scans"     =>  array(
                        array(
                            "id"                =>  2,
                            "conference_id"     =>  1,
                            "fn"                =>  "wwwdsawwwwwdsa",
                            "title"             =>  "wwwdsawwwwwdsa",
                            "org"               =>  "wwworg test",
                            "email"             =>  "igig@mail.ru,2222@mail.ru",
                            "tel"               =>  "23213213231,2222@mail.ru",
                            "adr"               =>  "dsawwwdas",
                            "type"              =>  "",
                            "version"           =>  "",
                            "scantime"          =>  "2014-03-03 14:23:08",
                            "rating"            =>  2,
                            "scannedby_id"      =>  22,
                            "scannedby_name"    =>  "test",
                        ),
                        array(
                            "id"                =>  1,
                            "conference_id"     =>  1,
                            "fn"                =>  "dsadsa",
                            "title"             =>  "dsadsa",
                            "org"               =>  "org test",
                            "email"             =>  "igig@mail.ru,2222@mail.ru",
                            "tel"               =>  "23213213231,2222@mail.ru",
                            "adr"               =>  "dsadas",
                            "type"              =>  "",
                            "version"           =>  "",
                            "scantime"          =>  "2014-03-03 14:23:08",
                            "rating"            =>  2,
                            "scannedby_id"      =>  22,
                            "scannedby_name"    =>  "test",
                        )
                    ),
                    "scan_tags"     =>    array(
                        array(
                            "id"         =>  "222833",
                            "scan_id"    =>  "1",
                            "conference_id"    =>  "1",
                            "creator_id"    =>  "2",
                            "tag_id"    =>  "1"
                        ),
                        array(
                            "id"         =>  "2272233",
                            "scan_id"    =>  "1",
                            "conference_id"    =>  "1",
                            "creator_id"    =>  "2",
                            "tag_id"    =>  "3"
                        ),
                        array(
                            "id"         =>  "22552233",
                            "scan_id"    =>  "1",
                            "conference_id"    =>  "1",
                            "creator_id"    =>  "2",
                            "tag_id"    =>  "4"
                        ),
                        array(
                            "id"         =>  "224442233",
                            "scan_id"    =>  "1",
                            "conference_id"    =>  "1",
                            "creator_id"    =>  "2",
                            "tag_id"    =>  "2"
                        )
                    )
                    
                )
            )
        );
        
    }
?>