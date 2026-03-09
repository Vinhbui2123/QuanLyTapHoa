require('dotenv').config();
const express = require('express');
const cors = require('cors');


const authRoutes = require('./routers/auth');
const categoriesRoutes = require('./routers/categories');
const customerRoutes = require('./routers/customers');
const inventoryRoutes = require('./routers/inventory');
const invoiceRoutes = require('./routers/invoice');
const productRoutes = require('./routers/products');

const reportRoutes = require('./routers/report');
const supplierRoutes = require('./routers/suppliers');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.use('/api/categories', categoriesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/suppliers', supplierRoutes);

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`
🚀 Server:  http://localhost:${PORT}           
📡 API:     http://localhost:${PORT}/api
    `);
});

module.exports = app;