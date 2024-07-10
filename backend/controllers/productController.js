const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
