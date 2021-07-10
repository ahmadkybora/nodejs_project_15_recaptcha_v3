const express = require('express');
const router = express.Router();
const UserController = require('../../app/Controllers/Panel/UserController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const UserPolicy = require('../../app/Policies/UserPolicy');

router.get('/', isLoggedIn, UserPolicy.all, UserController.index);
router.post('/store', isLoggedIn, UserController.store);
router.post('/update/:id', isLoggedIn, UserController.update);
router.get('/destroy/:id', isLoggedIn, UserController.destroy);
router.post('/search', isLoggedIn, UserController.search);

module.exports = router;
