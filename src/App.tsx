import * as React from 'react';
import './App.css';
import {Schedule} from './component/schedule';
const logo = require('./assets/img/osheaga.png');

class App extends React.Component<any,any> {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Busbud Frontend Challenge</h1>
        </div>
        <h2>
            Departures to Montréal from NewYork City on the 2nd of August 2018
        </h2>
        <Schedule />
      </div>
    );
  }
}

export default App;
