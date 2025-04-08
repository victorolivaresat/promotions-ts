const reportController = require('../app/controllers/reportController');
const router = require('express').Router();

const authRequired = require('../app/middlewares/validateToken');

// Ruta para obtener el reporte de bonos
router.get('/bonuses', authRequired, reportController.getBonusReport);

// Ruta para obtener el reporte de tickets de apuesta
router.get('/bet-tickets', authRequired, reportController.getBetTicketsReport);

module.exports = router;
