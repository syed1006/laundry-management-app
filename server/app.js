const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//parser for parsing jason and url encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//importing all the routes
const userRoutes = require('./src/routes/user')


app.use('/user',  userRoutes)








module.exports = app;