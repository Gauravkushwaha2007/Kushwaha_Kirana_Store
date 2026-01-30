const fs = require('fs');
const path = require('path');
const myOrdersPath = path.join(__dirname, '../', 'Data', 'myOrders.json');

module.exports = class AddToCart {

    static addToCart (productId, callback){
        AddToCart.getSelectedItems(selectedProducts=>{

            if(selectedProducts.includes(productId)){
                return callback('This product is already exist');
            }
            else{
                selectedProducts.push(productId);
                fs.writeFile(myOrdersPath, JSON.stringify(selectedProducts), callback);
            }

        });
    };

    static getSelectedItems (callback){
        fs.readFile(myOrdersPath, 'utf8', (error, data)=>{
            if(error){
                console.log('Read Error:', error);
                return callback([]);
            }
            try{
                callback(JSON.parse(data));
            }catch(e){
                console.log('Parse Error:', e);
                callback([]);
            }
        });
    };

};