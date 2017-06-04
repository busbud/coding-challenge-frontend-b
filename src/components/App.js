import React, { Component } from 'react';
import Ticket from './Ticket';
import '../stylesheets/App.css';
import { polyfill as smoothScrollPolyfill} from 'smoothscroll-polyfill';
import copy from '../copy';

class App extends Component {
  constructor() {
    super();
    smoothScrollPolyfill();
    this.handleClick = this.handleClick.bind(this);
    this.backToTop = this.backToTop.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  componentDidUpdate() {
    this.refs.title.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  handleClick() {
    this.props.onClick();
  }

  backToTop() {
    this.refs.title.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  changeLanguage(lang) {
    this.props.changeLanguage(lang);
  }

  render() {
    const { currLanguage, isFetching, departures } = this.props;

    return (
      <div className="App container-fluid">
        <div className="App-header">
          <a href="https://www.osheaga.com/en">
            <img
              src="https://www.osheaga.com/images/osheaga/en/logo.png?v=d2aee02373618ce9d7231e1bb5fe51f0"
              alt="Osheaga"
            ></img>
          </a>
        </div>
        <div ref="title" className="title">
          <div className="lang-select">
            <img
              src="/1280px-Flag_of_the_United_Kingdom.svg.png"
              onClick={() => this.changeLanguage('en')}
              alt="English">
            </img>
            <img
              src="/Flag_of_South_Korea.svg"
              onClick={() =>this.changeLanguage('ko')}
              alt="Korean">
            </img>
          </div>
          <h1 lang={currLanguage}>{copy[currLanguage]['title']}</h1>
          <div>
            <p lang={currLanguage} className="powered-by">{copy[currLanguage]['powered_by']}</p>
            <a href="https://www.busbud.com/en-ca/" target="_blank" rel="noopener noreferrer">
              <img src="/busbud_logo_norm_RGB_HR.png" alt="Busbud"></img>
            </a>
          </div>
        </div>
        <div className="ticket-container">
          {departures.length === 0 && !isFetching &&
            <button onClick={this.handleClick}>{copy[currLanguage]['go']}</button>
          }
          {isFetching && <div className="loader">Loading...</div>}
          {departures.length > 0 && departures.map((s, i) =>
            <Ticket
              key={i}
              departure={s}
              bookNowCopy={copy[currLanguage]['book_now']}
            ></Ticket>
          )}
          {this.props.searchFailed && <p>Search failed. Please try again</p>}
        </div>
        {departures.length > 0 &&
          <a className="back-to-top" onClick={this.backToTop}>
            <i className="glyphicon glyphicon-arrow-up"></i>
            <p lang={currLanguage}>{copy[currLanguage]['back_to_top']}</p>
          </a>
        }
      </div>
    );
  }
}

export default App;
