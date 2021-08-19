const { Request, Response, NextFunction } = require('express');

// Create unique id with (v1) timestamp
const { v1: uuidv1 } = require('uuid');

// In-memort DB
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
const getOneProductById = (req, res, next) => {
    const id = req.params.id;
    const product = products.find(item => item.id == id);
    if (!product) {
        res.status(404).json(`Product with id ${id} was not found.`);
    } else {
        res.status(200).json(product);
    }
}

// Save a new product to the DB
function saveProduct(req, res, next) {
    const product = { ...req.body, id: uuidv1() };
    products.push(product);
    res.json(product);
}

// Update product by id with PUT in DB
const updateOneProductById = (req, res, next) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    const product = products.find(item => item.id == id);
    if (!product) {
        res.status(404).json(`Product with id ${id} was not found.`);
    } else {
        Object.assign(product, updatedProduct);
        res.status(200).json(product);
    }
}

// Delete product by id in DB
const deleteOneProductById = (req, res, next) => {
    const id = req.params.id;
    //.findIndex will return -1 if not found
    const productIndex = products.findIndex(item => item.id == id);
    if (productIndex == -1) {
        res.status(404).json(`Product with id ${id} was not found.`);
    } else {
        products.splice(productIndex, 1);
        res.status(200).json(`Product with id ${id} is deleted.`);
    }
}

// object to export
module.exports = {
    getProducts,
    getOneProductById,
    saveProduct,
    updateOneProductById,
    deleteOneProductById
}