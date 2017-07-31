import React, { Component } from 'react';
import './App.css';
import osheagaLogo from './../../img/osheaga-festival.png';
import search from '../../services/search.service';
import { DeparturesList } from '../departuresList/DeparturesList';
import { translate } from 'react-i18next';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
		departures: {}
    };

	this.onSearch = this.onSearch.bind(this);
  }

  render() {
    const { t, i18n } = this.props;

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    return (
      <div className="container-fluid">
        <header className="row">
          <div className="col-xs-12 col-sm-12 text-right language">
            <ul>
              <li><button className="btn btn-default" onClick={() => changeLanguage('en')}>EN</button></li>
              <li><button className="btn btn-default" onClick={() => changeLanguage('fr')}>FR</button></li>
            </ul>
          </div>

          <div className="col-xs-12 col-sm-12 text-center">
            <img src={osheagaLogo} alt="Osheaga Festival"></img>
            <h1>{t('appTitle')}</h1>
          </div>
        </header>

        <main>
          <div className="row">
            <div className="col-xs-12 col-sm-12 text-center">
              <p><b>{t('from')}</b> {t('newYork')} <span className="glyphicon glyphicon-arrow-right"></span> <b>{t('to')}</b> {t('montreal')}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 text-center">
              <button className="btn btn-primary" onClick={this.onSearch}>{t('searchBtn')}</button>
            </div>
          </div>

          <DeparturesList t={t} departures={this.state.departures} />
        </main>

      </div>
    );
  }

  onSearch() {
    search()
        .then((res) => res.json())
        .then((data) => {
          this.setState({departures: data});
        });

  }
}

export default translate()(App);
