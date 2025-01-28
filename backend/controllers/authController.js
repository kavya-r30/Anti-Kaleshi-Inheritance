// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const signup_get = (req, res) => {
//   res.render('signup'); // Render signup form (if you're using a view engine)
// };

// const signup_post = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ error: 'User already exists with this email' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: newUser._id },               // Payload (user ID)
//       process.env.JWT_SECRET,            // Secret key from environment
//       { expiresIn: '3d' }                // Token expiration (3 days)
//     );

//     // Set the token as an HTTP-only cookie
//     res.cookie('jwt', token, {
//       httpOnly: true,                    // Prevent XSS attacks
//       secure: process.env.NODE_ENV === 'production', // HTTPS in production
//       maxAge: 3 * 24 * 60 * 60 * 1000    // 3 days expiration time
//     });

//     res.status(201).json({ message: 'User registered and logged in' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const login_get = (req, res) => {
//   res.render('login'); // Render login form (if you're using a view engine)
// };

// const login_post = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'No user found with this email' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id },                // Payload (user ID)
//       process.env.JWT_SECRET,          // Secret key from environment
//       { expiresIn: '3d' }              // Token expiration (3 days)
//     );

//     // Set the token as an HTTP-only cookie
//     res.cookie('jwt', token, {
//       httpOnly: true,                    // Prevent XSS attacks
//       secure: process.env.NODE_ENV === 'production', // HTTPS in production
//       maxAge: 3 * 24 * 60 * 60 * 1000    // 3 days expiration time
//     });

//     res.status(200).json({ message: 'Login successful' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

// const logout_get = (req, res) => {
//   // Clear the JWT cookie
//   res.clearCookie('jwt');
//   res.status(200).json({ message: 'User logged out' });
// };

// module.exports = {
//   signup_get,
//   signup_post,
//   login_get,
//   login_post,
//   logout_get
// };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Render signup page (if using a view engine like EJS)
const signup_get = (req, res) => {
  res.render('signup');
};

// Handle signup form submission
const signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Signup request body:', req.body); // Log the request body

    // Check if user already exists (case-insensitive)
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      console.log('User already exists:', email); // Log if user exists
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user (password will be hashed by the pre-save hook)
    const newUser = new User({ name, email: email.toLowerCase(), password });
    await newUser.save(); // Validation and hashing happen here
    console.log('User created:', newUser); // Log the created user

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id }, // Payload (user ID)
      process.env.JWT_SECRET, // Secret key from environment
      { expiresIn: '3d' } // Token expiration (3 days)
    );

    // Set the token as an HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true, // Prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days expiration time
    });

    res.status(201).json({ message: 'User registered and logged in' });
  } catch (err) {
    console.error('Signup error:', err); // Log any errors

    // Handle validation errors
    if (err.name === 'ValidationError') {
      // Extract the validation error message
      const errorMessage = Object.values(err.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ error: errorMessage }); // Return user-friendly error message
    }

    // Handle other errors (e.g., database errors)
    res.status(500).json({ error: 'Server error' });
  }
};

// Render login page (if using a view engine like EJS)
const login_get = (req, res) => {
  res.render('login');
};

// Handle login form submission
const login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login request body:', req.body); // Log the request body

    // Find user by email (case-insensitive)
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('No user found with email:', email); // Log if no user is found
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Log the password match result

    if (!isMatch) {
      console.log('Invalid password for user:', email); // Log if password is invalid
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, // Payload (user ID)
      process.env.JWT_SECRET, // Secret key from environment
      { expiresIn: '3d' } // Token expiration (3 days)
    );

    // Set the token as an HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true, // Prevent XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days expiration time
    });

    console.log('Login successful for user:', email); // Log successful login
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err); // Log any errors
    res.status(500).json({ error: 'Server error' });
  }
};

// Handle user logout
const logout_get = (req, res) => {
  // Clear the JWT cookie with secure and httpOnly flags
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  console.log('User logged out'); // Log logout
  res.status(200).json({ message: 'User logged out' });
};

// Check if the user is authenticated
const check_auth = async (req, res) => {
  try {
    // Get the JWT token from the cookie
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, the user is authenticated
    res.status(200).json({ isAuthenticated: true });
  } catch (err) {
    // If the token is invalid or expired, the user is not authenticated
    res.status(401).json({ isAuthenticated: false });
  }
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
  check_auth, // Export the new function
};