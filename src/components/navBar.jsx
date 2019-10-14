import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartures } from '../actions/departuresActions';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

const NavBar = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isFetching = useSelector(
    state => state.departures.isFetching,
  );

  const onClickSearch = () => {
    dispatch(fetchDepartures(0, true));
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <img
          src="/android-chrome-384x384.png"
          height={50}
          width={50}
          alt="logo"
        />
        <Typography variant="h6" className={classes.title}>
          NYC to MTL
        </Typography>
        <Button
          color="inherit"
          disabled={isFetching}
          onClick={onClickSearch}
        >
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
