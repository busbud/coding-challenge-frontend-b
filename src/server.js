// Reactjs and jsx utils
require('node-jsx').install({
  extension: '.jsx'
});
var React = require('react');
var Router = require('react-router');

var routes = require('./routes.jsx');


// Express
var express = require('express');
var http = require('http');
var app = express();

// directory constant
var BASEDIR = process.env.PWD;


app.set('port', process.env.PORT || 5000);


// Express App setup
app.set("views", BASEDIR + '/public');
app.use("/public", express.static(BASEDIR + "/public"));
app.set('view engine', 'jade');



http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});



// Static routes
app.get('/', function(req, res) {
  Router.run(routes, '/', function(Handler) {
    var props = {
      currentLang: 'en'
    };

    var content = React.renderToString(React.createElement(Handler, props));
    res.render('index', {

      content: content,
      injectedScript: safeStringify(props)
    });
  });
});

app.get('/:language', function(req, res) {
  var currentLanguage = req.params.language;

  Router.run(routes, '/' + currentLanguage, function(Handler) {
    var props = {
      currentLang: currentLanguage
    };

    var content = React.renderToString(React.createElement(Handler));
    res.render('index', {

      content: content,
      injectedScript: safeStringify(props)
    });
  });
});

app.get('/:language/schedules/:departure/:arrival/:date/:adults', function(req, res) {
  var props = {
    currentLang: req.params.language,
    departure: req.params.departure,
    arrival: req.params.arrival,
    date: req.params.date,
    adults: req.params.adults
  };

  Router.run(routes, '/' + props.currentLang + '/schedules/' + props.departure + "/" + props.arrival + "/" + props.date + "/" + props.adults, function(Handler) {
    var content = React.renderToString(React.createElement(Handler, props));
    res.render('index', {
      content: content,
      injectedScript: safeStringify(props)
    });
  });
});



// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

module.exports = app;
