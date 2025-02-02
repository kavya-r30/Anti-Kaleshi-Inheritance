import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ContestTracker from './components/ContestTracker';
import LandingPage from './components/Landing';
import Navbar from './components/Navbar';
import ProfilePage from './components/Profile';
import { Dashboard } from './components/Dashboard';
import ChatBot from './components/Chatbot';
import Login from './components/Login';
import Signup from './components/Signup';
import { Devboard } from './components/Devboard';
import DSAQuestions from './components/DSAQuestions';
import CommunityDiscussions from './components/CommunityDiscussions'; // ✅ Import added

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      fetch(`${backendUrl}/auth/check`, { credentials: 'include' })
        .then((res) => res.json())
        .then((data) => {
          setIsAuthenticated(data.isAuthenticated);
          localStorage.setItem('isAuthenticated', data.isAuthenticated);
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('isAuthenticated');
        });
    } catch (err) {
      console.error('Error checking authentication:', err);
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    }
  }, []);

  return (
    <div className="app pt-14">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/contest-tracker' element={<ContestTracker />} />
          <Route path='/chatbot' element={<ChatBot />} />
          <Route path='/discussion' element={<CommunityDiscussions />} /> {/* ✅ Updated route */}
          <Route path='/devboard' element={<Devboard />} />
          <Route path='/dsa-questions' element={<DSAQuestions />} />
          <Route
            path='/dashboard'
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path='/profile'
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path='/login'
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path='/signup'
            element={<Signup setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path='*' element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
