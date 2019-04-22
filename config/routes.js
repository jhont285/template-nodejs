const router = require('express').Router();
const MoviesController = require('../app/controllers/moviesController');
const AccountsController = require('../app/controllers/accountsController');
const SessionsController = require('../app/controllers/sessionsController');

router.post('/auth', AccountsController.create);
router.post('/auth/signIn', SessionsController.create);

// all routes with auth must be down
router.use(SessionsController.verify());
router.get('/movies', MoviesController.index);
router.get('/movies/:id', MoviesController.show);
router.post('/movies', MoviesController.create);
router.put('/movies/:id', MoviesController.update);
router.delete('/movies/:id', MoviesController.delete);

module.exports = router;
