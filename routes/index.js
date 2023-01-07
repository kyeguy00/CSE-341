const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Merry Southwick');
});

module.exports = routes;