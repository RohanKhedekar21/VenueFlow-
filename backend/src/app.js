const express = require('express');
const cors = require('cors');
const path = require('path');
const venueRoutes = require('./api/routes/venueRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend GUI payload from Vite build directory
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// API Routes
app.use('/api', venueRoutes);

module.exports = app;
