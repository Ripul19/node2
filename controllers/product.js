const Products = require('../models/product');

exports. getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: 'Add-Product', path: '/admin/add-product'});
};

exports.postAddProduct = (req, res, next) => {
    //console.log(JSON.parse(JSON.stringify(req.body)));
    const product = new Products(req.body.fname);
    product.save();
    res.redirect('/product-list');
};


exports.getProducts = (req, res, next) => {
    const products = Products.fetchAll((products) => {
        res.render('shop/product-list', {prods: products, pageTitle: 'Add-Products', path: '/product-list'} );
    });
    // console.log('shop.js' , adminRoutes.products);
    // res.sendFile(path.join(rootDir, 'views','shop.html'))
   // const products = ProductsController.products;
   
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: 'Cart', path:'/cart'});
};

exports.getHome = (req,res,next) => {
    res.render('shop/index', {pageTitle: 'Home Page', path: '/'});
};
