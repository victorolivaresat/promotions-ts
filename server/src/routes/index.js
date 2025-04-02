const router = require('express').Router();

const routes = require('express').Router();
const authRoutes = require('./authRoutes');

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home route
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// Importing routes
routes.use(authRoutes);

module.exports = routes;



module.exports = router;