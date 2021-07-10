const express = require('express');
const router = express.Router();
const ArticleCategoryController = require('../../app/Controllers/Panel/ArticleCategoryController');
const isLoggedIn = require('../../middlewares/isLoggedIn');

router.get('/', isLoggedIn, ArticleCategoryController.index);
router.post('/store', isLoggedIn, ArticleCategoryController.store);
router.post('/update/:id', isLoggedIn, ArticleCategoryController.update);
router.get('/destroy/:id', isLoggedIn, ArticleCategoryController.destroy);

module.exports = router;

