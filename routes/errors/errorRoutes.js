const express = require('express');
const router = express.Router();
const Handler = require('../../app/Exceptions/Handler');

router.get('', Handler.Error_401);
router.get('', Handler.Error_403);
router.get('', Handler.Error_404);
router.get('', Handler.Error_500);
router.get('', Handler.Error_503);

module.exports = router;

