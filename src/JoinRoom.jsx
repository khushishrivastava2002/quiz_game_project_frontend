import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinRoom } from './api'; // Importing joinRoom from api.js
import './CreateRoom.css';

const JoinRoom = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Check if both fields are provided
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    if (!roomCode.trim()) {
      setError('Room Code is required.');
      return;
    }

    try {
      const joinData = await joinRoom(roomCode, username); // Pass roomCode and username
      console.log('Room joined:', joinData);

      // Navigate to the join room page and pass username and roomCode
      navigate('/question-game', { state: { roomCode, username } });
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
          {error && <div className="error">{error}</div>}
          <button type="submit" className="button-confirm">Join Room →</button> {/* Change to type="submit" */}
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
