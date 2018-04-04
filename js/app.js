// Create the enemy constructor
var Enemy = function(x,y) {
  //Variables applied to each of our instances go here.
  //The image/sprite uses a helper we've provided to easily load
  //images to set the image for the enemy
  this.sprite = 'images/enemy-bug.png';

  // Set the enemy position
  this.x = x;
  this.y = y;

  //Use a speed multiplier for each enemy using a random
  //number. Math.random returns value b/w 0 (inclusive) and 1 (exclusive).
  //Multiply by 7 to get a higher #, and add 1 b/c math.random can
  //return 0 (enemy wouldn't move). Finally, Math.floor rounds down to
  // nearest integer (unless it's already an integer)*/
  this.multiplier = Math.floor((Math.random() * 7) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // Set the position of the enemy based on dt and the multiplier
  // enemy is moved 110 pixels per dt and multiplier - the multiplier determines the speed
  this.x = this.x + 110 * dt * this.multiplier;

  // Check for collisions with the player - only checking for equal y values -
  //then checking to see if within left player boundary (x-40), then within
  //right player boundary (x+40)
  if (this.y == player.y && (this.x > player.x - 40 && this.x < player.x + 40)) {

  // Reset the player to original position
    player.reset();
    player.score--;
    //this grabs the html content of the score class (from the index file),
    //then replaces its HTML contents with Score + new score
    document.getElementsByClassName('score')[0].innerHTML = "Score: " + player.score;
    }

  // If the enemy goes off of the board, reset it
  if (this.x > 650) {
    this.reset();
  }
};

// Reset the enemy to the left of the canvas with a new y position
// and a new speed multiplier.
Enemy.prototype.reset = function() {
  this.x = -300;
  var yValues = [220, 140, 60];
  //this line selects one of the above index values as y - with 0 as
  //option since math.random returns values b/w zero and 1, so if
  //math.random returns 0-.33 (this.y = [0]), .34-.66 (this.y = [1]),
  //.67-.99 (this.y = [2])
  this.y = yValues[Math.floor(Math.random() * 3)];
  this.multiplier = Math.floor((Math.random() * 7) + 1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//PLAYER CLASS

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Create the Player constructor
var Player = function(x,y) {

  // assign image to player
  this.sprite = 'images/char-boy.png';

  // Set the player's position
  this.x = x;
  this.y = y;

  // Store the original position of the player so you can reset
  this.xOriginal = x;
  this.yOriginal = y;

  //Score variable
  this.score = 0;
};

Player.prototype.handleInput = function(dir) {

  // Change the player's position based on the user keyboard input
  if (dir == 'up') {
    this.y = this.y - 80;
  } else if (dir == 'down') {
    this.y = this.y + 80;
  } else if (dir == 'left') {
    this.x = this.x - 101;
  } else if (dir == 'right') {
    this.x = this.x + 101;
  }

  // Check the position of the player
  if (this.x < 0) {
    // Player is off to the left side of the canvas, move the player
    // back to zero (left-most square)
    this.x = 0;

  } else if (this.x > 505) {
    // Player is off to the right side of the canvas, move the player
    // back to the right-most square (606)
    this.x = 505;
  } else if (this.y > 300) {
    this.y = 300;
  } else if (this.y <= -20) {
    this.reset();
    alert("You got to da wataaa! You get a point! Do it again.");
    this.score++;
    //this grabs the html content of the score class (from the index file),
    //then replaces its HTML contents with Score + new score
    document.getElementsByClassName('score')[0].innerHTML = "Score: " + this.score;
  }
};

// Reset the player to original coords
Player.prototype.reset = function() {
  this.x = this.xOriginal;
  this.y = this.yOriginal;
};

// Update the player's position
Player.prototype.update = function() {
  this.x = this.x;
  this.y = this.y;
};

// Render the player to the canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // Pass the values to the handleInput method
  player.handleInput(allowedKeys[e.keyCode]);
});

//Instantiate your objects

// Create allEnemies array, which will hold all of the
// enemy objects
var allEnemies = [];
// Set varaiables for the possible y values
var yValues = [220, 140, 60];

// Create 9 enemy instances
for (var i = 0; i < 9; i++) {

  // Set an initial x-position to the left of the canvas based on a random value
  //reset method takes care of new x position for every instance after this
  var x = Math.floor(Math.random() * -100);

  // Set a starting y-position based on a random selection
  // of the 3 possible y indexes declared above
  var y = yValues[Math.floor(Math.random() * 3)];

  // Create the new enemy object
  var enemy = new Enemy(x, y);

  // Push the enemy into the array
  allEnemies.push(enemy);
}

// Instantiate the player
var player = new Player(303, 300);
