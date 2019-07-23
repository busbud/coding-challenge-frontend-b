import React from 'react';

import Results from "./components/Results"
import Search from "./components/Search"
import { StateProvider } from './contexts/SearchContext'
import { useTranslation } from 'react-i18next';

import './App.css';


function App() {
  const { i18n } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="grid-wrapper">
            <div className="col-2">
              <img src="/logo.png" className="App-logo" alt="logo" />
            </div>
            <div className="col-8"></div>
            <div className="col-2">
              <button type="button" onClick={() => i18n.changeLanguage('en')}>EN</button>
              <button type="button" onClick={() => i18n.changeLanguage('fr')}>FR</button>
            </div>
          </div>
        </div>

      </header>
      <StateProvider>
        <Search />
        <Results />
      </StateProvider>

    </div>
  );
}

export default App;
