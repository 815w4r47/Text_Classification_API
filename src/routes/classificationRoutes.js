const express = require('express');
const { classify } = require('../controllers/classificationController');

const router = express.Router();
router.post('/', classify);

module.exports = router;
