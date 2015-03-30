var gl;
var points;

var program;

var SquareSpeed = .003;
var SquareSpeedSm = .003;

var lossCheck = 0;
var winCheck = 0;
var userScore = 0;
// Character Position Control
var x = 0;
var y = 0;
var xLeft = 0;
var xRight = 0;
var yTop = 0;
var yBottom = 0;

// Square Object Position
var xSquare = 1;
var ySquare = -.7;

// Square Object Position
var xSquareSmall1 = 1;
var ySquareSmall1 = -.8;
var xSquareSmall2 = 1.7;
var ySquareSmall2 = -.8;
var xSquareSmall3 = 2.4;
var ySquareSmall3 = -.8;

// Ground Location
var ground = .8;
// character's horizontal position
var left = 0;
var right = 0;
// checking character jump
var check = 0;
var jumpCheck = 0;
var clickCheck = 2;

// Buffer for character
var bufferId;
var vPosition;

//Buffer for floor
var bufferIdFloor;
var vPositionFloor;

// Buffers for square Objects
var bufferIdObjSquare;
var vPositionObjSquare;
var bufferIdObjSquareSm1;
var vPositionObjSquareSm1;
var bufferIdObjSquareSm2;
var vPositionObjSquareSm2;
var bufferIdObjSquareSm3;
var vPositionObjSquareSm3;

// vertices for objects and character
var vertices = new Float32Array([-.05, -.05 - ground, 0, .05 - ground, .05, -.05 - ground]);
var mapFloor = new Float32Array([-1, -.05 - ground, 1, -.05 - ground, 1, -1, -1, -1]);
var gObjSquare = new Float32Array([.5 + xSquare, .1 - ground, .7 + xSquare, .1 - ground, .7 + xSquare, -.05 - ground, .5 + xSquare, -.05 - ground]);
var gObjSquareSm1 = new Float32Array([.5 + xSquareSmall1, 0 - ground, .6 + xSquareSmall1, 0 - ground, .6 + xSquareSmall1, -.05 - ground, .5 + xSquareSmall1, -.05 - ground]);
var gObjSquareSm2 = new Float32Array([.5 + xSquareSmall2, 0 - ground, .6 + xSquareSmall2, 0 - ground, .6 + xSquareSmall2, -.05 - ground, .5 + xSquareSmall2, -.05 - ground]);
var gObjSquareSm3 = new Float32Array([.5 + xSquareSmall3, 0 - ground, .6 + xSquareSmall3, 0 - ground, .6 + xSquareSmall3, -.05 - ground, .5 + xSquareSmall3, -.05 - ground]);

var randomNum = getRandomInt();

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	// For Character
    // Load the data into the GPU
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	// For Floor
	// Load the data into the GPU
	bufferIdFloor = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFloor );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mapFloor), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	vPositionFloor = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionFloor, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionFloor );
	
	// For Ground Object Square
	// Load the data into the GPU
	bufferIdObjSquare = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjSquare );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(gObjSquare), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	vPositionObjSquare = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionObjSquare, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionObjSquare );
	
	// For Ground Objects Square Small 1
	// Load the data into the GPU
	bufferIdObjSquareSm1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjSquareSm1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(gObjSquareSm1), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	vPositionObjGroundSquarSm1 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionObjGroundSquarSm1, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionObjGroundSquarSm1 );
	
	// For Ground Objects Square Small 2
	// Load the data into the GPU
	bufferIdObjSquareSm2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjSquareSm2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(gObjSquareSm2), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	vPositionObjGroundSquarSm2 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionObjGroundSquarSm2, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionObjGroundSquarSm2 );
	
	// For Ground Objects Square Small 3
	// Load the data into the GPU
	bufferIdObjSquareSm3 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjSquareSm3 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(gObjSquareSm3), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	vPositionObjGroundSquarSm3 = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionObjGroundSquarSm3, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionObjGroundSquarSm3 );
	
	document.onkeydown = handleKeyDown;
  	document.onkeyup = handleKeyUp;

    render();
};

function render() {
	
	drawCharacter()
	drawFloor();
	
	if (randomNum <= .5){
		drawSquareObj();		
	
		// Checks Collisions and win condition
		if ( (xSquare <= xLeft && xLeft <= (xSquare + .2) && yBottom <= ySquare) && winCheck != 1 
		  || (xSquare <= xRight && xRight <= (xSquare + .2) && yBottom <= ySquare) && winCheck != 1)
		  {
				lossCheck = 1;
				loss();
		} 
		if(userScore >= 5 && lossCheck != 1){
			winCheck = 1;
			win();	
		}
	}
	
	if (randomNum >= .5){
		// Draws Multiple Small Ground Square Objects
		drawMultSquareObj();	
	
		if ( (xSquareSmall1 <= xLeft && xLeft <= (xSquareSmall1 + .1) && yBottom <= ySquareSmall1) && winCheck != 1 
		  || (xSquareSmall1 <= xRight && xRight <= (xSquareSmall1 + .1) && yBottom <= ySquareSmall1) && winCheck != 1)
		{
				lossCheck = 1;
				loss();
		} 
		if(userScore >= 5 && lossCheck != 1){
			winCheck = 1;
			win();	
		}
		
		if ( (xSquareSmall2 <= xLeft && xLeft <= (xSquareSmall2 + .1) && yBottom <= ySquareSmall2) && winCheck != 1 
		  || (xSquareSmall2 <= xRight && xRight <= (xSquareSmall2 + .1) && yBottom <= ySquareSmall2) && winCheck != 1)
		{
				lossCheck = 1;
				loss();
		} 
		if(userScore >= 5 && lossCheck != 1)
		{
			winCheck = 1;
			win();	
		}
		
		if ( (xSquareSmall3 <= xLeft && xLeft <= (xSquareSmall3 + .1) && yBottom <= ySquareSmall3) && winCheck != 1 
		  || (xSquareSmall3 <= xRight && xRight <= (xSquareSmall3 + .1) && yBottom <= ySquareSmall3) && winCheck != 1)
		{
				lossCheck = 1;
				loss();
		} 
		if(userScore >= 5 && lossCheck != 1)
		{
			winCheck = 1;
			win();	
		}
	}
	
	score();
	
	// Calls the render again
	requestAnimFrame( render );
}

function drawCharacter() {
	
	xLeft = -.05 + x;
	xRight = .05 + x;
	yTop = .05 + y - ground;
	yBottom = -.05 + y - ground;
	
	// Restores values into the character vertices
	vertices = new Float32Array(
	[  xLeft, yBottom, 
		   x,  yTop, 
	  xRight, yBottom]);	
	  
	 // Checks chracter jump
	 if (check == 1 && jumpCheck == 0){
		y += .07; 
		
		if (y >= .4){
			jumpCheck = 1;
			clickCheck = 1;
		}	
	 } else if (jumpCheck == 1){
		 y -= .07;
		 if (y <= 0){
			 check = 0;
			 jumpCheck = 0;
		 }
	 }
	 if (right == 1 && x >= -.95){
		x -= .05;
	 }
	 if (left == 1 && x <= .95){
		x += .05;
	 }

	// Load the data into the GPU
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );

    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}

var currentlyPressedKeys = {};

function handleKeyDown(event) {
	
    currentlyPressedKeys[event.keyCode] = true;

    if (String.fromCharCode(event.keyCode) == "W") {	
	  	check = 1;	
    }
	else if (String.fromCharCode(event.keyCode) == "D"){
		left = 1;
	}
	else if (String.fromCharCode(event.keyCode) == "A"){
		right = 1;
	}
	 
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
	
	if (String.fromCharCode(event.keyCode) == "W") {	
	  	clickCheck = 0;
    }
	else if (String.fromCharCode(event.keyCode) == "D"){
		left = 0;
		clickCheck = 1;
	}
	else if (String.fromCharCode(event.keyCode) == "A"){
		right = 0;
		clickCheck = 1;
	}
}

function drawFloor() {
	
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFloor );
    gl.vertexAttribPointer( vPositionFloor, 2, gl.FLOAT, false, 0, 0 );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );		
}

function drawSquareObj() {
			 
	 // Restores values into the character vertices
	 gObjSquare = new Float32Array(
	 [xSquare, ySquare, 
	 .2 + xSquare, ySquare, 
	 .2 + xSquare, ySquare - .15, 
	 xSquare, ySquare - .15]);
	 
	 // Moves Square Object
	 xSquare -= SquareSpeed;
	 
	 //Resets the object once off screen
	 if (xSquare <= -1.2){
		 xSquare = 1;
		 userScore += 1;
		 SquareSpeed += .005;
		 randomNum = getRandomInt();
	 }
	
	// Load the data into the GPU
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjSquare );
    gl.bufferData( gl.ARRAY_BUFFER, gObjSquare, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    gl.vertexAttribPointer( vPositionObjSquare, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function drawMultSquareObj() {	 
	 // Restores values into the character vertices
	 gObjSquareSm1 = new Float32Array(
	 [xSquareSmall1, ySquareSmall1, 
	 .1 + xSquareSmall1, ySquareSmall1, 
	 .1 + xSquareSmall1, ySquareSmall1 - .15, 
	 xSquareSmall1, ySquareSmall1 - .15]);
	 
	 // Moves the Ground Square Object
	 xSquareSmall1 -= SquareSpeedSm;
	
	// Load the data into the GPU
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjSquareSm1 );
    gl.bufferData( gl.ARRAY_BUFFER, gObjSquareSm1, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    gl.vertexAttribPointer( vPositionObjSquareSm1, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	// Restores values into the character vertices
	 gObjSquareSm2 = new Float32Array(
	 [xSquareSmall2, ySquareSmall2, 
	 .1 + xSquareSmall2, ySquareSmall2, 
	 .1 + xSquareSmall2, ySquareSmall2 - .15, 
	 xSquareSmall2, ySquareSmall2 - .15]);
	 
	 // Moves the Ground Square Object
	 xSquareSmall2 -= SquareSpeedSm;
	 
	// Load the data into the GPU
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjSquareSm2 );
    gl.bufferData( gl.ARRAY_BUFFER, gObjSquareSm2, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    gl.vertexAttribPointer( vPositionObjSquareSm2, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
	// Restores values into the character vertices
	 gObjSquareSm3 = new Float32Array(
	 [xSquareSmall3, ySquareSmall3, 
	 .1 + xSquareSmall3, ySquareSmall3, 
	 .1 + xSquareSmall3, ySquareSmall3 - .15, 
	 xSquareSmall3, ySquareSmall3 - .15]);
	 
	 // Moves the Ground Square Object
	 xSquareSmall3 -= SquareSpeedSm;
	 
	 //Resets the object once off screen
	 if (xSquareSmall3 <= -1.2){
		 xSquareSmall1 = 1.0;
		 xSquareSmall2 = 1.7;
		 xSquareSmall3 = 2.4;
		 userScore += 1;
		 SquareSpeedSm += .005;
		 randomNum = getRandomInt();
	 }
	
	// Load the data into the GPU
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdObjSquareSm3 );
    gl.bufferData( gl.ARRAY_BUFFER, gObjSquareSm3, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    gl.vertexAttribPointer( vPositionObjSquareSm3, 2, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	
}

function win() {
	mapFloor = new Float32Array([-1, 15 - ground, 1, 15 - ground, 1, -1, -1, -1]);
	
	// For Floor
	// Load the data into the GPU
	bufferIdFloor = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFloor );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mapFloor), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	vPositionFloor = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionFloor, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionFloor );
	
	document.getElementById("display").innerHTML = "YOU WIN";
	
	setTimeout(restart, 2000);
}

function loss() {
	mapFloor = new Float32Array([-1, 15 - ground, 1, 15 - ground, 1, -1, -1, -1]);
	
	// For Floor
	// Load the data into the GPU
	bufferIdFloor = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdFloor );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mapFloor), gl.STATIC_DRAW );

    // Associate our shader variables with our data buffer
	vPositionFloor = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPositionFloor, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPositionFloor );
	
	document.getElementById("display").innerHTML = "YOU LOSE";
	
	setTimeout(restart, 2000);
}

function getRandomInt() {
    return Math.random();
}

function score() {	
	document.getElementById("score").innerHTML = userScore;
}

function restart() {
	location.reload(true);
}
