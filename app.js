var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var router = require('./router');

var port = 8080;

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/static', express.static('public'));

router(app);

app.get('/', function(req, res) {
  res.render("index");
});

app.listen(PORT, function() {
  console.log('Listening on port %s', PORT);
});