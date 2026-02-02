const express = require('express');
const storeController = require('../controllers/storeController') 
const storeRouter = express.Router();

storeRouter.get('/', storeController.getAllProducts);
storeRouter.get('/allProducts', storeController.getAllProducts);
storeRouter.get('/myOrder', storeController.getMyOrder);

storeRouter.get('/favouriteList', storeController.getFavouriteList);
storeRouter.post('/favouriteList', storeController.postAddToFavourite);

storeRouter.get('/myOrders', storeController.getMyOrders);
storeRouter.post('/myOrders', storeController.postMyOrders);

storeRouter.get('/products/:productId', storeController.getProductDetails);
storeRouter.post('/removeProductFromCart', storeController.postRemoveProductFromCart);

storeRouter.post('/removeFavourite', storeController.postRemoveFromFavourite);
module.exports = { storeRouter };
