const router = require('express').Router();
const authRoutes = require('./authRoutes');
const bonusRoutes = require('./bonusRoutes');
const reportRoutes = require('./reportRoutes');
const userRoutes = require('./userRoutes'); // Importar rutas de usuarios

// Home route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Importing routes
router.use(authRoutes);
router.use(bonusRoutes);
router.use(reportRoutes);
router.use('/users', userRoutes); // Agregar rutas de usuarios

module.exports = router;