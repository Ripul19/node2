const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('../util/path');

const products = [];

const router = express.Router();


router.use(bodyParser.urlencoded({extended: false}));

// /admin/add-product with get request
router.get('/add-product', (req, res, next) => {

    res.render('add-product', {pageTitle: 'Add-Product', path: '/admin/add-product'});
});

// /admin/add-product with post request
router.post('/add-product', (req, res, next) => {
    //console.log(JSON.parse(JSON.stringify(req.body)));
    products.push({ Firstname: req.body.fname })
    res.redirect('/');
});

//module.exports= router;
exports.routes = router;
exports.products = products;