var express = require('express');
var compression = require('compression');
var app = express();
var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'development';

/**
 *  Express configuration
 **/

//Using jade for html minification, environnement based ressources (aka 'minified when in production')
app.set('view engine', 'jade');
//Compress data if available
app.use(compression());
//Define app favicon
//app.use(favicon("assets/images/favicon.png")); //@TODO: create a logo
//Define static resources entry points
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/assets', express.static(__dirname + '/assets'));
//Define the default page title
app.locals.title = 'Busbud - frontend challenge';
//Allow the template to "know" if we're in production
app.locals.isProduction = env === 'production';
//Don't minify html when in developpment
if (env === 'development') {
    app.locals.pretty = true;
}


/**
 *  Routes
 **/

//default route for the microsite
app.get('/', (req, res) => {
  res.render('index');
});

app.use(function(req, res) {
  res.status(404).render('404');
});

/**
 *  Getting the server ready to listen to targetted port (8080 in dev, 80 in production)
 **/
var server = app.listen(port,() => {
  console.log(`Busbud frontend challenge is Ready ! Listening on port ${port}, env is ${env}.`);
});

module.exports = server;