
const Favourite = require('../models/favourite');
const singleProduct = require('../models/modelHome'); 
const AddToCart = require('../models/myOrders');

exports.getAddEditProducts = (req, res)=>{
    res.render('host/addEditProducts',{
        editing: false
    });
};


exports.getEditProducts =(req, res, next)=>{
    const productId = req.params.productId;
    const editing = req.query.editing;
    singleProduct.findProductById(productId).then(product=>{
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


exports.getMyOrder = (req, res)=>{
    res.render('store/myOrder');
};


exports.postAddEditProducts = (req, res, next)=>{
    const { userName, userId, productName, imageUrl, price } = req.body;
    const product = new singleProduct(userName, userId, productName, imageUrl, price);
    product.save().then(()=>{
        console.log('Product Added successfully');
    });
    
    res.redirect('/host/hostProductList');
};


exports.getAllProducts = (req, res)=>{
    singleProduct.fetchAll((allProducts)=>{
        res.render('store/productList',{ products: allProducts });
    });
};


exports.getHostProductList = (req, res)=>{
    singleProduct.fetchAll(allProducts =>{
        res.render('host/hostProductList', {products: allProducts});
    });
};


exports.getProductDetails = (req, res)=>{
    const productId = req.params.productId;

    singleProduct.findProductById(productId).then(product=>{
        if(!product){
            console.log('Product not Found');
            res.redirect('/store/prodcutList');
        }
        else{
            console.log('Product mil gya ye h id '+ productId);
            res.render('store/productDetails', {product});
        }
    })
};


exports.getFavouriteList = (req, res, next)=>{
    Favourite.getFavourite((favourites)=>{
        singleProduct.fetchAll((allProducts=>{
            const favouriteProducts = allProducts.filter(product=>favourites.includes(product.productId));
            res.render('store/favouriteList',{favouriteProducts: favouriteProducts});

        }));
    });
};


exports.postAddToFavourite = (req, res, next)=>{
    console.log('Body:', req.body);
    Favourite.addToFavourite(req.body.id, error=>{
        if(error){
            console.log('Error while adding To Favourite');
        }
        res.redirect('/favouriteList');
    });

};


exports.getMyOrders =  (req, res, next)=>{
    AddToCart.getSelectedItems((selected)=>{
        singleProduct.fetchAll((allProducts=>{
            const selectedProducts = allProducts.filter(product=>selected.includes(product.productId));
            res.render('store/myOrders',{selectedProducts:selectedProducts})
        }))
    })
};


exports.postMyOrders = (req, res, next)=>{
    
    if(!req.body.id){
        console.log('ERROR: Product ID missing!');
        return res.status(400).send('Product ID required');
    }
    
    AddToCart.addToCart(req.body.id, (error)=>{
        if(error){
            console.log('Error while adding in cart:', error);
            return res.status(400).send('Product already in cart');
        }
        console.log('Product added successfully');
        res.redirect('/myOrders');
    });
};

exports.postEditProducts = (req, res, next)=>{
    const { productId, userName, userId, productName, imageUrl, price } = req.body;
    const product = new singleProduct(userName, userId, productName, imageUrl, price);
    product.productId = productId;
    
    product.save();
    res.redirect('/host/hostProductList');
};


