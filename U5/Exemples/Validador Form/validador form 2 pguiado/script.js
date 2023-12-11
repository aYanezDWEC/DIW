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
    // const label = formcontrol.querySelector('label');//capturem l'etiqueta de l'etiqueta
    const small = formcontrol.querySelector('small');
    small.innerText = missatge;
}

function mostraCorrecte(input){
    const formcontrol = input.parentElement;
    formcontrol.className = 'form-control correcto';
}

function prenNomInput(input){

    return input.id.charAt(0).toUpperCase() + input.id.slice(1);

} 

function esEmailValid(email){
    const re=  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (re.test(String(input.value.trim()))){
            
            mostraCorrecte();

    }else {

        let missatge = `${prenNomInput(input)} no te el format correcte`;
        mostraError(input, missatge);


    };
}


function esObligatori(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim() === ''){

            let missatge = `${prenNomInput(input)} és obligatori`;
            
            mostraError(input, missatge);
            
            prenNomInput(input);
        }

        else{

            mostraCorrecte(input);
        }
    });
}



function comprovaLongitud(input, min, max){

    if(input.value.lenght < min){

        let missatge = `${prenNomInput(input)} tiene que tener mínimo ${min} caràcters`;
        mostraError(input, missatge);

    }else if (input.value.lenght > max){
        
        let missatge = `${prenNomInput(input)} tiene que tener máximo ${max} caràcters`;
        mostraError(input, missatge);


    }


}

function comprovaContrasenyesSonIguals(input1, input2){

    if(password != password2){

        let missatge =`${prenNomInput(input1)} han de ser igual que ${prenNomInput(input2)}`;

        mostraError(input2, missatge);


    }else{

        mostraCorrecte(input1, input2);

    }






    
}
//Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();//evita que realice el evento que tenga por defecto
    
    /*esObligatori(nomusuari);
    esObligatori(email);
    esObligatori(password);
    esObligatori(password2);*/
    
    //millor opcio fer un bucle emprem la funció creada abans


    esObligatori([nomusuari,email,password,password2]);



    
    
    
    comprovaLongitud(nomusuari, 3, 25);
    
    comprovaLongitud(password, 6, 26);

    esEmailValid(email);

    comprovaContrasenyesSonIguals(password, password2);



});