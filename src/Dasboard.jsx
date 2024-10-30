import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { logoutUser } from './api'; // Import the logout API call function
import CreateRoom from './CreateRoom'; // Import CreateRoom component

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinRoom = () => navigate('/join-room');

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/'); // Redirect to login or home page after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ background: 'linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100%)' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Game Room
          </Typography>
          <Box>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content with Full-Screen Image */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          mt: 5,
          width: '100vw',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Start the Game!
        </Typography>

        {/* Cards Container */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            mt: 3,
            width: '100%',
            maxWidth: '1200px',
            flexWrap: 'wrap',
          }}
        >
          {/* Card 1 */}
          <div className="card">
            <h2>Create Room</h2>
            <div className="card__content">
              <p className="card__title">Create Room</p>
              <p className="card__description">
                This generates a unique ID to create a room so that you can invite multiple players to play along with you.
              </p>
              <Button color="inherit" onClick={toggleModal}>
                Create Room
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card">
            <h2>Join Room</h2>
            <div className="card__content">
              <p className="card__title">Join Room</p>
              <p className="card__description">
                This allows you to join an existing room created by someone else.
              </p>
              <Button color="inherit" onClick={handleJoinRoom}>
                Join Room
              </Button>
            </div>
          </div>
        </Box>
      </Box>

      {/* Modal for Create Room */}
      {isModalOpen && (
        <CreateRoom onClose={toggleModal} />
      )}
    </>
  );
};

export default Navbar;
