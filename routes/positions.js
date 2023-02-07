const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const positionsController = require('../controllers/positions');

router.get('/', positionsController.getAllPositions);

router.get('/:id', positionsController.getSinglePosition);

router.post('/', requiresAuth(), positionsController.createPosition);

router.put('/:id', requiresAuth(), positionsController.updatePosition);

router.delete('/:id', requiresAuth(), positionsController.deletePosition);

module.exports = router;