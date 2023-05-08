const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('../util/path');
const adminController = require('../controllers/admin')


const router = express.Router();


router.use(bodyParser.urlencoded({extended: false}));

// /admin/add-product with get request
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product with post request
router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getAdminProducts);

module.exports= router;
//exports.routes = router;