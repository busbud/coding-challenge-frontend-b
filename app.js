var express = require('express');

var app = express();

var PORT = 8080;

app.use('/static', express.static('public'));

app.set('view engine', 'pug');


app.get('/', function(req, res) {
  res.render("index");
});

app.listen(PORT, function() {
  console.log('Listening on port %s', PORT);
});