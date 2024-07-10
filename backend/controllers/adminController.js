const Product = require('../models/Product');
const Order = require('../models/Order');

exports.createProduct = async (req, res) => {
    const { name, price, description, category, image, rating, numReviews } = req.body;
    const product = new Product({
        name,
        price,
        description,
        category,
        image,
        rating,
        numReviews
    });

    try {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product' });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, price, description, category, image, rating, numReviews } = req.body;

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.price = price;
            product.description = description;
            product.category = category;
            product.image = image;
            product.rating = rating;
            product.numReviews = numReviews;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting product' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders' });
    }
};

exports.updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating order' });
    }
};
