const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');

const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to our MongoDB database
mongoose.connect(process.env.MONGO_URL, {
})
  .then(() => console.log("Database is successfully connected"))
  .catch(err => console.error("Database connection error:", err));

// CORS Configuration
const allowedOrigins = ['http://localhost:3000']; // Adjust as needed
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start our server
const PORT = process.env.PORT || 3800;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
