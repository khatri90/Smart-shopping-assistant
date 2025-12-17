const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// @route   GET /api/products/search?query=iphone
// @desc    Search for products and compare prices
// @access  Public
router.get('/search', productController.searchProducts);

module.exports = router;
