function Stats( score ) {
	
	this.bgImg = new Image();
	this.bgImg.src = "img/statsBg.jpg"
	
	this.alert = function() {
		alert("Score:" + score );
	}
	
	this.draw = function() {
		
		ctx.drawImage( this.bgImg, 0, 0 );
		
		ctx.font = "40px Georgia";
		ctx.fillStyle = "#FF0000";
		
		ctx.fillText( "Score:" + score, 50, 50 );
		ctx.fillText( "Time:" + game.timer.seconds, 50, 100 );
	}
}