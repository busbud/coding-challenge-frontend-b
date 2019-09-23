import React from 'react';
import Header from './components/header.js';
import SearchList from './containers/searchList.js';
import './styles/app.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchList />
    </div>
  );
}

export default App;
