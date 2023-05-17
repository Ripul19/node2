const Products = require('../models/product');


exports.getIndex = (req, res, next) => {
    Products.findAll().then(products => {
        res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/'} );
    })
    .catch(err => {
        console.log(err);
        });
};


exports.getProducts = (req, res, next) => {
    Products.findAll()
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
    Products.findByPk(productId)
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
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart', { pageTitle: 'Cart', path:'/cart', products: products });
        })
        .catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId }})
    })
    .then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        if(product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity +1;
            return product;
        }
        return Products.findByPk(prodId)
    })
    .then(product => {
        return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    });
    // Products.findById(prodId, (product) => {
    //     Cart.addProduct(prodId, product.price);
    // });
    
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
    .getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}})
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
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
    .getOrders({include: ['products']})
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
    .getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        req.user
        .createOrder()
        .then(order => {
            order.addProducts(products.map(product => {
                product.orderItem = { quantity: product.cartItem.quantity };
                return product;
            })
            );
        })
        .catch(err => {
            console.log(err);
        });
    })
    .then(result => {
        fetchedCart.setProducts(null);
    })
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => {
        console.log(err);
    });
};