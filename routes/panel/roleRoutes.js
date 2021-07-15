const express = require('express');
const router = express.Router();
const RoleController = require('../../app/Controllers/Panel/RoleController');
const RoleRequest = require('../../app/Requests/RoleRequest');
const isLoggedIn = require('../../middlewares/isLoggedIn');
const isAdmin = require('../../middlewares/isAdmin');

router.get('/', isLoggedIn, isAdmin, RoleController.index);
router.post('/store', isLoggedIn, isAdmin, RoleRequest.create, RoleController.store);
router.post('/update/:id', isLoggedIn, isAdmin, RoleRequest.update, RoleController.update);
router.get('/destroy/:id', isLoggedIn, isAdmin, RoleController.destroy);
router.get('/roles', isLoggedIn, isAdmin, RoleController.roles);
router.get('/permissions', isLoggedIn, isAdmin, RoleController.permissions);
router.post('/search', isLoggedIn, isAdmin, RoleController.search);

module.exports = router;
