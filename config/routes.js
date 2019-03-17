const router = require('express').Router();
const UsersController = require('../app/controllers/usersController');

router.get('/movies', UsersController.index);
router.get('/movies/:id', UsersController.show);
router.post('/movies', UsersController.create);
router.put('/movies/:id', UsersController.update);
router.delete('/movies/:id', UsersController.delete);

module.exports = router;
