const Product = require('../models/Product');
// const {verifyToken, verifyTokenAdmin} = require("../middleware/verifyToken");


// get all 
exports.getAllProducts = async (req, res) => {
    try {
        // req.query = {category: "pizza"}
        const products = await Product.find(req.query);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};
// get one product by id
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(500).json({ msg: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};


// create product

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create({ ...req.body });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};