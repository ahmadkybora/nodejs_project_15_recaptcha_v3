const express = require('express');
const router = express.Router();
const ArticleCategoryController = require('../../app/Controllers/Panel/ArticleCategoryController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isLoggedIn, isAdmin, ArticleCategoryController.index);
router.post('/store', isLoggedIn, isAdmin, ArticleCategoryController.store);
router.post('/update/:id', isLoggedIn, isAdmin, ArticleCategoryController.update);
router.get('/destroy/:id', isLoggedIn, isAdmin, ArticleCategoryController.destroy);

module.exports = router;

