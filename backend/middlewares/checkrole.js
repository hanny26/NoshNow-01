const jwt = require('jsonwebtoken');
const userData = require('../models/User');

// Route to check the role of the user based on the token
const checkRole = async (req, res,next)=> {
 
  try {
    // Get the token from the header
    // token store kya thay? login ma
    const token = req.cookies.token; // Corrected token retrieval
    
    if (!token) {
      throw new Error('Token not found');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);
    // console.log("Decoded token ID:", decoded.id);

    const user = await userData.findOne({ email: decoded.email });
    
    if (!user) {
      throw new Error('User not found');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).send({ error: "Please authenticate" });
  }
}

module.exports = {
  checkRole,
};
