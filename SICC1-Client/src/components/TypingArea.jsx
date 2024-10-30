import React from 'react';

const TypingArea = ({ currentAttempt, onTyping, onSubmit }) => {
  const handleChange = (e) => {
    onTyping(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <textarea
      value={currentAttempt}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="Start typing..."
    />
  );
};

export default TypingArea;
