import React, { Component } from 'react'

import Autocomplete from '../components/Autocomplete'
import arrows from '../styles/img/uparrow.png'
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
    let departureValue = "New York"

    let arrivalPlaceholder = "Montréal"
    let arrivalValue = "Montréal"

    // @TODO move inline styles to classes
    return <div className={"container"}>
      <form onSubmit={this.handleSubmit}>
        <div className="title">
          <div className={"row"}>
            <div className={"col-sm-12"}>
              <div className={"row"}>
                <span className={"col-5 departureLocation"}>{departureValue}</span>
                <span className={"col-2 locations-arrow"}></span>
                <span className={"col-5 arrivalLocation"}>{arrivalValue}</span>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>

  }

}

export default SearchForm