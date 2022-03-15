/*

Jovita Nez
CPI 101
02 / 28 / 2022

Yahtze Lite Program
Allow player to roll 5 dice 3 times to get a large straight, which is
1,2,3,4,5 or 2,3,4,5,6 
Before each roll, the player can keep some die and roll only the rest.
	
*/

// variables used in program
var numberDice = 5;
var keeper = new Array(numberDice);
var dieValue = new Array(numberDice);

// current number of rolls by player
var rollNumber;



// variables used to refer to page elements
var dieImages = new Array(numberDice);    // roll die img  
var messages;                             // "messages" paragraph
var gameOverMessage;                      // "gameOverMessage" paragraph
var playButton;                           // Play button
var rollButton;                           // Roll button
var diceRollingAudio 					   // audio clip for dice

// starts a new game when click Play
function startGame() {
	console.log("Entered startGame()");
	// initialize number of rolls; incremented in rollDice
	rollNumber = 0;
	// prepare the GUI
	rollButton.disabled = false;
	playButton.disabled = true;
	gameOverMessage.innerHTML = "";
	// roll the dice to start the game
	resetKeeper();
	rollDice();

} // end function startGame

// roll the dice
// this is called by startGame and it is the Roll button event listener
function rollDice() {
	console.log("rollDice: entered");

	// increment the number times dice rolled
	rollNumber = rollNumber + 1;
	// roll the dice

	for (var i = 0; i < numberDice; ++i) {
		keeper[i] = document.getElementById("keeper" + (i + 1));
		if (keeper[i].disabled == false) {
			dieValue[i] = Math.floor(1 + Math.random() * 6);
		}
	}
	// play dice rolling sound 
	// and this event "ended" calls showDice (set up in start())
	console.log("rollDice: play audio");
	diceRollingAudio.play();

	// modify the messages innerHTML based on the results
	// there are 3 options: win, lose, keep rolling
	switch (rollNumber) {
		case 1:
			if (checkLargeStraight() == true) {
				messages.innerHTML = "You Win!!! Click Play to play again.";
				rollButton.disabled = true;
				playButton.disabled = false;
			} else {
				messages.innerHTML = "keep rolling";
			}
			break;
		case 2:
			if (checkLargeStraight() == true) {
				messages.innerHTML = "You Win!!! Click Play to play again.";
				rollButton.disabled = true;
				playButton.disabled = false;
			} else {
				messages.innerHTML = "keep rolling";
			}
			break;
		case 3:
			if (checkLargeStraight() == true) {
				messages.innerHTML = "You Win!!! Click Play to play again.";
				rollButton.disabled = true;
				playButton.disabled = false;
			} else {
				gameOver();
			}
			break;
		default:
			gameOver();
			break;
	}


} // end function rollDice

function checkLargeStraight() {

	console.log("checkLargeStraight: entered");
	// variables for 2 possible large straights all initialized to true
	// ss1 corresponds to 1,2,3,4,5  and ss2 to 2,3,4,5,6
	var result = true;
	var ss1 = [1, 2, 3, 4, 5];
	var ss2 = [2, 3, 4, 5, 6];
	// copy values so original not changed
	var copy = new Array(numberDice);
	for (i = 0; i < numberDice; i++) {
		copy[i] = dieValue[i];
	}

	// sort die values
	for (a = 0; a < numberDice - 1; a++) {
		for (b = 0; b < numberDice; b++) {
			copy.sort();
		}
	}
	// check if copy matches ss1
	for (i = 0; i < numberDice; i++) {
		if (copy[i] != ss1[i]) {
			result = false;
		}
	}
	if (result == true) {
		return true;
	}
	// reset result to test ss2
	result = true;
	// check if copy matches ss2
	for (i = 0; i < numberDice; i++) {
		if (copy[i] != ss2[i]) {
			result = false;
		}
	}

	// return result
	// true is winner and false is not winner (lose or continue)
	return result;
}


// send game over message using a special font and/or color
// reset the Play and Roll buttons
// (no need to reset the keepers; player might want to see current state)
function gameOver() {
	console.log("gameOver: entered");
	messages.innerHTML = " ";
	gameOverMessage.innerHTML = "Sorry. You Lose. Click Play to play again.";
	rollButton.disabled = true;
	playButton.disabled = false;
}

// sets all kepper buttons to keep? value and enables them
function resetKeeper() {
	console.log("resetKeeper: entered");
	for (var i = 0; i < numberDice; ++i) {
		keeper[i] = document.getElementById("keeper" + (i + 1));
		keeper[i].disabled = false;
		keeper[i].value = "keep?";
	}
}

// comparison function for use with sort
function compareIntegers(value1, value2) {
	return parseInt(value1) - parseInt(value2);
} // end function compareIntegers    

// display rolled dice
function showDice() {
	console.log("showDice: entered");
	for (var i = 0; i < numberDice; ++i) {
		setImage(dieImages[i], dieValue[i]);
	}

} // end function showDice

// set image source for a die
function setImage(dieImages, dieValue) {
	if (isFinite(dieValue))
		dieImages.src = "die" + dieValue + ".png";
	else
		dieImages.src = "blank.png";
} // end function setImage


// No changes needed to this function
function updateKeeper() {
	console.log("updateKeeper: disabled? =", this.disabled);
	if (rollNumber >= 1) {
		this.disabled = true;
		this.value = "keeper";
	};
}

// load event -- event handler
// get page elements to interact with and register event listeners 
function start() {
	console.log("start: entered");

	// page elements and event listeners associated with them
	playButton = document.getElementById("playButton");
	playButton.addEventListener("click", startGame);

	rollButton = document.getElementById("rollButton");
	rollButton.addEventListener("click", rollDice);

	diceRollingAudio = document.getElementById("diceRollingAudio");
	// once audio ended, show dice
	diceRollingAudio.addEventListener("ended", showDice);

	messages = document.getElementById("messages");
	gameOverMessage = document.getElementById("gameOverMessage");

	for (var i = 0; i < numberDice; ++i) {
		dieImages[i] = document.getElementById("die" + (i + 1));
	};

	// prepare the GUI
	rollButton.disabled = true; // disable rollButton
	playButton.disabled = false;  // enable play button

	// set image to blank before games start
	for (var i = 0; i < numberDice; ++i) {
		setImage(dieImages[i]);
	};

	// extract page element for keeper buttons
	// identify event handler
	// set disabled flag to roll all dice

	for (var i = 0; i < numberDice; ++i) {
		keeper[i] = document.getElementById("keeper" + (i + 1));
		keeper[i].disabled = false;
		keeper[i].addEventListener("click", updateKeeper);
	}


} // end function start

window.addEventListener("load", start);