var client_id = '357843d1fbef418f8949306c4cab57a4';
var client_secret = 'fda58de948b44ba1aeee8a3cf7e6e50c';
var access_token = '';

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {
  
   $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    
  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtist = function (artist) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist,track&limit=8&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    console.log(response);
     //Borrem el contingut que ja hagi en la web
   $('#container_artist').html('');
   $('#container_trak').html('');
   

   $('#container_artist').html('<h1>ARTISTS</h1>');
    for(var i=0; i<response.artists.items.length; i++){
      console.log('artist');
      var artist = response.artists.items[i];
      var artistName = artist.name;
      var artistImage = artist.images[1].url;

      //Mostram els elements amb html
      var img = $('<img id="artist_img">').attr('src', artistImage);
      var h2 = $('<button class="artist_button" id="artist_id_' + i + '">').html('<h3>' + artistName + '</h3>');
      $('#container_artist').append(img, h2);
    }
    console.log(response.tracks.items);
    
    $('#container_trak').html('<h1>TRACKS</h1>');
    $('#container_trak').append('<table id="tracks_table"><tr><th></th><th>Track Name</th><th>Album</th><th>Artist Name</th><th>Duration</th></tr></table>');
    for(var i=0; i<response.tracks.items.length; i++){
      
      var track = response.tracks.items[i];
      var trackName = track.name;
      var trackAlbum = track.album.name;
      var trackArtist = track.artists[0].name;
      var trackDuration = msToMinSec(track.duration_ms);  // Duración de la canción en milisegundos
      var trackPreview = track.preview_url; 
      var trackImage = track.album.images[0].url;
      
      //Mostram els elements amb html
      var row = $('<tr>');
      var name = $('<td>').text(trackName);
      var artist = $('<td>').text(trackArtist);
      var album = $('<td>').text(trackAlbum);
      var duration = $('<td>').text(trackDuration);
      var preview = $('<td>').html('<audio controls><source src="' + trackPreview + '" type="audio/mpeg"></audio>');
      var image = $('<td>').html('<img src="' + trackImage + '" alt="Track image" width="50" height="50">');
      row.append(image, name, album, artist, duration, preview );
      $('#tracks_table').append(row);
    }


    //Ara anem a possar informació sobre l'artista que hem seleccionat
    $('.artist_button').on('click', function() {
      // Eliminar el contingut de la página
      $('#container_trak').html('');
      $('#container_artist').html('');

  
      //Agafem el nom de l'artista i el mostrem
      var artistName = $(this).text();
      $('#artist_title').append('<h1>' + artistName + '</h1>');
  
      // Obtenim informació sobre el artista
      $.ajax({
          type: "GET",
          url: 'https://api.spotify.com/v1/search?q=' + artistName + '&type=artist',
          headers: {
              'Authorization': 'Bearer ' + access_token
          },
      }).done(function(response) {
          //Obtenim iformació de l'artista
          var artist = response.artists.items[0];
  
         //Imatge de l'artista
          if (artist.images.length > 0) {
            $('#artist_info').html('<img id="artist_img_info" src="' + artist.images[0].url + '">');
          }

          // Mostrar els albums dels artistes
          var spotify = new Spotify();
          spotify.getArtistById(artist.id);
      });
    });
  });
};


//Serquem els albums dels artistes
Spotify.prototype.getArtistById = function (artistId) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    var albums = response.items;

    $('#artist_albums').html('');


    var table = $('<table>');
    table.append('<tr><th>Album Cover</th><th>Album Name</th></tr>');

    albums.forEach(function(album){
      var albumName = album.name;
      var albumImage = album.images[0].url;
     
      var row = $('<tr>');
      var albumCoverCell = $('<td>');
      var albumCover = $('<img>').attr('src', albumImage).attr('alt', albumName).css('width', '100px');
      albumCoverCell.append(albumCover);

      var albumNameCell = $('<td>');
      var albumButton = $('<button>').addClass('album_button').text(albumName);
      albumNameCell.append(albumButton);
      row.append(albumCoverCell, albumNameCell);
      table.append(row);
    });

    
    $('#artist_albums').append(table);
  });
};



//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
    $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    },
    dataType: "json",
    data: { grant_type: "client_credentials" }
  }).done( function(response) {    
    access_token = response.access_token;    
  });

  var spotify = new Spotify();

  $('#search_button').on('click', function () {
    spotify.getArtist($('#artistName').val());
  });




});

//funció per cambiar el format del temps de milisegons a minutos y segons exempel: (3:28)
function msToMinSec(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}