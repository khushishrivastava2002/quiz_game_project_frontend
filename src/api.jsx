// api.jsx
import axios from 'axios';

// Set base URL for backend API
const api = axios.create({
  baseURL: 'http://localhost:8000', // Change to your FastAPI server URL if different
  withCredentials: true, // Enable cookies for authentication
});

// Sign-up function
export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Sign-up failed:', error.response?.data?.detail || error.message);
    throw error;
  }
};

// Login function
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data?.detail || error.message);
    throw error;
  }
};

// Profile fetch function
export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Fetching profile failed:', error.response?.data?.detail || error.message);
    throw error;
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    const response = await api.get('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout failed:', error.response?.data?.detail || error.message);
    throw error;
  }
};

// create_room
export const createRoom = async (adminName) => {
  try {
    const response = await api.post('/rooms/create_room', { admin_name: adminName });
    return response.data;
  } catch (error) {
    console.error('Room creation failed:', error.response?.data?.detail || error.message);
    throw error;
  }
};