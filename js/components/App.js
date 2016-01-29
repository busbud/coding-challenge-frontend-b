import React from 'react';

var App = React.createClass({
  render() {
    return (
      <div>
        <h1>Busbud front-end coding challenge</h1>
        {this.props.children}
      </div>
    )
  }
});

export default App;