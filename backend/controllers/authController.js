const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { checkRole } = require('../middlewares/checkrole');

// Register a new user
async function register(req, res) {
  const { username, email, password, isAdmin } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with isAdmin set based on request
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // Default to false if isAdmin is not provided
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Login a user
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Customize token payload based on user role
    let tokenPayload = {
      email: user.email,
      userId: user._id, // Assuming you want to include user ID in the token
    };

    if (user.isAdmin) {
      tokenPayload.role = 'admin';
    } else {
      tokenPayload.role = 'regular';
    }

    // Set JWT token expiration to 1 hour
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Get user role
function getUserRole(req, res) {
  const token = req.headers.authorization.split(' ')[1]; // Get the token from headers

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Return the role in the decoded token
    return res.status(200).json({ role: decoded.role });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {
  register,
  login,
  getUserRole, // Added new function to get user role
};
