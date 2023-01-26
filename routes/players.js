const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const playersController = require('../controllers/players');

router.get('/', playersController.getAll);

router.get('/:id', playersController.getSingle);

router.post('/', requiresAuth(), playersController.createContact);

router.put('/:id', requiresAuth(), playersController.updateContact);

router.delete('/:id', requiresAuth(), playersController.deleteContact);

module.exports = router;