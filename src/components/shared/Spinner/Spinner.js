import React from 'react';
import PropTypes from 'prop-types';
import ClipLoader from 'react-spinners/ClipLoader';

import styles from './Spinner.module.scss';

const Spinner = (props) => {
  const { loading } = props;
  return (
    <div className={styles.spinnerContainer}>
      <ClipLoader loading={loading} color="#ffbb0c" />
    </div>
  );
};

Spinner.propTypes = {
  loading: PropTypes.bool,
};

export default Spinner;
