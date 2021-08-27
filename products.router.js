const express = require('express');
const { getProducts, getOneProductById, saveProduct, updateOneProductById, deleteOneProductById } = require('./products.controllers');
const { saveProductValidation } = require('./products.validation');

// Create the router object
const router = express.Router();

// Define our endpoints
router.get('/api/products', getProducts);
router.get('/api/products/:id', getOneProductById);
router.post('/api/products', saveProduct);
router.post('/api/products', saveProductValidation, saveProduct);
router.put('/api/products/:id', saveProductValidation, updateOneProductById);
router.delete('/api/products/:id', deleteOneProductById);

// Export the router object
module.exports = router;