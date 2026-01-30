const express = require('express');
const homeController = require('../controllers/home') 
const storeRouter = express.Router();

console.log('postMyOrders function exists?', typeof homeController.postMyOrders);

storeRouter.get('/', homeController.getAllProducts);
storeRouter.get('/allProducts', homeController.getAllProducts);
storeRouter.get('/myOrder', homeController.getMyOrder);

storeRouter.get('/favouriteList', homeController.getFavouriteList);
storeRouter.post('/favouriteList', homeController.postAddToFavourite);

storeRouter.get('/myOrders', homeController.getMyOrders);
storeRouter.post('/myOrders', homeController.postMyOrders);

storeRouter.get('/products/:productId', homeController.getProductDetails);

module.exports = { storeRouter };
