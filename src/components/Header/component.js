import React from 'react';
import { object } from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import Logo from '../Logo';
import LocalesSelector from '../../containers/LocalesSelector';

const Component = ({ classes }) => (
  <AppBar className={classes.root} position="sticky" color="secondary">
    <Toolbar className={classes.toolbar}>
      <Grid container justify="center" className={classes.root}>
        <Grid item md={8} xs={11} className={classes.item}>
          <Logo />
          <LocalesSelector />
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

Component.propTypes = {
  classes: object,
};

export default Component;
