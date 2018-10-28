/***
 * @author Shiming Chen <chen@lemontv.me>
 */

import React from 'react';
import { Departures, Header } from 'containers';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Departures />
      </div>
    );
  }
}
