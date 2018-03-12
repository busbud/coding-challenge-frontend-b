import React from 'react';
import { object, bool } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import OnBoarding from '../../pages/OnBoarding';
import Header from '../../components/Header';
import messages from './messages';

const propTypes = {
  classes: object.isRequired,
  hasError: bool.isRequired,
};
const Component = ({ classes, hasError }) => (
  <div className={classes.root}>
    <Reboot />
    <Grid container justify="center">
      <Grid item xs={12}>
        <Header />
        <OnBoarding />
        <Snackbar open={hasError} message={<FormattedMessage {...messages.error_content} />} />
      </Grid>
    </Grid>
  </div>
);

Component.propTypes = propTypes;

export default Component;
