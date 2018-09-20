require('dotenv').config();

var express = require('express');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require("i18n-express");
var indexRouter = require('./routes/index');
var resultsRouter = require('./routes/results');
var session = require('express-session');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public/sass'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'), // <--- use here. Specify translations files path.
  siteLangs: ["en","es"],
  textsVarName: 'translation'
}));

app.use('/', indexRouter);
app.use('/results', resultsRouter);


module.exports = app;
