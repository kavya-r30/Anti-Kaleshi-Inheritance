require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if JWT exists and is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login'); // Redirect to login if verification fails
      } else {
        console.log(decodedToken); // Log the decoded token
        next(); // Proceed to the next middleware or route
      }
    });
  } else {
    res.redirect('/login'); // Redirect if no token is found
  }
};

// Middleware to check the current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null; // Set user to null if verification fails
        next();
      } else {
        let user = await User.findById(decodedToken.id); // Find the user by ID from the token
        res.locals.user = user; // Store the user in res.locals
        next(); // Proceed to the next middleware or route
      }
    });
  } else {
    res.locals.user = null; // Set user to null if no token is found
    next();
  }
};

module.exports = { requireAuth, checkUser };
