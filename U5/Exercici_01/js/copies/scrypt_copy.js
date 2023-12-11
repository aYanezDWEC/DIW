var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "AlexUsersDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;
var opened = false;
const EDIT_USER = "Edit user";
const NEW_USER = "New user";
const ADD_USER = "Add user";
const button_send_data = document.querySelector("#sendData");
var avatarPath;
var dataOk = 0; //Inicialitcem aquesta variable en 0 per poder fer el control d'errors

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



function readData(){
  openCreateDb(function(db){
    readUsers(db);
  });
}

// Reads all the records from our ObjectStore
function readUsers(db) {
  var tx = db.transaction(DB_STORE_NAME, "readonly"); 
  var store = tx.objectStore(DB_STORE_NAME);

  var result = [];
  var req = store.openCursor();
  
  req.onsuccess = function(e){
    var cursor = e.target.result;

    if (cursor) {
      result.push(cursor.value);
      console.log(cursor.value);
      cursor.continue();
    } else {
      console.log("EOF");
      console.log(result);
      //Operations to do after reading all the records
      addUsersToHTML(result);
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

function addUsersToHTML(users){
  var ul = document.getElementById("users-ul");

  ul.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    ul.innerHTML += "<li><span>"+users[i].id+" "+users[i].name+" "+users[i].surname+" "+users[i].tel+"</span><button user_id="+users[i].id+" id=edit_"+users[i].id+">Edit user</button><button user_id="+users[i].id+" id=delete_"+users[i].id+">Delete user</button></li>";
  }

  for (let i = 0; i < users.length; i++) {
    document.getElementById("edit_"+users[i].id).addEventListener("click", readUser, false);
    document.getElementById("delete_"+users[i].id).addEventListener("click", deleteUser, false);
  }
}

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
    // readData();
   button_send_data.addEventListener('click', (e) => {
    sendData();
   });
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