import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const pangrams = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "Jinxed wizards pluck ivy from the big quilt."
];

const Game = () => {
  const [started, setStarted] = useState(false); // Game started or not
  const [currentPangram, setCurrentPangram] = useState('');
  const [userInput, setUserInput] = useState('');
  const [keystrokes, setKeystrokes] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [resultTime, setResultTime] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const [timer, setTimer] = useState(0); // Timer state (in milliseconds)
  const startTimeRef = useRef(0); // Start time reference
  const timerRef = useRef(null); // Timer interval reference

  // Handle start button click
  const startGame = () => {
    const pangram = pangrams[Math.floor(Math.random() * pangrams.length)];
    setCurrentPangram(pangram);
    setUserInput('');
    setKeystrokes(0);
    setStarted(true);
    setGameEnded(false);
    setTimer(0); // Reset timer at the start

    // Record the start time when the game starts
    startTimeRef.current = Date.now();
  };

  // Handle user input change and track keystrokes (including backspace)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  };

  // Track each keypress (including backspace/deletion)
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setKeystrokes((prevKeystrokes) => prevKeystrokes + 1); // Backspace counts as a keystroke
    } else if (e.key !== 'Shift' && e.key !== 'CapsLock' && e.key !== 'Tab') {
      // Regular keys
      setKeystrokes((prevKeystrokes) => prevKeystrokes + 1);
    }
  };

  // Prevent paste action
  const handlePaste = (e) => {
    e.preventDefault(); // Block the paste action
    alert("Pasting is not allowed. Please type the pangram manually.");
  };

  // End the game and calculate results
  const handleEndGame = () => {
    clearInterval(timerRef.current); // Stop the timer when game ends
    const actualKeystrokes = keystrokes;
    const minKeystrokes = currentPangram.length; // The minimum keystrokes are just the length of the pangram
    const calculatedAccuracy = minKeystrokes / actualKeystrokes;

    setAccuracy(calculatedAccuracy);
    setResultTime(timer); // Store the final timer result
    setGameEnded(true);

    // Post the results to the local db.json
    postGameResults();
  };

  // Handle when user presses enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim() === currentPangram.trim()) {
      handleEndGame();
    }
  };

  // Effect to handle timer updates at millisecond precision
  useEffect(() => {
    if (started) {
      // Start a timer interval when the game starts
      timerRef.current = setInterval(() => {
        // Update the timer by calculating the elapsed time in milliseconds
        const elapsedTime = (Date.now() - startTimeRef.current) / 1000; // Time in seconds as float
        setTimer(elapsedTime); // Update the timer state with milliseconds precision
      }, 50); // Update every 50ms for more precision
    }

    // Clean up the timer interval when the game ends or component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [started]); // Only run this effect when `started` changes

  useEffect(() => {
    // Start the game if it has started
    if (started) {
      setCurrentPangram(pangrams[Math.floor(Math.random() * pangrams.length)]);
    }
    return () => clearInterval(timerRef.current);
  }, [started]);

  // Function to post the game results to db.json
  const postGameResults = async () => {
    const gameData = {
      time: resultTime.toFixed(3),  // Time in seconds as a float
      accuracy: (accuracy * 100).toFixed(2), // Accuracy as a percentage
      keystrokes: keystrokes
    };

    try {
      const response = await fetch('http://localhost:5000/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
      });

      if (response.ok) {
        console.log('Game results saved successfully');
      } else {
        console.error('Error saving game results:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {!started ? (
        <Button variant="contained" color="primary" onClick={startGame}>
          Play
        </Button>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Type this Pangram:
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '20px' }}>
            {currentPangram}
          </Typography>
          
          <TextField
            variant="outlined"
            fullWidth
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}  // Listen for key down events
            onKeyPress={handleKeyPress} // Listen for enter key press to finish game
            onPaste={handlePaste} // Prevent paste action
            disabled={gameEnded}
            placeholder="Start typing here..."
            autoFocus
          />
          
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Time: {timer.toFixed(3)} seconds | Keystrokes: {keystrokes} {/* Displaying seconds as float */}
          </Typography>
        </>
      )}

      <Dialog open={gameEnded} onClose={() => setGameEnded(false)}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Time: {resultTime.toFixed(3)} seconds</Typography> {/* Display final time as float */}
          <Typography variant="h6">Accuracy: {(accuracy * 100).toFixed(2)}%</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setGameEnded(false); // Close dialog
              setStarted(false);   // Reset game state for replay
            }}
            color="primary"
          >
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Game;

