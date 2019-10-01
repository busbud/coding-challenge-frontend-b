import React, { Component } from "react";
import { connect } from "react-redux";
import "./style/Departures.css";
import Departures from "./Departures.jsx";
import SearchForm from "./SearchForm.jsx";

class UnconnectedSearchBus extends Component {
  render = () => {
    return (
      <div className="global-container">
        <div className="search-bus-container">
          <SearchForm />
          {this.props.departures !== undefined &&
          this.props.operators !== undefined ? (
            <Departures />
          ) : null}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    departures: state.departures,
    operators: state.operators
  };
};

let SearchBus = connect(mapStateToProps)(UnconnectedSearchBus);
export default SearchBus;
