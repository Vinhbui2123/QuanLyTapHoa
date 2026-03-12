require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const routes = require('./routers');

// Import middleware
const errorHandler = require('./middlewares/errorHandle');

const app = express();
const PORT = process.env.PORT || 3000;


// MIDDLEWARE


// CORS - cho phép frontend gọi API
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Parse JSON body
app.use(express.json());

// Parse URL-encoded body
app.use(express.urlencoded({ extended: true }));

// Serve static files từ thư mục client
app.use(express.static(path.join(__dirname, '../client')));

// ROUTES


// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use('/api', routes);

// Serve frontend cho tất cả routes khác
app.get('{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// ERROR HANDLING

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`
Server: http://localhost:${PORT}
`);
});

module.exports = app;
