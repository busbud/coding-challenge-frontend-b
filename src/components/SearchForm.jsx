import React from "react";
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import './SearchForm.css'
import utils from "../utils/utils";

const SearchForm = function(props) {

  const origin = utils.geohashToName(props.search.origin);
  const destination = utils.geohashToName(props.search.destination);

  function cityInput(city, onChange) {
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

  const datePicker = (
    <div className="control datepicker">
      <Flatpickr
        className="input is-small" value={props.search.date}
        onChange={props.onDateChange}
      />
    </div>
  );

  const submitButton = (
    <div className="control">
      <button
        onClick={() => props.onSearchClick(props.search.origin, props.search.destination, props.search.date)}
        className="button is-primary is-small">Search</button>
    </div>
  );

  return (
    <div className="SearchForm field is-horizontal">
      <div className="field-label is-small">
        <label className="label">From</label>
      </div>
      {cityInput(origin, props.onOriginChange)}
      <div className="field-label is-small">
        <label className="label">To</label>
      </div>
      {cityInput(destination, props.onDestinationChange)}

      {datePicker}

      {submitButton}
    </div>
  );
};

export default SearchForm;
