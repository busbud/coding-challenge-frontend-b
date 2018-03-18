import React, { Component } from 'react';
import './App.css';
import OnboardingScreen from './components/onboarding-screen/OnboardingScreen';
import ResultsScreen from './components/results-screen/ResultsScreen';
import { getParsedDepartures } from './api-service/apiService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departures: []
    };
  }

  handleOnboardingSubmit(
    originCity,
    destinationCity,
    date,
    numberOfPassengers
  ) {
    getParsedDepartures(
      originCity,
      destinationCity,
      date,
      numberOfPassengers
    ).then(departures => {
      this.setState({
        departures
      });
    });
  }

  render() {
    return (
      <div className="app-container">
        <OnboardingScreen
          originCity="New York"
          destinationCity="Montreal"
          date="2018-08-02"
          numberOfPassengers={1}
          onSubmit={this.handleOnboardingSubmit}
        />
        <ResultsScreen />
      </div>
    );
  }
}

export default App;