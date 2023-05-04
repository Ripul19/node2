const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const adminRoutes = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('shop.js' , adminRoutes.products);
    // res.sendFile(path.join(rootDir, 'views','shop.html'))
    const products = adminRoutes.products;

    //for pug
    // res.render('shop', {prods: products, pageTitle: 'Firstname', path: '/'});

    //for handlebars
    //can add css file name too while sending handlebars, can also pass layout as false to dtop using default layout
    //res.render('shop', {prods: products, pageTitle: 'Firstname', path: '/', hasProducts: products.length>0, activeShop: true});

    //for ejs
    res.render('shop', {prods: products, pageTitle: 'Firstname', path: '/'} );
});

module.exports= router;