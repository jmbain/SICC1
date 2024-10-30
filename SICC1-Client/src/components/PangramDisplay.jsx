import React from 'react';

const PangramDisplay = ({ pangram }) => {
  return (
    <div>
      <h2>Pangram:</h2>
      <p>{pangram}</p>
    </div>
  );
};

export default PangramDisplay;