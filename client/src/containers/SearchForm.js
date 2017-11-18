import React, { Component } from 'react'

import Autocomplete from '../components/Autocomplete'

class SearchForm extends Component {

  // @TODO Follow form here: https://reactjs.org/docs/forms.html
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render(){
    const { value } = this.state;

    let departurePlaceholder = "New York"

    let departureSuggestions = [
      {
        name: 'Brooklin',
        year: 1972
      },
      {
        name: 'Somewhere else',
        year: 2012
      }
    ];

    let arrivalPlaceholder = "Montréal"

    let arrivalSuggestions = [
      {
        name: 'Somewhere in Montréal',
        year: 1972
      },
      {
        name: 'MontReal',
        year: 2012
      }
    ];

    // @TODO move inline styles to classes
    return <div className={"container"}>
      <form onSubmit={this.handleSubmit}>
        <div className="form-group" style={{textAlign : 'left'}}>
          <label htmlFor="departureField" className={"col-xs-12 col-sm-6"}>
            Departure
            <Autocomplete placeholder={departurePlaceholder} suggestions={departureSuggestions} id="departureField" className="form-control"/>
          </label>
          <label htmlFor="destinationField" className={"col-xs-12 col-sm-6"}>
            Arrival
            <Autocomplete placeholder={arrivalPlaceholder} suggestions={arrivalSuggestions} id="arrivalField" className="form-control"/>
          </label>
          <div className={"col-xs-12 col-sm-12 search-btn-wrapper"} style={{ textAlign : 'right'}}>
            <input type="submit" value="Search" className={"btn btn-warning"}/>
          </div>
        </div>

      </form>
    </div>

  }

}

export default SearchForm