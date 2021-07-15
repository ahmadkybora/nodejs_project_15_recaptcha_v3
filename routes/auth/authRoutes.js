const express = require('express');
const router = express.Router();
const AuthController = require('../../app/Controllers/Auth/AuthController');
const AuthRequest = require('../../app/Requests/AuthRequest');
const rECAPTCHA = require('../../middlewares/rECAPTCHA');
const isAdmin = require('../../middlewares/isAdmin');

router.post('/login', rECAPTCHA, AuthRequest.login, AuthController.login);
router.post('/register', rECAPTCHA, AuthRequest.register, isAdmin, AuthController.register);
router.get('/logout', AuthController.logout);
router.post('/forget-password', rECAPTCHA, AuthRequest.forgetPassword, AuthController.forgetPassword);
router.post('/reset-password/:signature', rECAPTCHA, AuthRequest.resetPassword, AuthController.resetPassword);

router.get('/products', AuthController.pub);
router.get('/product-categories', AuthController.pub);
router.get('/brands', AuthController.pub);
router.get('/articles', AuthController.pub);

module.exports = router;



