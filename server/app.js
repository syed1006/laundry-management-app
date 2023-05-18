const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//parser for parsing jason and url encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//allowing all cross origin connections
app.use(cors());

//importing all the routes
const userRoutes = require('./src/routes/user')
const orderRoutes = require('./src/routes/order');
const fetchUser = require('./src/middleware/fetchUser');


app.use('/user',  userRoutes)
app.use('/order', fetchUser, orderRoutes)








module.exports = app;