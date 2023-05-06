const Products = require('../models/product');

exports. getAddProduct = (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add-Product', path: '/admin/add-product'});
}

exports.postAddProduct = (req, res, next) => {
    //console.log(JSON.parse(JSON.stringify(req.body)));
    const product = new Products(req.body.fname);
    product.save();
    res.redirect('/');
}


exports.getProducts = (req, res, next) => {
    const products = Products.fetchAll((products) => {
        res.render('shop', {prods: products, pageTitle: 'Add-Products', path: '/'} );
    });
    // console.log('shop.js' , adminRoutes.products);
    // res.sendFile(path.join(rootDir, 'views','shop.html'))
   // const products = ProductsController.products;
   
}
