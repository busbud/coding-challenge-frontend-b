var React = require("react");
var Router = require('react-router');


// Components

var Header = require('./components/Header.jsx');
var SearchResults = require('./components/SearchResults.jsx');
var SearchMenu = require('./components/SearchMenu.jsx');

var Route = Router.Route;

var routes = (
  <Route name="app" path="/" handler={Header}>
    <Route name="menu" path="/" handler={SearchMenu} />
    <Route name="language" path="/:language" handler={SearchMenu} />
    <Route name="schedules" path="/:language/schedules/:departure/:arrival/:date/:adults" handler={SearchResults}/>
  </Route>
);

module.exports = routes;
