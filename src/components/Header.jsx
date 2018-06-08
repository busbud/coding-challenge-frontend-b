import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { ENGLISH, FRENCH } from '../constants/language';

import './styles/Header.scss';
import logo from '../../assets/images/osheaga.png';

function Header(props) {
  const { i18n, t } = props;
  const currentLanguage = i18n.language;

  const isFrenchCurrentLanguage = currentLanguage === FRENCH;

  const renderLanguageSwitch = () => (isFrenchCurrentLanguage
    ? <button onClick={() => i18n.changeLanguage(ENGLISH)}>{t('english')}</button>
    : <button onClick={() => i18n.changeLanguage(FRENCH)}>{t('french')}</button>);

  return (
    <div className="Header">
      {renderLanguageSwitch()}

      <img src={logo} alt="Osheaga" />
    </div>
  );
}

Header.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('translations')(Header);
