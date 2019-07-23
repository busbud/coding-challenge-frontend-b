import React from 'react';

import Results from "./components/Results"
import Search from "./components/Search"
import { StateProvider } from './contexts/SearchContext'
import { useTranslation } from 'react-i18next';

import './App.css';

const LANGUAGES = ["en", "fr", "ru"]
function App() {
  const { i18n } = useTranslation();
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <div className="grid-wrapper">
            <div className="col-10 col-sm-6">
              <img src="/logo.png" className="App-logo" alt="logo" />
            </div>
            <div className="col-2 col-sm-6">
              {LANGUAGES.map(lang => <button key={lang} className={i18n.language === lang ? ' Language__button Language__button_active' : 'Language__button'} type="button" onClick={() => i18n.changeLanguage(lang)}>{lang.toUpperCase()}</button>)}
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
