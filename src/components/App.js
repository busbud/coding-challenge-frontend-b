import React from 'react';
import Onboard from './Onboard';
import Navbar from './Navbar';
import ReduxToastr from 'react-redux-toastr';

function App() {
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
      <Onboard />
    </div>
  );
}

export default App;
