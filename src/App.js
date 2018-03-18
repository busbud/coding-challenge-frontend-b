import React, { Component } from 'react';
import './App.css';
import OnboardingScreen from './components/onboarding-screen/OnboardingScreen';

class App extends Component {
  handleOnboardingSubmit() {
    
  }

  render() {
    return (
      <OnboardingScreen 
        originCity="New York"
        destinationCity="Montreal"
        date="2018-08-02"
        numberOfPassengers="1"
        onSubmit="handleOnboardingSubmit" />
    );
  }
}

export default App;
