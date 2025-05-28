const authController = require('../app/controllers/authController');
const router = require('express').Router();

// Middlewares
const { validateSchema } = require('../app/middlewares/validateSchema');
const { loginSchema } = require("../app/validators/authSchema");

router.post("/login", validateSchema(loginSchema), authController.login);
router.get("/verify-token", authController.verifyToken);
router.post("/logout", authController.logout);

module.exports = router;