import React from 'react';
import Flatpickr from 'react-flatpickr';
import { geohashToName } from '../utils/utils';
import 'flatpickr/dist/themes/material_green.css';
import './SearchForm.css';

class SearchForm extends React.Component {

  date = this.props.searchParams.date;
  origin = geohashToName(this.props.searchParams.origin);
  destination = geohashToName(this.props.searchParams.destination);

  cityInput(city, onChange, inputId) {
    return (
      <div className="field-body is-small">
        <div className="field">
          <p className="control">
            <input
              disabled
              id={inputId}
              type="text"
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
        className="input is-small" value={ this.date }
        onChange={ newDate => this.date = newDate[0] }
        options={{ dateFormat: 'd/m/Y' }}
      />
    </div>
  );

  submitButton = (
    <div className="control">
      <button
        onClick={() => (
          this.props.onSearchClick(this.props.searchParams.origin, this.props.searchParams.destination, this.date)
        )}
        className="button is-primary is-small"
      >Search
      </button>
    </div>
  );

  render() {
    return (
      <div className="SearchForm field is-horizontal">
        <div className="field-label is-small">
          <label htmlFor="from" className="label">From</label>
        </div>
        { this.cityInput(this.origin, this.props.onOriginChange, 'from') }
        <div className="field-label is-small">
          <label htmlFor="to" className="label">To</label>
        </div>
        { this.cityInput(this.destination, this.props.onDestinationChange, 'to') }

        { this.datePicker }

        { this.submitButton }
      </div>
    );
  }
}

export default SearchForm;
