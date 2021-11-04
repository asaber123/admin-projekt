<?php
include('config.php');

//Connect to DB
$db=new mysqli(DBHOST, DBUSER, DBPASS, DBDATABASE);
if ($db->connect_errno > 0) {
    die("Fel vid anlutning:" . $this->db->connect_error);
}

//Creating table for courses
$sql ="DROP TABLE IF EXISTS users_portfolio;";
$sql .= "CREATE TABLE users_portfolio(
    username VARCHAR(63) NOT NULL,
    password VARCHAR(100) NOT NULL
);";

$sql .="INSERT INTO users_portfolio(username, password) VALUES ('hej', 'hej');";

/* If success, print print pre tag else warning */
if($db->multi_query($sql)) {
    echo "Table is installed!";
} else {
    echo "Something happend, the table is not installed!";
}
