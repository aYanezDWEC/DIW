function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    openCreateDb(function(db) {
        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);

        var req = store.openCursor();
        req.onsuccess = function (e) {
            var cursor = e.target.result;

            if (cursor) {
                console.log('Dentro cursor');
               
                if (cursor.value.email === email && cursor.value.password === password) {
                    console.log('Ok inicio sesión');

                    cursor.value.isLogged = true;
                    cursor.update(cursor.value);

                    if(cursor.value.administrator === "false"){
                        window.location.href = 'index.html';
                    } else if(cursor.value.administrator === "true"){
                        window.location.href = 'indexadmin.html';
                    
                        return;
                    }
                } else {
                    console.log('Error inicio de sesión.');
                }

                cursor.continue();
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

document.getElementById("user_login").addEventListener("click", login);
