const { getDb } = require("../utils/databaseUtil"); 
const { ObjectId } = require('mongodb');

module.exports = class Product {
    constructor(userName, userId, productName ,imageUrl, price, _id){
        this.userName = userName;
        this.userId = userId;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.price = price;
        if(_id){
            this._id = _id;
        }
    };
     
    save(){
        const db = getDb();

        if(this._id){
             //update
            return db.collection('products')
            .updateOne(
                { _id: new ObjectId(_id) }, 
                { $set: {
                    userName: this.userName,
                    userId: this.userId,
                    productName: this.productName,
                    imageUrl: this.imageUrl,
                    price: this.price
                }}
            );
        }
        else{ // insert
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
