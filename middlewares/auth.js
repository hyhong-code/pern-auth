const jwt = require("jsonwebtoken");
const pool = require("../db");

/**
 * A middleware that authenticates user by Bearer token header.
 * Attaches user to req.user upon successful authentication.
 * @function auth
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next() function
 */
const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // HANDLE NO TOKEN
  if (!token) {
    return res.status(401).json("Please login");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    // HANDLE TEMPERED TOKEN
    return res.status(401).json("Invalid credentials, please login");
  }

  const user = await pool.query(
    "SELECT user_id, user_name, user_email FROM users WHERE user_id = $1 ;",
    [decoded.id]
  );

  // HANDLE USER DELETED
  if (user.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  req.user = user.rows[0];
  next();
};

module.exports = auth;
