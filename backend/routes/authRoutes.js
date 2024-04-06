const express = require("express");
const authController = require("../controllers/authController.js");
const authRoutes = express.Router();


// router.get('/users', authController.getAllUsers);
authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
module.exports = authRoutes;


