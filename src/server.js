const express = require('express');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./config/database');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'pug');

// Serve static files from public folder at project root
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));

// Routes
app.use('/', bookingRoutes);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
 