const express = require('express');
const router = express.Router();
const venueLayout = require('../../config/layout');

router.get('/venue', (req, res) => {
  res.json(venueLayout);
});

/**
 * Technical Specification: Config Bridge
 * - Purpose: Securely provides frontend with environment-specific keys.
 * - Source: Process environment (Cloud Run Console).
 */
router.get('/config', (req, res) => {
  // Sources: Cloud Run Console env vars (production) or backend/.env (local dev)
  res.json({
    googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY || "",
    firebaseApiKey:   process.env.VITE_FIREBASE_API_KEY   || process.env.FIREBASE_API_KEY   || "",
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID || "",
  });
});

module.exports = router;
