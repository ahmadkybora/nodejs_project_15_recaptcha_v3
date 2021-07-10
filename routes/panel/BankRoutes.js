const express = require('express');
const router = express.Router();
const BankController = require('../../app/Controllers/Panel/BankController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
//const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isLoggedIn, BankController.index);
router.post('/store', isLoggedIn, BankController.store);
router.post('/update/:id', isLoggedIn, BankController.update);
router.get('/destroy/:id', isLoggedIn, BankController.destroy);
router.post('/search', isLoggedIn, BankController.search);

module.exports = router;

