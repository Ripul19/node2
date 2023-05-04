const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const adminRoutes = require('./admin')

const router = express.Router();

router.get('/', (req, res, next) => {
    // console.log('shop.js' , adminRoutes.products);
    // res.sendFile(path.join(rootDir, 'views','shop.html'))
    const products = adminRoutes.products;
    res.render('shop', {prods: products, pageTitle: 'Firstname', path: '/'} );
});

module.exports= router;