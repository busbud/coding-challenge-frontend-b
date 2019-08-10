import React from 'react';
import NavBar from './components/layout/NavBar';
import Departures from './components/Departures';
import Search from './components/Search';
import BusbudState from './context/busbud/BusbudState'
import './App.css';

const App = () => {
    return (
      <BusbudState>
        <div className="App">
          <NavBar />
          <div className="container">
            <Search />
            <Departures />
          </div>
        </div>
      </BusbudState>
    );
}

export default App
