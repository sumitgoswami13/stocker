const jwt = require('jsonwebtoken');

// Load secret keys from environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret';

/**
 * Generate an access token.
 * @param {Object} payload - The payload to encode in the token.
 * @param {String} [expiresIn='15m'] - Token expiration time (default: 15 minutes).
 * @returns {String} - The generated access token.
 */
const generateAccessToken = (payload, expiresIn = '15m') => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn });
};

/**
 * Generate a refresh token.
 * @param {Object} payload - The payload to encode in the token.
 * @returns {String} - The generated refresh token.
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET);
};

/**
 * Verify an access token.
 * @param {String} token - The token to verify.
 * @returns {Object} - The decoded token payload.
 * @throws {Error} - If the token is invalid or expired.
 */
const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

/**
 * Verify a refresh token.
 * @param {String} token - The token to verify.
 * @returns {Object} - The decoded token payload.
 * @throws {Error} - If the token is invalid or expired.
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

/**
 * Decode a token without verification.
 * @param {String} token - The token to decode.
 * @returns {Object} - The decoded token payload.
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
