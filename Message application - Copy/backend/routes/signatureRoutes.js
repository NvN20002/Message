const express = require('express');
const { signMessage, verifyMessage } = require('../controllers/signatureController');
const router = express.Router();

router.post('/sign', signMessage);
router.post('/verify', verifyMessage);

module.exports = router;
