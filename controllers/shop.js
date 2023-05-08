const Products = require('../models/product');

exports.getProducts = (req, res, next) => {
    Products.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'All Products', path: '/products'} );
    });
    // console.log('shop.js' , adminRoutes.products);
    // res.sendFile(path.join(rootDir, 'views','shop.html'))
   // const products = ProductsController.products;
   
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Cart', path:'/cart'});
};

exports.getIndex = (req, res, next) => {
    Products.fetchAll((products) => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'} );
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'});
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Your Orders', path:'/orders'});
};

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Products.findById(productId, product => {
        res.render('shop/product-detail', {pageTitle:product.title, product:product, path: '/products'});
    });
}