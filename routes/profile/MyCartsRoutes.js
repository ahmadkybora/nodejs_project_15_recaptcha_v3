const express = require('express');
const router = express.Router();
const MyCartController = require('../../app/Controllers/Profile/MyCartController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const CartPolicy = require('../../app/Policies/CartPolicy');
const CartRequest = require('../../app/Requests/CartRequest');

router.get('/', isLoggedIn, /*CartPolicy.all, */MyCartController.myCart);
router.get('/add-cart', isLoggedIn, CartPolicy.all,  CartRequest.create, MyCartController.addToCart);
router.get('/update-cart', isLoggedIn, CartPolicy.all, CartRequest.update, MyCartController.updateCart);
router.get('/remove-cart', isLoggedIn, CartPolicy.all, MyCartController.removeFromCart);
router.get('/delete-cart', isLoggedIn, CartPolicy.all, MyCartController.deleteCart);
router.get('/history-cart', isLoggedIn, CartPolicy.all, MyCartController.myCartHistory);
router.get('/search', isLoggedIn, CartPolicy.all, MyCartController.search);

module.exports = router;
