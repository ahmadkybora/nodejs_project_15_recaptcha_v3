const express = require('express');
const router = express.Router();
const EmployeeController = require('../../app/Controllers/Panel/EmployeeController');
const isLoggedIn = require('../../middlewares/isLoggedIn');

router.get('/captcha.png', EmployeeController.getCaptcha);
router.get('/', isLoggedIn, EmployeeController.index);
router.get('show/:id', isLoggedIn, EmployeeController.show);
router.get('/create', isLoggedIn, EmployeeController.create);
router.post('/store', /*isLoggedIn,*/ EmployeeController.store);
router.post('/update/:id', isLoggedIn, EmployeeController.update);
router.post('/destroy/:id', isLoggedIn, EmployeeController.destroy);
router.post('/search', isLoggedIn, EmployeeController.search);

module.exports = router;

