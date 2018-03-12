import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import messages from './messages';
const propTypes = {};

const Component = ({ classes }) => (
  <Grid container justify="flex-start" className={classes.root}>
    <Grid item md={4} xs={12}>
      <Typography variant="display3" gutterBottom color="primary">
        <FormattedMessage {...messages.title} />
      </Typography>
    </Grid>
  </Grid>
);

Component.propTypes = propTypes;

export default Component;
