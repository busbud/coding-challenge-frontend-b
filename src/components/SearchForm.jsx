import React from "react";
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import './SearchForm.css'
import utils from "../utils/utils";

class SearchForm extends React.Component {

  date = this.props.search.date;
  origin = utils.geohashToName(this.props.search.origin);
  destination = utils.geohashToName(this.props.search.destination);

  cityInput(city, onChange) {
    return (
      <div className="field-body is-small">
        <div className="field">
          <p className="control">
            <input
              type="text"
              disabled
              className="input is-small"
              onChange={onChange}
              value={city}
            />
          </p>
        </div>
      </div>
    );
  }

  datePicker = (
    <div className="control datepicker">
      <Flatpickr
        className="input is-small" value={this.date}
        onChange={(newDate) => {
          this.date = newDate[0]
        }}
      />
    </div>
  );

  submitButton = (
    <div className="control">
      <button
        onClick={() => {
          this.props.onSearchClick(this.props.search.origin, this.props.search.destination, this.date)
        }}
        className="button is-primary is-small">Search</button>
    </div>
  );

  render() {
    return (
      <div className="SearchForm field is-horizontal">
        <div className="field-label is-small">
          <label className="label">From</label>
        </div>
        {this.cityInput(this.origin, this.props.onOriginChange)}
        <div className="field-label is-small">
          <label className="label">To</label>
        </div>
        {this.cityInput(this.destination, this.props.onDestinationChange)}

        {this.datePicker}

        {this.submitButton}
      </div>
    );
  }
};

export default SearchForm;
