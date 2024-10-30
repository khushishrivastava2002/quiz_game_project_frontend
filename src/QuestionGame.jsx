import React from 'react';
import { useLocation } from 'react-router-dom';
import './QuestionGame.css';

const QuestionGame = () => {
  const location = useLocation();
  const roomCode = location.state?.roomCode;

  return (
    <div className="question-game">
      <div className="room-code">Room Code: {roomCode}</div>
      {/* Question game screen content */}
    </div>
  );
};

export default QuestionGame;
    