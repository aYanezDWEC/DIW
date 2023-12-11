var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "AlexUsersDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;
var opened = false;
const EDIT_USER = "Edit user";
const NEW_USER = "New user";
const ADD_USER = "Add user";
const button_send_data = document.querySelector("sendData");
var avatarPath;

function openCreateDb(onDbCompleted) {

    if(opened){
      db.close();
      opened = false;
    }
  
    //We could open changing version ..open(database, 3)
    var req = indexedDB.open(database, DB_VERSION);
  
    //This is how we pass the DB instance to our var
    req.onsuccess = function (e) {
      db = this.result; // Or event.target.result
      console.log("openCreateDb: Databased opened " + db);                                           
      opened = true;
  
      //The function passed by parameter is called after creating/opening database
      onDbCompleted(db);
  
    };
    
    // Very important event fired when
    // 1. ObjectStore first time creation
    // 2. Version change
    req.onupgradeneeded = function() {
          
      //Value of previous db instance is lost. We get it back using the event
      db = req.result; //Or this.result
  
      console.log("openCreateDb: upgrade needed " + db);
      var store = db.createObjectStore(DB_STORE_NAME, { keyPath: "id", autoIncrement: true});
      console.log("openCreateDb: Object store created");
  
      store.createIndex('name', 'name', { unique: false });
      console.log("openCreateDb: Index created on name");
      store.createIndex('surname', 'surname', { unique: false });
      console.log("openCreateDb: Index created on surname");
      store.createIndex('prefix', 'prefix', { unique: false });
      console.log("openCreateDb: Index created on prefix");
      store.createIndex('tel', 'tel', { unique: false });
      console.log("openCreateDb: Index created on tel");
      store.createIndex('email', 'email', { unique: false });
      console.log("openCreateDb: Index created on email");
      store.createIndex('password', 'password', { unique: false });
      console.log("openCreateDb: Index created on administrator");
      store.createIndex('administrator', 'administrator', { unique: false });
      console.log("openCreateDb: Index created on password");
      store.createIndex('avatar', 'avatar', { unique: false });
      console.log("openCreateDb: Index created on avatar");
      store.createIndex('isloged', 'isloged', { unique: false });
      console.log("openCreateDb: Index created on isloged");
    };
  
    req.onerror = function (e) {
      console.error("openCreateDb: error opening or creating DB:", e.target.errorCode);
    };
}

function sendData(){
  openCreateDb(function(db){
    // var hiddenId = document.getElementById("hiddenId").value;
    // console.log(hiddenId);
    // if (hiddenId == 0){
      addUser(db);
    // } else {
    //   console.log("change user values");
    //   editUser(db);
    // }    
  });
}

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
    password2ErrorSpan.textContent = "Repeat the password is obligatory";
  } else if(password2.value != password.value){
    password2ErrorSpan.textContent = "Passwords do not match";
  } else {
    password2ErrorSpan.textContent = "";
    dataOk = dataOk + 1; //Sisena "capa de seguretat" passada sumem 1, dataOk -> 6;
    console.log('dataOk -> ' + dataOk);
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
      isLogged: true};

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

function readData(){
  openCreateDb(function(db){
    readUsers(db);
  });
}

// Reads all the records from our ObjectStore
function readUsers(db) {
  var tx = db.transaction(DB_STORE_NAME, "readonly"); 
  var store = tx.objectStore(DB_STORE_NAME);
  var usersContainer = document.innerHTML('users_list');

  // var result = [];
  var req = store.openCursor();
  
  req.onsuccess = function(e){
    console.log(e.target.result);
    var cursor = e.target.result;

    if (cursor) {
      // result.push(cursor.value);
      console.log(cursor.value);
      
usersContainer.innerHTML=cursor.value.name;
      
      cursor.continue();
    } else {
      console.log("EOF");
      // console.log(result);
      //Operations to do after reading all the records
      // addUsersToHTML(result);
    }  
  };

  req.onerror = function(e){
    console.error("readUsers: error reading data:", e.target.errorCode);
  };

  tx.oncomplete = function() {
    console.log("readUsers: tx completed");
    db.close();
    opened = false;
  };
}

// function addUsersToHTML(users){
//   var ul = document.getElementById("users-ul");

//   ul.innerHTML = "";

//   for (let i = 0; i < users.length; i++) {
//     ul.innerHTML += "<li><span>"+users[i].id+" "+users[i].name+" "+users[i].surname+" "+users[i].tel+"</span><button user_id="+users[i].id+" id=edit_"+users[i].id+">Edit user</button><button user_id="+users[i].id+" id=delete_"+users[i].id+">Delete user</button></li>";
//   }

//   for (let i = 0; i < users.length; i++) {
//     document.getElementById("edit_"+users[i].id).addEventListener("click", readUser, false);
//     document.getElementById("delete_"+users[i].id).addEventListener("click", deleteUser, false);
//   }
// }


//Sirve para
function readUser(e){
  console.log("readUser");
  
  //Both options work
  //var button_id = e.target.id;
  //var user_id = document.getElementById(button_id).getAttribute("user_id");
  var user_id = e.target.getAttribute("user_id");

  openCreateDb(function(db){
    console.log(db);
    console.log("Id user: " + user_id);

    var tx = db.transaction(DB_STORE_NAME, "readonly"); 
    var store = tx.objectStore(DB_STORE_NAME);

    // Reads one record from our ObjectStore
    var req = store.get(parseInt(user_id));
    
    req.onsuccess = function(e){
      var record = e.target.result;
      console.log(record);  
      
      //Operations to do after reading a user
      updateFormInputsToEdit(record);
    };

    req.onerror = function(e){
      console.error("readUser: error reading data:", e.target.errorCode);
    };

    tx.oncomplete = function() {
      console.log("readUser: tx completed");
      db.close();
      opened = false;
    };

  });
}

function deleteUser(e){
  console.log("deleteUser");
  var button_id = e.target.id;
  var user_id = document.getElementById(button_id).getAttribute("user_id");
  
  openCreateDb(function(db){
    console.log(user_id);
    var tx = db.transaction(DB_STORE_NAME, "readwrite"); 
    var store = tx.objectStore(DB_STORE_NAME);

    //Delete data in our ObjectStore
    var req = store.delete(parseInt(user_id));

    req.onsuccess = function(e){
      
      console.log("deleteUser: Data successfully removed: " + user_id);  

      //Operation to do after deleting a record
      readData();
    };

    req.onerror = function(e){
      console.error("deleteUser: error removing data:", e.target.errorCode);
    };

    tx.oncomplete = function() {
      console.log("deleteUser: tx completed");
      db.close();
      opened = false;
    };
  });
}

function editUser(db){
  var idUpdate = document.getElementById("hiddenId");
  var name = document.getElementById("name");
  var surname = document.getElementById("surname");
  var tel = document.getElementById("tel");
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  var obj = { id: parseInt(idUpdate.value), name: name.value, surname: surname.value, tel: tel.value, email: email.value, password: password.value };

  var tx = db.transaction(DB_STORE_NAME, "readwrite");   
  var store = tx.objectStore(DB_STORE_NAME);

  //Updates data in our ObjectStore
  req = store.put(obj);

  req.onsuccess = function (e) {
    console.log("Data successfully updated");
    
    //Operations to do after updating data
    readData();
    clearFormInputs();    
  };

  req.onerror = function(e) {
    console.error("editUser: Error updating data", this.error);   
  };

  tx.oncomplete = function() {
    console.log("editUser: tx completed");
    db.close();
    opened = false;
  };
}



function updateFormInputsToEdit (record){
  document.getElementById("hiddenId").value = record.id;
  document.getElementById("name").value = record.name;
  document.getElementById("surname").value = record.surname;
  document.getElementById("prefix").value = record.prefix;
  document.getElementById("tel").value = record.tel;
  document.getElementById("email").value = record.email;
  document.getElementById("avatar").value = record.avatar;
  document.getElementById("password").value = record.password;
  document.getElementById("administrator").value = record.administrator;
  document.getElementById("sendData").innerHTML = EDIT_USER;
  // document.getElementById("h1Title").innerHTML = EDIT_USER;
}



  window.addEventListener('load', (event) => {
    readData();

  
  });


 
  
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



// Update your existing window load event listener
window.addEventListener('load', (event) => {
  // Check the user's login status and display the user's information if logged in
  displayUserInfo();
  
  // Attach click event handler for the LOG-IN button
  document.getElementById("login-button").addEventListener("click", goToRegister);
  button_send_data.addEventListener('click', (e) => {
      sendData();
  });
});

// Function to check user login status and display user information
function displayUserInfo() {
  // Check if the user is logged in (you need to implement this function)
  const isLoggedIn = checkUserLoginStatus();

  // Get the user information from IndexedDB (you need to implement this function)
  const user = getUserInfoFromDB();

  // Get the container element where user information will be displayed
  const userInfoContainer = document.getElementById("user-info-container");

  // If the user is logged in, display the user's information
  if (isLoggedIn && user) {
      userInfoContainer.innerHTML = `<p>Welcome, ${user.name}!</p><img src="${user.avatar}" alt="User Avatar">`;
  } else {
      // If the user is not logged in, you can show a login button or any other content
      userInfoContainer.innerHTML = '<button type="button" onclick="goToRegister()">LOG-IN</button>';
  }
}