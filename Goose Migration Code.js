// README
/*
<project>
Sophia Cober
21188919

INSTRUCTIONS
My program is a game similar to crossy road where you must get the 
geese pas the line of clouds to make them migrate. The goal is to 
get as many geese migrated as you can. You have three lives, when all 
three lives are gone the game ends and you are left with your score. 
You lose a life by letting the geese hit the clouds that are released
at random speeds so watch out. You can move the goose that is currently 
flying by pressing "a" to go left, and "d" to go right. To start the game
press "p". Once the geese passes the cloud line, the goose will change
to a different graphic and shoot past and that means you succesfully migrated it.


VIDEO
https://youtube.com/shorts/fZPccFJOAjo

RELEASE
I Sophia Cober grant permission to CS105 course staff to use
my Final Project program and video for the purpose of promoting CS105.



BASIC CONCEPTS
drawing shapes - Best example is in the liveRemaning() for the hearts
conditionals - Best example is the conditions changing the goose visual when it crosses the cloud line
user-defined functions - Best example is the geeseMigratedNumber as its one of the functions used the most
loops - Best example is the for loop with the counter in liveRemaining to keep track of lives
arrays - best example is the arrays for the geese colour images that randomize every new goose
mouse or keyboard interaction - best example is the keys controlling the goose movements


EXTENDED CONCEPTS
remapping with map() - remapped the colour of clouds as they go across the screen
objects - used a simple object to keep track of the goose.x and goose.y
rectangle or circle hit testing - used to know when the goose hits the cloud
loading and displaying images - used my own image in the background and my own visuals I made for the geese (images made in Adobe Illustrator by me)


CODING QUALITY AND VISUAL DESIGN
Though the code is simple it works completely as intended. I put a lot of effort into 
the visuals creating my own for everything so nothing is copy right and all is my own work
I have done my best to use all that I have learned from the course to make an
effective program. Though there are some things I could've changed like creating an
overall object array or user-defined function for the drawCloud(), Everyhting else is done in the best
way I could figure out.
*/

// all code goes below here ....

//canvas variables
let gameIsOver = false;
const width = 500;
const height = 550;

let pictWidth = width;
let pictHeight = height;

//picture variables + setup
let imgSky;


//goose global variables
let goose = {
  x: width / 2,
  y: height - 25
}
//geese Migrated
let gm = 0;
let gooseImg1;
let gooseImg2;
let gooseImg3;
let gooseCloudImg1;
let gooseCloudImg2;
let gooseCloudImg3;
let iGoose;


//cloud variables
let CloudX1 = -25;
let CloudY1 = 125;
let CloudX2 = -65;
let CloudY2 = 225;
let CloudSpeed1 = 2;
let CloudSpeed2 = 2;
let CloudX3 = -20;
let CloudY3 = 325;
let CloudSpeed3 = 2;  
let cloudLength = 100;

//counter variables
let lifeLost = [1, 2, 3];
let livesRemaining = 3;

//game start toggle
let gameOn = false;


function preload() {
  imgSky = loadImage("Sky2.png");
  gooseImg1 = loadImage("Goose1.png");
  gooseImg2 = loadImage("Goose2.png");
  gooseImg3 = loadImage("Goose3.png");
  gooseCloudImg1 = loadImage("GooseCloud1.png");
  gooseCloudImg2 = loadImage("GooseCloud2.png");
  gooseCloudImg3 = loadImage("GooseCloud3.png");

}




function setup() {
  createCanvas(width, height);
  gameReset();
  iGoose = floor(random(0, 3))
}


function draw() {
  startScreen();
  //starts the game once p is pressed
  if (gameOn) {
    drawGame();
  }


  function startScreen() {
    image(imgSky, 0, 0, pictWidth, pictHeight);
    imageMode(CENTER);
    image(gooseImg1, width / 2, height / 2 + 200, 200, 100);
    imageMode(CORNER);
    drawCloud1(width / 2, height / 2 + 25, 200);
    fill(0);
    textSize(50);
    textAlign(CENTER);
    text("Geese Migration", width / 2, height / 2);


  }

  function drawGame() {
    image(imgSky, 0, 0, pictWidth, pictHeight);
    drawGameInfo();
    cloudUpdate();
    setupGoose();
    lifeRemaining();
    hitCloud();
    if (gameIsOver) {
      gameOver();
      gameOverScreen();
    }
  }
}


function gameReset() {
  background(0);
  image(imgSky, 0, 0, width, height);
  livesRemaining = 3;
}


function drawGameInfo() {
  fill(255);
  rectMode(CENTER);
  rect(width - 40, 35, 80, 70);
  textAlign(CENTER);
  textSize(10);
  fill(0);
  text("Geese Migrated", width - 40, 55);
  textSize(20);
  text(geeseMigratedNumber(), width - 40, 30);

}

//speed of goose

function setupGoose() {
  let gooseType1 = [gooseImg1, gooseImg2, gooseImg3]; //array for first geese pre cloudline
  let gooseType2 = [gooseCloudImg1, gooseCloudImg2, gooseCloudImg3]; //array for 2nd geese post cloud line
  updateGoose();
  
  if (goose.y > 125) {
    drawGoose(goose.x, goose.y, gooseType1[iGoose]);
  
  } else {
    drawGoose(goose.x, goose.y, gooseType2[iGoose]);
    goose.y -= 2;
  }


}

function drawGoose(x, y, colour) {
  imageMode(CENTER);
  image(colour, x, y, 100, 50)
  imageMode(CORNER);
}


function updateGoose() {
  gooseType2 = [gooseCloudImg1, gooseCloudImg2, gooseCloudImg3];
  goose.y -= 2;

  //randomizes iGoose
  //changes the migrator counter to +1
  if (goose.y < 0) {
    goose.y = height - 30;
    iGoose = floor(random(0, 3))

  }
}


function keyPressed() {

  if (key === "a") {
    goose.x -= 7;
  }
  if (key === "d") {
    goose.x += 7;
  }

  if (key === "p") {
    gameOn = !gameOn;

  }
}


function drawCloud1(x, y, size) {
  strokeWeight(0);
  let whiteColour = map(x, 0, width, 255, 220)
  fill(whiteColour); //this could be inthe wrong spot
  circle(x - size / 2, y - size / 5, size);
  circle(x + size / 2, y - size / 5, size);
  circle(x, y - size / 2, size);
  circle(x, y, size, size);

}

function drawCloud2(x, y) {
  strokeWeight(0);
  let greyColour = map(x, 0, width, 220, 50);
  fill(greyColour);
  circle(x - 25, y - 7, 50);
  circle(x + 25, y - 7, 50);
  circle(x, y - 20, 50);
  circle(x, y, 50, 50);

}

function drawCloud3(x, y) {
  strokeWeight(0);
  let greyColour = map(x, 0, width, 220, 50);
  fill(greyColour);
  circle(x - 25, y - 7, 50);
  circle(x + 25, y - 7, 50);
  circle(x, y - 20, 50);
  circle(x, y, 50, 50);
}

function cloudUpdate() {
  drawCloud1(CloudX1, CloudY1, 50);
  drawCloud2(CloudX2, CloudY2);
  drawCloud3(CloudX3, CloudY3);


  if (CloudX1 > width) {
    CloudX1 = -25;
    drawCloud1(CloudX1, CloudY1);
    CloudSpeed1 = floor(random(1, 5));
  }

  CloudX1 = CloudX1 + CloudSpeed1;

  if (CloudX2 > width) {
    CloudX2 = -25
    drawCloud2(CloudX2, CloudY2);
    CloudSpeed2 = floor(random(1, 5));
  }

  CloudX2 = CloudX2 + CloudSpeed2;

  if (CloudX3 > width) {
    CloudX3 = -25
    drawCloud3(CloudX3, CloudY3);
    CloudSpeed3 = floor(random(1, 5));
  }

  CloudX3 = CloudX3 + CloudSpeed3;
}


function hitCloud() {

  if (goose.x > CloudX1 - 50 && goose.X < CloudX1 + 50 && goose.y < CloudY1 + 25 && goose.y > CloudY1 - 55 || goose.x > CloudX2 - 50 && goose.x < CloudX2 + 50 && goose.y < CloudY2 + 25 && goose.y > CloudY2 - 55 || goose.x > CloudX3 - 50 && goose.x < CloudX3 + 50 && goose.y < CloudY3 + 25 && goose.y > CloudY3 - 55) {

    livesRemaining -= 1;
    goose.y = height - 25;

    if (livesRemaining === 0) {

      gameIsOver = true;
    }
  }
}

function lifeRemaining() {
  for (let i = 0; i < livesRemaining; i++) {
    let textX = 50 * i + 30;
    strokeWeight(0);
    fill(255, 0, 0);
    circle(textX - 7, 50, 20);
    circle(textX + 7, 50, 20);
    triangle(textX - 15, 55, textX + 15, 55, textX, 70);
    strokeWeight(1);
    fill(0);
    textSize(20);
    text(lifeLost[i], textX, 60);
  }
}

function gameOver() {
  noLoop();

}

function gameOverScreen() {
  fill(0);
  rect(width / 2, height / 2, width, height);
  fill(255);
  textSize(50);
  text("Game over goslings!", width / 2, height / 2 - 100);
  textSize(25);
  text("Geese Succesfully Migrated:", width / 2 - 60, height / 2);
  text(geeseMigratedNumber(), width / 2 + 120, height / 2);
}

function geeseMigratedNumber() {


  
  if (goose.y <= 0) {
    gm += 1;
  }

  return gm;
}
