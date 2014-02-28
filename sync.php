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
                        array(
                            "id"    =>  1, "name"   =>  "MyEclipse2014"
                        ),
                        array(
                            "id"    =>  2, "name"   =>  "testNumber Two"
                        )
                    )//,
//                    "attendees"   =>  array(
//                        array(
//                            "id"    =>  1, "name"   =>  "MyEclipse2014"
//                        ),
//                        array(
//                            "id"    =>  2, "name"   =>  "testNumber Two"
//                        )
//                    )
                )
            )
        );
        
    }
?>