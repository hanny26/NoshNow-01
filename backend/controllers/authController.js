const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user with the same email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '3d' } // Token expires in 1 hour
    );

    // Send the token in the response
    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if a user with the given email or username exists
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      // Passwords do not match
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Passwords match, generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the token in the response
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
