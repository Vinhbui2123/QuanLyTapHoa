const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
// const categoryRoutes = require('./categories'); // Uncomment khi có

// Register routes
router.use('/auth', authRoutes);
// router.use('/categories', categoryRoutes); // Uncomment khi có

module.exports = router;
