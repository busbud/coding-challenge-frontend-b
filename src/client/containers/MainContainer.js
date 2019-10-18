import React, { Component } from 'react';
import SearchContainer from './SearchContainer';
import ResultContainer from './ResultContainer';
import URI from 'urijs';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {
        originCode: 'dr5reg',
        destinationCode: 'f25dvk',
        departureDate: '2020-08-02',
        baseUrl: 'https://napi.busbud.com/',
        adult: 1,
      },
      cities: [],
      departures: [],
      locations: [],
      operators: [],
      isSearchInitialized: false,
      isPollingComplete: false,
    };

    this.pollSearch = this.pollSearch.bind(this);
    this.initialSearch = this.initialSearch.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    // this.initialSearch();
  }

  initialSearch() {
    // destructure data that we need to construct the url
    const {
      search: { baseUrl, originCode, destinationCode, departureDate, adult },
    } = this.state;

    // construct the fetch url using originCode, destinationCode, and departureDate
    let url = URI(baseUrl)
      .directory(`x-departures/${originCode}/${destinationCode}/${departureDate}/`)
      .addQuery({ adult });

    // when a new search is initialized, empty the departures/locations/operators array and switch isPollingComplete to false
    // once the state is updated, initialize the new fetch request
    this.setState(
      {
        departures: [],
        locations: [],
        operators: [],
        isPollingComplete: false,
        isSearchInitialized: true,
      },
      initializeFetch
    );

    // intializeFetch is a function that initializes the fetch request
    function initializeFetch() {
      const fetchConfig = {
        mode: 'cors',
        headers: {
          Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
          'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
        },
      };

      // Initialize the fetch request. Then parse the response body to an object.
      fetch(url, fetchConfig)
        .then(res => res.json())
        .then(data => {
          // destructure cities and complete properties from the response body
          const { cities, complete } = data;

          // update state with cities data
          this.setState({ cities });

          // If the complete property from the respons body is true, update the state and don't send additional polling requests
          if (complete) {
            // destructure the departures, locations, and operators properties from the response body
            const { departures, locations, operators } = data;

            // Populate the state with the data received from the response body and toggle isPollingComplete to true
            this.setState({ departures, locations, operators, isPollingComplete: true });
          } else {
            // if the complete property is false, invoke the pollSearch fcn which sends additional short polling requests
            this.pollSearch();
          }
        });
    }
  }

  pollSearch(index = 0) {
    // destructure data that we need to construct the url
    const {
      search: { baseUrl, originCode, destinationCode, departureDate, adult },
    } = this.state;

    // construct the fetch url using originCode, destinationCode, and departureDate
    let url = URI(baseUrl)
      .directory(`x-departures/${originCode}/${destinationCode}/${departureDate}/poll`)
      .addQuery({ adult, index });

    // declare the config obj for short polling fetch requests
    const fetchConfig = {
      mode: 'cors',
      headers: {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w',
      },
    };

    // invoke the short polling fetch request
    fetch(url, fetchConfig)
      .then(res => res.json())
      .then(data => {
        // destructure data from the response body
        let { departures, locations, operators, complete } = data;

        if (departures.length !== 0) {
          // concatenate new departure/location/operator data to the original state
          departures = [...this.state.departures].concat(departures);
          locations = [...this.state.locations].concat(locations);
          operators = [...this.state.operators].concat(operators);

          // update the state with newly fetched data
          this.setState({ departures, locations, operators });
        }

        // if complete property is true, stop sending additional fetch requests
        // then update the isPollingComplete state to true
        if (complete) {
          this.setState({ isPollingComplete: true }, () => console.log(this.state));
        } else {
          // if complete property is false, recursively call the pollSearch function after 2000 ms
          setTimeout(() => this.pollSearch(this.state.departures.length), 2000);
        }
      });
  }

  handleDateChange(e) {
    // update the deaptureDate state when user changes the date in the search container
    this.setState({ search: { ...this.state.search, departureDate: e.target.value } });
  }

  render() {
    // destructure properties from state obj
    const {
      cities,
      departures,
      operators,
      locations,
      isPollingComplete,
      isSearchInitialized,
      search: { departureDate },
    } = this.state;

    return (
      <div className="main-container">
        <SearchContainer
          departureDate={departureDate}
          handleDateChange={this.handleDateChange}
          initialSearch={this.initialSearch}
        />
        <ResultContainer
          cities={cities}
          departures={departures}
          operators={operators}
          locations={locations}
          isPollingComplete={isPollingComplete}
          isSearchInitialized={isSearchInitialized}
        ></ResultContainer>
      </div>
    );
  }
}

export default MainContainer;
