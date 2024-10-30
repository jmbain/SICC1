import React, { useState, useEffect } from 'react';
import PangramDisplay from './PangramDisplay';
import TypingArea from './TypingArea';
import Timer from './Timer';
import ResultsSummary from './ResultsSummary';

const pangrams = [
  "The quick brown fox jumps over the lazy dog.",
  "Sphinx of black quartz, judge my vow.",
  // Add more pangrams as needed
];

const GamesPage = () => {
  const [currentPangram, setCurrentPangram] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [currentAttempt, setCurrentAttempt] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setCurrentPangram(pangrams[Math.floor(Math.random() * pangrams.length)]);
  }, []);

  const startGame = () => {
    setAttempts([]);
    setCurrentAttempt('');
    setTimer(0);
    setIsPlaying(true);
  };

  const handleTyping = (input) => {
    setCurrentAttempt(input);
  };

  const handleSubmit = () => {
    // Logic to save attempt time and accuracy
    const timeTaken = timer; // Replace with actual time calculation
    setAttempts([...attempts, { time: timeTaken, accuracy: calculateAccuracy(currentPangram, currentAttempt) }]);
    setCurrentAttempt('');
    // Check if three attempts are completed
    if (attempts.length + 1 === 3) {
      setIsPlaying(false);
    }
  };

  const calculateAccuracy = (pangram, attempt) => {
    // Logic for calculating accuracy
    return Math.abs(pangram.length - attempt.length);
  };

  return (
    <div>
      {isPlaying ? (
        <>
          <PangramDisplay pangram={currentPangram} />
          <Timer timer={timer} setTimer={setTimer} />
          <TypingArea currentAttempt={currentAttempt} onTyping={handleTyping} onSubmit={handleSubmit} />
        </>
      ) : (
        <ResultsSummary attempts={attempts} />
      )}
      <button onClick={startGame}>Play Again</button>
    </div>
  );
};

export default GamesPage;

