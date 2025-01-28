const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup_get = (req, res) => {
  res.render('signup');
};

const signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Signup request body:', req.body);

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const newUser = new User({ name, email: email.toLowerCase(), password });
    await newUser.save();
    console.log('User created:', newUser);

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3 * 24 * 60 * 60 * 1000, 
    });

    res.status(201).json({ message: 'User registered and logged in' });
  } catch (err) {
    console.error('Signup error:', err);

    if (err.name === 'ValidationError') {
      const errorMessage = Object.values(err.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }

    res.status(500).json({ error: 'Server error' });
  }
};

const login_get = (req, res) => {
  res.render('login');
};

const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login request body:', req.body);

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      console.log('Invalid password for user:', email);
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    console.log('Login successful for user:', email);
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const logout_get = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  console.log('User logged out');
  res.status(200).json({ message: 'User logged out' });
};

const check_auth = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({ isAuthenticated: true });
  } catch (err) {
    res.status(401).json({ isAuthenticated: false });
  }
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
  check_auth,
};