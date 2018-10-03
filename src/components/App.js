import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

//Custom
import SearchBar from '../containers/SearchBar';
import Results from '../containers/Results';

//Redux
import { connect } from 'react-redux';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 860,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 5}px ${theme.spacing.unit * 6}px`,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});


class App extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Osheaga Travel Assistant
          </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography variant="display1" align="center" color="textPrimary" gutterBottom>
                Osheaga Travel Assistant
            </Typography>
              <Typography variant="caption" align="center" color="textPrimary" gutterBottom>
                powered by Busbud
            </Typography>
              <SearchBar />
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container spacing={40}
              direction="row-reverse"
              justify="flex-start"
              alignItems="flex-start">
              <Grid item xs={12} sm={9}> 
                <Results />
              </Grid>
              <Grid item xs={12} sm={3}>
                Sidebar
              </Grid>
            </Grid>
          </div>

        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="title" align="center" gutterBottom>
            Footer
        </Typography>
          <Typography variant="subheading" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
        </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>

    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));