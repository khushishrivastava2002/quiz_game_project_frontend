import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import SignIn from './SignIn';
import Dashboard from './Dasboard';
import CreateRoom from './CreateRoom';
import QuestionGame from './QuestionGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create-room" element={<CreateRoom/>}/>
        <Route path="/question-game" element={<QuestionGame />} />
        
      </Routes>
    </Router>
  );
}

export default App;
