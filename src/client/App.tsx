import axios, { CancelTokenSource } from 'axios';
import React, { Component } from 'react';

import { City } from '../api/busbud/City';
import { DepartureSearchInitResult, DepartureSearchPollResult }
  from '../api/busbud/DepartureSearch';
import { Location } from '../api/busbud/Location';
import { Operator } from '../api/busbud/Operator';
import { XDeparture } from '../api/busbud/XDeparture';

interface AppProps {
}

interface AppState {
  completed: boolean,
  error: boolean,
  people: number,
  index: number,
  departures: XDeparture[],
  operators: { [key: string]: Operator },
  cities: { [key: string]: City },
  locations: { [key: string]: Location },
  searchCancelTokenSource?: CancelTokenSource,
  pollTimeout?: number
}

export class App extends Component<AppProps, AppState> {
  readonly date: string = new Date().toISOString().slice(0, 10);

  constructor(props: AppProps) {
    super(props);

    this.state = {
      completed: false,
      error: false,
      people: 1,
      index: 0,
      departures: [],
      operators: {},
      cities: {},
      locations: {}
    }
  }

  handleSearch(
    completed: boolean,
    departures: XDeparture[],
    operators: Operator[]
  ) {
    // convert the operator list into a hashmap for easier lookup
    const operatorMap = { ...this.state.operators };
    operators.forEach(operator => operatorMap[operator.id] = operator);

    // make sure only new departures are added
    const newDepartures = departures.filter((departure) =>
      this.state.departures.every(existing => departure.id != existing.id)
    );

    this.setState({
      completed: completed,
      index: this.state.index + departures.length,
      departures: [...this.state.departures, ...newDepartures],
      operators: operatorMap
    });
    // if the departures have not completed coming in from bus companies
    // the results should be polled again in 2 seconds
    if (!completed) {
      setTimeout(() => this.pollSearch(), 2000);
    }
  }

  initSearch(people: number) {
    if (this.state.searchCancelTokenSource && !this.state.completed) {
      this.state.searchCancelTokenSource.cancel();
      clearTimeout(this.state.pollTimeout);
    }

    const cancelTokenSource = axios.CancelToken.source();

    this.setState({
      completed: false,
      error: false,
      index: 0,
      people: people,
      departures: [],
      operators: {},
      cities: {},
      locations: {},
      searchCancelTokenSource: cancelTokenSource
    });

    axios.get<DepartureSearchInitResult>(
      '/api/search',
      { params: { people }, cancelToken: cancelTokenSource.token }
    )
      .then(response => {
        const { complete, cities, locations, departures, operators } =
          response.data;

        // convert the city and location lists into hashmaps for easier lookup
        const cityMap: { [key: string]: City } = {};
        cities.forEach(city => cityMap[city.id] = city);

        const locationMap: { [key: string]: Location } = {};
        locations.forEach(location => locationMap[location.id] = location);

        this.setState({
          cities: cityMap,
          locations: locationMap
        });
        this.handleSearch(complete, departures, operators);
      })
      .catch(_ => this.setState({ error: true }));
  }

  pollSearch() {
    axios.get<DepartureSearchPollResult>(
      '/api/search/poll',
      {
        params: { people: this.state.people, index: this.state.index },
        cancelToken: this.state.searchCancelTokenSource.token
      }
    )
      .then(response => {
        const { complete, departures, operators } = response.data;
        this.handleSearch(complete, departures, operators);
      })
      .catch(_ => this.setState({ error: true }));
  }

  changePeople(e: React.ChangeEvent<HTMLSelectElement>) {
    const people = parseInt(e.target.value, 10);
    this.initSearch(people);
  }

  componentDidMount() {
    this.initSearch(this.state.people);
  }

  render() {
    return (
      <div className="App">
        <header>
          <img src="images/header.png" alt="OSHEAGA" />
          <h1>Music & Arts Festival</h1>
          <h2>Sepember 25th</h2>
        </header>
        <div className="transport-help box">
          <div className="top">Need some help getting here?</div>
          <div className="bottom">
            Here are buses from Québec to Montréal for
            <select
              value={this.state.people}
              onChange={(e) => this.changePeople(e)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            people on September 25th!</div>
        </div>
        <Results
          loading={!this.state.completed}
          departures={this.state.departures}
          operators={this.state.operators}
          cities={this.state.cities}
          locations={this.state.locations} />
      </div >
    );
  }
}

interface ResultsProps {
  loading: boolean,
  departures: XDeparture[],
  operators: { [key: string]: Operator },
  cities: { [key: string]: City },
  locations: { [key: string]: Location }
}
interface ResultsState { }

class Results extends Component<ResultsProps, ResultsState> {
  readonly currencyFmt =
    new Intl.NumberFormat('en', { style: 'currency', currency: 'EUR' });

  readonly timeFmt =
    new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' });

  constructor(props: ResultsProps) {
    super(props);
  }

  render() {
    const Location =
      (p: { point: string, msg: string, time: string, locationId: number }) => {
        const location = this.props.locations[p.locationId];
        const city = this.props.cities[location.city_id];
        const time = new Date(Date.parse(p.time));
        return (
          <div className={"location " + p.point} >
            <div className="msg">{p.msg}:</div>
            <div className="time">{this.timeFmt.format(time)}</div>
            <div className="place">
              <span className="city">{city.name}</span>
              <span className="exact">({location.name})</span>
            </div>
          </div >
        );
      }

    const Operator = (p: { operatorId: string }) => {
      const operator = this.props.operators[p.operatorId];
      return (
        <div className="operator">
          <img src={operator.logo_url} alt={operator.display_name} />
        </div>
      );
    }

    const departures = this.props.departures.map(departure =>
      <div className="departure" key={departure.id}>
        <div className="locations">
          <Operator operatorId={departure.operator_id} />
          <Location
            point="from"
            msg="Departs"
            time={departure.departure_time}
            locationId={departure.origin_location_id} />
          <Location
            point="to"
            msg="Arrives"
            time={departure.arrival_time}
            locationId={departure.destination_location_id} />
        </div>
        <div className="details">
          <div className="price">
            {this.currencyFmt.format(departure.prices.total / 100)}
          </div>
          <div className="class">Class: {departure.class_name}</div>
        </div>
      </div >
    );

    return (
      <div className="Results" >
        <div className={"loading box " + (this.props.loading ? '' : 'done')}>
          {this.props.loading ?
            'Loading... The perfect bus for you will be here shortly!' :
            'Here are all your buses, take your pick!'}
        </div>
        <div className="list box">
          {departures.length ?
            departures :
            <div className="empty">
              {this.props.loading ? '···' : 'Sorry, there are no Results.'}
            </div>}
        </div>
      </div>
    );
  }
}

export default App;
