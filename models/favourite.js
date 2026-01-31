// const fs = require('fs');
// const path = require('path');
// const favouriteDataPath = path.join(__dirname, '../', 'Data', 'favourite.json');



// module.exports = class Favourite {

//     static addToFavourite(productId, callback){
//         Favourite.getFavourite(favourites=>{

//             if(favourites.includes(productId)){
//                 callback('The home is olready exist');
//             }
//             else{
//                 favourites.push(productId);
//                 fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
//             }
//         });
//     };

    
//     static getFavourite(callback){
//         fs.readFile(favouriteDataPath, (err,data)=>{
//             // console.log(err, data);
//             callback(!err? JSON.parse(data): []);
//         });
//     };
// };

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