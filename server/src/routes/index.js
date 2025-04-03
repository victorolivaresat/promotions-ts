const router = require('express').Router();
const authRoutes = require('./authRoutes');

// Home route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Importing routes
router.use(authRoutes);


module.exports = router;