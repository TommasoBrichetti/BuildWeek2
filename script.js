var url = 'http://localhost:3000/users';
var users = [];
var userArea = document.getElementById('userArea');
var modifica = document.getElementById('modifica');
let Modal = document.querySelector('.Modal');
var contenutoIniziale = 0;
var contenutoFinale = 0;
var elementiPagina = 4;

var contenutoInizialeS = 0;
var contenutoFinaleS = 0;
var elementiPaginaS = 3;

var previousButton = document.getElementById('previousButton');
var nextButton = document.getElementById('nextButton');
var previousButtonS = document.getElementById('srcBtnP');
var nextButtonS = document.getElementById('srcBtnN');

nextButton.addEventListener('click', function () {

    if (contenutoIniziale + elementiPagina < users.length) {
        userArea.innerHTML = '';
        contenutoIniziale = contenutoIniziale + elementiPagina;
        contenutoFinale = contenutoFinale + elementiPagina;
        getUsers();
    }

})
previousButton.addEventListener('click', function () {
    if (contenutoIniziale != 0) {
        userArea.innerHTML = '';
        contenutoIniziale = contenutoIniziale - elementiPagina;
        contenutoFinale = contenutoFinale - elementiPagina;
        getUsers();
    } else {
        console.log('sei già in prima pagina');
    }
})

//!!!!!!!!!!!!!!!!!!_____________________!!!!!!!!!!!!!!

nextButtonS.addEventListener('click', function () {
    if (contenutoInizialeS + elementiPaginaS < sI) {
        userArea.innerHTML = '';
        contenutoInizialeS = contenutoInizialeS + elementiPaginaS;
        contenutoFinaleS = contenutoFinaleS + elementiPaginaS;
        ciao();
    }
    else { console.log('stop'); }
})
previousButtonS.addEventListener('click', function () {
    if (contenutoInizialeS != 0) {
        userArea.innerHTML = '';
        contenutoInizialeS = contenutoInizialeS - elementiPaginaS;
        contenutoFinaleS = contenutoFinaleS - elementiPaginaS;
        console.log(contenutoInizialeS);
        ciao();
    } else {
        console.log('sei già in prima pagina della ricerca');
    }
})

//?modal selector
var modal = document.querySelector('.modal');


async function getUsers() {

    await fetch(url).then(res => res.json()).then((res) => {
        users = res;
    })

    impagina();
}
function impagina(){
    users.forEach((e, i) => {

        if (i >= contenutoIniziale && i < contenutoFinale + elementiPagina) {
            stampa();
        }

        function stampa(){
            let UserCard = document.createElement("div");
                    userArea.appendChild(UserCard);
                    var userText = document.createElement('div');
        
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
                        modifica.classList.add('hidden')
                        info.innerHTML = '<h2>' + e.name + '</h2>' +
                            '<p>' + e.phone + '</p>' +
                            '<h4> Address: </h4>' + '<p>' + e.address.street + '</p>'
                            + '<p>' + e.address.city + '</p>' + '<p>' + e.address.suite + '</p>'
                    }
                    );
        
                    //*modifica
                    modificaBt.addEventListener('click', function () {
                        info.classList.add('hidden')
                        modifica.classList.remove('hidden')
        
                        var ename = document.getElementById('ename')
                        var eusername = document.getElementById('eusername')
                        var email = document.getElementById('email')
                        var estreet = document.getElementById('estreet')
                        var esuite = document.getElementById('esuite')
                        var ecity = document.getElementById('ecity')
                        var ephone = document.getElementById('ephone')
                        var ewebsite = document.getElementById('ewebsite')
        
        
                        ename.value = e.name
                        eusername.value = e.username
                        email.value = e.email
                        estreet.value = e.address.street
                        esuite.value = e.address.suite
                        ecity.value = e.address.city
                        ephone.value = e.phone
                        ewebsite.value = e.website
        
        
                        var modBt = document.getElementById('modBt')
        
                        modBt.addEventListener('click', function (er) {
                            er.stopImmediatePropagation();
                            let modObj = {
                                name: ename.value,
                                username: eusername.value,
                                email: email.value,
                                address: {
                                    street: estreet.value,
                                    suite: esuite.value,
                                    city: ecity.value
                                },
                                phone: ephone.value,
                                website: ewebsite.value
                            };
        
                            let putOption = {
                                method: "PUT",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(modObj)
                            }
                            fetch("http://localhost:3000/users/" + e.id, putOption).then(() => {
                                // users[i]= modObj; t1
                                // users.splice(i,1) t1
                                // users.splice(i,1, modObj) tentativo 2
                                // rimane nel dom...
                                // consol.log(i, users)
                                Modal.classList.remove('hidden');
                            })
                            Modal.classList.remove('hidden');
                        }   
                        )
        
                    });
        
                    //*delete
                    let deleteOptions = {
                        method: "DELETE"
                    };
                    deleteBt.addEventListener('click', function () {
                        modal.classList.remove('hidden');
        
                        var accept = document.getElementById('accetta');
                        accept.addEventListener('click', function () {
                            fetch("http://localhost:3000/users/" + e.id, deleteOptions).then(() => { location.reload() })
                            modal.classList.add('hidden');
                        })
                        var quit = document.getElementById('annulla');
                        quit.addEventListener('click', function () {
                            modal.classList.add('hidden');
                        })
        
                    });
        }
    })
}

getUsers();



//!header
//!addusers
var addIcon = document.getElementById('addIcon');
var searchIcon = document.getElementById('searchIcon');
var searchUsers = document.getElementById('searchUser')
var addUser = document.getElementById('addUser')
addIcon.addEventListener('click', function () {
    searchUsers.classList.add('hidden');
    addUser.classList.toggle('hidden');

})
//!search
searchIcon.addEventListener('click', function () {
    addUser.classList.add('hidden');
    searchUsers.classList.toggle('hidden');

})
var searchInput = document.getElementById('searchInput');
var searchBt = document.getElementById('searchBt');
searchBt.addEventListener('click', function () {
    userArea.innerHTML = '';
    searchInput.value = '';
    getUsers();
    //ripristina i pulsanti
    previousButton.classList.remove('hidden')
    nextButton.classList.remove('hidden')
    previousButtonS.classList.add('hidden')
    nextButtonS.classList.add('hidden')
    contenutoInizialeS = 0;
    contenutoFinaleS = 0;
    contenutoIniziale = 0;
    contenutoFinale = 0;
    searchUsers.classList.add('hidden');

})
//!!!!!!!!!!!!!!!!!!!!!!!search function!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var j = 0;
var sI = 0;
searchInput.addEventListener('keyup', ciao)


async function ciao() {

    //imposta i nuovi pulsanti di navigazione
    previousButton.classList.add('hidden')
    nextButton.classList.add('hidden')
    previousButtonS.classList.remove('hidden')
    nextButtonS.classList.remove('hidden')

    userArea.innerHTML = '';
    await fetch(url).then(res => res.json()).then((res) => {
        users = res;
    })

    users.forEach((e, i) => {



        if (e.username.includes(searchInput.value) || e.username.includes(searchInput.value.toUpperCase())) {

            if (searchInput.value == '') {
                contenutoInizialeS = 0;
                contenutoFinaleS = 0;
            }

            if (j >= contenutoInizialeS && j < contenutoFinaleS + elementiPaginaS) {
                var UserCard = document.createElement("div");
                userArea.appendChild(UserCard);
                var userText = document.createElement('div');
    
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
                    modifica.classList.add('hidden')
                    info.innerHTML = '<h2>' + e.name + '</h2>' +
                        '<p>' + e.phone + '</p>' +
                        '<h4> Address: </h4>' + '<p>' + e.address.street + '</p>'
                        + '<p>' + e.address.city + '</p>' + '<p>' + e.address.suite + '</p>'
                }
                );
    
                //*modifica
                modificaBt.addEventListener('click', function () {
                    info.classList.add('hidden')
                    modifica.classList.remove('hidden')
    
                    var ename = document.getElementById('ename')
                    var eusername = document.getElementById('eusername')
                    var email = document.getElementById('email')
                    var estreet = document.getElementById('estreet')
                    var esuite = document.getElementById('esuite')
                    var ecity = document.getElementById('ecity')
                    var ephone = document.getElementById('ephone')
                    var ewebsite = document.getElementById('ewebsite')
    
    
                    ename.value = e.name
                    eusername.value = e.username
                    email.value = e.email
                    estreet.value = e.address.street
                    esuite.value = e.address.suite
                    ecity.value = e.address.city
                    ephone.value = e.phone
                    ewebsite.value = e.website
    
    
                    var modBt = document.getElementById('modBt')
    
                    modBt.addEventListener('click', function (er) {
                        er.stopImmediatePropagation();
                        let modObj = {
                            name: ename.value,
                            username: eusername.value,
                            email: email.value,
                            address: {
                                street: estreet.value,
                                suite: esuite.value,
                                city: ecity.value
                            },
                            phone: ephone.value,
                            website: ewebsite.value
                        };
                        console.log(modObj.username, e.id);
    
                        let putOption = {
                            method: "PUT",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(modObj)
                        }
                        fetch("http://localhost:3000/users/" + e.id, putOption).then((res) => {
                            // users[i]= res;
                            Modal.classList.remove('hidden');
                        })
                        Modal.classList.remove('hidden');
                        console.log('non scpperai giangiorgino');
                    }   
                    )
    
                });
    
                //*delete
                let deleteOptions = {
                    method: "DELETE"
                };
                deleteBt.addEventListener('click', function () {
                    modal.classList.remove('hidden');
    
                    var accept = document.getElementById('accetta');
                    accept.addEventListener('click', function () {
                        fetch("http://localhost:3000/users/" + e.id, deleteOptions).then(() => { location.reload() })
                        modal.classList.add('hidden');
                    })
                    var quit = document.getElementById('annulla');
                    quit.addEventListener('click', function () {
                        modal.classList.add('hidden');
                    })
    
                });
            }
            j++;
        }
    })
    sI = j;
    j = 0
}



//! addusers function
let form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addUsers();
})


function addUsers(id) {
    let objnew = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('name').value,
        address: {
            street: document.getElementById('street').value,
            suite: document.getElementById('suite').value,
            city: document.getElementById('city').value,
        },
        phone: document.getElementById('phone').value,
        website: document.getElementById('website').value
    };
    console.log(objnew);
    let postOption = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objnew)
    }
    fetch("http://localhost:3000/users", postOption).then(res => console.log(res))
}

var AccettaM = document.getElementById('AccettaM');
AccettaM.addEventListener('click', function () { Modal.classList.add('hidden');
location.reload(); 
// impagina();
})


/* con senno di poi era meglio usare una classe con i metodi di impaginazione e rendeva il lavoro più modulare e semplificato*/