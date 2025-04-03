const router = require('express').Router();
const authRoutes = require('./authRoutes');
const bonusRoutes = require('./bonusRoutes');
const reportRoutes = require('./reportRoutes');

// Home route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Importing routes
router.use(authRoutes);
router.use(bonusRoutes);
router.use(reportRoutes);


module.exports = router;