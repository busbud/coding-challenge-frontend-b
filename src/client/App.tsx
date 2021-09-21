import axios from 'axios';
import React, { Component } from 'react';

import { DepartureSearchInitResult, DepartureSearchPollResult }
  from '../api/busbud/DepartureSearch';

class App extends Component {
  searchInit() {
    axios.get<DepartureSearchInitResult>('/api/search')
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }

  searchPoll() {
    axios.get<DepartureSearchPollResult>('/api/search/poll')
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App" onClick={this.searchInit}>
        Busbud Frontend Challenge
      </div >
    );
  }
}

export default App;
