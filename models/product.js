const { getDb } = require("../utils/databaseUtil"); 
const { ObjectId } = require('mongodb');

module.exports = class Product {

    constructor(userName, userId, productName, images, price, description, id) {
        this.userName = userName;
        this.userId = userId;
        this.productName = productName;
        this.images = images;
        this.price = price;
        this.description = description;
        this._id = id ? new ObjectId(id) : null;
    }

    
    save() {
        const db = getDb();
        if (this._id) {
            // ✅ EDIT CASE
            return db.collection('products')
                .updateOne(
                    { _id: this._id },
                    { $set: this }
                );
        }
        // ✅ ADD CASE
        return db.collection('products').insertOne(this);
    }


    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray();
    }

    static findProductById(productId){
        const db = getDb();
        return db.collection('products')
        .find({_id : new ObjectId(productId)})
        .next();
    }

    static deleteProductBYId(productId){
        const db = getDb();
        return db.collection('products')
        .deleteOne({ _id: new ObjectId(productId) });
    }
};
