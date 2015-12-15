/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {
	var playersGuess,
	    winningNumber = generateWinningNumber();

	var totalGuesses = 4;
	var guessesRemaining = totalGuesses;

	/* **** Guessing Game Functions **** */

	// Generate the Winning Number
	alert(winningNumber);
	function generateWinningNumber(){
		return Math.floor((Math.random() * 100) + 1);
		 // add code here
	}

	// Fetch the Players Guess

	function playersGuessSubmission(){
		playersGuess = +$('#guess').val();
		$('#guess').val('');
		checkGuess();
	}

	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(){
		var messageContents = {};
		var diff = playersGuess - winningNumber;
		if (diff > 0) {
			messageContents.compare = "higher";
		}
		else {
			messageContents.compare = "lower";
		}
		if (Math.abs(diff) > 10) {
			messageContents.range = "more than 10 digits away from";
		}
		else if (Math.abs(diff) < 10) {
			messageContents.range = "within 10 of";
		}
		return messageContents;
	}

	// Check if the Player's Guess is the winning number 

	function checkGuess(){
		if(guessesRemaining >= 0) {
			var guesses = [];
			if (playersGuess === winningNumber) {
				$('#feedback').text('You guessed right!');
			}
			else if (guesses.indexOf(playersGuess) >= 0) {
				$('#feedback').text('You already guessed this number. Try another one!');
			}
			else {
				guessesRemaining--;
				if (guessesRemaining === 0) {
					$('#feedback').text('You are out of guesses! Press Play Again to try another time!');
				}
				else {
					guesses.push(playersGuess);
					$('#feedback').text(guessMessage());
				}
			}
		}
		else {
			$('#feedback').text('Press Play Again to start over!');
		}
		// add code here
	}

	function guessMessage() {
		var hints = lowerOrHigher();
		return 'Your guess is ' + hints.compare + ' and ' + hints.range + ' the winning number. You have ' + guessesRemaining + ' guesses remaining!';
	}

	// Create a provide hint button that provides additional clues to the "Player"

	function provideHint(){
		var randomizer = Math.floor(Math.random() * 2);// add code here
		var hint = "";
		if(!randomizer) {
			hint =  "The following javascript expression \'winningNumber % 10\' returns " + winningNumber % 10;
		}
		else {
			guessesRemaining++;
			hint = "I won't give you another hint, but I'll give you one more guess. Guesses remaining now: " + guessesRemaining;
		}
		return hint;
	}

	// Allow the "Player" to Play Again

	function playAgain(){
		// add code here
	}

	$('#submit').on('click', function() {
		playersGuessSubmission();
	});
	$('#hint-button').on('click', function() {
		$('#random-hint').text(provideHint());
	});
});
/* **** Event Listeners/Handlers ****  */