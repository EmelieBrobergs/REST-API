const express = require('express');
const { getProducts, getOneProductById, saveProduct, updateOneProductById, deleteOneProductById } = require('./products.controllers');
const { saveProductValidation } = require('./products.validation');

// Create the router object
const productRouter = express.Router();

// Define our endpoints
productRouter.get('/api/products', getProducts);
productRouter.get('/api/products/:id', getOneProductById);
productRouter.post('/api/products', saveProductValidation, saveProduct);
productRouter.put('/api/products/:id', saveProductValidation, updateOneProductById);
productRouter.delete('/api/products/:id', deleteOneProductById);

// Export the router object
module.exports = productRouter;