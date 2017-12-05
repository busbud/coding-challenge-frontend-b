import React, { Component } from 'react';

import fetcher from '../api/fetcher';
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
        date: new Date(Date.UTC(2018, 7, 1))
      },
      isComplete: false,
      departures: [],
      error: null
    }
  }

  componentDidMount() {
    this.startDeparturesFetch();
  }

  handleError(message, error) {
    console.error(message, error);
    this.setState({error: message});
  };

  handleSearchClick(origin, destination, date) {
    this.setState({
      search: {
        origin: origin,
        destination: destination,
        date: date
      },
      departures: [],
      isComplete: false
    });
    this.startDeparturesFetch();
  }

  handleDateChange(date) {
    this.setState(prevState => {
      return {search: Object.assign({}, prevState.search, {date: date[0]})};;
    });
  }

  startDeparturesFetch() {
    const searchParams = this.state.search;

    fetcher.initialFetch(
      searchParams.origin, searchParams.destination, searchParams.date
    ).then(initialData => {

      console.info("initial fetch has completed.", initialData);
      this.setState({
        departures: parser.parse(initialData),
        isComplete: initialData.complete
      });

      return initialData.complete || this.pollDepartures(10);
    }).catch(err => {
      console.error("Error during departures fetch", err);
    });
  }

  pollDepartures(iterations) {
    const searchParams = this.state.search;

    return fetcher.poll(
      searchParams.origin, searchParams.destination, searchParams.date, this.state.departures.length
    ).then(newData => {

      console.info(`poll #${iterations} has completed.`, newData);
      this.setState(prevState => {
        return {
          departures: prevState.departures.concat(parser.parse(newData)),
          isComplete: newData.complete
        }
      });

      if (--iterations > 0 && !newData.complete) {
        utils.delay(1000).then(() => this.pollDepartures(iterations))
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          search={this.state.search}
          onDateChange={this.handleDateChange.bind(this)}
          onSearchClick={this.handleSearchClick.bind(this)}/>
        <MainSection
          currentSearch={this.state.search}
          departures={this.state.departures}
          error={this.state.error}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
