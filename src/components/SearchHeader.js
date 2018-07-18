import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next'
import LanguagePicker from './LanguagePicker';
import styled from 'styled-components';
import classnames from 'classnames';

import logo from '../logo.png';

const StyledHeader = styled.div`
  .search-form {
    padding-bottom: 1rem;
    & .field-body>.field:first-child {
      margin-right: 0;
    }
  }

  .search-bar {
    -webkit-box-shadow: 0 2px 0 0 #f5f5f5;
    box-shadow: 0 2px 0 0 #f5f5f5;
    min-height: 3.75rem;

    &>.container {
      height: 100%;
    }
  }
`;

const SearchHeader = (props) => {
  // here we are a oversimplifying the process
  // we would somehow get the geohash from the city input components (origin and destination)
  // to simplify, we are hardcoding 'New York' and 'Montréal'
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit('dr5reg', 'f25dvk', e.target.outbound_date.value);
  }

  const { t, isLoading } = props;
  return (<StyledHeader>
    <nav className="navbar" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <img className="" alt="osheaga festival logo" src={logo} />
          </div>
        </div>
          <div className="navbar-end">
            <div className="level">
            <LanguagePicker />
            </div>
          </div>
      </div>
    </nav>
    <div className="search-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="container">
          <div className="field is-horizontal">
            <div className="field-label is-normal is-hidden-tablet">
              <label className="label">{t('header.from')}</label>
            </div>
            <div className="field-body">
              <div className="field">
                <p className="control has-icons-left">
                  <input type="text" className="input" value="New York" disabled />
                  <span className="icon is-small is-left"><i className="fa fa-map-marker"></i></span>
                </p>
              </div>
              <span className="icon is-medium is-hidden-mobile">
                <i className="fa fa-arrow-right"></i>
              </span>
              <div className="field-label is-normal is-hidden-tablet">
                <label className="label">{t('header.to')}</label>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input type="text" className="input" value="Montréal" disabled />
                  <span className="icon is-small is-left"><i className="fa fa-map-marker"></i></span>
                </p>
              </div>
              <div className="field-label is-normal is-hidden-tablet">
                <label className="label">{t('header.outboundDate')}</label>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input className="input" name="outbound_date" type="date" defaultValue="2018-07-18" />
                  <span className="icon is-small is-left"><i className="fa fa-calendar-o"></i></span>
                </p>
              </div>
              <div className="field">
                <button
                  className={classnames("button is-link is-fullwidth", { 'is-loading': isLoading })}
                  type="submit"
                  disabled={isLoading}
                >
                  {t('header.search')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </StyledHeader>);
}

SearchHeader.propTypes = {
  onSubmit: PropTypes.func,
  t: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default translate()(SearchHeader);
