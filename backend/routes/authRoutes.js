const express = require("express");
const authController = require("../controllers/authController.js");
const authRoutes = express.Router();
const productController = require("../controllers/productController.js"); 
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken.js");
const multer = require('multer');
const { upload , uploadImages } = require('../controllers/uploadController');
const {checkRole} = require('../middlewares/checkRole');
// const verifyToken = require('../middlewares/verifyToken');


// router.get('/users', authController.getAllUsers);
authRoutes.post("/register", authController.register);
authRoutes.post("/login",  authController.login);
authRoutes.get('/role', checkRole, authController.getUserRole);
authRoutes.get('/', checkRole, productController.getAllProducts);
authRoutes.get('/find/:id', checkRole, productController.getProductById);
authRoutes.post('/create', checkRole, productController.createProduct);
authRoutes.post('/upload', checkRole, upload.array('images', 3), uploadImages);


module.exports = authRoutes;


