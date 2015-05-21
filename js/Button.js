function Button ( name, x, y ) {
	
/* Constructor */
	this.name = name;
	this.x = x;
	this.y = y;

	console.log("Object created. Type: Button Name:" + this.name + "\t x:" + this.x + "\t y:" + this.y );

/* Methods */
	this.drawTextButton = function() {
		ctx.fillText( this.name, this.x, this.y );
	};
}