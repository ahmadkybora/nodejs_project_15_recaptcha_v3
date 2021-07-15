const express = require('express');
const router = express.Router();
const BrandController = require('../../app/Controllers/Panel/BrandController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const BrandRequest = require('../../app/Requests/brandRequest');
const BrandPolicy = require('../../app/Policies/BrandPolicy');

router.get('/', isLoggedIn, isAdmin, BrandPolicy.all, BrandController.index);
router.post('/store', isLoggedIn, isAdmin, /*BrandRequest.create,*/ BrandController.store);
router.post('/update/:id', isLoggedIn, isAdmin, BrandRequest.update, BrandController.update);
router.get('/destroy/:id', isLoggedIn, isAdmin, BrandController.destroy);
router.post('/search', isLoggedIn, isAdmin, BrandController.search);

module.exports = router;

