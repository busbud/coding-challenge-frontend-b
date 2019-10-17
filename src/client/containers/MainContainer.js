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
      pollingComplete: false,
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

    // when a new search is initialized, empty the departures array and switch pollingComplete to false
    // once the state is updated, initialize the new fetch request
    this.setState({ departures: [], pollingComplete: false }, initializeFetch);

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
          // If the complete property from the respons body is true, update the state and don't send additional polling requests
          if (data.complete) {
            // destructure the departures, locations, and operators properties from the response body
            const { departures, locations, operators } = data;

            // Populate the state with the data received from the response body and toggle pollingComplete to true
            this.setState({ departures, locations, operators, pollingComplete: true });
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
        let { departures, locations, operators, complete } = data;
        console.log(data);

        if (departures.length !== 0) {
          departures = [...this.state.departures].concat(departures);
          // departuresCopy = departuresCopy.concat(departures);

          this.setState({ departures });
        }

        // if complete is true, don't send additional requests
        if (complete) {
          // set state
          this.setState({ pollingComplete: true });
        } else {
          // if complete is false, send short polling request after 2000 ms
          setTimeout(() => this.pollSearch(this.state.departures.length), 2000);
        }
      });
  }

  render() {
    const { departures, pollingComplete, operators, departureDate } = this.state;
    const departuresArr = departures.map(el => (
      <Card key={`departure${el.id}`} data={el}>
        {el.id} {el.departure_time}
      </Card>
    ));
    return (
      <div className="main-container">
        <img
          src="https://www.osheaga.com/uploads/osheaga/Logos/Logo%20Bell%20Osheaga-En.png?v=7b63dcf0bd4659aea06ac80ac45b1b73"
          className="logo-image"
        ></img>
        <input
          type="date"
          className="date-input"
          // value={departureDate}
          onChange={e => {
            this.setState({ departureDate: e.target.value });
          }}
          style={{ height: '50px', width: '300px', fontSize: '20px' }}
        ></input>
        <br></br>
        <button className="search-button" onClick={this.initialSearch}>
          Find Bus Tickets!
        </button>
        {!pollingComplete && <LoadingCard />}
        {departuresArr}
      </div>
    );
  }
}

export default MainContainer;
