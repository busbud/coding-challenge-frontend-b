import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next'
import LanguagePicker from './LanguagePicker';

const SearchHeader = (props) => {
  // here we are a oversimplifying the process
  // we would somehow get the geohash from the city input components (origin and destination)
  // to simplify, we are hardcoding 'New York' and 'Montréal'
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit('dr5reg', 'f25dvk', e.target.outbound_date.value);
  }

  const { t } = props;
  return (<Fragment>
    <LanguagePicker />
    <form onSubmit={handleSubmit}>
      <label>{t('header.from')}</label>
      <input type="text" value="New York" disabled />
      <label>{t('header.to')}</label>
      <input type="text" value="Montréal" disabled />
      <input name="outbound_date" type="date" defaultValue="2018-07-30" />
      <button type="submit">{t('header.search')}</button>
    </form>
  </Fragment>);
}

SearchHeader.propTypes = {
  onSubmit: PropTypes.func,
  t: PropTypes.func,
};

export default translate()(SearchHeader);
