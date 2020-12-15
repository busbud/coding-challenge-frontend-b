/*
 * SearchDeparturesForm
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import fr from 'date-fns/locale/fr';
import DatePicker, { registerLocale } from 'react-datepicker';

import { FormattedMessage, injectIntl } from 'react-intl';
import { makeSelectLocale } from 'containers/LanguageProvider/store/selectors';

import PropTypes from 'prop-types';
import messages from './messages';
import Toggle from '../Toggle';
import { MONTREAL, QUEBEC } from '../../containers/App/constants';

import './SearchDeparturesForm.css';
import 'react-datepicker/dist/react-datepicker.css';
import StyledButton from '../Button/StyledButton';

registerLocale('fr', fr);

const originList = [QUEBEC];
const destinationList = [MONTREAL];

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    val => {
      if (val.length > 0) {
        valid = false;
      }
    },
  );
  return valid;
};

class SearchDeparturesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParams: { ...props.searchParams },
      errors: {
        outboundDate: '',
      },
    };
  }

  handleAdultChange = event => {
    const { value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      searchParams: {
        ...prevState.searchParams,
        adult: value,
      },
    }));
  };

  handleSubmit = event => {
    if (event !== undefined && event.preventDefault) {
      event.preventDefault();
    }

    if (validateForm(this.state.errors)) {
      this.props.onSubmitForm({ ...this.state.searchParams });
    }
  };

  selectOrigin = event => {
    const { value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      searchParams: {
        ...prevState.searchParams,
        origin: value,
      },
    }));
  };

  selectDestination = event => {
    const { value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      searchParams: {
        ...prevState.searchParams,
        destination: value,
      },
    }));
  };

  selectOutboundDate = date => {
    const { intl } = this.props;

    const errorOutboundDate =
      date > new Date()
        ? ''
        : intl.formatMessage({ ...messages.chooseUpcomingDate });

    this.setState(prevState => ({
      errors: {
        outboundDate: errorOutboundDate,
      },
      searchParams: {
        ...prevState.searchParams,
        outboundDate: date,
      },
    }));
  };

  render() {
    const { errors, searchParams } = this.state;
    const { locale } = this.props;
    const outboundDate = searchParams.outboundDate
      ? searchParams.outboundDate
      : Date.now();

    return (
      <div className="search-params-form-container">
        <form className="search-params-form" onSubmit={this.handleSubmit}>
          <div className="search-origin">
            <label htmlFor="origin">
              <FormattedMessage {...messages.origin} />
            </label>
            <Toggle
              id="origin"
              value={searchParams.origin}
              values={originList}
              messages={messages}
              onToggle={this.selectOrigin}
            />
          </div>
          <div className="search-destination">
            <label htmlFor="destination">
              <FormattedMessage {...messages.destination} />
            </label>
            <Toggle
              id="destination"
              value={searchParams.destination}
              values={destinationList}
              messages={messages}
              onToggle={this.selectDestination}
            />
          </div>
          <div className="search-outbound-date">
            <label htmlFor="outboundDate">
              <FormattedMessage {...messages.outboundDate} />
            </label>
            <DatePicker
              id="outboundDate"
              locale={locale}
              selected={new Date(outboundDate)}
              onChange={this.selectOutboundDate}
            />
            {errors.outboundDate.length > 0 && (
              <div className="error">{errors.outboundDate}</div>
            )}
          </div>
          <div className="search-adult">
            <label htmlFor="adult">
              <FormattedMessage {...messages.adult} />
            </label>
            <input
              id="adult"
              type="number"
              min="1"
              value={searchParams.adult}
              onChange={this.handleAdultChange}
            />
          </div>
          <div className="submit">
            <StyledButton type="submit" className="submit-btn">
              <FormattedMessage {...messages.search} />
            </StyledButton>
          </div>
        </form>
      </div>
    );
  }
}

SearchDeparturesForm.propTypes = {
  searchParams: PropTypes.object,
  onSubmitForm: PropTypes.func,
  locale: PropTypes.string.isRequired,
  intl: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(injectIntl(SearchDeparturesForm));
