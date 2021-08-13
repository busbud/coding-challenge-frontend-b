import React from 'react';
import './App.scss';
import SearchTravels from './components/SearchTravels';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="title">
          <img
            src="https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png"
            alt="new"
          />
        </p>
      </header>

      <SearchTravels />
    </div>
  );
}

export default App;
