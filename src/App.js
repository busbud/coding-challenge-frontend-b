// thid-party libraries
import React from 'react';

// components
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = (props) => {
  console.log(props, 'appaploskokdo')
  return (

    <>
      <Navbar />
      <Routes />
    </>
  )
}

export default App;
