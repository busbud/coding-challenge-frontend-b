import React from 'react';

import './App.css';

import LangSelect from './components/langSelect';
import SearchResults from './components/searchResults';
import SearchForm from './components/searchForm';

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <SearchForm {...this.props} />
        <SearchResults {...this.props} />
        <footer className="App-footer">
          <LangSelect {...this.props} />
        </footer>
      </div>
    );
  }
}

export default App;
