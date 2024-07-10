const express = require('express');
const { createProduct, updateProduct, deleteProduct, getOrders, updateOrderToDelivered } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/products').post(protect, admin, createProduct);
router.route('/products/:id').put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/orders').get(protect, admin, getOrders);
router.route('/orders/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
