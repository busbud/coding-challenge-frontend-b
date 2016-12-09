import React, { Component } from 'react';
import Home from './Home.jsx';
import LanguageMenu from './Language-menu.jsx';

export class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <LanguageMenu />
      </div>
    );
  }

  componentWillMount() {
    let counterpart = require('counterpart');

    counterpart.setLocale(navigator.languages[1] || 'en');

    counterpart.registerTranslations('en', require('../i18n/en'));
    counterpart.registerTranslations('fr', require('../i18n/fr'));
    counterpart.registerTranslations('de', require('../i18n/de'));
    counterpart.registerTranslations('es', require('../i18n/es'));
  }
}