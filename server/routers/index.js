const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const productRoutes = require('./products');
const categoryRoutes = require('./categories');
const invoiceRoutes = require('./invoices');
const customerRoutes = require('./customers');
const supplierRoutes = require('./suppliers');
const inventoryRoutes = require('./inventory');
const reportRoutes = require('./reports');

// Register routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/customers', customerRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
