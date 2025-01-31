require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ isAuthenticated: false }); // Unauthorized
      } else {
        console.log(decodedToken);
        next(); // Proceed to the next middleware/route
      }
    });
  } else {
    res.status(401).json({ isAuthenticated: false }); // Unauthorized
  }
};

// Middleware to check user and attach user data to res.locals
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null; // No user data
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user; // Attach user data to res.locals
        next();
      }
    });
  } else {
    res.locals.user = null; // No user data
    next();
  }
};

module.exports = { requireAuth, checkUser };
