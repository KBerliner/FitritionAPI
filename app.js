// MongoDB User Password: m39Bh0H2RHSxe4V4
// MongoDB Connection: mongodb+srv://berlinerkyle:m39Bh0H2RHSxe4V4@fitritionapi.l4op2ax.mongodb.net/?retryWrites=true&w=majority

// Installing Dependencies

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

app.use(express.json());

// Connecting to MongoDB

mongoose.connect('mongodb+srv://berlinerkyle:m39Bh0H2RHSxe4V4@fitritionapi.l4op2ax.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.log(error);
    });

// Header Middleware

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authroization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// API Request Routing

app.use('/api', userRoutes);

// Export

module.exports = app;