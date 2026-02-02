require('dotenv').config();
const express = require('express');
const cors = require('cors');


const authRoutes = require('./routers/auth');

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

app.use('/api/auth', authRoutes);

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
