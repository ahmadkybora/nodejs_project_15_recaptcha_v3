const express = require('express');
const router = express.Router();
const ProductController = require('../../app/Controllers/Panel/ProductController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isLoggedIn, isAdmin, ProductController.index);
router.get('/show/:id', isLoggedIn, isAdmin, ProductController.show);
router.post('/store', isLoggedIn, isAdmin, ProductController.store);
router.get('/edit/:id', isLoggedIn, isAdmin, ProductController.edit);
router.post('/update/:id', isLoggedIn, isAdmin, ProductController.update);
router.get('/destroy/:id', isLoggedIn, isAdmin, ProductController.destroy);

module.exports = router;
