function loadUser()
{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    xhr.responseType = 'json';

    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200)
        {
            console.log(this.response);
            // let name = this.response[0].name;
            // let username = this.response[0].username;
            // let email = this.response[0].email;
            // let adress = this.response[0].address.street +' '+ this.response[0].address.suite +' '+ this.response[0].address.city;
            // let zip = this.response[0].address.zipcode;
            // let phone = this.response[0].phone;
            // let website = this.response[0].website;

            let data = this.response;
            let info = document.getElementById('info')

            for(let i = 0; i < data.length; i++)
            {
                info.innerHTML += data[i].name + ' <br> ' + data[i].username + ' <br>' + data[i].email + ' <br>' + data[i].address.street + ' <br>' + data[i].address.zipcode + ' <br>' + data[i].phone + ' <br>' + data[i].website+ ' <br>' + data[i].company.name +'<br><br>';
            }

        }
        else if(this.readyState === 4 && this.status === 404)
        {
            console.log('error');
        }
    }

    xhr.send();
}

window.onload=function(){
    loadUser();
}

