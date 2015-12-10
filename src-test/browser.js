var React = require("react");
var ReactDOM = require('react-dom');
var Router = require('react-router');
var routes = require('./routes.jsx');


Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  var App = React.createFactory(Handler);
  ReactDOM.render(App(window.APP_PROPS), document.getElementById("app"));
});

