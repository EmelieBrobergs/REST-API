const { Request, Response, NextFunction } = require('express');

const { v1: uuidv1 } = require('uuid');
const fs = require('fs').promises;


/**
 * Responds with all products from the DB
 * @param {Request} req 
 * @param {Response} res 
 */
const getProducts = async function(req, res) {
    try {
        const data = await fs.readFile('products.json');
        let products = JSON.parse(data);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        req.status(500).json('Faild to get products.');
    }
}

/**
 * Respond with product based on id, or nothing if not found in DB
 * @param {Request} req 
 * @param {Response} res 
 */
const getOneProductById = async function(req, res) {
    try {
        const id = req.params.id;
        const data = await fs.readFile('products.json');
        let products = JSON.parse(data);
    
        const product = products.find(item => item.id == id);
        if (!product) {
            res.status(404).json(`Product with id ${id} was not found.`);
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Faild to get product by id.')
    }
}

/**
 * Save a new product to the DB
 * @param {Request} req 
 * @param {Response} res 
 */
const saveProduct = async function(req, res) {
    try {
        const newProduct = { ...req.body, id: uuidv1() };
        const data = await fs.readFile('products.json');
        let products = JSON.parse(data);
        products.push(newProduct);
        
        await saveArray(products, 'products.json');
        res.status(200).json('Product added to JSON-file.');
    } catch (error) {
        console.log(error);
        res.status(500).json('Faild to save product.');
    }
}

/**
 * Update product by id with PUT in DB
 * @param {Request} req 
 * @param {Response} res 
 */
const updateOneProductById = async function(req, res) {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;
    
        const data = await fs.readFile('products.json');
        let products = JSON.parse(data);
    
        const product = products.find(item => item.id == id);
        if (!product) {
            res.status(404).json(`Product with id ${id} was not found.`);
        } else {
            Object.assign(product, updatedProduct);
            products.push(product);
    
            await saveArray(products, 'products.json');
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error)
        req.status(500).json(`Faild to update product by id (id: ${id})`);
    }
}

/**
 * Delete product by id in DB
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteOneProductById = async function(req, res) {
    try {
        const id = req.params.id;
        //.findIndex will return -1 if not found
        const data = await fs.readFile('products.json');
        let products = JSON.parse(data);
    
        const productIndex = products.findIndex(item => item.id == id);
        if (productIndex == -1) {
            res.status(404).json(`Product with id ${id} was not found.`);
        } else {
            products.splice(productIndex, 1);
            
            await saveArray(products, 'products.json');
            res.status(200).json(`Product with id ${id} is deleted.`);
        }
    } catch (error) {
        console.log(error)
        req.status(500).json(`Faild to delete product by id (id: ${id})`);
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

/**
 * Strigify array of JSON data in to readable JSON format and save it in selected .json-file.
 * @param {*} array An array of items to save in .json-file
 * @param {*} jsonFile  ex. 'products.json'
 * @returns nothing or err
 */
async function saveArray(array, jsonFile) {
    let jsonData = JSON.stringify(array, null, 2);
    return fs.writeFile(jsonFile, jsonData, (err) => {
        if (err) throw err;
    });
}