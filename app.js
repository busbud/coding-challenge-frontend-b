var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var endpoint = require('./routes/index.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic(path.join(__dirname, 'public')));

app.use('/get-info', endpoint);

module.exports = app;
