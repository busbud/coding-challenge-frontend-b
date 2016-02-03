var express = require('express');
var app = express();
var path = require("path");

app.use(express.static('src/build'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'src/client/index.html'));
});
app.listen(process.env.PORT || 8080);
