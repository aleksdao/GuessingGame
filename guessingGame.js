/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
$(document).ready(function() {
	(function () {
		var playersGuess,
	    winningNumber = generateWinningNumber();

		var totalGuesses = 4;
		var guessesRemaining = totalGuesses;
		var guesses = [];
		/* **** Guessing Game Functions **** */

		// Generate the Winning Number
		console.log(winningNumber);
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
				if (playersGuess === winningNumber) {
					$('#feedback').text('You guessed right! Click Play Again to run it back :)').css('color','green');
					gameOver();
				}
				else if(NaN(playersGuess) || playersGuess <= 0 || playersGuess > 100) {
					$('feedback').text('Please input a number between 1 to 100');
				}
				else if (guesses.indexOf(playersGuess) >= 0) {
					$('#feedback').text('You already guessed this number. Try another one!');
				}
				else {
					guessesRemaining--;
					if (guessesRemaining === 0) {
						$('#feedback').text('You are out of guesses! Click Play Again to try another time!');
						gameOver();
					}
					else {
						guesses.push(playersGuess);
						$('#feedback').text(guessMessage()).css('color','red');
					}
				}
			}
			else {
				$('#feedback').text('Press Play Again to start over!');
			}
			// add code here
		}

		function gameOver() {
			$('#submit').prop('disabled', true);
			$('#hint-button').prop('disabled', true);
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
			$('#random-hint').text(hint);;
		}

		// Allow the "Player" to Play Again

		function playAgain(){
			winningNumber = generateWinningNumber(); // add code here
			guessesRemaining = totalGuesses;
			$('#feedback').text('');
			$('#random-hint').text('');
			$('#submit').prop('disabled', false);
			$('#hint-button').prop('disabled', false);
		}

		$('#submit').on('click', playersGuessSubmission;
		$('#guess').keyup(function(e) {
			if(e.keyCode === 13) {
				playersGuessSubmission();
			}
		});
		$('#hint-button').on('click', provideHint);
		$('#play-again').on('click', playAgain);
	})();
});
/* **** Event Listeners/Handlers ****  */