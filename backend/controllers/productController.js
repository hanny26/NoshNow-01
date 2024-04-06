const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(req.query);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

// Get one product by ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        // Basic validation, ensuring required fields are present
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Name, description, and price are required' });
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            // If there are additional fields, add them here
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};
