$.fn.countCharacters = function() {
    $(this).each(function() { //Feim un "for each"
        var text = $(this).val(); // Agafem el contingut de el "textarea"
        $(this).data("caracters", text.length); //Guardem dins de les dades de l'element, per això emprem data. Amb la clau "caracters"
        //console.log(text.length);
        var info = '<p> Hi ha ' + $(this).data('caracters') + ' caracters. </p>';
        $(this).after(info); //Insertem el párrafo després de l'element
        //console.log(info);

        $(this).on("keyup", function(){ //Cada vegada que pitjem una tecla, "actualitzem" la info que mostrem en el párrafo
            text = $(this).val();
            $(this).data("caracters", text.length);
            //console.log(text.length);
            info = '<p> Hi ha ' + $(this).data('caracters') + ' caracters. </p>';
            $(this).next().html(info); //emprem next per a que sobresquigui el que ja hi ha i no possi mes parrafos
        });
    });
    return this;
}

$(document).ready(function(){
    $("textarea").countCharacters();
});
