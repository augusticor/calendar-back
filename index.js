const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

const app = express();

const PORT = process.env.PORT || 4000;

// Database
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use(express.static('public'));

// Body parse middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
