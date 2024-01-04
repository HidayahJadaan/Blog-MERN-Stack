const express = require('express');
const dotenv = require('dotenv').config();
const connectionToDB = require('./config/connectToDB');

// Connect to the database
connectionToDB();

// Init App
const app =express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require('./routes/authRoute'));
app.use("/api/users", require('./routes/UsersRoute'));
app.use("/api/posts", require('./routes/PostRoute'));
app.use("/api/comments", require('./routes/CommentsRoute'));
app.use("/api/categories", require('./routes/categoriesRoute'));


// Running The Server

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log('Starting server on port '+PORT);
});