var ball;

var box;

var database;

var position;

function preload(){

    balloonImg = loadImage("bh.png");

    bgImg = loadImage("bg.png");

}

function setup(){

    database = firebase.database();
    createCanvas(800,400);
    ball = createSprite(250,250,50,50);
    ball.addImage("Balloon", balloonImg);
    ball.scale = 0.25;

    var ballPosition = database.ref("ball/position");
    ballPosition.on("value", readPosition, showError);

}

function draw(){
    background(bgImg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    drawSprites();
}


function readPosition(data){

position = data.val();

ball.x = position.x;
ball.y = position.y;

}

function writePosition(x, y,){

    database.ref('ball/position').set({

        'x' : position.x + x,
        'y' : position.y + y

    })

}

function showError(){

    console.log("404 not found... please contact my tutor");

}
