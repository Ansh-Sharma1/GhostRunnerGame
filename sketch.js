var towerImg,tower;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var invisibleBlock,invisibleBlockGroup;
var ghost,ghostImg;
var gameState = "PLAY";


function preload() {
  
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  
  spookySound=loadSound("spooky.wav");
     
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY=1;
  
  ghost = createSprite(300, 300, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale=0.3;
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
    
     
}

function draw() {
  background(0);
  
if(gameState === "PLAY") {
      
  if(tower.y > 400) {
    tower.y=300;
           
  }
  
  if(keyDown("left_arrow")) {
    ghost.x=ghost.x - 3;
    
  }
  
  if(keyDown("right_arrow")) {
    ghost.x=ghost.x + 3
    
  }
  
  if(keyDown("space")) {
    ghost.velocityY = -5;
    
  }
  
  if(climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
    
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "END";
  }
     
  ghost.velocityY=ghost.velocityY + 0.8;
  
  spawnDoors();
  drawSprites();
 }
  
  if(gameState === "END") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
        
  }
}


function spawnDoors() {
  
  if(frameCount % 240 === 0) {
    door=createSprite(200, -50);
    door.addImage(doorImg);
    
    climber=createSprite(200, 10);
    climber.addImage(climberImg);
    
    invisibleBlock=createSprite(200, 15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    
    climber.x=door.x;
    climber.velocityY=1;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth + 1;
          
    //Assign lifetime to the door & climber 
    door.lifetime=800;
    climber.lifetime=800;
    
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
        
    doorsGroup.add(door);
    climbersGroup.add(climber);
  }
  
  
  
}
