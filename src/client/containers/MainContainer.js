import React, { Component } from 'react';
import Card from '../components/Card';
import LoadingCard from '../components/LoadingCard';
import URI from 'urijs';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      originCode: 'dr5reg',
      destinationCode: 'f25dvk',
      departureDate: '2019-12-02',
      baseUrl: 'https://napi.busbud.com/',
      queryString: '?adult=1',
      isSearchInitialized: false,
      isPollingComplete: false,
      cities: [],
      departures: [],
      locations: [],
      operators: [],
    };

    this.initialSearch = this.initialSearch.bind(this);
    this.pollSearch = this.pollSearch.bind(this);
  }

  componentDidMount() {
    // this.initialSearch();
  }

  initialSearch() {
    // destructure data that we need to construct the url
    const { baseUrl, originCode, destinationCode, departureDate } = this.state;

    // construct the fetch url using originCode, destinationCode, and departureDate
    let url = URI(baseUrl)
      .directory(`x-departures/${originCode}/${destinationCode}/${departureDate}/`)
      .addQuery({ adult: 1 });

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
    const { baseUrl, originCode, destinationCode, departureDate } = this.state;

    // construct the fetch url using originCode, destinationCode, and departureDate
    let url = URI(baseUrl)
      .directory(`x-departures/${originCode}/${destinationCode}/${departureDate}/poll`)
      .addQuery({ adult: 1, index });

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

  render() {
    // destructure properties from state obj
    const {
      cities,
      departures,
      operators,
      locations,
      departureDate,
      isPollingComplete,
      isSearchInitialized,
    } = this.state;

    // map departure element to a Card component
    const departuresArr = departures.map(el => (
      <Card
        key={`departure${el.id}`}
        data={el}
        cities={cities}
        operators={operators}
        locations={locations}
      />
    ));

    return (
      <div className="main-container">
        <div className="search-container">
          <img
            src="https://www.osheaga.com/uploads/osheaga/Logos/Logo%20Bell%20Osheaga-En.png?v=7b63dcf0bd4659aea06ac80ac45b1b73"
            className="logo-image"
          ></img>
          <div className="search-input-container">
            <div className="form-input" id="origin-input">
              New York
            </div>
            <div className="form-input" id="destination-input">
              Montreal
            </div>
            <div className="form-input" id="passenger-input">
              1 Adult
            </div>
            <input
              className="form-input"
              type="date"
              id="date-input"
              value={departureDate}
              onChange={e => {
                this.setState({ departureDate: e.target.value });
              }}
            ></input>
            <button type="submit" className="search-button" onClick={this.initialSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="result-container">
          {!isSearchInitialized && (
            <img
              id="osheaga-schedule"
              src="https://www.osheaga.com/uploads/osheaga/Poster/OSHEAGA-2019-flyer6x9-190801-EN.jpg?v=981dd13bf2ebb3f2dfa029230e17a6f4"
            ></img>
          )}
          {!isPollingComplete && isSearchInitialized && <LoadingCard />}
          {departuresArr}
        </div>
      </div>
    );
  }
}

export default MainContainer;
