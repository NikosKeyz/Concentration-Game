/* Card States */
var FACE_DOWN = 0;
var FACE_UP = 1;
var FOUND = 2;

function Card(i) {
	
	this.state = FACE_DOWN;
	this.cImg = new Image();
	this.cImg.src = "img/monster/" + i + ".jpg";
	
}