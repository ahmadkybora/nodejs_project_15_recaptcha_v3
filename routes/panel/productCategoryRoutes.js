const express = require('express');
const router = express.Router();
const ProductCategoryController = require('../../app/Controllers/Panel/ProductCategoryController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

router.post('/category-search', isLoggedIn, isAdmin, ProductCategoryController.search);
router.get('/', isLoggedIn, isAdmin, ProductCategoryController.index);
router.post('/store', isLoggedIn, isAdmin, ProductCategoryController.store);
router.post('/update/:id', isLoggedIn, isAdmin, ProductCategoryController.update);
router.get('/destroy/:id', isLoggedIn, isAdmin, ProductCategoryController.destroy);

module.exports = router;
