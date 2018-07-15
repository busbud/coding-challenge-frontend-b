import React, { Fragment } from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

const LanguagePicker = (props) => {
  const { i18n } = props;
  return (<Fragment>
    <button onClick={() => i18n.changeLanguage('en')}>en</button>
    <button onClick={() => i18n.changeLanguage('fr')}>fr</button>
    <button onClick={() => i18n.changeLanguage('pt')}>pt</button>
  </Fragment>);
}

LanguagePicker.propTypes = {
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func,
  }),
}

export default translate()(LanguagePicker);
