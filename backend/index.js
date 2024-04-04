const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to our MongoDB database
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Database is successfully connected"))
  .catch(err => console.error("Database connection error:", err));

// Start our server
const PORT = process.env.PORT || 3800;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
