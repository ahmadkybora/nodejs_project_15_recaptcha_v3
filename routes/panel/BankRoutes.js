const express = require('express');
const router = express.Router();
const BankController = require('../../app/Controllers/Panel/BankController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isLoggedIn, isAdmin, BankController.index);
router.post('/store', isLoggedIn, isAdmin, BankController.store);
router.post('/update/:id', isLoggedIn, isAdmin, BankController.update);
router.get('/destroy/:id', isLoggedIn, isAdmin, BankController.destroy);
router.post('/search', isLoggedIn, isAdmin, BankController.search);

module.exports = router;

