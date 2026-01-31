const express = require('express');
const hostController = require('../controllers/hostController');
const hostRouter = express.Router();

hostRouter.get('/addEditProducts', hostController.getAddEditProducts);
hostRouter.post('/addEditProducts', hostController.postAddEditProducts);
hostRouter.get('/hostProductList', hostController.getHostProductList);
hostRouter.get('/addEditProducts/:productId', hostController.getEditProducts);
hostRouter.post('/addEditProducts', hostController.postEditProducts);

module.exports = { hostRouter };
