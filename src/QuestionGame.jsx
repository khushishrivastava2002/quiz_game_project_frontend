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

    // Set up WebSocket connection
    const ws = new WebSocket(`ws://localhost:8000/ws/game/${roomCode}`);
    setWebSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'player_list_update') {
        // Update the player list when a new player joins
        setRoomDetails((prevDetails) => ({
          ...prevDetails,
          players: data.players
        }));
      } else if (data.type === 'start_game') {
        // Navigate to QuestionShow when the game starts
        navigate('/questionshow', { state: { roomCode, adminName } });
      } else if (data.type === 'game_over') {
        setPopupMessage('The game has ended. Redirecting to dashboard...');
        setGameEnded(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
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

  const handleEndGame = async () => {
    try {
      await endRoom(adminName, roomCode);
      if (websocket) {
        websocket.send(JSON.stringify({ type: 'END_GAME' }));
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to end the game:', error.message);
    }
  };

  const handleStartGame = () => {
    if (websocket) {
      websocket.send(JSON.stringify({ type: 'start_game' }));
    }
    navigate('/questionshow', { state: { roomCode, adminName } });
  };

  return (
    <div className="question-game">
      {isHost && (
        <button className="button-end-top-right" onClick={handleEndGame}>
          End Game
        </button>
      )}
      <div className="cardque">
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
            <button className="button-start" onClick={handleStartGame}>
              Start Game
            </button>
          </div>
        ) : (
          <div className="waiting-message">
            {gameEnded ? 'The game has ended.' : 'Waiting for host to start the game...'}
          </div>
        )}
        {popupMessage && (
          <div className="popup">
            <p>{popupMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionGame;
