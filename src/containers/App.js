import React, { Component } from 'react';

import { initialFetch, poll } from '../api/service';
import parser from "../api/parser";

import Footer from "../components/Footer";
import Header from "../components/Header";
import MainSection from "../components/MainSection"

import utils from '../utils/utils'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: {
        origin: "dr5reg",
        destination: "f25dvk",
        date: new Date(Date.UTC(2018, 10, 19))
      },
      isLoading: false,
      departures: [],
      error: null
    }
  }

  componentDidMount() {
    this.startDeparturesFetch();
  }

  handleApiError(err) {
    const msg = `Error during api call: \n${err.message}`;
    console.error(msg, err);
    this.setState({
      error: msg,
      isLoading: false,
    });
  };

  handleSearchClick(origin, destination, date) {
    this.setState({
      search: {
        origin: origin,
        destination: destination,
        date: date
      },
      departures: [],
      error: null,
    }, () => this.startDeparturesFetch());
  }

  startDeparturesFetch() {
    const searchParams = this.state.search;
    this.setState({ isLoading: true });

    initialFetch(
      searchParams.origin, searchParams.destination, searchParams.date
    ).then(initialData => {

      console.info("initial fetch has completed.", initialData);
      this.setState({
        departures: parser.parse(initialData),
      });

      if(!initialData.complete) {
        return this.pollDepartures(10);
      }
      this.setState({ isLoading: false });

    }).catch(this.handleApiError.bind(this));
  }

  pollDepartures(iterations) {
    const searchParams = this.state.search;

    return poll(
      searchParams.origin, searchParams.destination, searchParams.date, this.state.departures.length
    ).then(newData => {

      console.info(`poll #${iterations} has completed.`, newData);
      this.setState(prevState => {
        return {
          departures: prevState.departures.concat(parser.parse(newData)) ,
        };
      });

      if (--iterations > 0 && !newData.complete) {
        return utils.delay(1000).then(() => this.pollDepartures(iterations));
      }
      this.setState({ isLoading: false });
    });
  }

  render() {

    return (
      <div className="App">
        <Header
          search={this.state.search}
          onSearchClick={this.handleSearchClick.bind(this)}/>
        <MainSection
          currentSearch={this.state.search}
          departures={this.state.departures}
          error={this.state.error}
          isLoading={this.state.isLoading}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
