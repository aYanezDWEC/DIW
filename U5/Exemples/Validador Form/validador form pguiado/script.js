//declarem variables
const form = document.getElementById('form');
const nomusuari = document.getElementById('nomusuari');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Funcions
function mostraError(input, missatge){
    const formcontrol = input.parentElement;
    //console.log(formcontrol);
    formcontrol.className = 'form-control error';//li canvienm el'class' 
    const label = formcontrol.querySelector('label');//capturem l'etiqueta de l'etiqueta
    const small = formcontrol.querySelector('small');
    small.innerText = label.innerText + ' ' + missatge;
}

function mostraCorrecte(input){
    const formcontrol = input.parentElement;
    formcontrol.className = 'form-control correcto';
}

function esEmailValid(email){
    const re=  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());//això ens retorna o true o false
}

//Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();//evita que realice el evento que tenga por defecto
    
    /*if(nomusuari.value === ''){//açó és horrorós per en joan
        alert('El nom d\'usuari és obligatori')
    }*/

    //açó li agrada més en joan
    if(nomusuari.value === ''){
        mostraError( nomusuari, 'és obligatori');
    } else {
        mostraCorrecte(nomusuari);
    }
    
    if(email.value === ''){
        mostraError( email, 'és obligatori');
    } else if(!esEmailValid(email.value)){
        mostraError( email, 'no és vàlid');
    } else {
        mostraCorrecte(email);
    }
    
    if(password.value === ''){
        mostraError( password, 'és obligatori');
    } else {
        mostraCorrecte(passwor);
    }

    if(password2.value === ''){
        mostraError( password2, 'és obligatori');
    } else {
        mostraCorrecte(passwor2);
    }
});