import React, { Component } from 'react';
import SearchHeader from './containers/SearchHeader';
// import ResultList from './containers/ResultList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchHeader />
        {/* <ResultList /> */}
      </div>
    );
  }
}

export default App;
