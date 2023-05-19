const Products = require('../models/product');


exports.getIndex = (req, res, next) => {
    Products.fetchAll()
    .then(products => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'} );
    })
    .catch(err => {
        console.log(err);
        });
};


exports.getProducts = (req, res, next) => {
    Products.fetchAll()
    .then(products => {
        res.render('shop/product-list', {prods: products, pageTitle: 'All Products', path: '/products'} );
    })
    .catch(err => console.log(err));
    // console.log('shop.js' , adminRoutes.products);
    // res.sendFile(path.join(rootDir, 'views','shop.html'))
   // const products = ProductsController.products;
   
};

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    Products.findById(productId)
    .then(product => {
        res.render('shop/product-detail', {pageTitle:product.title, products:product, path: '/products'});
    })
    .catch(err => console.log(err));
    //or we can use find all method
    // Products.findAll({where: {id: productId}})
    // .then(product => {
    //     res.render('shop/product-detail', {pageTitle:product[0].title, products:product[0], path: '/products'});
    // })
    // .catch(err => {
    //     console.log(err);
    // }); 
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(products => {
            res.render('shop/cart', { pageTitle: 'Cart', path:'/cart', products: products });
        })
    .catch(err => {
        console.log(err);
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Products.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    });    
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .deleteItemFromCart(prodId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'});
};

exports.getOrders = (req, res, next) => {
    req.user
    .getOrders()
    .then(orders => {
        res.render('shop/orders', {pageTitle: 'Your Orders', path:'/orders', orders:orders});
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postCreateOrder = (req, res, next) => {
    let fetchedCart;
    req.user
    .addOrder()
    .then(result => {
        res.redirect('/orders');
    }).catch(err => {
        console.log(err);
    });
};