const Products = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: 'Add-Product', path: '/admin/add-product'});
};

exports.postAddProduct = (req, res, next) => {
    //console.log(JSON.parse(JSON.stringify(req.body)));
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Products(title, imageUrl, description, price);
    product.save();
    res.redirect('/products');
};

exports.getAdminProducts = (req, res, next) => {
    Products.fetchAll((products) => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: '/admin/products'} );
    });
};