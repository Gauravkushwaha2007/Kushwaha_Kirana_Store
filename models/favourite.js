const fs = require('fs');
const path = require('path');
const favouriteDataPath = path.join(__dirname, '../', 'Data', 'favourite.json');

module.exports = class Favourite {

    static addToFavourite(productId, callback){
        Favourite.getFavourite(favourites=>{

            if(favourites.includes(productId)){
                callback('The home is olready exist');
            }
            else{
                favourites.push(productId);
                fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
            }
        });
    };

    
    static getFavourite(callback){
        fs.readFile(favouriteDataPath, (err,data)=>{
            // console.log(err, data);
            callback(!err? JSON.parse(data): []);
        });
    };
};