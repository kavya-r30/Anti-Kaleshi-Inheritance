const { Router } = require('express');
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = Router();

// Signup routes
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

// Login routes
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

// Logout route
router.get('/logout', authController.logout_get);

// Authentication check route
router.get('/check', (req, res) => {
  const token = req.cookies.jwt; // Get the JWT token from the cookie

  if (!token) {
    return res.status(401).json({ isAuthenticated: false }); // No token, not authenticated
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ isAuthenticated: false }); // Invalid token, not authenticated
    } else {
      return res.status(200).json({ isAuthenticated: true }); // Valid token, authenticated
    }
  });
});

module.exports = router;

