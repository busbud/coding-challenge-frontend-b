import React, { Component } from 'react';
import '../stylesheets/App.css';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Road to Osheaga</h2>
        </div>
        <button onClick={this.handleClick}>Smash this button fam</button>
      </div>
    );
  }
}

export default App;
