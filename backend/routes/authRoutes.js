const express = require("express");
const authController = require("../controllers/authController.js");
const authRoutes = express.Router();


// router.get('/users', authController.getAllUsers);
authRoutes.post("/register", authController.registerUser);
authRoutes.post("/login", authController.loginUser);
module.exports = authRoutes;


