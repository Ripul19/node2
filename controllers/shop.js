const Products = require('../models/product');
const Order = require('../models/order');


exports.getIndex = (req, res, next) => {
    // Products.fetchAll()
    // .then(products => {
    //     res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'} );
    // })
    // .catch(err => {
    //     console.log(err);
    //     });

    Products.find()
    .then(products => {
        console.log(products);
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'} );
    })
    .catch(err => {
        console.log(err);
        });

};


exports.getProducts = (req, res, next) => {
    // Products.fetchAll()
    // .then(products => {
    //     res.render('shop/product-list', {prods: products, pageTitle: 'All Products', path: '/products'} );
    // })
    // .catch(err => console.log(err));

    Products.find()
    .then(products => {
        res.render('shop/product-list', {prods: products, pageTitle: 'All Products', path: '/products'} );
    })
    .catch(err => console.log(err));
   
};

exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;
    // Products.findById(productId)
    // .then(product => {
    //     res.render('shop/product-detail', {pageTitle:product.title, products:product, path: '/products'});
    // })
    // .catch(err => console.log(err));

    //mongoose also has findById method and it automatically converts the string to object as required
    Products.findById(productId)
    .then(product => {
        console.log(product);
        res.render('shop/product-detail', {pageTitle:product.title, products:product, path: '/products'});
    })
    .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    // req.user.getCart()
    //     .then(products => {
    //         res.render('shop/cart', { pageTitle: 'Cart', path:'/cart', products: products });
    //     })
    // .catch(err => {
    //     console.log(err);
    // });
    req.user
    .populate('cart.items.productId')
    .then(user => {
        const products = user.cart.items;
        res.render('shop/cart', { pageTitle: 'Cart', path:'/cart', products: products });
    })
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
    // req.user
    // .deleteItemFromCart(prodId)
    // .then(result => {
    //     res.redirect('/cart');
    // })
    // .catch(err => {
    //     console.log(err);
    // })
    req.user
    .deleteFromCart(prodId)
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
    // req.user
    // .getOrders()
    // .then(orders => {
    //     res.render('shop/orders', {pageTitle: 'Your Orders', path:'/orders', orders:orders});
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    Order.find({'user.userId': req.user._id})
    .then(orders => {
        res.render('shop/orders', {pageTitle: 'Your Orders', path:'/orders', orders:orders});
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postCreateOrder = (req, res, next) => {
    // req.user
    // .addOrder()
    // .then(result => {
    //     res.redirect('/orders');
    // }).catch(err => {
    //     console.log(err);
    // });
    req.user
    .populate('cart.items.productId')
    .then(user => {
        const products = user.cart.items.map(i => {
            return {
                quantity: i.quantity,
                productData: { ...i.productId._doc }
        };
        });
        const order = new Order ({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });
        return order.save();
    })
    .then(result => {
            return req.user.clearCart();
        }).then(result => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        });
};