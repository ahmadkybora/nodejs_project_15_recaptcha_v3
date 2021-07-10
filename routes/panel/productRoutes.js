const express = require('express');
const router = express.Router();
const ProductController = require('../../app/Controllers/Panel/ProductController');
const isLoggedIn = require('../../middlewares/isLoggedIn');

router.get('/', isLoggedIn, ProductController.index);
router.get('/show/:id', isLoggedIn, ProductController.show);
router.post('/store', isLoggedIn, ProductController.store);
router.get('/edit/:id', isLoggedIn, ProductController.edit);
router.post('/update/:id', isLoggedIn, ProductController.update);
router.get('/destroy/:id', isLoggedIn, ProductController.destroy);

module.exports = router;
