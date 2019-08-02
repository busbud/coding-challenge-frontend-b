import React from "react";
import Results from "./Results";
import i18n from "../i18n";

import "./Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "dr5reg",
      destination: "f25dvk",
      outboundDate: "2019-08-09",
      numAdults: 1,
      showResults: false
    };
  }

  handleSearch = () => {
    this.setState(() => ({
      showResults: true
    }))
  };

  handleChangeCity = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    const search = {
      origin: this.state.origin, 
      destination: this.state.destination,
      outboundDate: this.state.outboundDate,
      numAdults: this.state.numAdults
    };
    return (
      <form>
        <div className="search-panel">
          <table>
            <tr>
              <td>
                {i18n.t('Origin')}:
                <select name="origin" value={this.state.origin}
                  onChange={this.handleChangeCity}>
                  <option value="dr5reg">New York</option>
                  </select>
              </td>
              <td>
                {i18n.t('Destination')}:
                <select name="destination" value={this.state.destination}
                  onChange={this.handleChangeCity}>
                  <option value="f25dvk">Montreal</option>
                  </select>
              </td>
            </tr>
            <tr>
              <td>
                {i18n.t('Travel Date')}:
                <input type="text" name="outboundDate" value="Fri, Aug 9" />
                <input type="hidden" name="outboundDateVal" value={this.state.outBoundDate} />
              </td>
              <td>
                {i18n.t('Adults')}:
                <input type="text" name="numPassengers" value={this.state.numAdults} />
                <input type="hidden" name="numAdults" value={this.state.numAdults} />
              </td>
            </tr>
            <tr rowspan="2">
              <input type="button" onClick={this.handleSearch} value={i18n.t('Search')} />
            </tr>
          </table>
        </div>
        {this.state.showResults ? <Results search={search}/> : null }
      </form>
    );
  }
}