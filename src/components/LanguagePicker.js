import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const LanguagePicker = (props) => {
  return (<div className={classnames("select is-small", props.className)}>
    <select onChange={e => props.i18n.changeLanguage(e.target.value)}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="pt">Português</option>
    </select>
  </div>);
}

LanguagePicker.propTypes = {
  className: PropTypes.string,
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func,
  }),
}

export default translate()(LanguagePicker);
