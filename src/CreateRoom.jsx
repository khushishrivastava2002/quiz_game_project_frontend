import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from './api';
import './CreateRoom.css';

const CreateRoom = ({ onClose }) => {
  const [adminName, setAdminName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');   

    if (!adminName.trim()) {
      setError('Admin Name is required.');
      return;
    }

    try {
      const roomData = await createRoom(adminName);
      console.log('Room created:', roomData);
      
      // Pass roomCode and adminName when navigating to QuestionGame
      navigate('/question-game', { state: { roomCode: roomData.room_code, adminName } });
      onClose();
    } catch (error) {
      setError('Error creating room. Please try again.');
    }
  };

  const handleLetsGoClick = (event) => {
    handleSubmit(event);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form className="form" onSubmit={handleSubmit}>
          <div className="title">
            Create a Room<br />
            <span>Fill in the details below</span>
          </div>
          <input
            className="input"
            name="adminName"
            placeholder="Admin Name"
            type="text"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <button 
            type="button"
            className="button-confirm"
            onClick={handleLetsGoClick}
          >
            Let’s go →
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
