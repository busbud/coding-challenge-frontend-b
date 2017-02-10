var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});
