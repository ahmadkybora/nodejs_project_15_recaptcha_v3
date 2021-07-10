const express = require('express');
const router = express.Router();
const ProductCategoryController = require('../../app/Controllers/Panel/ProductCategoryController');
const isLoggedIn = require('../../middlewares/isLoggedIn');

router.post('/category-search', isLoggedIn, ProductCategoryController.search);
router.get('/', isLoggedIn, ProductCategoryController.index);
router.post('/store', isLoggedIn, ProductCategoryController.store);
router.post('/update/:id', isLoggedIn, ProductCategoryController.update);
router.get('/destroy/:id', isLoggedIn, ProductCategoryController.destroy);

module.exports = router;
