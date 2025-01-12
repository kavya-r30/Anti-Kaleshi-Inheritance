import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContestCalendar from './components/ContestTracker';
import LandingPage from './components/Landing';
import Navbar from './components/Navbar';
import { Dashboard } from './components/Dashboard';
// import LoginPage from './components/login';

function App() {
  return (
    <div className="app pt-14">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/contest-tracker' element={<ContestCalendar />} />
          <Route path='/chatbot' element={<h1>chatbot</h1>} />
          <Route path='/dicussion' element={<h1>dicussion</h1>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<h1>Auth0 login</h1>} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;