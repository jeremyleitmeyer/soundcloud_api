var playSong = document.querySelector("#playSong")
var pauseSong = document.querySelector("#pauseSong")
var nextSong = document.querySelector("#nextSong")
var songs = []
var j

SC.initialize ({
  client_id: "fd4e76fc67798bfa742089ed619084a6"
})

window.onload = SC.get("/tracks", {
	q:"yuc'e"
}).then(function(response) {
	j = 0
  info = document.querySelector("div")
  while (songs.length < 10) {
  	for (i = 0; i < response.length; i++) {
  		songs.push(response[i])
  	}
  }


  template = `
  <div class="container">
    <div class = "image">
      ${songs[j].artwork_url ? ('<img src="{{artwork_url}}" width="150px" height:"150px">') : ""}
    </div>
    <h2 class="title"><a href="{{permalink_url}}">{{title}}</a></h2><hr>
    <h2 class="artist"><a href="{{user.permalink_url}}">{{user.username}}</a></h2>
    ${songs[j].genre ? ('<p class="genre">Genre: {{genre}}</p>') : ""}
    ${songs[j].release_year ? ('<p class="release">Released in: {{release_year}}</p>') : ""}
  </div>  
`
  info.innerHTML = Mustache.render(template, songs[j]);
});

function playerPlay() {
  SC.stream( '/tracks/' + songs[j].id ).then(function(player){
      player.play();    
    });
    	pauseSong.addEventListener("click", function(){
	    player.pause();
	  })
	  	nextSong.addEventListener("click", function(){
	    j++
	    playerPlay()
	  })    
  };




