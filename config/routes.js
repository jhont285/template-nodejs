const router = require('express').Router();
const MoviesController = require('../app/controllers/moviesController');
const AccountsController = require('../app/controllers/accountsController');
const SessionsController = require('../app/controllers/sessionsController');

router.post('/auth', AccountsController.create);
router.post('/auth/signIn', SessionsController.create);

router.get('/movies', SessionsController.verify, MoviesController.index);
router.get('/movies/:id', SessionsController.verify, MoviesController.show);
router.post('/movies', SessionsController.verify, MoviesController.create);
router.put('/movies/:id', SessionsController.verify, MoviesController.update);
router.delete('/movies/:id', SessionsController.verify, MoviesController.delete);

module.exports = router;
