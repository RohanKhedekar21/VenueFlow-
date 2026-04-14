const express = require('express');
const router = express.Router();
const venueLayout = require('../../config/layout');

router.get('/venue', (req, res) => {
  res.json(venueLayout);
});

module.exports = router;
