import React from 'react';
import { useLocation } from 'react-router-dom';
import './QuestionGame.css';

const QuestionGame = () => {
  const location = useLocation();
  const roomCode = location.state?.roomCode;
  const adminName = location.state?.adminName; // Retrieve adminName

  return (
    <div className="question-game">
      <div className="room-info">
        <div className="room-code">Room Code: {roomCode}</div>
        <div className="admin-name">Admin: {adminName}</div> {/* Display admin name */}
      </div>
      {/* Question game screen content */}
    </div>
  );
};

export default QuestionGame;
