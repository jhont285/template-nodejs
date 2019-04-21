const express = require('express');
const MoviesController = require('../app/controllers/moviesController');
const AccountsController = require('../app/controllers/accountsController');
const SessionsController = require('../app/controllers/sessionsController');

const routerWithAuth = express.Router();
const router = express.Router();

router.post('/auth', AccountsController.create);
router.post('/auth/signIn', SessionsController.create);

routerWithAuth.get('/movies', MoviesController.index);
routerWithAuth.get('/movies/:id', MoviesController.show);
routerWithAuth.post('/movies', MoviesController.create);
routerWithAuth.put('/movies/:id', MoviesController.update);
routerWithAuth.delete('/movies/:id', MoviesController.delete);

module.exports = { routerWithAuth, router };
