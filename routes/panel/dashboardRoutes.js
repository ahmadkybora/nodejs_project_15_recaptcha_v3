const express = require('express');
const router = express.Router();
const DashboardController = require('../../app/Controllers/Panel/DashboardController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isLoggedIn, isAdmin, DashboardController.index);

module.exports = router;
