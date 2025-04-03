const reportController = require('../app/controllers/reportController');
const router = require('express').Router();

// Ruta para obtener el reporte de bonos
router.get('/reports/bonuses', reportController.getBonusReport);

// Ruta para obtener el reporte de tickets de apuesta
router.get('/reports/bet-tickets', reportController.getBetTicketsReport);

module.exports = router;
