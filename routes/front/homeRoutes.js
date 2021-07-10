const express = require('express');
const router = express.Router();
const HomeController = require('../../app/Controllers/Front/HomeController');
//const isLoggedIn = require('../../middlewares/isLoggedIn');

router.get('/', HomeController.index);
router.get('/brands', HomeController.brands);
router.get('/product-categories', HomeController.productCategories);
router.get('/products', HomeController.products);
router.post('/product-likes', HomeController.productLikes);
router.post('/product-dislikes', HomeController.productDisLikes);
router.post('/product-favorite', HomeController.productFavorite);
router.post('/product-unfavorite', HomeController.productUnFavorite);
router.get('/article-categories', HomeController.articleCategories);
router.get('/articles', HomeController.articles);
router.post('/article-likes', HomeController.articleLikes);
router.post('/article-dislikes', HomeController.articleDisLikes);
router.get('/contact-us', HomeController.getContactUs);
router.post('/contact-us', HomeController.postContactUs);
router.get('/captcha.png', HomeController.getCaptcha);

module.exports = router;
