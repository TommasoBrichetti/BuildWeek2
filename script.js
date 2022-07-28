var url = 'http://localhost:3000/users';
var users = [];
var userArea = document.getElementById('userArea');

//todo fetch get-> nel for each: aggiungo i dati alla tabella, aggiungo i bottoni e gli event listener che lanceranno le funzioni.
//todo funzioni -> funzione print nel dive more info, funzione modifica, funzione elimina.
//todo funzione info -> on click la funzione dovrà popolare un div specifico.
//todo funzione modifica -> dovrà abilitare e rendere visibile un form e delineare la funzione fetch put.
//todo funzione elimina -> dovrà delineare la funzione fetch delete.
//! le funzioni delete e modifica dovranno essere comprese di modale...

//* le funzioni saranno esterne al foreach e solamente richimate nei vari event listener.

async function getUsers() {

    await fetch(url).then(res => res.json()).then((res) => {
        users = res;
    })

    users.forEach((e) => {

        var UserCard = document.createElement("div");
        userArea.appendChild(UserCard);
        var userText = document.createElement('div');
        // UserCard.classList.add('hidden') //!classe hidden

        var username = document.createElement("p");
        username.innerHTML = e.username;
        userText.appendChild(username);

        var email = document.createElement("p");
        email.innerHTML = e.email;
        userText.append(email);

        UserCard.appendChild(userText);


        var infoBt = document.createElement('button');
        infoBt.innerHTML = 'Info';
        var modificaBt = document.createElement('button');
        modificaBt.innerHTML = 'Modifica';
        var deleteBt = document.createElement('button');
        deleteBt.innerHTML = 'Elimina';
        var buttonArea = document.createElement('div');
        buttonArea.append(infoBt, modificaBt, deleteBt);
        buttonArea.classList.add('buttonClass')
        UserCard.append(buttonArea);


        //!event LIstener ->

        //*inffo
        infoBt.addEventListener('click', function () {
            var info = document.getElementById('info');
            info.classList.remove('hidden')
            info.innerHTML = '<h2>' + e.name + '</h2>' +
                '<p>' + e.phone + '</p>' +
                '<h4> Address: </h4>' + '<p>' + e.address.street + '</p>'
                + '<p>' + e.address.city + '</p>' + '<p>' + e.address.suite + '</p>'
        }
        );

        //*modifica
        // modificaBt.addEventListener();

        //*delete
        let deleteOptions = {
            method: "DELETE"
        };
        deleteBt.addEventListener('click', function(){
            fetch("http://localhost:3000/users/"+ e.id , deleteOptions)
        });

        //aggiungiamo gli elementi
        //pulsanti
        //event listener --> vuoto

        //info-> in un altro div (info) .innerHTML inoltre rimuoviamo la classe hidden!!! [toggle]
        //remove -> onclick --> delete
        //modifica -> onclick rendere visibile il form e ritornare l'id

    })

}
getUsers();


//form di modifica-> prendere l'url modificato ed effettuare la chiamata fetch put con il value degli input

// function deleteUsers(id) {fetch("http://localhost:3000/users/"+id, deleteOptions)


//!header
//!addusers
var addIcon = document.getElementById('addIcon');
var searchIcon = document.getElementById('searchIcon');
var searchUsers = document.getElementById('searchUser')
var addUser = document.getElementById('addUser')
addIcon.addEventListener('click', function(){
    searchUsers.classList.add('hidden');
    addUser.classList.toggle('hidden');

})
//!search
searchIcon.addEventListener('click', function(){
    addUser.classList.add('hidden');
    searchUsers.classList.toggle('hidden');

})



//! addusers function
let form = document.querySelector("form")

form.addEventListener("submit", (e)=>{
    e.preventDefault;
    addUsers();
})


function addUsers(id) {
    let objnew = { name: document.getElementById('name').value, username: document.getElementById('username').value, email: document.getElementById('name').value, street: document.getElementById('street').value, suite: document.getElementById('suite').value, city: document.getElementById('city').value, phone: document.getElementById('phone').value, website: document.getElementById('website').value,};
    console.log(objnew);
    let postOption = {
        method: "POST",
            headers: {
            'Accept': 'Application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objnew)
    }
    fetch("http://localhost:3000/users", postOption)}