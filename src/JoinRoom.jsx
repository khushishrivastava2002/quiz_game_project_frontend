// JoinRoom.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { joinRoom } from './api';
import './CreateRoom.css';

const JoinRoom = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extracting the adminName from location state
  const adminName = location.state?.adminName || '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    if (!roomCode.trim()) {
      setError('Room Code is required.');
      return;
    }

    try {
      const joinData = await joinRoom(roomCode, username);
      console.log('Room joined:', joinData);

      // Pass roomCode, username, adminName, and isHost flag (false for participants) when navigating to QuestionGame
      navigate('/question-game', { state: { roomCode, username, adminName, isHost: false } });
      onClose();
    } catch (error) {
      setError(error.response?.data?.detail || 'Error joining room. Please check the room code and try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form className="form" onSubmit={handleSubmit}>
          <div className="title">
            Join a Room<br />
            <span>Enter your details below</span>
          </div>
          <input
            className="input"
            name="username"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input"
            name="roomCode"
            placeholder="Room Code"
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            required
          />
          {adminName && <div className="admin-name">Admin Name: {adminName}</div>} {/* Display admin name */}
          {error && <div className="error">{error}</div>}
          <button type="submit" className="button-confirm">Join Room →</button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
