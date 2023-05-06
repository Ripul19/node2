const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const ProductsController = require('../controllers/product')

const router = express.Router();

router.get('/', ProductsController.getProducts);

module.exports= router;