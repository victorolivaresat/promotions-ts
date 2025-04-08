const bonusController = require("../app/controllers/bonusController");
const router = require('express').Router();

const authRequired = require('../app/middlewares/validateToken');

router.post("/:code/cash-in", authRequired, bonusController.cashInBonus);
router.get('/:code/validate', authRequired, bonusController.validateBonus);

module.exports = router;
