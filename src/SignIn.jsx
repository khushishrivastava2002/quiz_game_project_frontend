// SignInPage.js
import React, { useState } from 'react';
import { Box, TextField, Button, Checkbox, Typography, Link, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from './api';
import rocket from './assets/rocket1.jpg';

const SignInPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const userData = { username, email, password };
      const result = await signUpUser(userData);
      console.log("Sign-in successful:", result);
      navigate('/');
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        square
        sx={{ p: 4 }}
        elevation={0}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>Sign In</Typography>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 2 }}>
            <Checkbox color="primary" />
            <Typography variant="body2">Remember Me</Typography>
          </Box>
          <Button
           fullWidth
           variant="contained"
           sx={{
             mt: 1,
             mb: 2,
             backgroundColor: '#514644', // Set the background color
             color: '#ffffff', // Change text color to white for contrast
             '&:hover': {
               backgroundColor: '#6b5b5b', // Optional: Change color on hover
             },
           }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2" onClick={() => navigate('/')}>
            Already have an account? Log in
          </Link>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${rocket})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Grid>
  );
};

export default SignInPage;