function Timer() {
	
	this.seconds = 0;
	this.frames = 0;
	
	this.addFrame = function() {
		this.frames++;
		
		if ( this.frames == 20 ) {
			this.seconds++;
			this.frames = 0;
		}
	};
}