const express = require('express');
const {getProducts, getOneProduct, saveProduct} = require('./products.controllers');
//const {} = require('');

// Create the router object
const productRouter = express.Router();

// Define our endpoints
productRouter.get('/api/products', getProducts);
productRouter.get('/api/products/:id', getOneProduct);
productRouter.post('/api/products', saveProduct);
productRouter.put('/api/products/:id');
productRouter.delete('/api/products/:id');

// Export the router object
module.exports = productRouter;