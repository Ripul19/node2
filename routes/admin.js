const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('../util/path');

const router = express.Router();


router.use(bodyParser.urlencoded({extended: false}));

// /admin/add-product with get request
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product with post request
router.post('/add-product', (req, res, next) => {
    console.log(JSON.parse(JSON.stringify(req.body)));
    res.redirect('/');
});

module.exports= router;