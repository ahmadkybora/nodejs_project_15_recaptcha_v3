const express = require('express');
const router = express.Router();
const UserController = require('../../app/Controllers/Panel/UserController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');
const UserPolicy = require('../../app/Policies/UserPolicy');

router.get('/', isLoggedIn, isAdmin, UserPolicy.all, UserController.index);
router.post('/store', isLoggedIn, isAdmin, UserController.store);
router.post('/update/:id', isLoggedIn, isAdmin, UserController.update);
router.get('/destroy/:id', isLoggedIn, isAdmin, UserController.destroy);
router.post('/search', isLoggedIn, isAdmin, UserController.search);

module.exports = router;
