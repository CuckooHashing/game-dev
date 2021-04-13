var pancakeListGoro={};
var pancakeListRen={};
var pcNrGoro = 0;
var pcNrRen = 0;
var goroCaught = false;
var caught = false;
var caughtTakoGoro = false;
var caughtTakoRen = false;
var pcMax = 10;
var pancakesCaughtGoro = 0;
var pancakesCaughtRen = 0;
var missed = 0;
var missedMax = 3;
var level = 1;
var scoreGoro = 0;
var scoreRen = 0;
var tako = false;
var coffee = false;
var caughtCoffee = false;

var xstart = 300;
var pancakeSpeed = 150;

var isPaused = true;
var gameOver = false;

var falling = {
	speed: 150,
	x: 300,
	y: 0,
	width: 64,
	height: 16
};

var fallingTako = {
	speed: 150,
	x: 300,
	y: 0,
	width: 64,
	height: 16
};

var fallingCoffee = {
	speed: 150,
	x: 250,
	y: 0,
	width: 65,
	height: 15 
}

$(document).ready(function() {
	// Create the canvas
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 700;
	canvas.height = 500;
	$('#game').append(canvas);
	
	var img_bg = new Image();
	var imgGoro = new Image();
	var imgGoro2 = new Image();
	var imgPlate1 = new Image();
	var imgRen = new Image();
	var imgRen2 = new Image();
	var imgPlate2 = new Image();
	
	var imgPancake = new Image();
	var imgTakoyaki = new Image();
	var imgCoffee = new Image();
	
	var goro = {
		speed: 350,
		x: canvas.width/2 + 200,
		y: canvas.height-144,
		width: 96
	};
	
	var plateGoro = {
		x: goro.x-45,
		y: goro.y+67,
		width: 80,
		height: 12
	};

	var ren = {
		speed: 350,
		x: canvas.width/2 -200,
		y: canvas.height-144,
		width: 96
	};
	var plateRen = {
		x: ren.x +75,
		y: ren.y+67,
		width: 80,
		height: 12
	};

	img_bg.onload = function() {
    
	};
	img_bg.src = 'img/bg2.jpg';
	
	imgGoro.onload = function() {
    
	};
	imgGoro.src = 'img/goroStand.png';
	imgGoro2.src = 'img/goroStand2.png';
	
	imgRen.onload = function() {

	};
	imgRen.src = 'img/jokerStand.png';
	imgRen2.src = 'img/jokerStand2.png';

	
	imgPlate1.onload = function() {
		ctx.drawImage(img_bg, 0, 0 );
		ctx.drawImage(imgRen, ren.x , ren.y);
		ctx.drawImage(imgPlate1, plateRen.x, plateRen.y );
		ctx.drawImage(imgGoro, goro.x , goro.y);
		ctx.drawImage(imgPlate1, plateGoro.x, plateGoro.y );
	};
	imgPlate1.src = 'img/plate.png';
	
	imgPlate2.onload = function() {
	};
	imgPlate2.src = 'img/plate.png';

	imgPancake.onload = function() {
	};
	imgPancake.src = 'img/pancake.png';
	
	imgTakoyaki.src = 'img/takoyaki.png';
	imgTakoyaki.onload = function() {
	};

	imgCoffee.src = 'img/coffee.png';
	imgCoffee.onload = function(){
	};
	
	// Handle keyboard controls -> keep inputs in a map
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);
	
	addEventListener("keyup", function(e) {
		if (e.keyCode == 32) {  //pause with space
			isPaused = !isPaused;
		}
	}, false);
	
	$("#game").click(function() {
		isPaused = !isPaused;
	});
	
	$(".popup").click(function() {
		isPaused = !isPaused;
	});

	var newPancake = function() {
		falling.x = Math.floor(Math.random() * (canvas.width - falling.width-40));
		falling.y=0;
		falling.speed = pancakeSpeed;
		caught = false;
		var audioPancake = new Audio('audio/pancake.mp3');
		audioPancake.play();
	};

	var newTakoyaki = function(){
		fallingTako.x = Math.floor(Math.random() * (canvas.width - fallingTako.width-40));
		fallingTako.y=0;
		fallingTako.speed = pancakeSpeed;
		caughtTakoGoro = false;
		caughtTakoRen = false;
		tako = true;
		var audioTako = new Audio('audio/fireTako.mp3');
		audioTako.play();
	};

	var newCoffee = function() {
		console.log("created coffee");
		fallingCoffee.x = Math.floor(Math.random() * (canvas.width - falling.width-40));
		fallingCoffee.y=0;
		fallingCoffee.speed = pancakeSpeed;
		caughtCoffee = false;
		coffee = true;
		var audioCoffee = new Audio('audio/cup.mp3');
		audioCoffee.play();
	};
	
	// Update game objects
	var onEdgeGoro = false;
	var stepGoro = false;
	var stepcountGoro = 0;
	
	var onEdgeRen = false;
	var stepRen = false;
	var stepcountRen = 0;
	var update = function (modifier) {
		$(".popup").toggle(false);
		
		if (37 in keysDown) { // Player1 holding left
			goro.x -= goro.speed * modifier;
			plateGoro.x -= goro.speed * modifier;
			if (plateGoro.x < 0) {
				plateGoro.x=0;
				goro.x=45;
				onEdgeGoro = true;
			}
			else {onEdgeGoro = false;}
			if (!onEdgeGoro) {
				for (var i=0;i<Object.keys(pancakeListGoro).length;i++) {
					pancakeListGoro[i].x -=goro.speed * modifier;
				}
			}
			stepcountGoro++;
			
		}
		if (65 in keysDown) { // Player2 holding left
			ren.x -= ren.speed * modifier;
			plateRen.x -= ren.speed * modifier;
			if (plateRen.x < 0) {
				plateRen.x=0;
				ren.x=-75;
				onEdgeRen = true;
			}
			else {onEdgeRen = false;}
			if (!onEdgeRen) {
				for (var i=0;i<Object.keys(pancakeListRen).length;i++) {
					pancakeListRen[i].x -=ren.speed * modifier;
				}
			}
			stepcountRen++;
			
		}
		if (39 in keysDown) { // Player1 holding right
			goro.x += goro.speed * modifier;
			plateGoro.x += goro.speed * modifier;
			if (goro.x + goro.width >= canvas.width) {
				plateGoro.x=canvas.width - goro.width - 45;
				goro.x=canvas.width - goro.width;
				onEdgeGoro = true;
			}
			else {onEdgeGoro = false;}
			if (!onEdgeGoro) {
				for (var i=0;i<Object.keys(pancakeListGoro).length;i++) {
					pancakeListGoro[i].x +=goro.speed * modifier;
				}
			}
			stepcountGoro++;
		}
		if (68 in keysDown) { // Player2 holding right
			ren.x += ren.speed * modifier;
			plateRen.x += ren.speed * modifier;
			if (ren.x + ren.width >= canvas.width) {
				plateRen.x=canvas.width - ren.width + 75;
				ren.x=canvas.width - ren.width;
				onEdgeRen = true;
			}
			else {onEdgeRen = false;}
			if (!onEdgeRen) {
				for (var i=0;i<Object.keys(pancakeListRen).length;i++) {
					pancakeListRen[i].x +=ren.speed * modifier;
				}
			}
			stepcountRen++;
		}
		
		//for animation
		if (stepcountGoro==5) {
			stepcountGoro = 0;
			stepGoro = !stepGoro;
		}

		if (stepcountRen==5) {
			stepcountRen = 0;
			stepRen = !stepRen;
		}
		
		//collision check
		//first for goro ---> pancake
		var plateLeft = plateGoro.x;
		var plateRight = plateGoro.x + plateGoro.width;
		var fallLeft = falling.x;
		var fallRight = falling.x + falling.width;
		if ((plateGoro.y +3 <= falling.y + falling.height) && (plateGoro.y +plateGoro.height >= falling.y + falling.height) && ( (plateRight >= fallRight && plateLeft < fallRight) || (plateRight >= fallLeft && plateLeft < fallLeft) )) {
			falling.speed=0;
			pancakeListGoro[pcNrGoro] = {x: falling.x, y: falling.y};
			console.log("Goro");
			console.log(pancakeListGoro[pcNrGoro]);
			goroCaught = true;
			caught = true;
			pcNrGoro++;
		}
		//keep the pancakes in a stack!!!
			for (var i=0;i<Object.keys(pancakeListGoro).length;i++) {
				if(typeof pancakeListGoro[i] !== 'undefined'){
					var pcLeft = pancakeListGoro[i].x;
					var pcRight = pancakeListGoro[i].x + falling.width;
					if ((pancakeListGoro[i].y <= falling.y + falling.height) && (pancakeListGoro[i].y + falling.height >= falling.y + falling.height) &&( (pcRight >= fallRight && pcLeft < fallRight) || (pcRight >= fallLeft && pcLeft < fallLeft) )) {
						falling.speed=0;
						pancakeListGoro[pcNrGoro] = {x: falling.x, y: falling.y};
						goroCaught = true;
						caught = true;
						pcNrGoro++;
						break;
					}
				}
			}
		
		//goro ---> takoyaki
		fallLeft = fallingTako.x;
		fallRight = fallingTako.x + fallingTako.width;
		if ((plateGoro.y +3 <= fallingTako.y + fallingTako.height) && (plateGoro.y +plateGoro.height >= fallingTako.y + fallingTako.height) && ( (plateRight >= fallRight && plateLeft < fallRight) || (plateRight >= fallLeft && plateLeft < fallLeft) )) {
			fallingTako.speed=0;
			caughtTakoGoro = true;
			console.log(caughtTakoGoro);
		}
		//goro ----> coffeeeee
		fallLeft = fallingCoffee.x;
		fallRight = fallingCoffee.x + fallingCoffee.width;
		if ((plateGoro.y +3 <= fallingCoffee.y + fallingCoffee.height) && (plateGoro.y +plateGoro.height >= fallingCoffee.y + fallingCoffee.height) && ( (plateRight >= fallRight && plateLeft < fallRight) || (plateRight >= fallLeft && plateLeft < fallLeft) )) {
			fallingCoffee.speed=0;
			caughtCoffee = true;
		}
		
		//second for ren
		var plateLeft = plateRen.x;
		var plateRight = plateRen.x + plateRen.width;
		var fallLeft = falling.x;
		var fallRight = falling.x + falling.width;
		if ((plateRen.y +3 <= falling.y + falling.height) && (plateRen.y +plateRen.height >= falling.y + falling.height) && ( (plateRight >= fallRight && plateLeft < fallRight) || (plateRight >= fallLeft && plateLeft < fallLeft) )) {
			falling.speed=0;
			pancakeListRen[pcNrRen] = {x: falling.x, y: falling.y};
			console.log("Ren");
			console.log(pancakeListRen[pcNrRen]);
			goroCaught = false;
			caught = true;
			pcNrRen++;
		}

			for (var i=0;i<Object.keys(pancakeListRen).length;i++) {
				if(typeof pancakeListRen[i] !== 'undefined'){
					var pcLeft = pancakeListRen[i].x;
					var pcRight = pancakeListRen[i].x + falling.width;
					if ((pancakeListRen[i].y <= falling.y + falling.height) && (pancakeListRen[i].y + falling.height >= falling.y + falling.height) &&( (pcRight >= fallRight && pcLeft < fallRight) || (pcRight >= fallLeft && pcLeft < fallLeft) )) {
						falling.speed=0;
						pancakeListRen[pcNrRen] = {x: falling.x, y: falling.y};
						console.log(pancakeListRen[pcNrRen]);
						goroCaught = false;
						caught = true;
						pcNrRen++;
						break;
					}
				}
			}
		
		//ren ---> takoyaki
		fallLeft = fallingTako.x;
		fallRight = fallingTako.x + fallingTako.width;
		if ((plateRen.y +3 <= fallingTako.y + fallingTako.height) && (plateRen.y +plateRen.height >= fallingTako.y + fallingTako.height) && ( (plateRight >= fallRight && plateLeft < fallRight) || (plateRight >= fallLeft && plateLeft < fallLeft) )) {
			fallingTako.speed=0;
			caughtTakoRen = true;
			console.log(caughtTakoRen);
		}
		//ren ----> coffeeeee
		fallLeft = fallingCoffee.x;
		fallRight = fallingCoffee.x + fallingCoffee.width;
		if ((plateRen.y +3 <= fallingCoffee.y + fallingCoffee.height) && (plateRen.y +plateRen.height >= fallingCoffee.y + fallingCoffee.height) && ( (plateRight >= fallRight && plateLeft < fallRight) || (plateRight >= fallLeft && plateLeft < fallLeft) )) {
			fallingCoffee.speed=0;
			caughtCoffee = true;
		}
		// console.log("Pancakes ren");
		// console.log(Object.keys(pancakeListRen).length);
		// console.log("Pancakes goro");
		// console.log(Object.keys(pancakeListGoro).length);
		
		//pancake on ground -> missed by both of them
		if (falling.y > canvas.width) {
			newPancake();
			missed++;
		}
		
		//game over HEERE HRERE
		if (missed >= missedMax) {
			isPaused = true;
			gameOver = true;
			if(scoreGoro > scoreRen){
				$("#finalscore").html(scoreGoro);
				$("#winner").html("Goro!");
			}
			else{
				$("#finalscore").html(scoreRen);
				$("#winner").html("Ren!");
			}
			
			
			
			$("#gameover").toggle();
		}//falling tako while it is not caught 
		if(tako){
			if(caughtTakoGoro == false && caughtTakoRen == false){
				fallingTako.y += fallingTako.speed * modifier;
			}
			else{
				
				if(caughtTakoGoro){
					scoreGoro = parseInt(scoreGoro/2);
					tako = false;
				}
				else{
					if(caughtTakoRen){
						scoreRen = parseInt(scoreRen/2);
						tako = false;
					}
				}

			}
		}//falling coffee while it is not caught 
		if(coffee){
			if(caughtCoffee == false){
				fallingCoffee.y += fallingCoffee.speed * modifier;
			}
			else{
				if(missed > 0){
					missed -= 1;
				}
				coffee = false;
			}
		}
		if(caught==false) {
			falling.y += falling.speed * modifier;
		}
		else {
			if(goroCaught){
				pancakesCaughtGoro++;
				scoreGoro += pancakeSpeed;
			}
			else{
				pancakesCaughtRen++;
				scoreRen += pancakeSpeed;
			}
			if (pancakesCaughtGoro + pancakesCaughtRen < pcMax) {
				var chance = Math.floor((Math.random() * 10) + 1);
				if(chance < 3){
					newTakoyaki();
				}
				if(chance > 9){
					newCoffee();
				}
				newPancake();
			}
			else {
				level++;
				pancakeSpeed += 50;
				isPaused = true;
				newLevel();
				var chance = Math.floor((Math.random() * 10) + 1);
				if(chance < 3){
					newTakoyaki();
				}
				if(chance > 9){
					newCoffee();
				}
				newPancake();
			}
		}
		updateStats();
	};
	
	var newLevel = function() {
		//calculate bonus for both boisss
		//as in the neatness of each stack
		var maxheight = pancakeListGoro[0].y;  //max is top of stack=lower number
		var minwidth = 1000;
		var maxwidth = 0;
		for (var i=0;i<Object.keys(pancakeListGoro).length;i++) {
			if(pancakeListGoro[i].x < minwidth) {  //furthest left
				minwidth = pancakeListGoro[i].x;
			}
			if(pancakeListGoro[i].x + falling.width > maxwidth) {  //furthest right
				maxwidth = pancakeListGoro[i].x;
			}
			if(pancakeListGoro[i].y < maxheight) {  //highest
				maxheight = pancakeListGoro[i].y;
			}
		}
		if(Object.keys(pancakeListGoro).length !== 0)
			var heightbonus = Math.round(pancakeListGoro[0].y - maxheight)*2;
		var neatbonus = Math.round(500 - (maxwidth - minwidth));
		
		scoreGoro += heightbonus + neatbonus;
		$("#heightbonus").html(heightbonus);
		$("#neatbonus").html(neatbonus);

		maxheight = pancakeListGoro[0].y;
		minwidth = 1000;
		maxwidth = 0;
		for (var i=0;i<Object.keys(pancakeListRen).length;i++) {
			if(pancakeListRen[i].x < minwidth) {  //furthest left
				minwidth = pancakeListRen[i].x;
			}
			if(pancakeListRen[i].x + falling.width > maxwidth) {  //furthest right
				maxwidth = pancakeListRen[i].x;
			}
			if(pancakeListRen[i].y < maxheight) {  //highest
				maxheight = pancakeListRen[i].y;
			}
		}
		if(Object.keys(pancakeListRen).length !== 0)
			heightbonus = Math.round(pancakeListRen[0].y - maxheight)*2;
		neatbonus = Math.round(500 - (maxwidth - minwidth));

		scoreRen += heightbonus + neatbonus;

		pancakesCaughtGoro = 0;
		pancakesCaughtRen = 0;
		pcNrGoro = 0;
		pcNrRen = 0;
		pancakeListRen = {};
		pancakeListGoro = {};
		if(pcMax <= 40){
			pcMax += Math.floor((Math.random() * 5) + 1);
		}
		$("#heightbonus1").html(heightbonus);
		$("#neatbonus1").html(neatbonus);
		$("#score").html(scoreGoro);
		$("#score2").html(scoreRen);
		$("#newlevel").toggle();
	};
	
	var updateStats = function() {
		$("#lv").html(level);
		$("#caught").html(pancakesCaughtGoro + pancakesCaughtRen);
		$("#max").html(pcMax);
		$("#missed").html(missed);
		$("#missmax").html(missedMax);
		$("#score").html(scoreGoro);
		$("#score2").html(scoreRen);
	};
	
	var render = function () {
		//redrawing EVERYTHING
		ctx.drawImage(img_bg, 0 , 0);
		//walk animation
		if(!stepGoro) {
			ctx.drawImage(imgGoro, goro.x , goro.y);
		}
		else {
			ctx.drawImage(imgGoro2, goro.x , goro.y);
		}
		if(!stepRen) {
			ctx.drawImage(imgRen, ren.x , ren.y);
		}
		else {
			ctx.drawImage(imgRen2, ren.x , ren.y);
		}
		ctx.drawImage(imgPlate1, plateGoro.x , plateGoro.y);
		if(tako){
			ctx.drawImage(imgTakoyaki, fallingTako.x, fallingTako.y);
		}
		if(coffee){
			ctx.drawImage(imgCoffee, fallingCoffee.x, fallingCoffee.y);
		}
		ctx.drawImage(imgPancake, falling.x, falling.y);
		for (var i=0;i<Object.keys(pancakeListGoro).length;i++) {
				ctx.drawImage(imgPancake, pancakeListGoro[i].x, pancakeListGoro[i].y);
		}

		ctx.drawImage(imgPlate2, plateRen.x, plateRen.y);
		for (var i=0;i<Object.keys(pancakeListRen).length;i++) {
				ctx.drawImage(imgPancake, pancakeListRen[i].x, pancakeListRen[i].y);
		}
	};
	
	var main = function () {
		var now = Date.now();
		var delta = now - then;

		if(!gameOver) {
			if(!isPaused) {
				update(delta / 1000);//to call it every frame, like the unity script update
				render();
			}
		}
		
		then = now;

		// Request to do this again ASAP
		requestAnimationFrame(main);
	};
	
	var then = Date.now();
	
	main();
});

var resetGame = function() {
	pancakeListGoro = {};
	pancakeListRen = {};
	pcNrGoro = 0;
	pcNrRen = 0;
	caught=false;
	pcMax = 10;
	pancakesCaughtGoro = 0;
	pancakesCaughtRen = 0;
	missed = 0;
	missedMax = 3;
	level = 1;
	scoreGoro = 0;
	scoreRen = 0;
	pancakeSpeed = 150;
	
	falling.x = 300;
	falling.y = 0;
	falling.speed = 150;
	fallingTako.x = 100;
	fallingTako.y = 0;
	fallingTako.speed = 150;
	caughtTakoRen = false;
	caughtTakoGoro = false;
	caughtCoffee = false;

	$("#gameover").toggle();
	isPaused = false;
	gameOver = false;

};
