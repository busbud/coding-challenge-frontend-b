// Reactjs and jsx utils
require('node-jsx').install({extension: '.jsx'});
var React = require('react');
var Router = require('react-router');
var Header = require('./components/Header')

// React App components and api
var routes = require('./routes.jsx');
// var Api = require('./api/ServerApi');

// Express
var express = require('express');
var http = require('http');
var app = express();

// Some const
var BASEDIR = process.env.PWD;


app.set('port', process.env.PORT || 5000);


// Express App setup
app.set("views", BASEDIR + '/public');
app.use("/public", express.static(BASEDIR + "/public"));
app.set('view engine', 'jade');



http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});





// Express ROUTES




// Static routes
app.get('/', function (req, res) {
  Router.run(routes, '/', function (Handler) {
    var props = {currentLang: 'en'};
    // var navigation = React.renderToString(React.createElement(Header, props));
    var content = React.renderToString(React.createElement(Handler, props));
    res.render('index', {
      // navigation: navigation,
      content: content,
      injectedScript: safeStringify(props)
    });
  });
});

app.get('/:language', function (req, res) {
  var currentLanguage = req.params.language;
  // console.log(currentLanguage)
  Router.run(routes, '/' + currentLanguage, function (Handler) {
    var props = {currentLang: currentLanguage};
    
    // var navigation = React.renderToString(React.createElement(Header, props));
    var content = React.renderToString(React.createElement(Handler));
    res.render('index', {
      // navigation: navigation,
      content: content,
      injectedScript: safeStringify(props)
    });
  });
});

app.get('/:lang/schedules', function (req, res) {
  var props = {
    currentLang: req.params.lang,
    departure: req.params.depart,
    arrive: req.params.arrive,
    date: req.params.date,
    passenger: req.params.passengers
  };

  Router.run(routes, '/' + req.params.lang + '/schedules' , function (Handler) {
    
    // var navigation = React.renderToString(React.createElement(Header, props));
    var content = React.renderToString(React.createElement(Handler, props));
    res.render('index', {
      // navigation: navigation,
      content: content,
      injectedScript: safeStringify(props)
    });
  });
});

// app.get('/article/:id', function (req, res, next) {
//   var aid = req.params.id;
//   Router.run(routes, '/article/' + aid , function (Handler) {
//     var content = React.renderToString(React.createElement(Handler));
//     var injected = { list: [Api.getArticle(aid)]};
//     res.render('index', {
//       content: content,
//       injectedScript: JSON.stringify(injected)
//     });
//   });
// });

// API routes
// app.get('/api/article/:id', function (req, res, next) {
//   var aid = req.params.id;
//   var article = Api.getArticle(aid);
//   res.send(JSON.stringify(article));
// });

// app.get('/api/articles', function (req, res, next) {
//   var articles = Api.getArticles();
//   res.send(JSON.stringify(articles));
// });


// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

module.exports = app;

