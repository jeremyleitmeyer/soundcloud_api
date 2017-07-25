var playSong = document.getElementById("playSong")
var pauseSong = document.getElementById("pauseSong")
var help

SC.initialize ({
  client_id: "fd4e76fc67798bfa742089ed619084a6"
})

SC.get("/tracks").then(function(response) {
  info = document.querySelector("div")


  template = `
  <div class="container">
    <div class = "image">
      ${response[0].artwork_url ? ('<img src="{{artwork_url}}" width="150px" height:"150px">') : ""}
    </div>
    <h2 class="title"><a href="{{permalink_url}}">{{title}}</a></h2><hr>
    <h2 class="artist"><a href="{{user.permalink_url}}">{{user.username}}</a></h2>
    ${response[0].genre ? ('<p class="genre">Genre: {{genre}}</p>') : ""}
    ${response[0].release_year ? ('<p class="release">Released in: {{release_year}}</p>') : ""}
    <p id="id" data-id={{id}}></p>
  </div>  
`
  info.innerHTML = Mustache.render(template, response[0]);

  help = document.getElementById("id")
  });

  
playSong.addEventListener("click", function(){

  SC.stream( '/tracks/' + help.dataset.id ).then(function(player){

    pauseSong.addEventListener("click", function(){
    player.pause();
  })
    console.log(player)

    player.play();
  })
})
  


