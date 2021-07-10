const express = require('express');
const router = express.Router();
const RoleController = require('../../app/Controllers/Panel/RoleController');
const RoleRequest = require('../../app/Requests/RoleRequest');
const isLoggedIn = require('../../middlewares/isLoggedIn');

router.get('/', isLoggedIn, RoleController.index);
router.post('/store', isLoggedIn, RoleRequest.create, RoleController.store);
router.post('/update/:id', isLoggedIn, RoleRequest.update, RoleController.update);
router.get('/destroy/:id', isLoggedIn, RoleController.destroy);
router.get('/roles', isLoggedIn, RoleController.roles);
router.get('/permissions', isLoggedIn, RoleController.permissions);
router.post('/search', isLoggedIn, RoleController.search);

module.exports = router;
