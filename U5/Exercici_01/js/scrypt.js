var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "AlexUsersDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db;
var opened = false;
const EDIT_USER = "Edit user";
const NEW_USER = "New user";
const ADD_USER = "Add user";


function openCreateDb(onDbCompleted) {
    if(opened){
      db.close();
      opened = false;
    }
  
    //We could open changing version ..oepen(database, 3)
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
      console.log("record->" + record);  
      
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

function readData(){
  openCreateDb(function(db){
    readUsers(db);
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

// Function to check user login status and display user information
// function displayUserInfo() {
//   // Check if the user is logged in (you need to implement this function)
//   const isLoggedIn = checkUserLoginStatus();

//   // Get the user information from IndexedDB (you need to implement this function)
//   const user = getUserInfoFromDB();

//   // Get the container element where user information will be displayed
//   const userInfoContainer = document.getElementById("user-info-container");

//   // If the user is logged in, display the user's information
//   if (isLoggedIn && user) {
//       userInfoContainer.innerHTML = `<p>Welcome, ${user.name}!</p><img src="${user.avatar}" alt="User Avatar">`;
//   } else {
//       // If the user is not logged in, you can show a login button or any other content
//       userInfoContainer.innerHTML = '<button type="button" onclick="goToRegister()">LOG-IN</button>';
//   }
// }


//Funció per cambiar el botó de log-in o log-out, aprofitem per possar el nom i el avatr de l'usuari ya que estamos 
function isLogButton() {
  var buttonLogIn = document.getElementById("log_in");
  var buttonLogOut = document.getElementById("log_out");
  var avatar_user = document.getElementById("user_avatar");
  var name_user = document.getElementById("user_name");

  openCreateDb(function(db) {
    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);

    var req = store.openCursor();
    req.onsuccess = function (e) {
      var cursor = e.target.result;
      
      if (cursor) {
        if (cursor.value.isLogged === true) {
          buttonLogOut.hidden = false;
          buttonLogOut.innerHTML = "LOGOUT";
avatar_user.innerHTML = '<img src="' + cursor.value.avatar + '" class="user-avatar">';
          name_user.innerHTML = cursor.value.name.toUpperCase();
          return;
        }

        cursor.continue();
      } else {
        //console.log('NO LOGIN');
        buttonLogIn.hidden = false;
        buttonLogIn.innerHTML = "LOGIN";
      }
    };

    req.onerror = function (e) {
      console.error("Error opening cursor:", e.target.errorCode);
    };

    tx.oncomplete = function () {
      db.close();
    };
  });
}


//Cambiem entre modo oscuoro i modo claro
document.getElementById('change_theme').addEventListener('click', changeTheme); //
//Cambiaem la classe del body per poder fer el cambí
function changeTheme() {
    //console.log('ENTRA');
    const body = document.body;
    body.classList.toggle('dark-mode');

    const td = document.td;
    td.classList.toggle('dark-mode-border');
}

// Update your existing window load event listener
window.addEventListener('load', (event) => {
  isLogButton();

  // Check the user's login status and display the user's information if logged in
  displayUserInfo();
  
  // Attach click event handler for the LOG-IN button
  document.getElementById("login-button").addEventListener("click", goToRegister);
  button_send_data.addEventListener('click', (e) => {
      sendData();
  });
});
