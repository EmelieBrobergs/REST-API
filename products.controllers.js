const { Request, Response, NextFunction } = require('express');

// In-memort DB
const productIdIndex = 1;
const products = [{
    id : 0,
    name: 'SSA',
    type: 'license',
    price: 500
}]

// Responds with all products from the DB
function getProducts(req, res, next) {
    res.json(products);
}

// Respond with product based on id, or nothing if not found in DB
const getOneProduct = (req, res, next) => {
    const id = req.params.id;
    const product = products.find(product => product.id == id);
    if (!product) {
        res.status(404).json('Product with id ${id} was not found.');
    } else {
        res.status(200).json(product);
    }
}

// Save a new product to the DB
function saveProduct(req, res, next) {
    products.push(req.body);
    res.json(req.body);
}

// object to export
module.exports = {
    getProducts,
    getOneProduct,
    saveProduct
}