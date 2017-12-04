import React from "react";
import "./Header.css"
import logo from "../images/osheaga-logo.jpg";
import SearchForm from "./SearchForm";

const Header = props => {

  return (
    <div className="Header navbar is-fixed-top is-transparent has-shadow">
      <div className="container is-widescreen">

        <div className="navbar-brand">

          <div className="navbar-item">
            <img src={logo} alt="Osheaga Festival"/>
          </div>

          <button className="button navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
          </div>

          <div className="navbar-end">

            <div className="navbar-item">
              <SearchForm/>
            </div>

            <div className="navbar-item">
              <div className="control">
                <button
                  onClick={() => props.onSearchClick("dr5reg","f25dvk", "2018-07-12")}
                  className="button is-primary is-small">Search</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;
