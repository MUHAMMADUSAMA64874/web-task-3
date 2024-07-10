const express = require('express');
const { getProducts, getProductsByCategory } = require('../controllers/productController');
const router = express.Router();

router.route('/').get(getProducts);
router.route('/category/:category').get(getProductsByCategory);

module.exports = router;
