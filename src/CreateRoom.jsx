import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { createRoom } from './api'; // Import the createRoom function from api.jsx
import './CreateRoom.css';

const CreateRoom = ({ onClose }) => {
  const [adminName, setAdminName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous error messages

    try {
      const roomData = await createRoom(adminName); // Call createRoom from api.jsx
      console.log('Room created:', roomData);
      // Navigate to QuestionGame and pass room code
      navigate('/question-game', { state: { roomCode: roomData.room_code } });
      onClose(); // Close the modal after room creation
    } catch (error) {
      setError('Error creating room. Please try again.'); // Set error message
    }
  };

  // Separate function for handling "Let’s go →" button click
  const handleLetsGoClick = (event) => {
    handleSubmit(event); // Call handleSubmit when the button is clicked
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
            required // Makes the input field mandatory
          />
          {error && <div className="error">{error}</div>} {/* Display error message */}
          <button 
            type="button" // Change to button type
            className="button-confirm" 
            onClick={handleLetsGoClick} // Call the new function on button click
          >
            Let’s go →
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
