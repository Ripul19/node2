const express = require('express');
const shopController = require('../controllers/shop');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductDetails);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
// router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/create-order', shopController.postCreateOrder);

module.exports= router;