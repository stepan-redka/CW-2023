const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Page routes
router.get('/', bookingController.getHomePage);

// API routes
router.post('/api/bookSeat', bookingController.bookSeat);

module.exports = router;
