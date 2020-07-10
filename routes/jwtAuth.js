const express = require("express");
const pool = require("../db");
const bcrypt = require("bcryptjs");

const sendJwtResponse = require("../utils/sendJwtResponse");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // HANDLE MISSING FIELDS
    if (!(name && email && password)) {
      return res
        .status(400)
        .json({ error: "name, email, and password are required" });
    }

    let user = await pool.query("SELECT * FROM users WHERE user_email = $1 ;", [
      email,
    ]);

    // HANDLE USER EMAIL ALREADY IN USE
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

    // HANDLE MISSING FIELDS
    if (!(email && password)) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 ;",
      [email]
    );

    // HANDLE USER NOT FOUND
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // HANDLE PASSWORD INCORRECT
    if (!(await bcrypt.compare(password, user.rows[0].user_password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    sendJwtResponse(user.rows[0], 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/loadme", auth, (req, res, next) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = router;
