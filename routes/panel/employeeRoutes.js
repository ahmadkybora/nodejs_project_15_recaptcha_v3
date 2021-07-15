const express = require('express');
const router = express.Router();
const EmployeeController = require('../../app/Controllers/Panel/EmployeeController');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/captcha.png', EmployeeController.getCaptcha);
router.get('/', isLoggedIn, isAdmin, EmployeeController.index);
router.get('show/:id', isLoggedIn, isAdmin, EmployeeController.show);
router.get('/create', isLoggedIn, isAdmin, EmployeeController.create);
router.post('/store', isLoggedIn, isAdmin, EmployeeController.store);
router.post('/update/:id', isLoggedIn, isAdmin, EmployeeController.update);
router.post('/destroy/:id', isLoggedIn, isAdmin, EmployeeController.destroy);
router.post('/search', isLoggedIn, isAdmin, EmployeeController.search);

module.exports = router;

