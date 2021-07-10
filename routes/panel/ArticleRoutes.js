const express = require('express');
const router = express.Router();
const ArticleController = require('../../app/Controllers/Panel/ArticleController');
const isLoggedIn = require('../../middlewares/isLoggedIn');

router.get('/', isLoggedIn, ArticleController.index);
router.post('/store', isLoggedIn, ArticleController.store);
router.post('/update/:id', isLoggedIn, ArticleController.update);
router.get('/destroy/:id', isLoggedIn, ArticleController.destroy);

module.exports = router;

