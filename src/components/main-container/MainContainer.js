import React, { Component } from 'react';
import './MainContainer.css';
import OnboardingScreen from './../onboarding-screen/OnboardingScreen';
import ResultsScreen from './../results-screen/ResultsScreen';
import { getParsedDeparturesObservable } from './../../api-service/apiService';
import { ClipLoader } from 'react-spinners';
import OsheagaImage from './../../assets/osheaga.png';
import Strings from './../../strings.js';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    Strings.setLanguage('en');

    this.state = {
      departures: [],
      language: 'en',
      displayOnboardingScreen: true,
      displayLoader: false,
      displayResultsScreen: false
    };
    
    this.handleOnboardingSubmit = this.handleOnboardingSubmit.bind(this);
    this.switchLanguage = this.switchLanguage.bind(this);
  }

  switchLanguage() {
    const newLanguage = this.state.language === 'en' ? 'fr' : 'en';
    Strings.setLanguage(newLanguage);
    this.setState({
      language: newLanguage
    });
  }

  handleOnboardingSubmit(originCity, destinationCity, date, numberOfPassengers) {
    this.setState({
      displayOnboardingScreen: false,
      displayLoader: true
    });

    let parsedDepartures = getParsedDeparturesObservable(originCity, destinationCity, date, numberOfPassengers);

    parsedDepartures.subscribe(departures => {
      if (departures.length > 0) {
        this.setState({
          departures,
          displayLoader: false,
          displayResultsScreen: true
        });
      } else {
        this.setState({
          departures
        });
      }
    });
  }

  render() {
    return (
      <div className="main-container">
        <img src={OsheagaImage} alt="Osheaga" className="osheaga-image"/>
        <div className="onboarding-screen-container" style={{display: this.state.displayOnboardingScreen ? 'block' : 'none'}}>
          <OnboardingScreen
            originCity="New York"
            destinationCity="Montreal"
            date="2018-08-02"
            numberOfPassengers={1}
            onSubmit={this.handleOnboardingSubmit}
            onSwitchLanguage={this.switchLanguage}
          />
        </div>
        <div className="results-screen-container" style={{display: this.state.displayResultsScreen ? 'block' : 'none'}}>
          <ResultsScreen departures={this.state.departures} />
        </div>
        <div className="loader" style={{display: this.state.displayLoader ? 'block' : 'none'}}>
          <ClipLoader loading={true} />
        </div>
      </div>
    );
  }
}

export default MainContainer;