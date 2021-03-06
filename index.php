<?php
include("config.php");
include 'classes/user.class.php';

//Made by Åsa Berglund2021
//check if someone logged in, if not user will be transfered to login page
if (isset($_SESSION['username'])) {
    $username = ($_SESSION['username']);
} else {
    header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="sv">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin</title>
    <link rel="stylesheet" href="./css/fetch.css">

</head>

<body class="fetch">
    <header>
        <h1>Admin</h1><br>
        <a href="logout.php"> <button> Logga ut </button></div></a>
    </header>
    <main>
        <!-- section for adding, updating and deleting courses -->
        <section>
            <h2>Kurser</h2>
            <div id="coursesAdmin" class="data">

            </div>
            <div class="add" id="updateCourse">
                <h2>Lägg till Kurser</h2>
                <form>
                    <label for="namn">Namn</label>
                    <br>
                    <input class="text-field" type="text" name="name" id="name">
                    <br>
                    <label for="university">Universitet</label>
                    <br>
                    <input class="text-field" type="text" name="university" id="university">
                    <br>
                    <label for="namn">Beskrivning</label>
                    <br>
                    <input class="text-field" type="text" name="description" id="description">
                    <br>
                    <label for="namn">Länk</label>
                    <br>
                    <input class="text-field" type="text" name="link" id="link">
                    <br>
                    <input class="button1" type="submit" value="Lägg till" id="addCourseBtn">

                </form>
            </div>

        </section>
                <!-- section for adding, updating and deleting working experince -->
        <section>
            <h2>Arbetslivserfarenhet</h2>
            <div id="workExperienceAdmin" class="data">

            </div>
            <div class="add" id="updateWork">
                <h2>Lägg till Arbetslivserfarenhet</h2>
                <form>
                    <label for="namn">Namn</label>
                    <br>
                    <input class="text-field" type="text" name="WorkName" id="WorkName">
                    <br>
                    <label for="namn">Datum</label>
                    <br>
                    <input class="text-field" type="text" name="WorkDate" id="WorkDate">
                    <br>
                    <label for="namn">Beskrivning/titel av jobb</label>
                    <br>
                    <input class="text-field" type="text" name="WorkDescription" id="WorkDescription">
                    <br>
                    <label for="namn">Beskrivande-text</label>
                    <br>
                    <input class="text-field" type="text" name="WorkText" id="WorkText">
                    <br>
                    <input class="button1" type="submit" value="Lägg till" id="addWorkBtn">
                </form>
            </div>
        </section>
                <!-- section for adding, updating and deleting projects -->
        <section>
            <h2>Projekt</h2>
            <div id="projectsAdmin" class="data">

            </div>
            <div class="add" id="updateProject">
                <h2>Lägg till Projekt</h2>
                <form>
                    <label for="namn">Namn</label>
                    <br>
                    <input class="text-field" type="text" name="ProjectName" id="ProjectName">
                    <br>
                    <label for="namn">Länk till projekt</label>
                    <br>
                    <input Type="text" name="ProjectLink" id="ProjectLink">
                    <br>
                    <label for="namn">Beskrivning av projekt</label>
                    <br>
                    <input class="text-field" type="text" name="ProjectDescription" id="ProjectDescription">
                    <br>
                    <input class="button1" type="submit" value="Lägg till" id="addProjectBtn">
                </form>
            </div>
        </section>
    </main>
    <footer>

    </footer>
    <!-- script tags -->
    <script src="./js/fetch_courses.js"></script>
    <script src="./js/fetch_projects.js"></script>
    <script src="./js/fetch_work.js"></script>

</body>

</html>