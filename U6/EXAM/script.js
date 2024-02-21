//Variables per comprovar si és un email valid i un nom vàlid
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var capitalPattern = /^[A-Z]/;

//Variables per emprar a l'hora de crear el selct element
var nameSelectItem;
var emailSelectItem;

//Comprovem si el emial és vàlid
$.fn.isEmailValid = function() {
    $(this).on('input', function() { 
        var email = $(this).val(); 

        //Comprovem que si el email és vàlid
        if(emailPattern.test(email)) { 
            // Si és vàlid borrem el contingut que hi hagi
            $('#email_error').html('');
            //Ens guardem el email
            emailSelectItem = email;
        } else {
            // Si no és vàlid mostrem el missatge d'error
            $('#email_error').html('Ivalid email format');
        }
    });
    return this;
}


//Comprovem la primera lletra del nom està en mayuscules
$.fn.isCapitalLetterValid = function() {
    //console.log('entra');
    $(this).on('input', function() { 
        var name = $(this).val();
        //Comprovem si la primera lletra és una mayuscula o no
        if(capitalPattern.test(name)) { 
            // Si es mayus
            $('#name_error').html('');
             //Ens guardem el nom
             nameSelectItem = nom;
        } else {
            // Si no es mayus
            $('#name_error').html('Name must start with a capital letter');
        }
    });
    


    $(document).ready(function(){
        $('#email').isEmailValid();
        $('#name').isCapitalLetterValid();
    });
    
    //Quan pitjem el botó d'enviar volem que paregui un desplegable amb el nom i el correu
    $("#submit").on("click", function() {
        console.log(nameSelectItem);
        $('#select').html('<select name="" id=""></select>');
    
        
    })

    return this;
}

