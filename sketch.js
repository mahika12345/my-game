var PLAY = 1;
var END = 0;
var gameState = PLAY;

var positive1, positive2, positive3, positive4,positive5,positive6,positive;
var girl, girl_running ;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  girl_running =   loadAnimation("girl1.png","girl2.png","girl3.png" ,"girl4.png");
 
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("negative1.png");
  obstacle2 = loadImage("negative2.png");
  obstacle3 = loadImage("negative3.png");
  obstacle4 = loadImage("negative4.png");
  obstacle5 = loadImage("negative5.png");
  
   positive1 = loadImage("positive1.png");
   positive2 = loadImage("positive2.png");
   positive3 = loadImage("positive3.png");
   positive4 = loadImage("positive4.jpg");
   positive5 = loadImage("positive5.png");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth, 400);
  
  
  girl = createSprite(50,180,20,50);
  
  girl.addAnimation("running", girl_running);
  
  girl.scale = 0.5;
  
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(216,163,221);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    //score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the trex animation
    if(girl.isTouching(cloudsGroup)){
      score = score+1;
    }
    
    if(keyDown("space")   ) {
      girl.velocityY = -12;
    }
  
    girl.velocityY = girl.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    girl.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(girl)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    girl.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //girl.changeAnimation("collided",girl_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth,320,40,10);
    cloud.y = Math.round(random(280,320));
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: cloud.addImage(positive1);
      cloud.scale = 0.2;
              break;
      case 2: cloud.addImage(positive2);
      cloud.scale = 0.2;
              break;
      case 3: cloud.addImage(positive3);
      cloud.scale = 0.3;
              break;
      case 4: cloud.addImage(positive4);
       cloud.scale = 0.1;
                break;
      case 5: cloud.addImage(positive5);
      cloud.scale = 0.05;
              break;
      

              
      
      default: break;}
    cloud.velocityX = -7;
    
     //assign lifetime to the variable
    cloud.lifetime = 450;
    
    //adjust the depth
    cloud.depth = girl.depth;
    girl.depth = girl.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(displayWidth,365,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
   
    obstacle.setCollider("circle",0,0,10)
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale = 0.2;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale = 0.1;
              break;
      case 3: obstacle.addImage(obstacle3);
      obstacle.scale = 0.3;
              break;
      case 4: obstacle.addImage(obstacle4);
      obstacle.scale = 0.5;
              break;  
      case 5: obstacle.addImage(obstacle5);
      obstacle.scale = 0.1;
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
   // obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

