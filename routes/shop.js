const express = require('express');
const shopController = require('../controllers/shop');
const bodyParser = require('body-parser');

const isAuth = require('../middleware/is-auth');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProductDetails);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
// // router.get('/checkout', shopController.getCheckout);
router.get('/orders', isAuth, shopController.getOrders);
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);
router.post('/create-order', isAuth, shopController.postCreateOrder);

module.exports= router;