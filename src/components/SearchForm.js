import React from 'react';
import Flatpickr from 'react-flatpickr';
import { geohashToName } from '../utils/utils';
import 'flatpickr/dist/themes/material_green.css';
import '../styles/SearchForm.css';

import { translate } from 'react-i18next';
import i18n from '../i18n';

class SearchForm extends React.Component {

  date = this.props.searchParams.date;
  origin = geohashToName(this.props.searchParams.origin);
  destination = geohashToName(this.props.searchParams.destination);

  t = this.props.t;

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

  submitButton(label) {
    return (<div className="control">
      <button
        onClick={() => (
          this.props.onSearchClick(this.props.searchParams.origin, this.props.searchParams.destination, this.date)
        )}
        className="button is-primary is-small"
      >{ label }
      </button>
    </div>)
  };

  render() {
    return (
      <div className="SearchForm field is-horizontal">
        <div className="field-label is-small">
          <label htmlFor="from" className="label">{ this.t('labels.from') }</label>
        </div>
        { this.cityInput(this.origin, this.props.onOriginChange, 'from') }
        <div className="field-label is-small">
          <label htmlFor="to" className="label">{ this.t('labels.to') }</label>
        </div>
        { this.cityInput(this.destination, this.props.onDestinationChange, 'to') }

        { this.datePicker }

        { this.submitButton(this.t('labels.search')) }
      </div>
    );
  }
}

translate.setI18n(i18n);
export default translate()(SearchForm);
