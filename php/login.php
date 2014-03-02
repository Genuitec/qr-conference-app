<?php     
    if($_POST){
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