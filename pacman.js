// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;

// Define your ghosts here
var Inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};
var Blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyoan',
  character: 'Speedy',
  edible: false
};
var Pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};
var Clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};
// replace this comment with your four ghosts setup as objects
var ghost = [Inky, Blinky, Pinky, Clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\nPower Pellets:   ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  for(i=0; i < ghost.length; i++){
    console.log('(',(i+1),')', ghost[i].name, '(', ghost[i].edible, ')');
  }
  console.log('(q) Quit');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  else {
    console.log('\nNo Power-Pellets left!');
  }
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatenGhost(numGhost){
  ghost.forEach(function(ghostStatus){
    if (ghostStatus.menu_option === numGhost) {
      if (ghostStatus.edible === false) {
        lives -= 1;
        console.log(ghost["name"] + ghost["colour"]);
        console.log('\nChomp!');
        checkLife(lives);

      }
      else if (ghostStatus.edible === true){
        score += 200;
        ghostStatus.edible = false;

      }
    }
  })
  }



function checkLife(lives){
  if (lives < 0){
    console.log('Game Over');
    process.exit();
  }
}

function eatPowerPellet(key){
  switch(key){
    case 'p':
      score += 50;
      for (var i = 0; i < ghost.length; i++) {
        ghost[i].edible = true;
      }
      powerPellets -= 1;
      break;
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
    case '2':
    case '3':
    case '4':
      eatenGhost(key);
      break;
    case 'p':
      if (powerPellets >= 0) {
      eatPowerPellet('p'); }
      else {
        console.log("No Power-Pellets left!");
      }
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
