var ball;
var database;
var positionReference, position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database()
    positionReference = database.ref("/ball/position");
    positionReference.on("value", readPosition, showError)
    colourReference = database.ref("/ball/colour")
    colourReference.on("value", readColour, showError)
}

function readColour(data){
ball.shapeColor = data.val()
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("There is an error in the database")
}

function draw(){
    background("white");

    if(keyDown(LEFT_ARROW)){
        changePosition(-3,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(3,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-3);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+3);
    }
    drawSprites();
}

function changePosition(x,y){
   positionReference.update({
       "x" : position.x + x, "y" : position.y +y
   })
   
}
