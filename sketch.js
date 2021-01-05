var monkey,monkey_running;
var bg,bg_image;
var ground;
var banana,banana_image;
var FoodGroup;
var ObstacleGroup;
var stone,stone_img;
var obstacle_img;
var gameOver,gameOver_img
var gamOver1;
var score = 0;
var lives = 3;
var fruit,fruit1,fruit2,fruit3,fruit4;
var fruit_group,monster_group;
var alien1,alien2;
var monster,monsterImage;
function preload(){
  
  bg_image = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png");
  
  bg_image = loadImage("jungle.jpg");
  banana_image = loadImage("banana.png");
  stone_img = loadImage("stone.png");
  gameOver_img = loadImage("game over.jpg")
  monsterImage = loadImage("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
}

function setup(){
  createCanvas(600,400);
  
  
  
  bg=createSprite(0,0,100,200);
  bg.addImage(bg_image);
  bg.velocityX=-4;
  bg.x = bg.width/2;
  bg.scale = 1;
  
  
  monkey=createSprite(100,310,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  gameOver = createSprite(300,200);
  gameOver.addImage(gameOver_img);
  gameOver.visible = false;
  gameOver.scale = 2;
  
  
  ground = createSprite(400,310,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  gameOver1 = createSprite(100,310,30,30)
  gameOver1.shapeColor = "black";
  gameOver1.visible = false;
  
  score = 0;
  lives = 3;
  
  monster_group = new Group();
  fruit_group = new Group();
  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
}

function draw(){
  background(0);
  
  
  
  if (bg.x<100){
      bg.x = bg.width/2;
      
      }
  if (ground.x<0){
      ground.x = ground.width/2;
      
      }
  if (keyDown("space")){
       monkey.velocityY = -12;
      
      }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if (ObstacleGroup.isTouching(monkey)){
      monkey.scale = 0.07;
      ObstacleGroup.destroyEach();
      lives = lives - 1;
      
      }
  if (lives === 0){
      
      gameOver.visible = true;
      FoodGroup.destroyEach();
      ObstacleGroup.destroyEach();
      gameOver1.visible = false;
      fruit_group.destroyEach();
      monster_group.destroyEach();
      
  }
  
  if(fruit_group.isTouching(monkey)){
      fruit_group.destroyEach();
    score = score + 0.5;
    }
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
  if(monster_group.isTouching(monkey)){
    score = score-2;
    monster_group.destroyEach();
    
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
  spawnObstacle();
  spawnFruits();
  drawSprites();
  
  stroke("green");
  textSize(30);
  fill("yellow");
  text("Score: "+ score, 400,50);
  
  stroke("green");
  textSize(30);
  fill("red");
  text("lives: "+ lives, 300,50);
  
  spawn_monsters();
  spawn_fruits();
}

function spawnFruits(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(50,200);    
    banana.addImage(banana_image);
    banana.scale = 0.05;
    banana.velocityX = -10;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}
  
function spawnObstacle(){
    if(frameCount % 130 === 0) {
    var obstacle = createSprite(800,280,10,40);
    obstacle.velocityX = -11;
    obstacle.addImage(stone_img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    ObstacleGroup.add(obstacle);
}
  
}    
function spawn_monsters(){
  if(frameCount % 140===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX= -13
    monster.setLifetime=50;
    
    monster_group.add(monster);
    
    
  }
     }
function spawn_fruits(){
  if(frameCount % 100 ===0){
    fruit=createSprite(400,400,20,20);
    fruit.velocityX = -15;
     fruit.scale=0.2;
     
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);  
    } else if (r == 2){
      fruit.addImage(fruit2);
    } else if (r == 3){
      fruit.addImage(fruit3);
    } else if (r == 4){
      fruit.addImage(fruit4);
    }
     
    fruit.y=Math.round(random(50,200));
    fruit.setLifetime = 100;
    
    fruit_group.add(fruit);
     }
  
  
}