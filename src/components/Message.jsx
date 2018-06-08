import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import './styles/Message.scss';

function Message(props) {
  const {
    type,
    messageKey,
    onRestartSearch,
    t,
  } = props;

  return (
    <div className={`Message Message--${type}`}>
      <div className="Message__message">{t(messageKey)}</div>

      <button className="Message__button" onClick={() => onRestartSearch()}>
        {t('restart')}
      </button>
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  messageKey: PropTypes.string.isRequired,
  onRestartSearch: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('translations')(Message);
