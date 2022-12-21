"use strict";

let xhr = new XMLHttpRequest(); // Instanciation de l'objet XMLHttpRequest qui permet de faire des req ajax (async)

//GET : permet de récupérer des données
// POST : permet d'envoyer des données

xhr.open('GET', 'info.txt', true);// ouverture de la req en GET vers le fichier ou URL

xhr.responseType = 'text'; // On définit le type de réponse attendue (json, text, document, etc...)

/* 
AU changement d'état on définit la fonction qui sera appelée

Les principaux states :
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready


Les principaux server status : 
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    500: "server error"

*/

xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200)
    { // si la requête est terminée (4) et que le status est 200
        console.log(this.response);
        let demo = document.getElementById('demo');
        demo.innerHTML = this.response;
    }
    else if(this.readyState == 4 && this.status == 404)
    {
        console.log('error');
    }
}

xhr.send(); // envoi de la requête

