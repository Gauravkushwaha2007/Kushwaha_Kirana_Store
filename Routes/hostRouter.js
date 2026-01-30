const express = require('express');
const homeController = require('../controllers/home');
const hostRouter = express.Router();

hostRouter.get('/addEditProducts', homeController.getAddEditProducts);
hostRouter.post('/addEditProducts', homeController.postAddEditProducts);
hostRouter.get('/hostProductList', homeController.getHostProductList);
hostRouter.get('/addEditProducts/:productId', homeController.getEditProducts);
hostRouter.post('/addEditProducts', homeController.postEditProducts);

module.exports = { hostRouter };
