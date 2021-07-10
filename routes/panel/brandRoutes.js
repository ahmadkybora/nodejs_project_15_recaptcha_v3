const express = require('express');
const router = express.Router();
const BrandController = require('../../app/Controllers/Panel/BrandController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const BrandRequest = require('../../app/Requests/brandRequest');
const BrandPolicy = require('../../app/Policies/BrandPolicy');

router.get('/', isLoggedIn, BrandPolicy.all, BrandController.index);
router.post('/store', isLoggedIn, /*BrandRequest.create,*/ BrandController.store);
router.post('/update/:id', isLoggedIn, BrandRequest.update, BrandController.update);
router.get('/destroy/:id', isLoggedIn, BrandController.destroy);
router.post('/search', isLoggedIn, BrandController.search);

module.exports = router;

