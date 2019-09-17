import React from 'react';
import './App.scss';
import Header from './components/header.js';
import SearchList from './containers/searchList.js';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchList />
    </div>
  );
}

export default App;
