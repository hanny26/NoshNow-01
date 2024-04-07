const jwt = require('jsonwebtoken');

// Route to check the role of the user based on the token
function checkRole(req, res) {
  const token = req.headers.authorization.split(' ')[1]; // Get the token from headers

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check the role in the decoded token
    if (decoded.role === 'admin') {
      return res.status(200).json({ message: 'Admin User Role' });
    } else {
      return res.status(200).json({ message: 'Regular User Role' });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {
  checkRole,
};
