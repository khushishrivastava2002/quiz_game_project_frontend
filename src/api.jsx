// api.jsx
import axios from 'axios';
const API_BASE_URL = 'http://127.0.0.1:8000';

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

export const joinRoom = async (roomCode, userName) => {
  console.log(roomCode);
  console.log(userName);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/rooms/join_room?room_code=${encodeURIComponent(roomCode)}&user_name=${encodeURIComponent(userName)}`,
      {}  // Sending an empty object as the body
    );
    return response.data;
  } catch (error) {
    console.error('Room join failed:', error.response?.data?.detail || error.message);
    throw error;
  }
};


export const endRoom = async (adminName, roomCode) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rooms/end_room`, null, { 
      params: {
        admin_name: adminName,
        room_code: roomCode,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to end the room');
  }
};


export const fetchRoomDetails = async (roomCode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms/room_details/${roomCode}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch room details:', error.message);
    throw error; // Rethrow the error for handling in the component
  }
};