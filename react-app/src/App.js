import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ContestTracker from './components/ContestTracker';
import LandingPage from './components/Landing';
import Navbar from './components/Navbar';
import ProfilePage from './components/Profile';
import { Dashboard } from './components/Dashboard';
import ChatBot from './components/Chatbot';
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5001/auth/check', {
          credentials: 'include', // Include cookies
        });
        if (res.ok) {
          setIsAuthenticated(true); // User is authenticated
        } else {
          setIsAuthenticated(false); // User is not authenticated
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setIsAuthenticated(false); // Assume user is not authenticated on error
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="app pt-14">
      <Router>
        {/* Pass isAuthenticated and setIsAuthenticated to Navbar */}
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          {/* Landing Page */}
          <Route path='/' element={<LandingPage />} />

          {/* Other App Routes */}
          <Route path='/contest-tracker' element={<ContestTracker />} />
          <Route path='/chatbot' element={<ChatBot />} />
          <Route path='/discussion' element={<h1>Discussion</h1>} />
          <Route
            path='/dashboard'
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path='/profile'
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
          />

          {/* Login and Signup Routes */}
          <Route
            path='/login'
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path='/signup'
            element={<Signup setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Fallback for unmatched routes */}
          <Route path='*' element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
