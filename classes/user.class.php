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
    //set name, chec if size is bigger than 2 characters
    public function setName(string $name): bool
    {
        if (strlen($name) > 1) {
            $this->name = $name;
            return true;
        } else {
            return false;
        }
    }
    //set username check if size is bigger than 2 characters
    public function setUsername(string $username): bool
    {
        if (strlen($username) > 1) {
            $this->username = $username;
            return true;
        } else {
            return false;
        }
    }

    //set password check if size is bigger than 7 characters and that they are matching
    public function setPassword(string $password, string $password2): bool
    {   if ($password == $password2 && strlen($password) > 6){
            $this->password = $password;
            return true;
        } else {
            return false;
        }
    }
    //get name 
    public function getName(string $name): string
    {
        return $this->name;
    }


    //get username
    public function getUsername(string $name): string
    {
        return $this->username;
    }
    //get db
    public function getdb(){
        return $this->db;
    }

    //logg in user
    public function loginUser($username, $password){
        $username = $this->db->real_escape_string($username);
        $password = $this->db->real_escape_string($password);

        $sql = "SELECT password FROM users_portfolio WHERE username= '$username'";
        //send data to database
        $result = $this->db->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedPassword = $row['password'];
        } else {
            return false;
        }
    }
}