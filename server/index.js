const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//instance of express
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
//this creates a new db inside mongo called 'auth'
mongoose.connect('mongodb://localhost:/auth');

//App setup

//any incoming requests to a server will pass through morgan
app.use(morgan('combined'));
//parse incoming requests in json
app.use(bodyParser.json({type: '*/*'}));
router(app);
//server setup
//local port
const port = process.env.PORT || 3090;
//create an http server that can receive requests and forward onto express app
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
