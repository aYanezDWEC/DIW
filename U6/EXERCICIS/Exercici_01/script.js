$(document).ready(function() {
   console.log('HOLA');
    //Quan fagi "click"
    $("#button_suma").on("click", function() {
        var numberA = $("#number_a").val();
        var numberB = $("#number_b").val(); 
        var suma;

        // console.log("numberA -> " + numberA);
        // console.log("numberB -> " + numberB);

        //Comprovem que sigui un valor numèric
        if($.isNumeric(numberA) && $.isNumeric(numberB)){
            //Feim la suma
            suma = parseFloat(numberA) + parseFloat(numberB);

            //La mostrem 
            $("#result").text("La suma es: " + suma);
        } else {
            $("#result").text("Pleae, enter a valid number value");
            
        }
    });
});