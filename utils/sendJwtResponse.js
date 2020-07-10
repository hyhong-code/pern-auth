const jwt = require("jsonwebtoken");

/**
 * Signs a jwt with user's id as payload and sends a response to the client.
 * @function sendJwtResponse
 * @param {object} user - user object from database
 * @param {number} statusCode - statusCode of the response
 * @param {object} res - Express response object
 */
const sendJwtResponse = (user, statusCode, res) => {
  const payload = { id: user.user_id };
  const jwtOptions = { expiresIn: process.env.JWT_EXPIRES };
  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
  res.status(statusCode).json({ token });
};

module.exports = sendJwtResponse;
