"use strict"

//Get elements from html elements and declares variables
let coursesEl = document.getElementById("coursesAdmin");
let addCourseBtn = document.getElementById("addCourseBtn");
let updateCourseBtn = document.getElementById("updateCourseBtn");
let updateCourseEL = document.getElementById("updateCourse");
let nameInput = document.getElementById("name");
let universityInput = document.getElementById("university");
let descriptionInput = document.getElementById("description");
let linkInput = document.getElementById("link");


//Adding eventlisteners which will start different funcions on events. 
window.addEventListener('load', getCourses);
addCourseBtn.addEventListener('click', addCourse);


//Function that gets data witg courses from the rest-api.
function getCourses() {
    //Everytime the window reloads, the element will get empty.
    coursesEl.innerHTML = '';
    //Fetching data from rest-api courses
    fetch('http://localhost/rest-projekt/courses.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                //printing out fetched data to the html element stored in the object course. 
                coursesEl.innerHTML +=
                    "<div class='item'><p>" +
                    "<b>Namn: </b>" + course.name + "<br>" +
                    "<b> Universitet: "+ course.university+"</b>"
                    "<b>Beskrivning: </b>" + course.description + "<br>" +
                    "<b>Kursplan: </b>" + course.link + "<br>" +
                    "<b>Id: </b>" + course.id + "<br>" +
                    "</p> <button class='button2' id='" + course.id + "' onClick='getCourseById(" + course.id + ")'> Uppdatera </button>" +
                    "<button class='button2' id='" + course.id + "' onClick='deleteCourse(" + course.id + ")'> Radera </button></div> ";
            })
        })
}
//when delete button is clicked this funciton starts. 
function deleteCourse(id) {
    //Fetching the rest-api with delete request. 
    fetch("http://localhost/rest-projekt/courses.php?id=" + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        //After request is done courses are reloded again. 
        .then(data => {
            getCourses();
        })
        //If something goes wrong, an error message will be shown. 
        .catch(error => {
            console.log('Felmeddelande:', error);
        })
}
//When the user in the admin page is filling in the form and klick the button "lägg till" this funciton will start
function addCourse() {
    //Creating variables with the values that is inputed in the form
    let name = nameInput.value;
    let description = descriptionInput.value;
    let link = linkInput.value;
    let university = universityInput.value;
    //Adding the values into the object course
    let course = { 'name': name, 'link': link, 'description': description, 'university':university };
    //Fetching dtaa to courses api with the request post. 
    fetch("http://localhost/rest-projekt/courses.php", {
        method: 'POST',
        body: JSON.stringify(course),
    })
        .then(response => response.json())
        .then(data => {
        //After request is done courses are reloded again. 
            getCourses();
        })
        //If something goes wrong, an error message will be shown. 
        .catch(error => {
            console.log('Felmeddelande:', error);
        })
}
//when the button "uppdatera" is clicked, this function will start. 
function getCourseById(id) {
    updateCourseEL.innerHTML = '';
    //Fetching to API courses with an id and GET request. 
    fetch('http://localhost/rest-projekt/courses.php?id=' + id, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(course => {
                //instead of showing the form to add course, a new form will be shown that sais update course and with the data of the course that should be updated. 
                updateCourseEL.innerHTML=
                    "<h2> Uppdatera Kurs </h2>" +
                    "<form> <label for='namn'>Namn</label> <br>" +
                    "<input class='text-field' type='text' name='name'id='name' value='" + course.name + "'><br>" +
                    "<label for='namn'>Universitet</label> <br>" +
                    "<input class='text-field' type='text' name='university' id='university' value='" + course.university + "'><br>" +
                    "<label for='namn'>Beskrivning</label> <br>" +
                    "<input class='text-field' type='text' name='description' id='description' value='" + course.description + "'> <br>" +
                    "<label for='namn'>Länk</label> <br>" +
                    "<input class='text-field' type='text' name='link' id='link' value = '" + course.link + "'> <br>" +
                    " <input class='button1' type='submit' value='Uppdatera kurs' id='submit' onClick='updateCourse(" + course.id + ")'>";
            })
        })
}
//when the button "uppdatera" is clicked, this funciton will start. 
function updateCourse(id) {
    //Declaring variables again to get the value from the new data filled into the form
    const nameInput = document.getElementById("name");
    const descriptionInput = document.getElementById("description");
    const linkInput = document.getElementById("link");
    const universityInput = document.getElementById("university");

    const name = nameInput.value;
    const description = descriptionInput.value;
    const link = linkInput.value;
    const university = universityInput.value;
    //Adding dtaa into the object data. 
    let data = { 'name': name, 'link': link, 'description': description, 'university': university };
    //Doing a fetch call to the api courses with the method put and an id sent. 
    fetch("http://localhost/rest-projekt/courses.php?id=" + id, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(course => {
            //After method is sent the function getCourses will start again. 
            getCourses();
        })
        .catch(error => {
            //If something goes wrong, an error message will be shown. 
            console.log('Felmeddelande:', error);
        })

}



