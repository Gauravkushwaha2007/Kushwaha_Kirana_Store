const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();

hostRouter.get('/addEditProducts', hostController.getAddEditProducts);
hostRouter.get('/hostProductList', hostController.getHostProductList);
hostRouter.get('/addEditProducts/:productId', hostController.getEditProducts);

hostRouter.post('/editProducts', hostController.postEditProducts);
hostRouter.post('/deleteProduct', hostController.postDeleteProduct);
hostRouter.post('/addEditProducts', hostController.postAddEditProducts);

module.exports = { hostRouter };
