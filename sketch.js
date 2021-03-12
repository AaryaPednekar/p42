var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score ,survivalTime;
var back ,backImage

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg")

}



function setup() {
   createCanvas(600, 380);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(100,340,20,50);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  console.log(ground.x)
  
  back = createSprite(0,0,800,400);
  back.addImage(backImage);
  back.velocityX=-4;
  back.scale = 1;
  back.x=back.width/2;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
  survivalTime = 0;
  
}


function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(back.x<100) {
    back.x=back.width/2;
  }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach()
    score = score + 2;
  }
  switch(score){
 case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
  }
 // if(obstacleGroup.isTouching(monkey)){
 //   monkey.scale = 0.1;
 //   score = score - 1;
 // }
  
   
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
 
  
    if(obstaclesGroup.isTouching(monkey)){
         monkey.scale=0.08;
    
    }
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);        
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}