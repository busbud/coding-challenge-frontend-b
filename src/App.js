import React from 'react';
import AppBox from './components/AppBox';
import AppHead from './components/AppHead';
import SearchStatus from './containers/SearchStatus';
import DeparturesList from './containers/DeparturesList';
import './App.css';

const App = () => {
  return (
    <AppBox>
      <AppHead />
      <SearchStatus />
      <DeparturesList />
    </AppBox>
  );
};

export default App;
