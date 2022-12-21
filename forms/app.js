function validateForm(){
    let signup = document.getElementById('signup');
    let form_data = new FormData(signup); // On récupère les données du formulaire dans un objet form_data qui permet de récupérer les données

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'validate.php', true);
    

    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200)
        {
            console.log(this.response);

            let result = JSON.parse(this.response); // On parse la réponse en JSON

            if(result.content == 1){
                alert('votre inscription a bien été pris en compte');
                signup.reset(); // On reset le formulaire
            }else{
                alert('une erreur est survenue' + result.error);
            }

        }
        else if(this.readyState === 4 && this.status === 404)
        {
            console.log('error');
        }
    }

    xhr.send(form_data);// on envoie les données du formulaire
}

signup.addEventListener('submit', function(e){
    e.preventDefault(); // On empêche le comportement par défaut du formulaire
    validateForm(); // On appelle la fonction qui va valider le formulaire
})