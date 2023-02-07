const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const arenasController = require('../controllers/arenas');

router.get('/', arenasController.getAllArenas);

router.get('/:id', arenasController.getSingleArena);

router.post('/', requiresAuth(), arenasController.createArena);

router.put('/:id', requiresAuth(), arenasController.updateArena);

router.delete('/:id', requiresAuth(), arenasController.deleteArena);

module.exports = router;