const express = require('express');
const router = express.Router();
const ChatController = require('../../app/Controllers/Chat/ChatController');
const isLoggedIn = require('../../middlewares/isLoggedIn');

router.get('/', isLoggedIn, ChatController.index);
router.post('/store', isLoggedIn, ChatController.store);
router.post('/update/:id', isLoggedIn, ChatController.update);
router.get('/destroy/:id', isLoggedIn, ChatController.destroy);

module.exports = router;

