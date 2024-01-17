$(document).ready(function() {
    var cuadro;
    var numCuadros = 16;
    var gameContainer = $('#game_container');
    var nombres = [];  //creem una array per poder assignar els nombres de maneara aleatoria.
    var encerts = 0;
    var errors = 0;
    var imgSrcArray = [];


    for (var i = 1; i <= numCuadros/2; i++) {
        nombres.push(i);
        nombres.push(i);
    }
    //console.log(nombres);

    //Aquesta funció l'emprem per desordenar la array
    function desordenarArray() {
        return Math.random() - 0.5;
    }

    // Apliquem la funció 
    nombres.sort(desordenarArray);
    //console.log(nombres);

    //Generem els cuadres, en aquest cas emprat fotos 
    for (var i=0; i<numCuadros; i++) {
        var cuadro = $('<div class="cuadro" id="cuadro_' + i + '"> <img src="img/imagen_' + nombres[i] + '.png" height="115px" weight="115px" class="oculto"></div>');
        //cuadro = $('<div class="cuadro oculto" id="cuadro_' + i + '"> <p>' + nombres[i] +'</p></div>');
        gameContainer.append(cuadro);
    }

  
    $('.cuadro').on('click', function() {
        $(this).find("img").removeClass('oculto');
        $(this).find("img").addClass('girat'); 

        //agafem la ruta de la imatge per saber quina es i laguardem dins d'una array
        var imgSrc = $(this).find("img").attr('src');
        imgSrcArray.push(imgSrc);
        //console.log("array -> " + imgSrcArray);

        //Si girem dues "cuadrats" entra i comprova si son isguals o no 
        if($(".girat").length == 2){
            //console.log('GIRAT ');  
            // Si és igaul 
            if(imgSrcArray[0] == imgSrcArray[1]){
                encerts++;
                $('#aciertos').text(encerts);
                imgSrcArray.splice(0, imgSrcArray.length); //borrem el contigut 
                
                //Canvi de classe
                $('.girat').removeClass('girat').addClass('encert');

                if(encerts == numCuadros/2){
                    alert('Enhorabona has trobat totes les parelles!' + 'Has fet: ' + encerts + ' encerts i ' + errors + ' errors. A continuació es reiniciarà la partida.');
                    location.reload();

                }
            //Si no son iguals
            } else {
                errors++;
                $('#errores').text(errors);
                imgSrcArray.splice(0, imgSrcArray.length); //borrem el contigut 

                $('.girat').removeClass('girat').addClass('oculto');
                setTimeout(function() {
                }, 2000);

                
            }
        } 


    });   


    
{

}    

});
