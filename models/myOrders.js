const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/databaseUtil');

module.exports = class Cart {
    static addToCart(productId){
        const db = getDb();
        return db.collection('Cart').insertOne({ 
            productId: new ObjectId(productId),
            quantity: 1 
        });
    }

    static getCartItems(){
        const db = getDb();
        return db.collection('favourites').find().toArray();
    }
};