const express = require('express');
const router = express.Router();

const categoryRoutes = require('./categories');
router.use('/categories', categoryRoutes); 
// Import route modules
const authRoutes = require('./auth');
const inventoryRoutes = require('./inventory');
// const categoryRoutes = require('./categories'); // Uncomment khi có

// Register routes
router.use('/auth', authRoutes);
router.use('/inventory', inventoryRoutes);
// router.use('/categories', categoryRoutes); // Uncomment khi có

module.exports = router;
