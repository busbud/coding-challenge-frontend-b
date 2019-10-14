import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import DepartureList from './components/departureList';
import NavBar from './components/navBar';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="xl">
      <NavBar />
      <DepartureList />
    </Container>
  );
};

export default App;
