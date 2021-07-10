const express = require('express');
const router = express.Router();
const AuthController = require('../../app/Controllers/Auth/AuthController');
const AuthRequest = require('../../app/Requests/AuthRequest');

//router.post('/login', isLoggedOut, AuthController.handleLogin, AuthController.rememberMe);
//router.post('/login', AuthController.rememberMe);
router.post('/login', AuthRequest.login, AuthController.login);
router.post('/register', AuthRequest.register, AuthController.register);
router.get('/logout', AuthController.logout);
router.post('/forget-password', AuthController.forgetPassword);
router.post('/reset-password', AuthController.resetPassword);

router.get('/products', AuthController.pub);
router.get('/product-categories', AuthController.pub);
router.get('/brands', AuthController.pub);
router.get('/articles', AuthController.pub);

module.exports = router;



