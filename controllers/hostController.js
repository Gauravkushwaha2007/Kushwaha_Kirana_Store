const Product = require('../models/product');

exports.getAddEditProducts = (req, res)=>{
    res.render('host/addEditProducts',{
        editing: false
    });
};


exports.getEditProducts =(req, res, next)=>{
    const productId = req.params.productId;
    const editing = req.query.editing === 'true';
    Product.findProductById(productId).then(product=>{
        if(!product){
            // console.log('Product not found for editing');
            return res.redirect('/addEditProducts');
        }
        res.render('host/addEditProducts', {
            editing: editing,
            product: product
        });
    });
};


exports.postAddEditProducts = (req, res, next)=>{
    const { userName, userId, productName, images, price, description} = req.body;
    const imageArray = images.split(',').map(img=> img.trim());

    const product = new Product(userName, userId, productName, imageArray, price, description);
    product.save().then(()=>{
        // console.log('Product Added successfully');
    });
    
    res.redirect('/hostProductList');
};


exports.getHostProductList = (req, res)=>{
    Product.fetchAll().then(allProducts =>{
        res.render('host/hostProductList', {products: allProducts});
    });
};


exports.postEditProducts = (req, res, next)=>{
    const { productId, userName, userId, productName, images, price ,description} = req.body;
    const imageArray = images.split(',').map(img=> img.trim());

    const product = new Product( userName, userId, productName, imageArray, price, description, productId);
    
    product.save().then(()=>{
        res.redirect('/hostProductList');
    })
    .catch(error=>console.log(error))
};


exports.postDeleteProduct = (req, res, next)=>{
    const productId = req.body.productId;

    Product.deleteProductBYId(productId)
    .then(()=>{
        // console.log('Product Deleted successfully');
        res.redirect('/hostProductList');
    })
    .catch( error=> console.log("Can't delete product", error));
}
