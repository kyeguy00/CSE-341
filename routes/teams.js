const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const teamsController = require('../controllers/teams');

router.get('/', teamsController.getAllTeams);

router.get('/:id', teamsController.getSingleTeam);

router.post('/', requiresAuth(), teamsController.createTeam);

router.put('/:id', requiresAuth(), teamsController.updateTeam);

router.delete('/:id', requiresAuth(), teamsController.deleteTeam);

module.exports = router;