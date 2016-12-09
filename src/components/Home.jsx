import React, { Component } from 'react';
import * as axios from 'axios';
import Translate from 'react-translate-component';
import counterpart from 'counterpart';

import DepartureList from './Departure-list.jsx';

const Home = React.createClass({
  getInitialState: function() {
    return {
      departures: '',
      loading: false
    };
  },

  render: function() {
    return (
      <div className='container'>
        <Translate component='h1' scope='Home' content='hi' />
        <Translate component='p' scope='Home' content='intro_text' />
        <div>
            <button 
              disabled={this.state.loading}
              className='button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
              onClick={() => this.getDepartures()}>
              <i className='material-icons'>directions_bus</i> {Translate.translate('Home.view_departures')}
            </button>
        </div>
        <DepartureList 
        loading={this.state.loading}
        departures={this.state.departures}
        operators={this.state.operators}
        locations={this.state.locations}
        />
      </div>
    );
  },

  getDepartures: function() {
    this.setState({ loading: true });

    axios.get('/api/departures?lang='+counterpart.getLocale())
      .then((response) => {
        this.setState({
          loading: false,
          departures: response.data.departures,
          operators: response.data.operators,
          locations: response.data.locations
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

export default Home;