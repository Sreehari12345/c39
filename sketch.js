var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var FoodGroup;
var obstaclesGroup;
var bananaimg;
var stoneimg;
var score =0;
var gameOver, attempts =3, gameOverimg
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimg = loadImage("banana.png")
  stoneimg = loadImage("stone.png")
  gameOverimg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group()
  obstaclesGroup = new Group()
  
}

function draw() { 
  background(0);
  drawSprites()
  fill("white")
  textSize(20)
  text("score: "+score,550,50)

  if(gameState===PLAY){
    camera.position.x = player.x
    camera.position.y = player.y
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2;
      player.scale+= + 0.1
    }
    spawnFood()
    spawnObstacles()

    if(obstaclesGroup.isTouching(player)){
      gamestate = END;
    }

  }else if(gameState=== END){
    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach()


    


    textSize(30);
    fill(255);
    text("GAME OVER!", 300,220);
  }
  

  


  
}
function spawnFood(){
  if (frameCount % 80===0) {
    var banana = createSprite(600,150,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime=300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);


  }
}
function spawnObstacles(){
  if (frameCount % 80===0){
    var obstacles = createSprite(550,310,10,40);
    obstacles.addImage(stoneimg);
    obstacles.scale = 0.2;
    obstacles.velocityX = -4;

    obstacles.lifetime=300;
    obstaclesGroup.add(obstacles)

  

    
  }
}


