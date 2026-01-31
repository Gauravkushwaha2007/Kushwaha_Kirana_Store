// const fs = require('fs');
// const path = require('path');
// const productDataPath = path.join(__dirname, '../', '/Data', '/products.json');


// module.exports = class singleProduct {
//     constructor(userName, userId, productName ,imageUrl, price){
//         this.userName = userName;
//         this.userId = userId;
//         this.productName = productName;
//         this.imageUrl = imageUrl;
//         this.price = price;
//     };

//     save(){
//         this.productId = Math.floor(Math.random()*1000000).toString();

//         singleProduct.fetchAll(allProducts=>{
//             allProducts.push(this);
//             fs.writeFile(productDataPath, JSON.stringify(allProducts), (error, data)=>{
//                 // console.log(error, data);
//             });
//         });
//     };

    
//     static fetchAll(callback){
//         fs.readFile(productDataPath, (error, data)=>{
//             // callback(!error? JSON.parse(data): []);
//             if(!error){
//                 callback(JSON.parse(data));
//             }else{
//                 callback([]);
//             }
//         });
//     };


//     static findProductById(productID,callback){
//         this.fetchAll(products=>{
//             const productFound = products.find(product=> product._id === productID);
//             callback(productFound);
//         });
//     };
// };




const { getDb } = require("../utils/databaseUtil"); 
const { ObjectId } = require('mongodb');

module.exports = class singleProduct {
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

    static deleteProductBYId(){
        const db = getDb();
        db.collection('products')
        .deleteOne({ _id: new ObjectId(productId) });
    }
};
