import React, { useState } from 'react';
import { loginUser } from './api';
import { Box, TextField, Button, Checkbox, Typography, Link, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import rocket from './assets/rocket1.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData = {email, password };
      const result = await loginUser (userData);
      console.log("Login successful:", result);
      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to Login:", error);
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      {/* Left Side with Form */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        square
        sx={{ p: 4 }}
        elevation={0}  // Remove or set elevation to 0 to avoid shadow
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 3 }}>
            Login
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            Don’t have an account? <Link href="#" onClick={() => navigate('/signin')}>Sign in</Link>
          </Typography>
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
            color="warning"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleLogin}
          >
            Log In
          </Button>
          <Link href="#" variant="body2">
            Forgot Your Password?
          </Link>
        </Box>
      </Grid>

      {/* Right Side with Image */}
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

export default LoginPage;
