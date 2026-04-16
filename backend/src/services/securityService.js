const crypto = require('crypto');

// Use a secret from env, or a fallback for the hackathon
const SYSTEM_SECRET = process.env.SYSTEM_SECRET || 'stadium-integrity-lock-24';

/**
 * Sign a payload using HMAC-SHA256
 * @param {Object} data 
 * @returns {string} signature
 */
const signPayload = (data) => {
  const message = JSON.stringify(data);
  return crypto.createHmac('sha256', SYSTEM_SECRET)
               .update(message)
               .digest('hex');
};

/**
 * Verify a payload's signature
 * @param {Object} data 
 * @param {string} signature 
 * @returns {boolean}
 */
const verifySignature = (data, signature) => {
  const expected = signPayload(data);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
};

module.exports = {
  signPayload,
  verifySignature
};
