import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import { ENGLISH, FRENCH } from '../constants/language';

import './styles/LocaleSwitch.scss';

function LocaleSwitch(props) {
  const { i18n, t } = props;

  const currentLocale = i18n.language.substring(0, 2);
  const isFrenchCurrentLocale = currentLocale === FRENCH;

  const nextLocaleCode = isFrenchCurrentLocale
    ? ENGLISH
    : FRENCH;

  const switchLocalesText = isFrenchCurrentLocale
    ? t('english')
    : t('french');

  return (
    <div className="LocaleSwitch">
      <button
        className="LocaleSwitch__button"
        onClick={() => i18n.changeLanguage(nextLocaleCode)}
      >
        {switchLocalesText}
      </button>
    </div>
  );
}

LocaleSwitch.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('translations')(LocaleSwitch);
