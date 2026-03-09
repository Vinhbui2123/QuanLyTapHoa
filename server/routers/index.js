const express = require('express');
const router = express.Router();

const categoryRoutes = require('./categories');
router.use('/categories', categoryRoutes); 
// Import route modules
const authRoutes = require('./auth');
const inventoryRoutes = require('./inventory');
const invoiceRoutes = require('./invoice');
const productRoutes = require('./products');
const reportRoutes = require('./report');
// const categoryRoutes = require('./categories'); // Uncomment khi có

// Register routes
router.use('/auth', authRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/products', productRoutes);
router.use('/reports', reportRoutes);
// router.use('/categories', categoryRoutes); // Uncomment khi có

// customer routes
const customerRouters = require('./customers');
router.use('/customers', customerRouters);

module.exports = router;
