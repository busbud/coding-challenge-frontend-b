import React, { Component } from 'react';
import SearchHeader from './containers/SearchHeader';
import DepartureList from './containers/DepartureList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchHeader />
        <DepartureList />
      </div>
    );
  }
}

export default App;
