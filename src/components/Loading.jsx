import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import './styles/Loading.scss';

function Loading(props) {
  const { t } = props;

  return (
    <div className="Loading">
      <div className="Loading__circle" />
      <div className="Loading__message">{t('loading')}</div>
    </div>
  );
}

Loading.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('translations')(Loading);
