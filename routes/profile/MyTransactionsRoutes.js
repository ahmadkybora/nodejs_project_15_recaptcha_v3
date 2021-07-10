const express = require('express');
const router = express.Router();
const MyTransactionController = require('../../app/Controllers/Profile/MyTransactionController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const myTransaction = require('../../middlewares/myTransaction');
const UserPolicy = require('../../app/Policies/UserPolicy');

router.get('/', isLoggedIn, UserPolicy.all, MyTransactionController.index);
router.post('/store', isLoggedIn, UserPolicy.create, MyTransactionController.store);
router.post('/update/:id', isLoggedIn, UserPolicy.update, MyTransactionController.update);
router.post('/destroy/:id', isLoggedIn, UserPolicy.destroy, MyTransactionController.destroy);
router.post('/search', isLoggedIn, myTransaction, MyTransactionController.search);

module.exports = router;
