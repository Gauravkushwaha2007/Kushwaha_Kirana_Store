const { getDb } = require("../utils/databaseUtil"); 
const { ObjectId } = require('mongodb');

module.exports = class Product {

    constructor(userName, userId, productName ,images, price, _id){
        this.userName = userName;
        this.userId = userId;
        this.productName = productName;
        this.images = images;
        this.price = price;
        if(_id){
            this._id = _id;
        }
    };
     
    save() {
    const db = getDb();
    if (this._id) { // UPDATE
        return db.collection('products').updateOne(
            { _id: new ObjectId(this._id) },
            { $set: {
                userName: this.userName,
                userId: this.userId,
                productName: this.productName,
                images: this.images,
                price: this.price
                }
            }
        );
    }
    else{ // INSERT
        return db.collection('products').insertOne(this);
    }
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
