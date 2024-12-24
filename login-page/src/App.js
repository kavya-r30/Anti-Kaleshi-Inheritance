import React from 'react';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
  
  const [showScreen, setShowScreen] = useState('login');

  function showLogin(){
    setShowScreen('login');
  }

  function showRegister(){
    setShowScreen('register');
  }

  return (
    <div className="App">
      {showScreen === 'login' ? <Login displayRegister={showRegister}/> : <Register displayLogin={showLogin}/> }
    </div>
  );
}

export default App;
