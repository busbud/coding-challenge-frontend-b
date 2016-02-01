var React = require('react');
var ReactDOM = require('react-dom');
var Schedule = require('../Schedule/Schedule');
var SearchButton = require('../SearchButton/SearchButton');
require('./AppContainer.less');

var Main = React.createClass({
  render: function() {
    return (
      <div className="AppContainer">
        <div id="textContainer">
          <SearchButton text="Search with Busbud" />
        </div>
        <div id="scheduleContainer">
        </div>
      </div>
    );
  }
});

ReactDOM.render(<Main />, document.getElementById('container'));
