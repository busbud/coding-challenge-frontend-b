var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');


// Instantiate an Express server and set root folder to "public"

app = express();
app.use(serveStatic(__dirname + "/public"));


// Set server port ans start server

var port = process.env.PORT || 9000;

app.listen( port );

console.log('Server started on port ' + port);