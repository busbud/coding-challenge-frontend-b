var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./router');

var port = process.env.PORT || 8080;

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use('/dist', express.static('dist'));

router(app);

app.get('/', function(req, res) {
  res.render("index");
});

app.listen(port, function() {
  console.log('Listening on port %s', port);
});