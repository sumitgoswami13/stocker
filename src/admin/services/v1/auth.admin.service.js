const bcrypt = require('bcrypt');
const db = require('../path_to_your_db_config'); // Adjust the path to your dbConfig file
const tokenHandler = require('../utils/tokenHandler'); // Adjust the path to your tokenHandler utility

/**
 * Login service for admin users.
 * @param {Object} body - Request body containing login credentials.
 * @returns {Promise<Object>} - The access and refresh tokens.
 */
exports.login = async (body) => {
  const { userEmail, password } = body;

  try {
    const user = await db.user.findOne({
      where: { userEmail, type: 'admin' },
    });

    if (!user) {
      throw new Error('Invalid username or password.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password.');
    }
    const payload = { userId: user.userId, type: user.type };
    const accessToken = tokenHandler.generateAccessToken(payload);
    const refreshToken = tokenHandler.generateRefreshToken(payload);
    await user.update({ referesh_token: refreshToken });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error during admin login:', error);
    throw new Error('Failed to log in.');
  }
};

/**
 * Refresh the access token using a valid refresh token.
 * @param {String} refreshToken - The refresh token.
 * @returns {Promise<String>} - The new access token.
 */
exports.refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('Refresh token is required.');
  }

  try {
    const decoded = tokenHandler.verifyRefreshToken(refreshToken);
    const user = await db.user.findOne({ where: { userId: decoded.userId } });
    if (!user || user.referesh_token !== refreshToken) {
      throw new Error('Invalid refresh token.');
    }
    const payload = { userId: user.userId, userName: user.userName, type: user.type };
    const accessToken = tokenHandler.generateAccessToken(payload);

    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Failed to refresh token.');
  }
};

/**
 * Logout service to clear the refresh token.
 * @param {String} userId - The ID of the user to log out.
 * @returns {Promise<String>} - Success message.
 */
exports.logout = async (userId) => {
  try {
    const user = await db.user.findOne({ where: { userId } });
    if (!user) {
      throw new Error('User not found.');
    }

    await user.update({ referesh_token: null });

    return 'User logged out successfully.';
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Failed to log out.');
  }
};
