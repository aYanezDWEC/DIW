$(document).ready(function() {
    let id_post_it = 0;
    let deleted_post_it = 0;

     //Feim els contenidors "droppable" i la funcionalitat de contar els post-its que hi ha
     $('.task_container').droppable({
        drop: function(event, ui){
            var post_it = ui.draggable; 

            if(post_it.data('dropped') == 0){
                console.log('dropped');
                var counter = $(this).find('.counter').text();
                counter++;
                $(this).find('.counter').text(counter);

                post_it.data('dropped', 1);
            }
        }, out: function(event, ui){
            var post_it = ui.draggable; 
            console.log('out');

            if(post_it.data('dropped') == 1){
                var counter = $(this).find('.counter').text();
                counter--;
                $(this).find('.counter').text(counter);
                post_it.data('dropped', 0);
            }
        }
    });

    $('.generador').click(function() {
        //lconsole.log('post-it');
        //Generem el "post-it"

        var data = 
            '<div class="post-it" id="post_'+id_post_it+'"> ' +
                '<div class="header_post_it">' +
                    '<button class="minimize"> <img src="icons/minimize.png" height="15px" width="15px" > </button>' +
                    '<button class="close"> <img src="icons/close.png" height="15px" width="15px"> </button>' +
                '</div>' +
                '<div class="body_post_it">' +
                    '<textarea name="text" id="" cols="20" rows="10" placeholder="What do you have to do?"></textarea>' +
                '</div>' +
            '</div>';

        //Fiquem valors dins la "data" del post-it
        post_it = $(data);
        post_it.data("id", id_post_it);
        post_it.data("dropped", 1);
    
        //Feim el post-it draggable (per a que el puguem moure poer tot)
        post_it.draggable();

        //Fiquem el comptador del contenidor "not estarted" a l'hora de crear el post, ja que es crea dins del primer contenidor de "not started"
        var id_not_started = $('#id_not_started').text();
        id_not_started++;
        $('#id_not_started').text(id_not_started);

    
        $('.container_red').append(post_it);


        //Eliminar el post-it
        post_it.find('.close').on('click',{id: id_post_it},function(event) {
            //console.log('eliminar');
            //console.log(event.data.id);
            $('#post_' + event.data.id).remove();
            deleted_post_it++;
        });


        // Minimizar y mostrar el post-it
        post_it.find('.minimize').on('click', {id: id_post_it}, function(event) {
            //console.log('minimizar');
            $('#post_' + event.data.id + ' .body_post_it').toggle();
        });


    id_post_it++;
   
    });    
});


