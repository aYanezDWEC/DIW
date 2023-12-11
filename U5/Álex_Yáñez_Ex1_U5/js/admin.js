var nameUser;

// Reads all the records from our ObjectStore
function readUsers(db) {
    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);
    var usersContainer = document.getElementById('users_list');

    var tableHTML = '<table border="1">';
    tableHTML += '<tr><th>ID</th><th>Name</th><th>Surnme</th><th>Prefix</th><th>Phone number</th><th>Email</th><th>Password</th><th>Edit</th><th>Delete</th></tr>';

    var req = store.openCursor();

    req.onsuccess = function (e) {
        var cursor = e.target.result;

        if (cursor) {
            tableHTML += '<tr>';
                tableHTML += '<td>' + cursor.value.id + '</td>';
                tableHTML += '<td>' + cursor.value.name + '</td>';
                tableHTML += '<td>' + cursor.value.surname + '</td>';
                tableHTML += '<td>' + cursor.value.prefix + '</td>';
                tableHTML += '<td>' + cursor.value.tel + '</td>';
                tableHTML += '<td>' + cursor.value.email + '</td>';
                tableHTML += '<td>' + cursor.value.password + '</td>';
                tableHTML += '<td>' + '<button id="edit_user_' + cursor.value.id + '"  onclick="editUser(' + cursor.value.id + ')"> EDIT </button> </td>'; //D'aquesta manera es poden passar dos paràmetres a la funció
                tableHTML += '<td>' + '<button id="delete_user_' + cursor.value.id + '"  onclick="deleteUser(' + cursor.value.id + ', \'' + cursor.value.name + '\')"> DELETE </button>' + '</td>'; //D'aquesta manera es poden passar dos paràmetres a la funció
            tableHTML += '</tr>';
            cursor.continue();
        } else {
            tableHTML += '</table>';
            addUsersToHTML(tableHTML);
        }
    };

    req.onerror = function (e) {
        console.error("readUsers: error reading data:", e.target.errorCode);
    };

    tx.oncomplete = function () {
        console.log("readUsers: tx completed");
        db.close();
        opened = false;
    };
}

function addUsersToHTML(tableHTML) {
    var usersContainer = document.getElementById('users_list');
    usersContainer.innerHTML = tableHTML;
}


//Funció que serveix per eleiminar un usuari emprant el seu id
function deleteUser(userId, name) {
    var confirmDelete = confirm('Are you sure you want to delete ' + name + '?');   

    //Amb aquet if, si l'admin li dona a cancelar no s'elimina l'usuari
    if (!confirmDelete) {
        return;
    }

    openCreateDb(function(db){
        var tx = db.transaction(DB_STORE_NAME, "readwrite"); //Pemetrem l'escriptura
        var store = tx.objectStore(DB_STORE_NAME);

        var req = store.delete(parseInt(userId)); //Eliminem el usuari

        req.onsuccess = function(e){
            readData();//Actualizem para ver de nuevo los usuaios que quedan
        }
    });
}  



function editUser(userId) {
    openCreateDb(function (db) {
        var tx = db.transaction(DB_STORE_NAME, "readonly");
        var store = tx.objectStore(DB_STORE_NAME);

        var req = store.get(parseInt(userId));

        req.onsuccess = function (e) {
            var user = e.target.result;

            // Populate the form with existing user information
            document.getElementById("name").value = user.name;
            document.getElementById("surname").value = user.surname;
            document.getElementById("prefix").value = user.prefix;
            document.getElementById("tel").value = user.tel;
            document.getElementById("email").value = user.email;
            document.getElementById("password").value = user.password;
            document.getElementById("hiddenId").value = user.id;

            // Display the edit form
            showEditForm();
        };

        req.onerror = function (e) {
            console.error("editUser: error getting user data:", e.target.errorCode);
        };

        tx.oncomplete = function () {
            db.close();
            opened = false;
        };
    });
}




function ediUser(userId) {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var prefix = document.getElementById("prefix").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);

    var req = store.put({
        id: parseInt(userId),
        name: name,
        surname: surname,
        prefix: prefix,
        tel: tel,
        email: email,
        password: password,

    });


    req = store.put();

   
        // req.onsuccess = function (e) {
         

        // readData();
        // clearFormInputs();
        // window.location.reload(true);

        //     window.location.reload(true);
        // };

    req.onerror = function(e) {
        console.error("editUser: Error updating data", this.error);   
      };
    
      tx.oncomplete = function() {
        console.log("editUser: tx completed");
        db.close();
        opened = false;
      };
}




    

window.addEventListener('load', function (event) {
    readData();
});


// Add an event listener to your "SUBMIT" button in the form
document.getElementById("sendData").addEventListener("click", function () {
        var userId = document.getElementById("hiddenId").value;
        ediUser(userId);

});
