import React from 'react';

const ResultsSummary = ({ attempts }) => {
  return (
    <div>
      <h2>Results Summary</h2>
      {attempts.map((attempt, index) => (
        <div key={index}>
          <p>Attempt {index + 1}: {attempt.time}s - Accuracy: {attempt.accuracy}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsSummary;
