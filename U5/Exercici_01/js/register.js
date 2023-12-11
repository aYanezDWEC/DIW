const button_send_data = document.getElementById("sendData");
var avatarPath;
var dataOk = 0; //Inicialitcem aquesta variable en 0 per poder fer el control d'errors




function addUser(db){

  SearchAvatarPath();

  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var prefix = document.getElementById("prefix");
  var tel = document.getElementById("tel");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var administrator = document.getElementById("administrator");
  var administratorValue = administrator.checked ? "true" : "false"; //amb aquesta variable el que aconseguim es guardar true o false per saber si és administrador
  var isLogged;
  //console.log(avatarPath); 

  //Abans de enviar la info a la BD comprovem que la informació que ha possat l'usuari és correcte
  var nameErrorSpan = document.getElementById("name-error");
  var surnameErrorSpan = document.getElementById("surname-error");
  var telErrorSpan = document.getElementById("tel-error");
  var emailErrorSpan = document.getElementById("email-error");
  var passwordErrorSpan = document.getElementById("password-error");
  var password2ErrorSpan = document.getElementById("password2-error");



  //Comprovem que el nom no es emty
  if(name.value === ''){
    nameErrorSpan.textContent = "The name is obligatory.";
  } else{
    nameErrorSpan.textContent = "";
    dataOk = dataOk + 1; //Primera "capa de seguretat" passada sumem 1, dataOk -> 1;
  }

  //Comprovem que el llinatge no es emty
  if(surname.value === ''){
   surnameErrorSpan.textContent = "The surname is obligatory.";
  } else{
    surnameErrorSpan.textContent = "";
    dataOk = dataOk + 1; //Segona "capa de seguretat" passada sumem 1, dataOk -> 2;
  }
  
  //Comprovem que el telèfon no es emty i siguin nombres
  if(tel.value === ''){
    telErrorSpan.textContent = "The telephone number is obligatory.";
  } else if (!isTelValid(tel.value)){
    telErrorSpan.textContent = "You can only enter numbers";
  } else{
    telErrorSpan.textContent = "";
    dataOk = dataOk + 1; //tercera "capa de seguretat" passada sumem 1, dataOk -> 3;
  }

  //Comprovem el email
  if(email.value === ''){
    emailErrorSpan.textContent = "The email is obligatory. ";
  } else if(!isEmailValid(email.value)){
    emailErrorSpan.textContent = "The email addres you have isn't valid. ";
  } else {
    emailErrorSpan.textContent = "";
    dataOk = dataOk + 1; //Quarta "capa de seguretat" passada sumem 1, dataOk -> 4;
  }

  //Comporvem la contrassenya
  if(password.value === ''){
    passwordErrorSpan.textContent = "The password is obligatory. ";
  } else if(!isPasswordValid(password.value)){
    passwordErrorSpan.textContent = "The password must have at least 8 characters, one lowercase, one uppercase, one number, one special character, no spaces and a maximum of 15 characters. ";
  } else {
    passwordErrorSpan.textContent = "";
    dataOk = dataOk + 1; //Cinquena "capa de seguretat" passada sumem 1, dataOk -> 5;
  }

  //Comprovem que sigui la mateixa contrassenya
  if(password2.value === ''){
    password2ErrorSpan.textContent = "Repeat the password is obligatory.";
  } else if(password2.value != password.value){
    password2ErrorSpan.textContent = "Passwords do not match";
  } else {
    password2ErrorSpan.textContent = "";
    dataOk = dataOk + 1; //Sisena "capa de seguretat" passada sumem 1, dataOk -> 6;
    //console.log('dataOk -> ' + dataOk);
  }

  //Controlem que no enviï les dades a la BD
  if(dataOk<6){
    //Dades incorrectes
    //alert('DADES INCORRECTES');
  } else if (dataOk >= 6){


    //Dades correctes
    var obj = { name: name.value,
                surname: surname.value,
                prefix: prefix.value,
                tel: tel.value,
                email: email.value,
                administrator: administratorValue,
                avatar: avatarPath,
                password: password.value, 
                isLogged: true
            };

    // Start a new transaction in readwrite mode. We can use readonly also
    var tx = db.transaction(DB_STORE_NAME, "readwrite");  
    var store = tx.objectStore(DB_STORE_NAME);

    try {
    // Inserts data in our ObjectStore
    req = store.add(obj);
    } catch (e) {
    console.log("Catch");
    }

    req.onsuccess = function (e) {
    console.log("addUser: Data insertion successfully done. Id: " + e.target.result);

    // Operations we want to do after inserting data
    readData();
    clearFormInputs();
    };

    req.onerror = function(e) {
    console.error("addUser: error creating data", this.error);   
    };

    //After transaction is completed we close de database
    tx.oncomplete = function() {
    console.log("addUser: transaction completed");
    db.close();
    opened = false;

    //Una vegada acabat anar comprvem si el usuari es administrador o no, i l'enviam a la pàgina corresponent
    if(administratorValue === "true"){
      window.location.href = 'indexadmin.html';
    } else {
      window.location.href = 'index.html';
    }
    };

    //Possem a 0 el dataOk
    dataOk = 0; 
  }
}


function clearFormInputs(){
  document.getElementById("hiddenId").value = 0;
  document.getElementById("name").value = "";
  document.getElementById("surname").value = "";
  document.getElementById("prefix").value = "";
  document.getElementById("tel").value = "";
  document.getElementById("email").value = "";
  document.getElementById("avatar").value = "";
  document.getElementById("password").value = "";
  document.getElementById("password2").value = "";
  document.getElementById("administrator").checked = false;
  document.getElementById("sendData").innerHTML = ADD_USER;
  // document.getElementById("h1Title").innerHTML = NEW_USER;
}


// Amb aquesta funció aconseguim guardar la ruta de la imatge de l'usuari segons el que ha triat 
function SearchAvatarPath() {
  var avatars = document.getElementsByName('avatar');
  
  for (let i=0; i < avatars.length; i++) {
      // Si el botó d'opció està seleccionar
      if (avatars[i].checked) {
          // Possem la ruta del nostre lloc
          avatarPath = 'img/avatar' + (i + 1) + '.png';
      }
  }
  //console.log("La ruta del avatar es: " + avatarPath);
}


//Comprobem que el telèfon és vàlid o no 
function isTelValid(tel){
  const re=/^\d+$/;
  return re.test(tel);//això ens retorna o true o false
}

//Comprobem que el email és valid o no
function isEmailValid(email){
  const re=  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//Comprovem que la contrassenya sigui segura (Entre 8 i 15 caràcteres, una majuscula i una minúscula, almenys un nombre, sense espais en blanc o un caràcter especial.)
function isPasswordValid(password){
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
  return re.test(password);//això ens retorna o true o false
}


button_send_data.addEventListener('click', (e) => {
  sendData();
});