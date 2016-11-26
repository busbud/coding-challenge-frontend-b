// var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
var cons = require("consolidate");
app.engine('html', cons.swig)
app.set('views', __dirname + '/views');
app.set('view engine', 'html')


app.get('/', require('./routes').index);
app.get('/search', require('./routes').search);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

