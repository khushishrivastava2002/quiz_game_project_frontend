import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './QuestionGame.css';
import { endRoom, fetchRoomDetails } from './api';

const QuestionGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomCode = location.state?.roomCode;
  const adminName = location.state?.adminName;
  const isHost = location.state?.isHost;

  const [websocket, setWebSocket] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null);

  useEffect(() => {
    // Set up WebSocket connection
    const ws = new WebSocket(`ws://localhost:8000/ws/game/${roomCode}`);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Listen for messages from the WebSocket
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'game_over') {
        setPopupMessage('The game has ended. Redirecting to dashboard...');
        setGameEnded(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000); // Redirect after 2 seconds
      }
    };

    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    // Clean up WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, [navigate, roomCode]);

  useEffect(() => {
    // Fetch room details on component mount
    const fetchDetails = async () => {
      try {
        const details = await fetchRoomDetails(roomCode);
        setRoomDetails(details);
      } catch (error) {
        console.error('Failed to fetch room details:', error.message);
      }
    };

    fetchDetails();
  }, [roomCode]);

  const handleEndGame = async () => {
    try {
      await endRoom(adminName, roomCode);
      // Notify all participants that the game has ended
      if (websocket) {
        websocket.send(JSON.stringify({ type: 'END_GAME' }));
      }
      // Redirect the host immediately
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to end the game:', error.message);
    }
  };

  return (
    <div className="question-game">
      <div className="room-info">
        <div className="admin-name">Admin: {adminName}</div>
        {roomDetails && (
          <div className="players-list">
            Players:
            <ul>
              {roomDetails.players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="room-code">Room Code: {roomCode}</div>
      {isHost ? (
        <div className="game-buttons">
          <button className="button-start">Start Game</button>
          <button className="button-end" onClick={handleEndGame}>End Game</button>
        </div>
      ) : (
        <div className="waiting-message">
          {gameEnded ? 'The game has ended.' : 'Waiting for host to start the game...'}
        </div>
      )}

      {/* Display popup message if game is ended */}
      {popupMessage && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionGame;
