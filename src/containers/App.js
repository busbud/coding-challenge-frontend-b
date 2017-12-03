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
      isComplete: false,
      departures: []
    }
  }

  componentDidMount() {
    this.fetchDepartures();
  }

  async pollDepartures(iterations) {
    const newData = await fetcher.poll("dr5reg", "f25dvk", "2018-07-09", this.state.departures.length);
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

  async fetchDepartures() {
    const initialData = await fetcher.initialFetch("dr5reg", "f25dvk", "2018-07-09");
    this.setState({
      departures: parser.parse(initialData),
      isComplete: initialData.complete
    });

    if (!this.state.isComplete) this.pollDepartures(10);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <MainSection departures={this.state.departures.sort((a,b) => { return a.departureTime > b.departureTime ? 1 : -1})} />
        <Footer/>
      </div>
    );
  }
}

export default App;
