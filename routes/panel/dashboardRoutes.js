const express = require('express');
const router = express.Router();
const DashboardController = require('../../app/Controllers/Panel/DashboardController');
const isLoggedIn = require('../../middlewares/isLoggedIn');

router.get('/', isLoggedIn, DashboardController.index);

module.exports = router;
