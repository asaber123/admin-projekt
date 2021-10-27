<?php

include("config.php");
include 'classes/user.class.php';


//If user is not logged in-> index page
if (isset($_SESSION['username'])) {
    header("Location: admin.php");
}

//controll log in, sets variables if submit button is clicked
if (isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    //making a new instance of class
    $users = new User();
    if ($users->loginUser($username, $password)) {
        $_SESSION['username'] = $username;
        header("Location: admin.php");
    } else {
        $message = "<p class='errorMessage'> Password and username did not match </p>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/fetch.css">

    <title>Document</title>
</head>

<body class="fetch">
    <header>
        <h1>Login to admin</h1>
    </header>
    <main>
        <section>
            <div class="add">
                <form class="form-login" action="login.php" method="post">
                    <br>
                    <label class="login" for="username">Username:</label>
                    <br>
                    <input class="login" type="text" name="username" id="username">
                    <br>
                    <label class="login" for="password">Password:</label>
                    <br>
                    <input class="login" type="password" name="password" id="password">
                    <br>
                    <input class="submit" type="submit" value="logg in">

                </form>
                <div>
                    <?php
                    if (isset($message)) {
                        echo $message;
                    }
                    ?>
                </div>

            </div>
        </section>
    </main>

</body>

</html>