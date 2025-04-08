const router = require('express').Router();
const authRoutes = require('./authRoutes');
const bonusRoutes = require('./bonusRoutes');
const reportRoutes = require('./reportRoutes');
const userRoutes = require('./userRoutes');

const authRequired = require('../app/middlewares/validateToken');

// Home route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Importing routes
router.use('/reports', reportRoutes);
router.use('/bonuses',bonusRoutes);
router.use('/users', userRoutes);
router.use('/auth',authRoutes);

module.exports = router;