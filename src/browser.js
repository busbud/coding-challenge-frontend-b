var React = require("react");
var ReactDOM = require('react-dom');
var Router = require('react-router');
var routes = require('./routes.jsx');
// var RoutesAction = require('./action/RoutesAction');

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
  var App = React.createFactory(Handler);
  React.render(App(window.APP_PROPS), document.body);
  // React.render(<Handler/>, document.body);
  // var activeRoute = RoutesAction.findActiveRoute(state.routes);

  // Every time there's a route change
  // ask RoutesAction to manage the flow
  // RoutesAction.triggerRouteChange(activeRoute, state.params);
});

// Router.run(routes, Router.HistoryLocation, function (Handler, state) {
//   React.render(<Handler/>, document.body);
  // var activeRoute = RoutesAction.findActiveRoute(state.routes);

  // Every time there's a route change
  // ask RoutesAction to manage the flow
  // RoutesAction.triggerRouteChange(activeRoute, state.params);
// });