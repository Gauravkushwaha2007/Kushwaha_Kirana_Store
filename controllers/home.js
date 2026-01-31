
const Favourite = require('../models/favourite');
const singleProduct = require('../models/modelHome'); 
const Cart = require('../models/myOrders');

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
    singleProduct.fetchAll()
    .then(allProducts=>{
        res.render('store/productList',{ products: allProducts });
    })
    .catch(error=>{
        console.log(error);
    });
};


exports.getHostProductList = (req, res)=>{
    singleProduct.fetchAll().then(allProducts =>{
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
            res.render('store/productDetails', { product });
        }
    })
};


exports.getFavouriteList = (req, res) => {
  Favourite.getFavourites().then(favs => {
    const favIds = favs.map(f => f.productId.toString());

    singleProduct.fetchAll().then(products => {
      const favouriteProducts = products.filter(p =>
        favIds.includes(p._id.toString())
      );

      res.render('store/favouriteList', {
        favouriteProducts
      });
    });
  });
};


exports.postAddToFavourite = (req, res, next)=>{
    Favourite.addToFavourite(req.body.id)
    .then(()=>{
        res.redirect('/favouriteList');
    })
    .catch( error=> console.log('error is', error));
};


exports.getMyOrders = (req, res) => {
  Cart.getCartItems().then(items => {
    const cartIds = items.map(i => i.productId.toString());

    singleProduct.fetchAll().then(products => {
      const selectedProducts = products.filter(p =>
        cartIds.includes(p._id.toString())
      );

      res.render('store/myOrders', {
        selectedProducts
      });
    });
  });
};


exports.postMyOrders = (req, res) => {
  Cart.addToCart(req.body.id)
    .then(() => res.redirect('/myOrders'))
    .catch(err => console.log(err));
};


exports.postEditProducts = (req, res, next)=>{
    const { productId, userName, userId, productName, imageUrl, price } = req.body;
    const product = new singleProduct(userName, userId, productName, imageUrl, price);
    product._id = productId;
    
    product.save().then(result=>{
        console.log(result);
    });
    res.redirect('/host/hostProductList');
};


