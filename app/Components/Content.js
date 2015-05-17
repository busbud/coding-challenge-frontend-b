var React = require('react');

module.exports = React.createClass({
  displayName: 'Content',

  getInitialState: function() {
  	return { serverData: null };
  },

  refreshData: function() {
  	// replace this with your favourite library for doing ajax calls
  	var xhr = new XMLHttpRequest();
    xhr.open('get', '/api/currentTime', true);
    xhr.onload = () => {
      var data = JSON.parse(xhr.responseText);
      this.setState({ serverData: data.time });
    };
    xhr.send();
  },

  render: function () {
    return (
    <div>
    <p>Here is some Content <b ref='serverResponse'>{ this.state.serverData || 'Click the button to hit the API' }</b></p>
    <input ref='refreshButton' type='button' onClick={this.refreshData } value='Hit the server'></input>
    </div>
	);
  }

});
