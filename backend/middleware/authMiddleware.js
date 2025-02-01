require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    console.log('Token verified successfully:', decodedToken);
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    res.status(401).json({ isAuthenticated: false });
  }
};

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select('-password');
    if (!user) {
      res.locals.user = null;
    } else {
      res.locals.user = user;
    }
    next();
  } catch (err) {
    console.log('Check user error:', err.message);
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };