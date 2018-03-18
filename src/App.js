import React, { Component } from 'react';
import './App.css';
import OnboardingScreen from './components/onboarding-screen/OnboardingScreen';
import ResultsScreen from './components/results-screen/ResultsScreen';
import { getParsedDeparturesObservable } from './api-service/apiService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departures: []
    };

    this.handleOnboardingSubmit = this.handleOnboardingSubmit.bind(this);
  }

  handleOnboardingSubmit(originCity, destinationCity, date, numberOfPassengers) {
    let parsedDepartures = getParsedDeparturesObservable(originCity, destinationCity, date, numberOfPassengers);
    parsedDepartures.subscribe(departures => {
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
        <ResultsScreen departures={this.state.departures} />
      </div>
    );
  }
}

export default App;