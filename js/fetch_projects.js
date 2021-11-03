//Declaring variables from html elemnts shown in the page admin by calling the function getElementById
let updateProjectEL = document.getElementById("updateProject");
let projectsEl = document.getElementById("projectsAdmin");
let addProjectBtn = document.getElementById("addProjectBtn");
let projectNameInput = document.getElementById("ProjectName");
let projectDescriptionInput = document.getElementById("ProjectDescription");
let projectLinkInput = document.getElementById("ProjectLink");


//Adding eventlisteners which will start different funcions on events. 
window.addEventListener('load', getProjects);
addProjectBtn.addEventListener('click', () => {    
    addProjects();
});


//Function that gets data with projects from the rest-api.
function getProjects(){
    //Everytime the window reloads, the element will get empty.
    projectsEl.innerHTML ='';
    //Fetching data from rest-api projects
    fetch('http://asaberglund.se/rest-projekt/projects.php')
    .then(response => response.json())
    .then(data =>{
        data.forEach(project => {
            console.log(project);
            //printing out fetched data to the html element stored in the object project. 
            projectsEl.innerHTML += 
            "<div class='item'><p>"+
            "<b>Namn: </b>" + project.name + "<br><br>" +
            "<b>Beskrivning: </b>" + project.description + "<br><br>" +
            "<b>Länk: </b>" + project.link + "<br><br>" +
            "<b>Id: </b>" + project.id + "<br><br>" +
            "</p> <button class='button2' id='" + project.id + "' onClick='getProjectById(" + project.id + ")'> Uppdatera </button>" +
            "<button class='button2' id='"+ project.id +"' onClick='deleteProject("+ project.id +")'> Radera </button></div> ";
        })
    })
}
//when delete button is clicked this funciton starts. 
function deleteProject(id){
    //Fetching the rest-api with delete request. 
    fetch("http://asaberglund.se/rest-projekt/projects.php?id="+ id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    //After request is done projects are reloded again. 
    .then(data =>{
        getProjects();
    })
    //If something goes wrong, an error message will be shown. 
    .catch(error =>{
        console.log('Felmeddelande:', error);
    })
}
//When the user in the admin page is filling in the form and klick the button "lägg till" this funciton will start
function addProjects(){
    //Creating variables with the values that is inputed in the form
    let projectName= projectNameInput.value;
    let projectDescription= projectDescriptionInput.value;
    let projectLink = projectLinkInput.value;
    //Adding the values into the object project
    let project = {'name': projectName, 'description': projectDescription, 'link':projectLink};
    //Fetching dtaa to courses api with the request post. 
    fetch("http://asaberglund.se/rest-projekt/projects.php",{
        method: 'POST',
        body: JSON.stringify(project),
    })
    .then(response => response.json())
    //After request is done courses are reloded again. 
    .then(data =>{
        getProjects();
    })
    //If something goes wrong, an error message will be shown. 
    .catch(error =>{
        console.log('Felmeddelande:', error);
    })
}

//when the button "uppdatera" is clicked, this function will start. 
function getProjectById(id) {
    updateProjectEL.innerHTML = '';
    //Fetching to API projects with an id and GET request. 
    fetch('http://asaberglund.se/rest-projekt/projects.php?id=' + id, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            //instead of showing the form to add project, a new form will be shown that sais update project and with the data of the course that should be updated. 
            data.forEach(project => {
                projectsEl.innerHTML=
                    "<h2> Uppdatera Kurs </h2>" +
                    "<form> <label for='namn'>Namn</label> <br><br>" +
                    "<input class='text-field' type='text' name='ProjectName'id='ProjectName' value='" + project.name + "'><br><br>" +
                    "<label for='namn'>Länk</label> <br><br>" +
                    "<input class='text-field' type='text' name='ProjectLink' id='ProjectLink' value='" + project.link + "'> <br><br>" +
                    "<label for='namn'>Beskrivning av projekt</label> <br><br>" +
                    "<input class='text-field' type='text' name='ProjectDescription' id='ProjectDescription' value = '" + project.description+ "'> <br><br>" +
                    " <input class='button1' type='submit' value='Uppdatera kurs' id='submit' onClick='updateProject(" + project.id + ")'>";
            })
        })
}
//when the button "uppdatera" is clicked, this funciton will start. 
function updateProject(id) {
    //Declaring variables again to get the value from the new data filled into the form
    const projectNameInput = document.getElementById("ProjectName");
    const projectDescriptionInput = document.getElementById("ProjectDescription");
    const projectLinkInput = document.getElementById("ProjectLink");

    const name = projectNameInput.value;
    const description = projectDescriptionInput.value;
    const link = projectLinkInput.value;
    //Adding dtaa into the object project. 
    const project = {'name': name, 'description': description, 'link':link};
    //Doing a fetch call to the api projects with the method put and an id sent. 
    fetch('http://asaberglund.se/rest-projekt/projects.php?id=' + id, {
        method: 'PUT',
        body: JSON.stringify(project)
    })
        .then(response => response.json())
        //After method is sent the function getCourses will start again. 
        .then(project => {
            getProjects();
        })
        //If something goes wrong, an error message will be shown. 
        .catch(error => {
            console.log('Felmeddelande:', error);
        })

}