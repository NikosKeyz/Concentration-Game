window.onload = function() { // when window has load and our assets are ready
	setInterval( update, 50 ); // start update-draw our canvas every 50ms
};

function update() {
	
	switch (gameState) {
		case "inGame":
			game.draw();
			game.logic();
			game.timer.addFrame();
			break;
		case "mainMenu":
			myMainMenu.draw();
			break;
		case "settings":
			settings.draw();
			break;
		case "stats":
			stats.draw();
			break;
	}
	
}
