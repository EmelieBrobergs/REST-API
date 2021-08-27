const express = require('express');
const productsRouter = require('./products.router');
const cors = require('cors');

//Create server application
const app = express();

//Added to make it posible to send request from web....
app.use(cors());

//Pars incomin JSON
app.use(express.json());

//Add resources
app.use(productsRouter);

//404 handler
app.use((req, res) => { res.status(404).json('Resource not found');})

//Error handler
app.use((err, req, res, next) => {
    console.trace(err);
    res.status(500).json('Somthing went wrong !');
});

//start the server
app.listen(3003);