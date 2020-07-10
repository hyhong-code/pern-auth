const express = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return res
        .status(400)
        .json({ error: "name, email, and password are required" });
    }

    let user = await pool.query("SELECT * FROM users WHERE user_email = $1 ;", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(400).json({ error: "user email is already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = await pool.query(
      "INSERT INTO users(user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING * ;",
      [name, email, hashedPassword]
    );

    sendJwtResponse(user.rows[0], 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 ;",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.rows[0].user_password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    sendJwtResponse(user.rows[0], 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json("Please login");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json("tempered");
  }

  const user = await pool.query(
    "SELECT user_id, user_name, user_email FROM users WHERE user_id = $1 ;",
    [decoded.id]
  );

  if (user.rows.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }

  req.user = user.rows[0];
  next();
};

router.get("/loadme", auth, (req, res, next) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = router;

const sendJwtResponse = (user, statusCode, res) => {
  const payload = { id: user.user_id };
  const jwtOptions = { expiresIn: process.env.JWT_EXPIRES };
  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
  res.status(statusCode).json({ token });
};
