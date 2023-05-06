const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('../util/path');
const ProductsController = require('../controllers/product')


const router = express.Router();


router.use(bodyParser.urlencoded({extended: false}));

// /admin/add-product with get request
router.get('/add-product', ProductsController.getAddProduct);

// /admin/add-product with post request
router.post('/add-product', ProductsController.postAddProduct);

module.exports= router;
//exports.routes = router;