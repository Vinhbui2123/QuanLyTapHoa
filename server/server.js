require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await testConnection();
});