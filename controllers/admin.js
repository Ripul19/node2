const Products = require('../models/product');
// const Users = require('../models/user');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: 'Add-Product', path: '/admin/add-product', editing: false});
};


exports.postAddProduct = (req, res, next) => {
    //console.log(JSON.parse(JSON.stringify(req.body)));
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Products(title, price, description, imageUrl, null, req.user._id);

    product.save()
    .then(result => {
        //console.log(result);
        console.log('Created Product');
        res.redirect('/products');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
     if(!editMode){
         res.redirect('/');
     }
     const prodId = req.params.productId;
    //  req.user.getProducts({where: {id: prodId}})
     //Products.findByPk(prodId)
     Products.findById(prodId)
     .then(product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {pageTitle: 'Edit Product', path: '/admin/edit-product', editing: editMode, product:product});
     }).catch(err => {
        console.log(err);
     });
};


exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const product = new Products(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, prodId);

    // const updatedProduct = new Products(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    // updatedProduct.save();
    // res.redirect('/products');

    // Products.findById(prodId)
    product.save()
    .then(result => {
        console.log("UPDATED PRODUCT");
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
};


exports.getAdminProducts = (req, res, next) => {
    //req.user.getProducts()
    Products.fetchAll()
    .then(products => {
        res.render('admin/products', {prods: products, pageTitle: 'Admin Products', path: '/admin/products'} );
    })
    .catch(err =>{
        console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Products.deleteById(prodId)
    .then(result => {
        console.log('DELETED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    })
};
