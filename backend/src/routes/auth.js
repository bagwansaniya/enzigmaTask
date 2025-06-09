const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(11);
    const securePass = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: securePass });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isSecurePass = await bcrypt.compare(password, user.password);
    if (!isSecurePass) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Here you would typically sign a JWT token and return it
    res.json({ msg: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err });
  }
});

module.exports = router;