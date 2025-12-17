require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => {
    res.send('Smart Shopping Assistant API is running');
});

// Sync Database and Start Server
sequelize.sync()
    .then(() => {
        console.log('PostgreSQL Database Connected & Synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log('Database Connection Error:', err);
    });
