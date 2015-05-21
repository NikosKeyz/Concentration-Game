var EASY = 0;
var MEDIUM = 1;
var HARD = 2;

function Settings() {

	this.level = EASY;
	this.selection = 0;
	this.fontHeight = 45;
	this.bgImg = new Image();
	this.bgImg.src = "img/settingsBg.jpg";
	
	easy = new Button( "Easy", 
			195, (canvas.height/2 - this.fontHeight) - 10);
	medium = new Button( "Medium",
			150,(canvas.height/2 + this.fontHeight) - 30 );
	hard = new Button( "Hard",
			190,(canvas.height/2 + this.fontHeight * 2) - 5 );	
	
	this.draw = function() {
		
		/* Draw background */
		ctx.drawImage( this.bgImg, 0, 0 );
		
		/* Draw Main Menu */
		ctx.font="60px Georgia";
		
		switch ( this.selection ) {
			case EASY:
				ctx.fillStyle="#FFFFFF";
				easy.drawTextButton();
				ctx.fillStyle="#FF0000";
				medium.drawTextButton();
				hard.drawTextButton();
				break;
			case MEDIUM:
				ctx.fillStyle="#FF0000";
				easy.drawTextButton();
				ctx.fillStyle="#FFFFFF";
				medium.drawTextButton();
				ctx.fillStyle="#FF0000";
				hard.drawTextButton();
				break;
			case HARD:
				ctx.fillStyle="#FF0000";
				easy.drawTextButton();
				medium.drawTextButton();
				ctx.fillStyle="#FFFFFF";
				hard.drawTextButton();
				break;
		}
	};
	
}