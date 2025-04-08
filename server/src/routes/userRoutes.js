const router = require('express').Router();
const userController = require('../app/controllers/userController');

const authRequired = require('../app/middlewares/validateToken');

// Rutas para usuarios
router.get('/', authRequired, userController.getAllUsers);
router.get('/:id', authRequired, userController.getUserById);
router.post('/', authRequired, userController.createUser);
router.put('/:id', authRequired, userController.updateUser);
router.delete('/:id', authRequired, userController.deleteUser);
router.patch('/:id/toggle-status', authRequired, userController.toggleUserStatus);

module.exports = router;
