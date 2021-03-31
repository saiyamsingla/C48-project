class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }

    bike1 = createSprite(100,200);
    bike1.addImage("bike1",bike1Img);
    bike1.scale=0.1;
    
    bike2 = createSprite(300,200);
    bike2.addImage("bike2",bike1Img);
    bike2.scale=0.1;

    bike = [bike1, bike2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo(); 
    
    

    
    if(allPlayers !== undefined){
      background("grey");
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);

      var index = 0;

      //x and y position of the cars
      var x = 50;
      var y;

      for(var plr in allPlayers){
        
        index = index + 1 ;

        x = x + 400;
        
        y = displayHeight - allPlayers[plr].distance;
        bike[index-1].x = x;
        bike[index-1].y = y;

        if (index === player.index){
          stroke("black");
          fill("cyan");
          ellipse(x,y,50,50);

          bike[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = bike[index-1].y;
         
        }
  
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }
    

    if(player.distance >3720){ 
    this.end();
    
      
      
    }

    


    drawSprites();                                                                       
  }
end()
{
  game.update(2)
  console.log("You win")
}
}
