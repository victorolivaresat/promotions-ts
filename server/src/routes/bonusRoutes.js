const bonusController = require("../app/controllers/bonusController");
const router = require('express').Router();

router.post("/bonuses/:code/cash-in", bonusController.cashInBonus);
router.get('/bonuses/:code/validate', bonusController.validateBonus);

module.exports = router;
