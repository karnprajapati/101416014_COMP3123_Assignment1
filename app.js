const express = require('express');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();
app.use(express.json());



// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

module.exports = app;
