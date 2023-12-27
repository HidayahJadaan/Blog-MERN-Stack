const express = require('express');
const dotenv = require('dotenv').config();
const connectionToDB = require('./config/connectToDB');

// Connect to the database
connectionToDB();

// Init App
const app =express();

// Middlewares
app.use(express.json());



// Running The Server

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log('Starting server on port '+PORT);
});