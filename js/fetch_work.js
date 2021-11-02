//Get elements from html and creates variables
let workExperienceEl = document.getElementById("workExperienceAdmin");
let updateWorkEl = document.getElementById("updateWork");
let addWorkBtn = document.getElementById("addWorkBtn");
let WorkNameInput = document.getElementById("WorkName");
let WorkTextInput = document.getElementById("WorkText");
let WorkDescriptionInput = document.getElementById("WorkDescription");
let WorkDateInput = document.getElementById("WorkDate");


//Adding eventlisteners which will start different funcions on events. 
window.addEventListener('load', getWorkExperience);
addWorkBtn.addEventListener('click', addWorkExperience);


//Function that gets data witgh work-experience from the rest-api.
function getWorkExperience(){
    //Everytime the window reloads, the element will get empty.
    workExperienceEl.innerHTML ='';
    //Fetching data from rest-api workplaces
    fetch('http://localhost/rest-projekt/workplaces.php')
    .then(response => response.json())
    .then(data =>{
        //printing out fetched data to the html element stored in the object work. 
        data.forEach(work => {
            console.log(work);
            workExperienceEl.innerHTML += 
            "<div class='item'><p>"+
            "<b>Namn: </b>" + work.name + "<br>" +
            "<b>Datum: </b>" + work.date + "<br>" +
            "<b>Beskrivning/titel av jobb: </b>" + work.description + "<br>" +
            "<b>Beskrivning-text: </b>" + work.text + "<br>" +
            "<b>Id: </b>" + work.id + "<br>" +
            "</p> <button class='button2' id='" + work.id + "' onClick='getWorkById(" + work.id + ")'> Uppdatera </button>" +
            " <button class='button2' id='"+ work.id +"' onClick='deleteWorkExperience("+ work.id +")'> Radera </button></div> ";
        })
    })
}
//when delete button is clicked this funciton starts. 
function deleteWorkExperience(id){
    //Fetching the rest-api with delete request. 
    fetch("http://localhost/rest-projekt/workplaces.php?id="+ id, {
        method: 'DELETE',
    })
    .then(response => response.json())
    //After request is done workExperience are reloded again. 
    .then(data =>{
        getWorkExperience();
    })
    //If something goes wrong, an error message will be shown. 
    .catch(error =>{
        console.log('Felmeddelande:', error);
    })
}
//When the user in the admin page is filling in the form and klick the button "lägg till" this funciton will start
function addWorkExperience(){
    let WorkName= WorkNameInput.value;
    let WorkDate= WorkDateInput.value;
    let WorkTextDescription = WorkTextInput.value;
    let WorkDescrition= WorkDescriptionInput.value;
    //Adding the values into the object work
    let work = {'name': WorkName,'date': WorkDate, 'description': WorkDescrition, 'text':WorkTextDescription};
    //Fetching dtaa to workplaces api with the request post. 
    fetch("http://localhost/rest-projekt/workplaces.php",{
        method: 'POST',
        body: JSON.stringify(work),
    })
    .then(response => response.json())
    //After request is done workExperience are reloded again. 
    .then(data =>{
        getWorkExperience();
    })
    //If something goes wrong, an error message will be shown. 
    .catch(error =>{
        console.log('Felmeddelande:', error);
    })
}
//when the button "uppdatera" is clicked, this function will start. 
function getWorkById(id) {
    updateWorkEl.innerHTML = '';
    //Fetching to API workplaces with an id and GET request. 
    fetch('http://localhost/rest-projekt/workplaces.php?id=' + id, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(work => {
            //instead of showing the form to add work, a new form will be shown that sais update work and with the data of the work that should be updated. 
                updateWorkEl.innerHTML=
                    "<h2> Uppdatera Kurs </h2>" +
                    "<form> <label for='Namn'>Namn</label> <br>" +
                    "<input class='text-field' type='text' name='WorkName'id='WorkName' value='" + work.name + "'><br>" +
                    "<label for='namn'>Datum</label> <br>" +
                    "<input class='text-field' type='text' name='WorkDate' id='WorkDate' value='" + work.date + "'> <br>" +
                    "<label for='namn'>Beskrivning/titel av jobb</label> <br>" +
                    "<input class='text-field' type='text' name='WorkDescription' id='WorkDescription' value = '" + work.description+ "'> <br>" +
                    "<label for='namn'>Beskrivande-text</label> <br>" +
                    "<input class='text-field' type='text' name='WorkText' id='WorkText' value = '" + work.text+ "'> <br>" +
                    " <input class='button1' type='submit' value='Uppdatera' id='submit' onClick='updateWork(" + work.id + ")'>";
            })
        })
}
//when the button "uppdatera" is clicked, this funciton will start. 
function updateWork(id) {
    //Declaring variables again to get the value from the new data filled into the form
    const WorkNameInput = document.getElementById("WorkName");
    const WorkTextInput = document.getElementById("WorkText");
    const WorkDescriptionInput = document.getElementById("WorkDescription");
    const WorkDateInput = document.getElementById("WorkDate");

    const name = WorkNameInput.value;
    const text = WorkTextInput.value;
    const description = WorkDescriptionInput.value;
    const date = WorkDateInput.value;
    //Adding dtaa into the object data. 
    const work = {'name': name, 'description': description, 'text':text, 'date':date,};
    //Doing a fetch call to the api courses with the method put and an id sent. 
    fetch('http://localhost/rest-projekt/workplaces.php?id=' + id, {
        method: 'PUT',
        body: JSON.stringify(work),
    })
        .then(response => response.json())
        //After method is sent the function getWorkExperience will start again. 
        .then(work => {
            getWorkExperience();
        })
        .catch(error => {
            console.log('Felmeddelande:', error);
        })

}