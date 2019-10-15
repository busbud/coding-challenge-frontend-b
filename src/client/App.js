import React, { Component } from 'react';
import MainContainer from './containers/MainContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Hello World<input type="date" name="bday"></input>
        <MainContainer />
      </div>
    );
  }
}

export default App;
