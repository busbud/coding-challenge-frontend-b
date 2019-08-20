import React from 'react';
import SearchForm from './components/SearchForm';
import Logo from './logo-osheaga.png';
import './App.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="header">
        <img className="header-logo" src={Logo} alt="Osheaga logo" />
        <p>
          SEE YOU NEXT YEAR!
          <br />
          AUGUST 2
          <br />
          PARC JEAN-DRAPEAU, MONTREAL, CA
        </p>
      </div>
      <SearchForm />
    </div>
  );
}

export default App;
