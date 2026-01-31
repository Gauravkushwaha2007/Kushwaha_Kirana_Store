const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/databaseUtil");

module.exports = class Favourite{
    static addToFavourite(productId){
        const db = getDb();
        return db.collection('favourites').
        insertOne({ productId: new ObjectId(productId) })
    }

    static getFavourites (){
        const db = getDb();
        db.collection('favourties').find().toArray();
    }
};