const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const ProductsController = require('../controllers/product')

const router = express.Router();

router.get('/', ProductsController.getHome);
router.get('/product-list', ProductsController.getProducts);
router.get('/cart', ProductsController.getCart);

module.exports= router;