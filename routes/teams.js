const express = require('express');
const router = express.Router();
// const { requiresAuth } = require('express-openid-connect');

const teamsController = require('../controllers/teams');

router.get('/', teamsController.getAllTeams);

// router.get('/:id', playersController.getSingle);

// router.post('/', requiresAuth(), playersController.createContact);

// router.put('/:id', requiresAuth(), playersController.updateContact);

// router.delete('/:id', requiresAuth(), playersController.deleteContact);

module.exports = router;