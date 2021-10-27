<?php
 class Course{
    private $userName;
    private $userPassword;

    //constructorsom körs direkt i klassen
    function __construct()
    {
        $this->db = mysqli_connect(DBHOST, DBUSER, DBPASS, DBDATABASE); if ($this->db->connect_errno > 0) {
            die("Fel vid anlutning:" . $this->db->connect_error);
        }
    } 
}