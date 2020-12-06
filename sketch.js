var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score = 0;
var ground,invisibleGround;

var END = 1;
var PLAY = 0;
var gameState = PLAY;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  
}



function setup() {
  createCanvas(300,300);
 
  ground = createSprite(150,270,600,8);
  ground.x = ground.width /2;
  ground.velocityX = -30;
  
    invisibleGround = createSprite(150,275,600,8);
  invisibleGround.visible = false;
  
  monkey = createSprite(28,250,8,8);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  //Making groups
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;

}


function draw() {
  createCanvas(300,300);
 
  background ("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Health:"+score,10,30);
  
  if(gameState === PLAY){

    stroke("black");
    textSize(12);
    fill("black");
    text("Eat Bananas to survive and get health",90,30);
    
    stroke("black");
    textSize (20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survivial Time:"+survivalTime, 75, 50); 
    
    if(keyDown("space")){
    monkey.velocityY = -12;
  }
    if (ground.x < 0){
      ground.x = ground.width/2;
  }
     
  if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
  }
    
  if(FoodGroup.isTouching(monkey)){
     score = score+1;
     } 
    
    monkey.visible = true;
    obstaclesGroup.visible = true;
}
  
 else if(gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.destroyEach();
    monkey.visible = false;
    obstaclesGroup.setLifetimeEach(-1);
   
   FoodGroup.setVelocityXEach(0);
   FoodGroup.destroyEach();
   FoodGroup.setLifetimeEach(-1);
   
   textSize(30);
   stroke("black");
   strokeWeight(8);
   fill("white");
   text("GameOver",75,140);
   
   textSize(30);
   stroke("black");
   strokeWeight(8);
   fill("white");
   text("Press 'R' To Restart",20,170);
   
   survivalTime = stop;
 }
  
  if(keyDown("r")){
    gameState = PLAY;
  } 
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround);

  
  
  
  drawSprites();

    //spawn obstacles calling
  spawnObstacles();
    //spawn fruits calling
  spawnFruits();
  
  console.log = monkey.y;
 
  
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(370,239,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.lifetime = 500;
   obstaclesGroup.add(obstacle);
     
  obstacle.setCollider("rectangle",0,0,450,390);
  obstacle.debug = true;
   
  }
 }

function spawnFruits(){
 if (frameCount % 60 === 0){
   var fruit = createSprite(300,100,10,40);
   fruit.y = Math.round(random(130,160));
   fruit.velocityX = -6;
   fruit.addImage(bananaImage);
   fruit.scale = 0.2;
   fruit.lifetime = 500;
   fruit.scale = 0.10;
   FoodGroup.add(fruit);
   

  }
 }

