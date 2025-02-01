const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/', requireAuth, getProfile);
router.put('/update', requireAuth, updateProfile);

module.exports = router;