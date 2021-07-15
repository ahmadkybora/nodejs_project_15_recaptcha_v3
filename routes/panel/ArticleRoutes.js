const express = require('express');
const router = express.Router();
const ArticleController = require('../../app/Controllers/Panel/ArticleController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isLoggedIn, isAdmin, ArticleController.index);
router.post('/store', isLoggedIn, isAdmin, ArticleController.store);
router.post('/update/:id', isLoggedIn, isAdmin, ArticleController.update);
router.get('/destroy/:id', isLoggedIn, isAdmin, ArticleController.destroy);

module.exports = router;

