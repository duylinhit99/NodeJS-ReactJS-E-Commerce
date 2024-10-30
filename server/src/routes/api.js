const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const userController = require('../controllers/userController')
// Định nghĩa các tuyến đường API ở đây
router.get('/user', userController.getUser)

router.post('/login', loginController.checkLogin);

router.post('/register', registerController.upload, registerController.registerUser);

router.get('/product/list', productController.getProduct);

router.get('/product/:id', productController.getProductById);

router.post('/cart/products', cartController.getCartProduct)

router.post('/cart/products/order/:id', cartController.orderProduct)

module.exports = router;