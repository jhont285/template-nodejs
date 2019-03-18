const router = require('express').Router();
const MoviesController = require('../app/controllers/moviesController');

router.get('/movies', MoviesController.index);
router.get('/movies/:id', MoviesController.show);
router.post('/movies', MoviesController.create);
router.put('/movies/:id', MoviesController.update);
router.delete('/movies/:id', MoviesController.delete);

module.exports = router;
