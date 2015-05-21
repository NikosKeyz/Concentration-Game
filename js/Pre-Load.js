gameState = "mainMenu";

myMainMenu = new MainMenu();
myMainMenu.load();

settings = new Settings();

fps = 20;
msUpdate = 1000/fps;

keyAudio = new Audio("./audio/key_pressed.wav");