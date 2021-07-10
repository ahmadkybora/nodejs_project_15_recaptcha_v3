const express = require('express');
const router = express.Router();
const MyProfileController = require('../../app/Controllers/Profile/MyProfileController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const UserPolicy = require('../../app/Policies/UserPolicy');

router.get('/', isLoggedIn, UserPolicy.all, MyProfileController.index);
router.post('/update/:id', isLoggedIn, UserPolicy.update, MyProfileController.update);

module.exports = router;
