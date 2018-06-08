import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import './styles/ErrorMessage.scss';

function ErrorMessage(props) {
  const { onRestartSearch, t } = props;

  return (
    <div className="ErrorMessage">
      <div className="ErrorMessage__message">{t('error')}</div>

      <button className="ErrorMessage__button" onClick={() => onRestartSearch()}>
        {t('restart')}
      </button>
    </div>
  );
}

ErrorMessage.propTypes = {
  onRestartSearch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('translations')(ErrorMessage);
