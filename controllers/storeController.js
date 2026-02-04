const Favourite = require('../models/favourite');
const Product = require('../models/product');
const Cart = require('../models/myOrders');

exports.getMyOrder = (req, res)=>{
    res.render('store/myOrder');
};


exports.getAllProducts = (req, res)=>{
    Product.fetchAll()
    .then(allProducts=>{
        res.render('store/productList',{ products: allProducts });
    })
    .catch(error=>{
        console.log(error);
    });
};


exports.getProductDetails = (req, res)=>{
    const productId = req.params.productId;

    Product.findProductById(productId).then(product=>{
        if(!product){
            // console.log('Product not Found');
            res.redirect('/prodcutList');
        }
        else{
            // console.log('Product mil gya ye h id '+ productId);
            res.render('store/productDetails', { product });
        }
    })
};


exports.getFavouriteList = (req, res) => {
  Favourite.getFavourites().then(favs => {
    // console.log('Favourite', favs);
    const favIds = favs.map(f => f.productId.toString());

    Product.fetchAll().then(products => {
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
    Favourite.addToFavourite(req.body.productId)
    .then(()=>{
        res.redirect('/favouriteList');
    })
    .catch( error=> console.log('error is', error));
};


exports.getMyOrders = async (req, res) => {
  const cartItems = await Cart.getCartItems();
  let products = [];
  let total = 0;

  for(let item of cartItems){
    const product = await Product.findProductById(item.productId);
    if(product){
      product.quantity = item.quantity;
      product.subTotal = product.price* item.quantity;
      total+= product.subTotal;
      products.push(product);
    }
  }
  res.render('store/myOrders', {
    selectedProducts: products,
    total
  });
};


exports.postIncreaseQty = (req, res) => {
    const productId = req.body.productId;

    Cart.increaseQty(productId)
        .then(() => {
          res.redirect('/myOrders');
        })
        .catch(error=>console.log(error));
};


  exports.postDecreaseQty = (req, res) => {
    const productId = req.body.productId;

    Cart.decreaseQty(productId)
      .then(() => res.redirect('/myOrders'))
      .catch(err => console.log(err));
  };



exports.postMyOrders = (req, res) => {
  Cart.addToCart(req.body.id)
    .then(() => res.redirect('/myOrders'))
    .catch(err => console.log(err));
};

exports.postRemoveProductFromCart = (req, res, next) =>{
  const productId = req.body.productId;

  Cart.removeFromCart(productId)
    .then(()=>{
    // console.log('Product Remove from your Cart');
    res.redirect('/myOrders');
  })
  .catch(error => console.log("Couldn't Delete product from your cart", error));
}


exports.postRemoveFromFavourite = (req, res)=>{
  const productId = req.body.productId;
  Favourite.removeFromFavourite(productId).then(()=>{
    // console.log('Product Removed from FavouriteList');
    res.redirect('/favouriteList');
  })
  .catch(error=> console.log(error));
}