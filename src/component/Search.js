import React from "react";
import Results from "./Results";
import i18n from "../i18n";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import "./Search.css";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "dr5reg",  //New York
      destination: "f25dvk",  //Montreal
      outboundDate: "2019-08-09",
      numAdults: 1,
      showResults: false
    };
  }

  handleSearch = (e) => {
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
      <form class="search-form">
        <div class="header-container justify-content-between">
          <Box display="flex" flexDirection="row" justifyContent="flexStart center"
               alignItems="flex-start"
               flexWrap="wrap"
               maxWidth
               m={2} // margin: 16px;
               pb={1} // padding-bottom: 8px;
               >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {i18n.t('Origin')}:
                <select name="origin" value={this.state.origin}
                  class="form-input"
                  onChange={this.handleChangeCity}>
                  <option value="dr5reg">New York</option>
                </select>
              </Grid>
              <Grid item xs={6}>
                {i18n.t('Destination')}:
                <select name="destination" value={this.state.destination}
                  class="form-input"
                  onChange={this.handleChangeCity}>
                  <option value="f25dvk">Montreal</option>
                </select>
              </Grid>
              <Grid item xs={6}>
                {i18n.t('Travel Date')}:
                <input type="text" name="outboundDateField" class="form-input" disabled="true" value="Fri, Aug 9" />
                <input type="hidden" name="outboundDate" value={this.state.outBoundDate} />
              </Grid>
              <Grid item xs={6}>
                {i18n.t('Adults')}:
                <input type="text" name="numAdults" class="form-input" value={this.state.numAdults} />
              </Grid>
              <Grid item xs={12}>
                <input type="button" class="btn-cta" onClick={this.handleSearch} value={i18n.t('Search')} />
              </Grid>
            </Grid>
          </Box>
        </div>
        {this.state.showResults ? <Results search={search}/> : null }
      </form>
    );
  }
}