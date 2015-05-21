function Game( level ) {
	
	this.bgImg;
	this.bcIdle;
	this.tick;
	this.bcWidth = 75;
	this.bcCheck;
	this.winAudio;
	this.padding = 9,5;
	
	this.level = level;
	this.score = 1000;
	this.timer;
	this.cursor = 0;
	this.cardSet;
	this.mixedCardSet;
	
	this.load = function() {
		
		/* Load Images  */
		this.bgImg = new Image();
		this.bgImg.src = "img/inGameBg.jpg";
		this.bcIdle = new Image();
		this.bcIdle.src = "img/bc75idle.jpg";
		this.bcCheck = new Image();
		this.bcCheck.src = "img/bc79check.jpg";
		this.tick = new Image();
		this.tick.src = "img/tick.jpg";
		this.winAudio = new Audio("./audio/win.wav");
		
		/* Collect monster cards */
		this.cardSet = new Array();
		switch( this.level ) {
			case EASY:
				for( var i=0; i<3; i++) {
					for ( var j=0; j<2; j++) {
						this.cardSet.push( new Card(i+1) );
					}
				}
				break;
			case MEDIUM:
				for( var i=0; i<6; i++) {
					for ( var j=0; j<2; j++) {
						this.cardSet.push( new Card(i+1) );
					}
				}
				break;
			case HARD:
				for( var i=0; i<9; i++) {
					for ( var j=0; j<2; j++) {
						this.cardSet.push( new Card(i+1) );
					}
				}
				break;
		}
		
		/* Double and mix monster cards */
		this.mixedCardSet = new Array();
		this.mixCards();
		
		/* Game now is ready to start */
		console.log("Game ready...");
		gameState = "inGame";
		this.timer = new Timer();
	};
	
	this.draw = function() {
		
		/* Draw background */
		ctx.drawImage( this.bgImg, 0, 0 );
		
		ctx.font="30px Georgia";
		/* Draw Score */
		ctx.fillText( "Score:" + this.score, 20, 40 );
		/* Draw Time */
		ctx.fillText( "Time:" + this.timer.seconds, 380, 40 );
		
		this.drawBoard();

	};
	
	this.drawBoard = function() {
		
		switch ( this.level ) {
			case EASY:
				this.drawEasyBoard();		
				break;
			case MEDIUM:
				this.drawMediumBoard();
				break;
			case HARD:
				this.drawHardBoard();
				break;
		}

	}
	
	this.drawEasyBoard = function() {

		var x;
		var y = 200;
		
		// For each card of the board
		for ( var i=0; i<this.mixedCardSet.length; i++) {
			// Compute x position of this card
			x = this.padding + (this.bcWidth + this.padding)*i;
			this.drawCard( i, x, y);
		}	
	};
	
	this.drawMediumBoard = function() {

		var x;		
		var y = 150;
		var i;
		/* Draw first line */
		for ( i=0; i<this.mixedCardSet.length/2; i++) {
			// Compute x position of this card
			x = this.padding + (this.bcWidth + this.padding)*i;
			this.drawCard( i, x, y);
		}	
		
		/* Draw second line */
		y = 300;
		for ( i=this.mixedCardSet.length/2; i<this.mixedCardSet.length; i++ ) {
			x = this.padding + (this.bcWidth + this.padding)*(i-6);
			this.drawCard( i, x, y);
		}
		
	}
	
	this.drawHardBoard = function() {

		var x;
		var y;
		var i;
		
		/* Draw first line */
		var y = 80;
		for ( i=0; i<6; i++) {
			// Compute x position of this card
			x = this.padding + (this.bcWidth + this.padding)*i;
			this.drawCard( i, x, y);
		}	
		
		/* Draw second line */
		y = 210;
		for ( i=6; i<12; i++ ) {
			x = this.padding + (this.bcWidth + this.padding)*(i-6);
			this.drawCard( i, x, y);
		}
		
		/* Draw third line */
		y = 350;
		for ( i=12; i<18; i++ ) {
			x = this.padding + (this.bcWidth + this.padding)*(i-12);
			this.drawCard( i, x, y);
		}			
	}
	
	this.drawCard = function( i, x, y) {
		
		if ( this.mixedCardSet[i].state == FACE_DOWN ) {
			if ( this.cursor == i ) { // if the check cursor is upon this card and card is facing down
				ctx.drawImage( this.bcCheck, x, y);
			} else { // if the card is facing down and cursor upon another card
				ctx.drawImage( this.bcIdle, x, y);
			}
		} else if ( this.mixedCardSet[i].state == FACE_UP ){ // if this card is facing up
			if ( this.cursor == i ) {	
				ctx.beginPath();
				ctx.rect( x-1, y-1, 81, 113);
				ctx.stroke();
			}
			ctx.drawImage( this.mixedCardSet[i].cImg, x, y);
		} else { // if this card has matched
			if ( this.cursor == i ) {	
				ctx.beginPath();
				ctx.rect( x-1, y-1, 77, 107);
				ctx.stroke();
			}
			ctx.drawImage( this.tick, x, y);
		}	
		
	}
	
	/* Take each card of the set 
	   and randomly place it on the beginning or the end
	   of the new mixed card-set */ //setting index values
	this.mixCards = function() {
		
		var randDecision;
		
		if ( this.level == EASY ) {
			for ( var i=0; i<6; i++) {
				randDecision = Math.floor((Math.random() * 2) + 1); // 1 for adding at the start, 2 for adding at the end
				if ( randDecision == 1 ) {
					this.mixedCardSet.unshift( this.cardSet.pop() );
				} else {
					this.mixedCardSet.push( this.cardSet.pop() );
				}
			}
		}
		if ( this.level == MEDIUM ) {
			for ( var i=0; i<12; i++) {
				randDecision = Math.floor((Math.random() * 2) + 1); // 1 for adding at the start, 2 for adding at the end
				if ( randDecision == 1 ) {
					this.mixedCardSet.unshift( this.cardSet.pop() );
				} else {
					this.mixedCardSet.push( this.cardSet.pop() );
				}
			}
		}
		if ( this.level == HARD ) {
			for ( var i=0; i<18; i++) {
				randDecision = Math.floor((Math.random() * 2) + 1); // 1 for adding at the start, 2 for adding at the end
				if ( randDecision == 1 ) {
					this.mixedCardSet.unshift( this.cardSet.pop() );
				} else {
					this.mixedCardSet.push( this.cardSet.pop() );
				}
			}
		}
		
	};
	
	this.logic = function() {
		
		/* if doesnt find match between two faced up cards, face down all cards except matched */
		this.checkMatch(); 
		/* Check if the game end */	
		this.checkEnd();	
	
	};
	
	this.checkMatch = function() {

		var faceUp = 0;	
		var faceUpA = -1; // -1 value for "not found face up card" meaning
		var faceUpB = -1;
		
		/*Count how many cards facing up */
		for ( var i=0; i<this.mixedCardSet.length; i++) {
			if ( this.mixedCardSet[i].state == FACE_UP ) {
				faceUp++;
				/* Store the position of faced up card */
				if ( faceUpA == -1 ) {
					faceUpA = i;
				} else {
					faceUpB = i;
				}
			}
		}
		
		/* If 2 cards face up */
		if ( faceUp == 2 ) { 
			// if 2 cards face up are the same check them as FOUND
			if( this.mixedCardSet[faceUpA].cImg.src == this.mixedCardSet[faceUpB].cImg.src ) {
				this.mixedCardSet[faceUpA].state = FOUND;
				this.mixedCardSet[faceUpB].state = FOUND;
			} else {
				this.resetUnmatchedCards();
			}
		}
	}
	
	this.resetUnmatchedCards = function() {
		for ( var i=0; i<this.mixedCardSet.length; i++) {
			if ( this.mixedCardSet[i].state != FOUND ) { // except the cards that have matched
				this.mixedCardSet[i].state = FACE_DOWN;	
			}
		}
	};
	
	this.checkEnd = function() {
		
		var found = 0;
		
		for ( var i=0; i<this.mixedCardSet.length; i++) {
			if ( this.mixedCardSet[i].state == FOUND) {
				found++;
			}
		}
		
		// If all cards are matched
		if ( found == this.mixedCardSet.length ) {
			
			this.winAudio.play();
			
			stats = new Stats( this.score, this.timer );
			gameState = "stats"; 

		}
		
	};

}