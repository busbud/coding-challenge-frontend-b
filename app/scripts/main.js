import React from 'react';
import { render } from 'react-dom';

// Polyfills
import 'es6-promise';
import 'whatwg-fetch';

// Locales
import $ from './locale-data.json';

// Components
import Header from './components/Header';
import CtaButton from './components/CtaButton';
import SearchModal from './components/SearchModal';
import LoadingIndicator from './components/LoadingIndicator';
import SelectLocale from './components/SelectLocale';

// App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.setLocale = this.setLocale.bind(this);
    this.revealModal = this.revealModal.bind(this);
    this.dismissModal = this.dismissModal.bind(this);
    this.state = {
      fetch: {
        origin: 'dr5reg', // New York
        dest: 'f25dvk', // Montreal
        date: '2016-07-29', // July 29, 2016
      },
      results: undefined,
      modal: 'inactive',
      locale: 'en',
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) this.setState({ modal: 'inactive' });
    });
  }

  setLocale(event) {
    this.setState({ locale: event.target.value });
  }

  revealModal() {
    this.setState({ modal: 'active' });
    this.busbudRequest();
  }

  dismissModal() {
    this.setState({ modal: 'inactive' });
  }

  busbudRequest(poll = false, retry = 0) {
    const { origin, dest, date } = this.state.fetch;
    let endpoint = `https://napi.busbud.com/x-departures/${origin}/${dest}/${date}`;
    if (poll) endpoint += '/poll';

    return fetch(endpoint, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      }),
    })
    .then(response => response.json())
    .then(results => {
      // Request doesn't complete: poll
      if (!results.complete) return this.busbudRequest(true);
      // Polling successfull: retry request
      if (poll && results.complete) return this.busbudRequest(false, retry + 1);
      // Polling unsuccessful or retried 3+ times: log output
      if (poll && !results.complete || retry > 2) return console.error(results);
      return this.setState({ results });
    });
  }

  render() {
    let searchModal;
    const { modal, results } = this.state;
    if (this.state.results) {
      searchModal = (
        <SearchModal
          dismissModal={this.dismissModal}
          status={modal}
          results={results}
          date={this.state.fetch.date}
          locale={this.state.locale}
        />
      );
    } else {
      searchModal = (
        <LoadingIndicator
          status={modal}
        />
      );
    }

    return (
      <div>
        <Header />
        <main>
          <SelectLocale
            handleChange={this.setLocale}
          />
          <h1 className="cta-text">
            {$[this.state.locale].ctaText.line1}<br />
            {$[this.state.locale].ctaText.line2}
          </h1>
          <CtaButton
            handleClick={this.revealModal}
            text={$[this.state.locale].ctaButton}
          />
          {searchModal}
          <div className={`overlay ${this.state.modal}`} onClick={this.dismissModal} ></div>
        </main>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
