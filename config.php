<?php
// Made by Åsa Berglund 2021
$devmode= true;

if (session_status() == PHP_SESSION_NONE) {
    session_start();
  }
  

if($devmode){
    //DB localhost
    define("DBHOST", "localhost");
    define("DBUSER", "rest_api_projekt");
    define("DBPASS", "password");
    define("DBDATABASE", "rest_api_projekt");
}
    else {
        //DB mysql simply.com
        define("DBHOST", "mysql112.unoeuro.com");
        define("DBUSER", "asaberglund_se");
        define("DBPASS", "livetpaenpinne2021");
        define("DBDATABASE", "asaberglund_se_db");
    }