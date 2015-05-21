function MainMenu ( ) {
	
	this.selection = 1;
	this.FontHeight = 45;
	this.bgImg;
	
	this.load = function() {
		this.bgImg = new Image();
		this.bgImg.src = "img/mainMenuBg.jpg";

		play = new Button( "PLAY", 
			180, (canvas.height/2 - this.FontHeight) );
		settingsB = new Button( "Settings",
			150,(canvas.height/2 + this.FontHeight) - 10 );
	};
	
	this.draw = function() {
		
		/* Draw background */
		ctx.drawImage( this.bgImg, 0, 0 );
		
		/* Draw Main Menu */
		ctx.font="60px Georgia";
		
		if ( this.selection%2 == 1 ) {
			ctx.fillStyle="#FFFFFF";
			play.drawTextButton();
			ctx.fillStyle="#FF0000";
			settingsB.drawTextButton();
		} else {
			ctx.fillStyle="#FF0000";
			play.drawTextButton();
			ctx.fillStyle="#FFFFFF";
			settingsB.drawTextButton();	
		}			
		
	};
	
}