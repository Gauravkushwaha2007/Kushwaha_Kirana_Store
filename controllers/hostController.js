const Product = require('../models/product');

exports.getAddEditProducts = (req, res)=>{
    res.render('host/addEditProducts',{
        editing: false
    });
};


exports.getEditProducts =(req, res, next)=>{
    const productId = req.params.productId;
    const editing = req.query.editing;
    Product.findProductById(productId).then(product=>{
        if(!product){
            console.log('Product not found for editing');
            return res.redirect('/host/addEditProducts');
        }
        res.render('host/addEditProducts', {
            editing: editing,
            product: product
        });
    });
};


exports.postAddEditProducts = (req, res, next)=>{
    const { userName, userId, productName, imageUrl, price } = req.body;
    const product = new Product(userName, userId, productName, imageUrl, price);
    product.save().then(()=>{
        console.log('Product Added successfully');
    });
    
    res.redirect('/host/hostProductList');
};


exports.getHostProductList = (req, res)=>{
    Product.fetchAll().then(allProducts =>{
        res.render('host/hostProductList', {products: allProducts});
    });
};


exports.postEditProducts = (req, res, next)=>{
    const { productId, userName, userId, productName, imageUrl, price } = req.body;
    const product = new Product(userName, userId, productName, imageUrl, price);
    product._id = productId;
    
    product.save().then(result=>{
        console.log(result);
    });
    res.redirect('/host/hostProductList');
};
