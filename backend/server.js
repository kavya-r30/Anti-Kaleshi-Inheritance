const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Enable CORS
app.use(express.static('public')); // Serve static files
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies

// View Engine (if using EJS)
app.set('view engine', 'ejs');

// Database Connection
const dbURI = process.env.MONGO_URI; // Use .env for the database connection string
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB'); // Log successful database connection
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if the database connection fails
  });

// Routes
app.get('/', (req, res) => {
  res.render('landing'); // Serve the landing page
});

app.get('/about', (req, res) => {
  res.render('about'); // Serve the about page
});

app.get('/contact', (req, res) => {
  res.render('contact'); // Serve the contact page
});

// Protected route (requires authentication)
app.get('/profile', requireAuth, (req, res) => {
  res.render('profile'); // Serve the dashboard for authenticated users
});

// Authentication routes
app.use('/auth', authRoutes); // Mount authRoutes under /auth

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' }); // Handle undefined routes
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack); // Log the error
  res.status(500).json({ error: 'Something went wrong!' }); // Send a generic error response
});