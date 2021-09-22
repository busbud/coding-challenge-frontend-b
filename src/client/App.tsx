import axios, { CancelTokenSource } from 'axios';
import Cookies from 'js-cookie';
import React, { Component } from 'react';

import { City } from '../api/busbud/City';
import { DepartureSearchInitResult, DepartureSearchPollResult }
  from '../api/busbud/DepartureSearch';
import { Location } from '../api/busbud/Location';
import { Operator } from '../api/busbud/Operator';
import { XDeparture } from '../api/busbud/XDeparture';
import translations from './translations';

interface AppProps {
  language: string,
  currency: string
}

interface AppState {
  language: string,
  currency: string,
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

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      language: props.language,
      currency: props.currency,
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

    const sortedDepartures =
      [...this.state.departures, ...newDepartures].sort((a, b) => {
        return (
          a.departure_time < b.departure_time ?
            -1 :
            (a.departure_time > b.departure_time ? 1 : 0)
        );
      });

    this.setState({
      completed: completed,
      index: this.state.index + departures.length,
      departures: sortedDepartures,
      operators: operatorMap
    });
    // if the departures have not completed coming in from bus companies
    // the results should be polled again in 2 seconds
    if (!completed) {
      setTimeout(() => this.pollSearch(), 2000);
    }
  }

  initSearch(people: number, language: string, currency: string) {
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

    axios.get<DepartureSearchInitResult>('/api/search', {
      params: { people, language, currency },
      cancelToken: cancelTokenSource.token
    })
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
    axios.get<DepartureSearchPollResult>('/api/search/poll', {
      params: {
        index: this.state.index,
        people: this.state.people,
        language: this.state.language,
        currency: this.state.currency
      },
      cancelToken: this.state.searchCancelTokenSource.token
    })
      .then(response => {
        const { complete, departures, operators } = response.data;
        this.handleSearch(complete, departures, operators);
      })
      .catch(_ => this.setState({ error: true }));
  }

  changePeople(e: React.ChangeEvent<HTMLSelectElement>) {
    const people = parseInt(e.target.value, 10);
    this.initSearch(people, this.state.language, this.state.currency);
  }

  setLanguage(language: string) {
    Cookies.set('language', language, { expires: 365 });
    this.setState({ language });
    this.initSearch(this.state.people, language, this.state.currency);
  }

  setCurrency(currency: string) {
    Cookies.set('currency', currency, { expires: 365 });
    this.setState({ currency });
    this.initSearch(this.state.people, this.state.language, currency);
  }

  t(key: string) {
    return translations[this.state.language][key];
  }

  componentDidMount() {
    const { people, language, currency } = this.state;
    this.initSearch(people, language, currency);
  }

  render() {
    const Language = (p: { value: string, name: string, icon: string }) => {
      const active = this.state.language == p.value;
      return (
        <div
          className={"language " + (active ? 'active' : '')}
          onClick={(_) => this.setLanguage(p.value)}>
          <div className="icon">{p.icon}</div>
          <div className="title">{p.name}</div>
        </div >
      );
    }

    const Currency = (p: { value: string }) => {
      const active = this.state.currency == p.value;
      return (
        <div
          className={"currency " + (active ? 'active' : '')}
          onClick={(_) => this.setCurrency(p.value)}>
          {p.value}
        </div>
      );
    }

    return (
      <div className="App" >
        <header>
          <div className="options">
            <div className="languages">
              <div className="label">{this.t('options.language')}</div>
              <div className="buttons">
                <Language value="en" name="English" icon="&#x1f1ec;&#x1f1e7;" />
                <Language
                  value="fr" name="Français" icon="&#x1f1eb;&#x1f1f7;" />
              </div>
            </div>
            <div className="currencies">
              <div className="label">{this.t('options.currency')}</div>
              <div className="buttons">
                <Currency value="USD" />
                <Currency value="EUR" />
                <Currency value="CAD" />
              </div>
            </div>
          </div>
          <img src="images/header.png" alt="OSHEAGA" />
          <h1>{this.t('header.title')}</h1>
          <h2>{this.t('header.subtitle')}</h2>
        </header >
        <div className="transport-help box">
          <div className="top">{this.t('help.title')}</div>
          <div className="bottom">
            {this.t('help.text.pre-select')}
            <select
              value={this.state.people}
              onChange={(e) => this.changePeople(e)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            {this.state.people == 1 ?
              this.t('help.text.person') :
              this.t('help.text.people')}
            {" "}
            {this.t('help.text.post-select')}</div>
        </div>
        <Results
          language={this.state.language}
          currency={this.state.currency}
          loading={!this.state.completed}
          error={this.state.error}
          departures={this.state.departures}
          operators={this.state.operators}
          cities={this.state.cities}
          locations={this.state.locations} />
      </div >
    );
  }
}

interface ResultsProps {
  language: string,
  currency: string,
  loading: boolean,
  error: boolean,
  departures: XDeparture[],
  operators: { [key: string]: Operator },
  cities: { [key: string]: City },
  locations: { [key: string]: Location }
}
interface ResultsState { }

class Results extends Component<ResultsProps, ResultsState> {
  readonly timeFmt =
    new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric' });

  constructor(props: ResultsProps) {
    super(props);
  }

  t(key: string) {
    return translations[this.props.language][key];
  }

  render() {
    const currencyFmt =
      new Intl.NumberFormat('en', {
        style: 'currency', currency: this.props.currency
      });

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
            msg={this.t('list.departure.departs')}
            time={departure.departure_time}
            locationId={departure.origin_location_id} />
          <Location
            point="to"
            msg={this.t('list.departure.arrives')}
            time={departure.arrival_time}
            locationId={departure.destination_location_id} />
        </div>
        <div className="details">
          <div className="price">
            {currencyFmt.format(departure.prices.total / 100)}
          </div>
          <div className="class">
            {this.t('list.departure.class')}
            {": "}
            {departure.class_name}
          </div>
        </div>
      </div >
    );

    return (
      <div className="Results" >
        <div className={"loading box " + (this.props.loading ? '' : 'done')}>
          {this.props.error ?
            [this.t('list.loading.error.line1'), <br />, this.t('list.loading.error.line2')] :
            (this.props.loading ?
              this.t('list.loading.inprogress') :
              this.t('list.loading.done'))}
        </div>
        <div className="list box">
          {departures.length ?
            departures :
            <div className="empty">
              {this.props.loading ? '···' : this.t('list.loading.no-results')}
            </div>}
        </div>
      </div>
    );
  }
}

export default App;
