<?php
 class User{
    private $username;
    private $password;

    //constructorsom körs direkt i klassen
    function __construct()
    {
        $this->db = mysqli_connect(DBHOST, DBUSER, DBPASS, DBDATABASE); if ($this->db->connect_errno > 0) {
            die("Fel vid anlutning:" . $this->db->connect_error);
        }
    } 

    //funtion to log in user and to check if password and username are correct
    public function loginUser($username, $password){
        $this->username = mysqli_real_escape_string($this->db, $username);
        $this->password = mysqli_real_escape_string($this->db, $password);
        
        $sql = "SELECT * FROM users_portfolio WHERE username= '$username' AND password='$password'";
        //send data to database
        $result = $this->db->query($sql);
        if ($result->num_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
}