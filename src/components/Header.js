import React from 'react';
import SearchForm from './SearchForm';
import logo from '../images/osheaga-logo.jpg';

const Header = props => (
  <div className="Header navbar is-fixed-top is-transparent has-shadow">
    <div className="container">

      <div className="navbar-brand">

        <div className="navbar-item">
          <img src={logo} alt="Osheaga Festival" />
        </div>

        <button className="button navbar-burger">
          <span/>
          <span/>
          <span/>
        </button>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
        </div>

        <div className="navbar-end">

          <div className="navbar-item">
            <SearchForm { ...props }/>
          </div>

        </div>
      </div>

    </div>
  </div>
);

export default Header;
