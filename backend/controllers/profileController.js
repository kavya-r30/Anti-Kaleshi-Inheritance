const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getProfile = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: 'No authentication token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id)
      .select('-password')
      .lean();
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ profile: user });
  } catch (error) {
    console.error('Get profile error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { platforms, socialLinks, bio, education, country } = req.body;
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { 
        platforms, 
        socialLinks, 
        bio, 
        education,
        country: country || ''
      },
      { new: true }
    ).select('-password');
    
    res.status(200).json({ profile: user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
};

module.exports = { getProfile, updateProfile };