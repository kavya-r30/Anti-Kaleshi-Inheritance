const { Router } = require('express');
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/check', (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ isAuthenticated: false });
    } else {
      return res.status(200).json({ isAuthenticated: true });
    }
  });
});

module.exports = router;
