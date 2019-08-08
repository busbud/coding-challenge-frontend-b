import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage';
import SearchResults from './pages/search-results/search-results';
import Header from './components/header/header.component';

class App extends Component {

  state = {
      search_data: []
  }

  render () {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/search' component={SearchResults} />
        </Switch>
      </div>
    );
  }
}

export default App;