const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const positionsController = require('../controllers/positions');

router.get('/', positionsController.getAllPositions);

module.exports = router;