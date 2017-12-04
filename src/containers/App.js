import React, { Component } from 'react';

import fetcher from '../api/fetcher';
import parser from "../api/parser";

import Footer from "../components/Footer";
import Header from "../components/Header";
import MainSection from "../components/MainSection"


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: {
        origin: "dr5reg",
        destination: "f25dvk",
        date: "2018-08-01"
      },
      isComplete: false,
      departures: []
    }
  }

  componentDidMount() {
    this.startDeparturesFetch();
  }

  handleSearchClick(origin, destination, date) {
    this.setState({
      search: {
        origin: origin,
        destination: destination,
        date: date
      }
    });
    this.startDeparturesFetch();
  }

  async startDeparturesFetch() {
    const searchParams = this.state.search;
    const initialData = await fetcher.initialFetch(searchParams.origin, searchParams.destination, searchParams.date);
    this.setState({
      departures: parser.parse(initialData),
      isComplete: initialData.complete
    });

    initialData.complete || this.pollDepartures(10, searchParams.origin, searchParams.destination, searchParams.date);
  }

  async pollDepartures(iterations) {
    const searchParams = this.state.search;
    const newData = await fetcher.poll(searchParams.origin, searchParams.destination, searchParams.date, this.state.departures.length);
    this.setState(prevState => {
      return {
        departures: prevState.departures.concat(parser.parse(newData)),
        isComplete: newData.complete
      }
    });

    if (--iterations > 0 && !newData.complete) {
      setTimeout(() => {
        this.pollDepartures(iterations)
      }, 1000);
    }
  }

  render() {
    return (
      <div className="App">
        <Header onSearchClick={this.handleSearchClick.bind(this)}/>
        <MainSection currentSearch={this.state.search} departures={this.state.departures} />
        <Footer/>
      </div>
    );
  }
}

export default App;
