import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Hi!</h1>
        <p>
          We know it can be a pain to find bus tickets from NYC to Montreal to go to <a href='http://www.osheaga.com/' target='_blank'>Osheaga Festival</a>! Just click View Departures and only focus on the fun you'll have there : )
        </p>
        <div>
          <Link to='departures'>
            <button className='button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'><i className='material-icons'>directions_bus</i> View departures</button>
          </Link>
        </div>
      </div>
    );
  }
}