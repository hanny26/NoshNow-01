const express = require("express");
const authController = require("../controllers/authController.js");
const authRoutes = express.Router();
const productController = require("../controllers/productController.js"); 
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken.js");
const multer = require('multer');
const { upload , uploadImages } = require('../controllers/uploadController');
// const verifyToken = require('../middlewares/verifyToken');


// router.get('/users', authController.getAllUsers);
authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.get('/', verifyToken, productController.getAllProducts);
authRoutes.get('/find/:id', verifyToken, productController.getProductById);
authRoutes.post('/create', verifyTokenAdmin, productController.createProduct);
authRoutes.post('/upload', verifyToken, upload.array('images', 3), uploadImages);


module.exports = authRoutes;


