import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const pangrams = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "Jinxed wizards pluck ivy from the big quilt."
];

const Game = () => {
  const [started, setStarted] = useState(false);
  const [currentPangram, setCurrentPangram] = useState('');
  const [userInput, setUserInput] = useState('');
  const [keystrokes, setKeystrokes] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [resultTime, setResultTime] = useState(0); // Track result time
  const [accuracy, setAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);

  const [timer, setTimer] = useState(0);
  const startTimeRef = useRef(0);
  const timerRef = useRef(null);

  // Handle start button click
  const startGame = () => {
    const pangram = pangrams[Math.floor(Math.random() * pangrams.length)];
    setCurrentPangram(pangram);
    setUserInput('');
    setKeystrokes(0);
    setStarted(true);
    setGameEnded(false);
    setTimer(0);
    setWpm(0);

    // Record the start time when the game starts
    startTimeRef.current = Date.now();
  };

  // Handle user input change and track keystrokes (including backspace)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
  };

  // Track each key press (including backspace/deletion)
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
    clearInterval(timerRef.current); // Stop the timer when the game ends

    const actualKeystrokes = keystrokes;
    const minKeystrokes = currentPangram.length + 1; // The minimum keystrokes are the length of the pangram + 1 to account for hitting enter to end the game

    const calculatedAccuracy = minKeystrokes / actualKeystrokes; // Accuracy formula: minKeystrokes / actualKeystrokes
    const calculatedWpm = actualKeystrokes > 0 ? calculateWpm(actualKeystrokes, timer) : 0; // Calculate WPM if actualKeystrokes > 0

    setAccuracy(calculatedAccuracy);
    setWpm(calculatedWpm);
    setResultTime(timer); // Store the final timer result
    setGameEnded(true);
  };

  // Function to calculate words per minute (WPM)
  const calculateWpm = (keystrokes, timeInSeconds) => {
    // Calculate words per minute. Assuming 1 word = 5 characters.
    const wordsTyped = keystrokes / 5;
    const wpm = (wordsTyped / timeInSeconds) * 60; // Calculate WPM by dividing by time in seconds and multiplying by 60
    return wpm || 0; // If the result is NaN or infinity, return 0
  };

  // Handle when user presses enter
  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && userInput.trim() === currentPangram.trim()) {
      handleEndGame();
    }
  };

  // Effect to handle timer updates at millisecond precision
  useEffect(() => {
    if (started) {
      timerRef.current = setInterval(() => {
        const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
        setTimer(elapsedTime);
      }, 50);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [started]);

  useEffect(() => {
    if (started) {
      setCurrentPangram(pangrams[Math.floor(Math.random() * pangrams.length)]);
    }
    return () => clearInterval(timerRef.current);
  }, [started]);

  // Handle play again
  const handlePlayAgain = () => {
    setGameEnded(false);
    setStarted(false);
    setUserInput('');
    setKeystrokes(0);
    setAccuracy(0);
    setWpm(0);
    setResultTime(0);
    setTimer(0);
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
            onKeyUp={handleKeyUp} // Listen for enter key press to finish game
            onPaste={handlePaste} // Prevent paste action
            disabled={gameEnded}
            placeholder="Start typing here..."
            autoFocus
            slots={{
                input: (props) => <input {...props} autoComplete="off" />, // Disable autocomplete via custom input slot
              }}
          />
          
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            Time: {timer.toFixed(3)} seconds | Keystrokes: {keystrokes}
          </Typography>
        </>
      )}

      <Dialog open={gameEnded} onClose={handlePlayAgain}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Time: {resultTime.toFixed(3)} seconds</Typography>
          <Typography variant="h6">Accuracy: {(accuracy * 100).toFixed(2)}%</Typography>
          <Typography variant="h6">Words Per Minute: {wpm.toFixed(2)} WPM</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePlayAgain} color="primary">
            Play Again
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Game;
