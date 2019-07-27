import React, { useState } from 'react';
import ReduxToastr from 'react-redux-toastr';
import Onboard from './Onboard';
import Navbar from './Navbar';
import Departures from './Departures';

const App = () => {
  const [page, setPage] = useState('onboard');

  const showDepartures = () => {
    setPage('departures');
  };

  return (
    <div className="App h-100">
      <div className="body-bkg" />
      <Navbar />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-left"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
      {(page === 'onboard') && <Onboard showDepartures={showDepartures} />}
      {(page === 'departures') && <Departures />}
    </div>
  );
};

export default App;
