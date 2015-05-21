document.addEventListener("keydown", keyPressed, true);

function keyPressed(e) {
		
	switch ( gameState ) {	
		case "inGame":
			inGameInput(e);
			break;
		case "mainMenu":
			mainMenuInput(e);
			break;
		case "stats": // when you are at stats screen, whatever key user press
			gameState = "mainMenu"; // return to main menu
		case "settings":
			settingsInput(e);
			break;
	}

	keyAudio.play();
};

function mainMenuInput(e) {
	switch (e.keyCode) {
		case 32: // Space
			if ( myMainMenu.selection%2 == 1 ) {
				console.log("Loading new game...");
				game = new Game( settings.level );
				game.load();
			} else {
				gameState = "settings";
			}		
			break;
		case 38: // Up
			myMainMenu.selection += 1;
			break;
		case 40: // Down
			myMainMenu.selection += 1;
			break;
	}
}

function inGameInput(e) {
	
		switch (e.keyCode) {
		case 32: // Space
			// if the card below cursor is face down
			if ( game.mixedCardSet[game.cursor].state == FACE_DOWN ) {
				game.mixedCardSet[game.cursor].state = FACE_UP; // turn it face up
				game.score -= 50; // and remove 50 points from score
			} 
			break;
		case 37: // Left
			if( game.cursor != 0 )
				game.cursor -= 1; 
			break;
		case 38: // Up
			if( game.cursor - 6 >= 0 )
				game.cursor -= 6; 
			break;
		case 39: // Right
			if( game.cursor != (game.mixedCardSet.length - 1) )
				game.cursor += 1; 
			break;
		case 40: // Down
			if( game.cursor + 6 <= (game.mixedCardSet.length - 1) )
				game.cursor += 6; 
			break;
		case 27: // Esc
			console.log("Game Reset...");
			gameState = "mainMenu";
			break;
	}
	
}

function settingsInput(e) {
	switch (e.keyCode) {
		case 32: // Space
			settings.level = settings.selection;
			console.log("Level changed to " + settings.level );
			gameState = "mainMenu";
			break;
		case 38: // Up
			if ( settings.selection != EASY )
				settings.selection--;
			break;
		case 40: // Down
			if ( settings.selection != HARD )
				settings.selection++;
			break;
		case 27: // Esc
			gameState = "mainMenu";
			break;
	}
	
}

/*
	switch (e.keyCode) {
		case 32: // Space
			return "space";
			break;
		case 37: // Left
			return "left";
			break;
		case 38: // Up
			return "up";
			break;
		case 39: // Right
			return "right";
			break;
		case 40: // Down
			return "down";
			break;
		case 27: // Esc
			return "esc";
			break;
	}
*/