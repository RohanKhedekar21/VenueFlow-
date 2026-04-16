const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const venueRoutes = require('./api/routes/venueRoutes');

const app = express();

// Security Middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(cors());
app.use(express.json());

// Serve static frontend GUI payload from Vite build directory
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// API Routes
app.use('/api', venueRoutes);

module.exports = app;
