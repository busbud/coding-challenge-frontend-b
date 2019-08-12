import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";
import { trackPromise } from "react-promise-tracker";
// Components
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Form from "../components/Form/Form";
import ResultList from "../components/ResultList/ResultList";
import Footer from "../components/Footer/Footer";
import Spinner from "../components/Spinner/Spinner";

const IDLE = "IDLE";
const POLLING = "POLLING";
const DONE = "DONE;";

class App extends Component {
  constructor() {
    super();
    this.state = {
      origin: "dr5reg",
      destination: "f25dvk",
      departureDate: "2020-08-02",
      departures: [],
      locations: [],
      cities: [],
      operators: [],
      startDate: new Date("2020-08-02T00:00:00"),
      current: IDLE
    };
  }

  getBusData = () => {
    const {
      origin,
      destination,
      departureDate,
      departures,
      cities,
      operators,
      current
    } = this.state;
    const isPolling = current === POLLING;
    const parameters = !isPolling
      ? `?adult=1&child=0&senior=0&currency=CAD`
      : `/poll?index=${
          departures.length
        }&adult=1&child=0&senior=0&currency=CAD`;
    const API_KEY = process.env.REACT_APP_BUSBUD_TOKEN;
    const ENDPOINT = process.env.REACT_APP_BUSBUD_API_ENDPOINT;
    const url = `${ENDPOINT}/${origin}/${destination}/${departureDate}${parameters}`;
    const headers = {
      Accept:
        "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
      "X-Busbud-Token": API_KEY
    };
    this.setState({ current: POLLING });

    return trackPromise(
      axios
        .get(url, { headers })
        .then(res => {
          this.setState({
            departures: res.data.departures,
            locations: res.data.locations
          });
          if (!res.data.complete) {
            setTimeout(() => {
              this.getBusData();
            }, 3000);
            this.setState({
              departures: departures.concat(res.data.departures),
              cities: cities.concat(res.data.cities),
              operators: operators.concat(res.data.operators)
            });
          }
          this.setState({ current: DONE });
        })
        .catch(error => {
          console.log(error);
        })
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    this.getBusData();
  };

  handleChange = date => {
    this.setState({
      startDate: date,
      departureDate: moment(date).format("YYYY-MM-DD"),
      departures: [],
      cities: [],
      operators: [],
      current: IDLE
    });
  };

  render() {
    const {
      startDate,
      departures,
      locations,
      departureDate,
      cities,
      operators
    } = this.state;
    return (
      <div className='App'>
        <div className='App-wrapper'>
          <Navbar />
          <Header />
          <Form
            handleSubmit={this.handleSubmit}
            startDate={startDate}
            handleChange={this.handleChange}
          />
          {departures.length > 0 ? (
            <ResultList
              departures={departures}
              locations={locations}
              departureDate={departureDate}
              cities={cities}
              operators={operators}
            />
          ) : null}
          <Spinner />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
