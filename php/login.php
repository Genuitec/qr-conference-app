<?php     
    if($_POST){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST');
        echo 
            json_encode(
                array(
                    "hosturl"   =>  'http://qrconf',
                    "userid"    =>  'igor',
                    "password"  =>  'test'
                )
            );
    }
?>