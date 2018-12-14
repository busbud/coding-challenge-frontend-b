// @flow
import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from './DatePicker.css';

export const DatePicker = () => (
  <div className={styles.DatePicker}>
    <TextField id="standard-uncontrolled" label="Uncontrolled" defaultValue="foo" margin="normal" />
  </div>
);
