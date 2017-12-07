import React from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/l10n/fr';
import 'flatpickr/dist/l10n/pt';
import 'flatpickr/dist/themes/material_green.css';
import { translate } from 'react-i18next';

import i18n from '../i18n/i18n';
import { geohashToName } from '../utils/utils';
import '../styles/SearchForm.css';

class SearchForm extends React.Component {
  t = this.props.t;

  date = this.props.searchParams.date;
  origin = geohashToName(this.props.searchParams.origin);
  destination = geohashToName(this.props.searchParams.destination);

  cityInput = (city, onChange, inputId) => (
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

  handleButtonClick = () => (
    this.props.onSearchClick(
      this.props.searchParams.origin,
      this.props.searchParams.destination,
      this.date,
    )
  );

  render() {
    return (
      <div className="SearchForm field is-horizontal">
        {/* Origin */}
        <div className="field-label is-small">
          <label htmlFor="from" className="label">{ this.t('labels.from') }</label>
        </div>
        { this.cityInput(this.origin, this.props.onOriginChange, 'from') }

        {/* Destination */}
        <div className="field-label is-small">
          <label htmlFor="to" className="label">{ this.t('labels.to') }</label>
        </div>
        { this.cityInput(this.destination, this.props.onDestinationChange, 'to') }

        {/* DatePicker */}
        <div key={this.props.currentLang} className="control datepicker">
          <Flatpickr
            className="input is-small"
            value={this.date}
            onChange={(newDate) => {
              [this.date] = newDate;
            }}
            options={{
              dateFormat: 'd/m/Y',
              locale: this.props.currentLang,
           }}
          />
        </div>

        {/* Submit */}
        <div className="control">
          <button
            className="button is-primary is-small"
            onClick={this.handleButtonClick}
          >{this.t('labels.search')}
          </button>
        </div>
      </div>
    );
  }
}

translate.setI18n(i18n);
export default translate()(SearchForm);
