import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { IntlProvider } from 'react-intl';

import messages_en from "./lang/en-US.json";
import messages_fr from "./lang/fr.json";

import Home from './Components/Home';
import Coachella from './Components/Coachella';

import './scss/App.scss';

var classNames = require('classnames');

const messages = {
  'en': messages_en,
  'fr': messages_fr
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: navigator.language.split(/[-_]/)[0]
    }
  }

  changeLocale(locale) {
    this.setState({
      locale: locale
    })
  }

  render () {
    return (
      <IntlProvider locale={this.state.locale} messages={messages[this.state.locale]}>
        <Router>
          <div className="roadToOsheaga--container">
            <header className="roadToOsheaga--header">
              <div
                className={ classNames({ 'active': this.state.locale === 'fr' }) }
                onClick={() => this.changeLocale('fr')}
              >
                FR
              </div>
              <div
                className={ classNames({ 'active': this.state.locale === 'en' }) }
                onClick={() => this.changeLocale('en')}
              >
                EN
              </div>
            </header>
            <Switch>
              <Route path="/coachella">
                <Coachella />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </IntlProvider>
    );
  }
}
export default App;
