function logout() {
    openCreateDb(function(db) {
        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);

        var req = store.openCursor();
        req.onsuccess = function (e) {
            var cursor = e.target.result;

            if (cursor) {
                cursor.value.isLogged = false;
                cursor.update(cursor.value);
                cursor.continue();  // Avanzar al siguiente registro
            } else {
                window.location.href = 'index.html';  // Redirigir después de actualizar todos los registros
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

document.getElementById("yes").addEventListener("click", logout);
