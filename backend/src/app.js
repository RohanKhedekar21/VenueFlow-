const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const venueRoutes = require('./api/routes/venueRoutes');

const app = express();

/**
 * Technical Specification - Security Layer:
 * - Engine: Helmet.js with Dynamic CSP
 * - Proxy: Trusted (Google Cloud Load Balancer)
 * - Rate Limiting: 100 req / 15 min per IP
 */

// Trust Cloud Run's proxy for accurate IP rate limiting
app.set('trust proxy', 1);

// Robust Security Headers with Content Security Policy (CSP)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "https://maps.googleapis.com"],
      "img-src": ["'self'", "data:", "https://maps.gstatic.com", "https://*.googleapis.com", "https://*.ggpht.com"],
      "connect-src": ["'self'", "https://*.googleapis.com", "https://*.firebaseio.com", "wss://*.run.app"],
      "frame-src": ["'self'", "https://*.googleapis.com"],
    },
  },
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: "Security Rate Limit Exceeded. Please retry in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
}));

// Cross-Origin Resource Sharing
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve static frontend GUI payload from Vite build directory
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// API Routes
app.use('/api', venueRoutes);

// Generic Error Handler for robust security
app.use((err, req, res, next) => {
  console.error('System Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Security Exception' });
});

module.exports = app;
