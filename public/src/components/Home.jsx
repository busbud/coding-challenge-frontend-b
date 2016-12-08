import React, { Component } from 'react';
import * as axios from 'axios';

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
        <h1>Hi!</h1>
        <p>
          We know it can be a pain to find bus tickets from NYC to Montreal to go to <a href='http://www.osheaga.com/' target='_blank'>Osheaga Festival</a>! Just click View Departures and only focus on the fun you'll have there : )
        </p>
        <div>
            <button 
              disabled={this.state.loading}
              className='button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'
              onClick={() => this.getDepartures()}>
              <i className='material-icons'>directions_bus</i> View departures
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
    console.log('getDepartures');
    this.setState({ loading: true });

    axios.get('/api/departures')
      .then((response) => {
        console.log(response);
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