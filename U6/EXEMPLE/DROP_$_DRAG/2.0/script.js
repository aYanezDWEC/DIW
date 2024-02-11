$(document).ready(function() {
    let id_post_it = 0;
  
    $('.task-container').droppable({
      accept: function(draggable) {
        return draggable.hasClass('post-it') && draggable.data('color') === $(this).data('color');
      },
      drop: function(event, ui) {
        var post_it = ui.draggable; 
  
        var counter = $(this).find('.counter');
        counter.text(parseInt(counter.text()) + 1);
  
        post_it.data('dropped', true);
      },
      out: function(event, ui) {
        var post_it = ui.draggable; 
  
        var counter = $(this).find('.counter');
        counter.text(parseInt(counter.text()) - 1);
  
        post_it.data('dropped', false);
      }
    });
  
    $('.generador').click(function() {
      var color = Math.random() < 0.5 ? 'yellow' : 'blue';
  
      var post_it = $('<div class="post-it" id="post_' + id_post_it + '" data-color="' + color + '"> ' +
        '<div class="header-post-it">' +
        '<button class="minimize">-</button>' +
        '<button class="close">X</button>' +
        '</div>' +
        '<div class="body-post-it">' +
        '<textarea name="text" cols="20" rows="5" placeholder="What do you have to do?"></textarea>' +
        '</div>' +
        '</div>');
  
      post_it.draggable({
        containment: '.container',
        stack: '.post-it'
      });
  
      $('#container-not-started').append(post_it);
  
      post_it.find('.close').click(function() {
        var post_it = $(this).closest('.post-it');
        $('#dialog-confirm').dialog({
          resizable: false,
          height: 'auto',
          width: 400,
          modal: true,
          buttons: {
            "Confirm": function() {
              var containerId = post_it.data('dropped') ? '#container-in-progress' : '#container-not-started';
              var counter = $(containerId).find('.counter');
              counter.text(parseInt(counter.text()) - 1);
              $(this).dialog('close');
              post_it.remove();
            },
            Cancel: function() {
              $(this).dialog('close');
            }
          }
        });
      });
  
      post_it.find('.minimize').click(function() {
        var body = post_it.find('.body-post-it');
        body.toggleClass('minimized');
      });
  
      id_post_it++;
    });
  });
  